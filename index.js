const fs = require('fs');
const path = require('path');
const acorn = require('acorn');
const MagicString = require('magic-string');

class Bundle {
  constructor(entry) {
    this.entry = entry
    this.modules = {}
  }
  build(output) {
    const entryModule = this.fetchModule(this.entry)
    this.statements = entryModule.expandAllStatements() // 获取所有依赖语句
    const { code } = this.generate()
    fs.writeFileSync(output, code, 'utf8')
  }
  fetchModule(entry) {
    if (entry) {
      const code = fs.readFileSync(entry, 'utf8')
      return new Module({ code, path: entry, bundle: this })
    }
  }
  generate() {
    const bundle = new MagicString.Bundle()
    this.statements.forEach(statement => {
      const source = statement._source
      if (statement.type === 'ExportNamedDeclaration') {
        source.remove(statement.start, statement.declaration.start) // 去掉依赖语句的 export
      }
      bundle.addSource({ content: source, separator: '\n' }) // 拼接源码
    })
    return { code: bundle.toString() }
  }
}

class Module {
  constructor({ code, path, bundle }) {
    this.code = new MagicString(code, { filname: path })
    this.path = path
    this.bundle = bundle
    this.ast = acorn.parse(code, { ecmaVersion: 7, sourceType: 'module' })
    this.analyse()
  }
  analyse() {
    this.imports = {} // 收集当前模块的导入变量
    this.exports = {} // 收集当前模块的导出变量
    this.ast.body.forEach(statement => {
      if (statement.type === 'ImportDeclaration') { // 收集导入
        const sourcePath = statement.source.value
        statement.specifiers.forEach(specifier => {
          const name = specifier.imported.name
          const localName = specifier.local.name
          // impots.na={name:'a',localName:'na',sourcePath:'./add.js'}
          this.imports[localName] = {name, localName, sourcePath}
        })
      } else if (statement.type === 'ExportNamedDeclaration') { // 收集导出
        const declaration = statement.declaration
        if (declaration.type === 'VariableDeclaration') {
          declaration.declarations.forEach(declarator => {
            const name = declarator.id.name
            this.exports[name] = {statement, localName: name, expression: declaration}
          })
        }
      }
    });
    // 分析当前模块用到的变量，是自己声明的还是导入的
    let scope = new Scope() // 当前模块的作用域
    this.definitions = {} // 存放模块作用域中所有全局声明的变量
    this.ast.body.forEach(statement => {
      Object.defineProperties(statement, { // 使用defineProperties赋值可避免被遍历与修改
        _defines: { value: {} }, // 当前语句在模块作用域声明的变量
        _depends: { value: {} }, // 当前语句依赖的外部导入的变量
        _included: { value: false, writable: true }, // 此语句是否已被收集过（避免重复引入）
        _source: { value: this.code.snip(statement.start, statement.end) } // 语句源码
      })
      function addToScope(declaration) {
        const name = declaration.id.name // 变量名
        scope.add(name) // 添加到当前的作用域
        if (!scope.parent) // 是模块作用域中声明的变量
          statement._defines[name] = true
      }
      // 收集模块内声明的函数、变量，并放到对应的作用域
      walk(statement, {
        enter(node) {
          let newScope
          switch (node.type) {
            case 'FunctionDeclaration': // 函数声明
              const params = node.params.map(x => x.name)
              addToScope(node)
              newScope = new Scope({ // 创建当前函数的私有作用域，并记录parent
                parent: scope, params
              })
              break;
            case 'VariableDeclaration': // 变量声明
              node.declarations.forEach(addToScope)
              break;
          }
          if (newScope) { // 标记私有作用域
            Object.defineProperty(node, '_scope', { value: newScope })
            scope = newScope
          }
        },
        leave(node) { // 如果在私有作用域中，递归之后要回溯到正确的scope
          if (node._scope) scope = scope.parent
        }
      })
      // 收集模块作用域上全局声明的函数、变量
      Object.keys(statement._defines).forEach(name => {
        this.definitions[name] = statement
      })
      // 收集外部导入的函数、变量
      walk(statement, {
        enter(node) {
          if (node._scope) scope = node._scope
          if (node.type === 'Identifier') { // 如果是一个变量，根据作用域链查找变量所在的作用域
            const definingScope = scope.findDefiningScope(node.name)
            if (!definingScope) // 模块内所有作用域中找不到说明此变量由外部导入
              statement._depends[node.name] = true
          }
        },
        leave(node) { // 如果在私有作用域中，递归之后要回溯scope
          if (node._scope) scope = scope.parent
        }
      })
    })
  }
  expandAllStatements() {
    const allStatements = []
    this.ast.body.forEach(statement => {
      if (statement.type === 'ImportDeclaration') return // 如果是import语句则忽略
      const statements = this.expandStatement(statement)
      allStatements.push(...statements)
    })
    return allStatements
  }
  expandStatement(statement) {
    const result = []
    // 递归收集所有依赖语句
    Object.keys(statement._depends).forEach(name => {
      result.push(...this.define(name))
    })
    if (!statement._included) {
      statement._included = true // 标记此语句已被收集
      result.push(statement)
    }
    return result
  }
  define(name) {
    if (this.imports.hasOwnProperty(name)) {
      const importData = this.imports[name] // {name, localName, sourcePath}
      const p = importData.sourcePath
      // 读取依赖文件
      const module = this.bundle.fetchModule(path.isAbsolute(p) ? p : path.resolve(path.dirname(this.path), p))
      const exportData = module.exports[importData.name] // {statement, localName: name, expression: declaration}
      return module.define(exportData.localName) // 递归获取依赖的定义语句
    } else {
      const statement = this.definitions[name]
      // 依赖语句没有被收集则递归收集所有依赖语句
      return statement && !statement._included ? this.expandStatement(statement) : []
    }
  }
}
// 作用域链表元素
class Scope {
  constructor(options = {}) {
    this.name = options.name;
    this.parent = options.parent;
    this.names = options.params || []; // 此作用域内变量
  }
  add(name) {
    this.names.push(name);
  }
  findDefiningScope(name) {
    if (this.names.includes(name)) {
      return this
    }
    if (this.parent) {
      return this.parent.findDefiningScope(name)
    }
    return null
  }
}
// 语句对象递归访问器
function walk(ast, { enter, leave }) {
  visit(ast, null, enter, leave);
}
function visit(node, parent, enter, leave) {
  if (!node) return 
  if (enter) enter(node, parent)

  const childkeys = Object.keys(node).filter(key => typeof node[key] === "object" )
  childkeys.forEach(childKey => {
    const value = node[childKey]
    if (Array.isArray(value)){
      value.forEach(val => visit(val,node,enter,leave))
    } else {
      visit(value,node,enter,leave)
    }
  })
  if (leave) leave(node, parent)
}

function rollup(entry, output) {
  const bundle = new Bundle(path.resolve(__dirname, entry))
  bundle.build(output)
}
rollup('test/main.js', 'dist/bundle.js')
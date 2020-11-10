'use strict';

/**
 * TTTTTTTTTTTTTTTTTTTTTTTHHHHHHHHH     HHHHHHHHHEEEEEEEEEEEEEEEEEEEEEE
 * T:::::::::::::::::::::TH:::::::H     H:::::::HE::::::::::::::::::::E
 * T:::::::::::::::::::::TH:::::::H     H:::::::HE::::::::::::::::::::E
 * T:::::TT:::::::TT:::::THH::::::H     H::::::HHEE::::::EEEEEEEEE::::E
 * TTTTTT  T:::::T  TTTTTT  H:::::H     H:::::H    E:::::E       EEEEEE
 *         T:::::T          H:::::H     H:::::H    E:::::E
 *         T:::::T          H::::::HHHHH::::::H    E::::::EEEEEEEEEE
 *         T:::::T          H:::::::::::::::::H    E:::::::::::::::E
 *         T:::::T          H:::::::::::::::::H    E:::::::::::::::E
 *         T:::::T          H::::::HHHHH::::::H    E::::::EEEEEEEEEE
 *         T:::::T          H:::::H     H:::::H    E:::::E
 *         T:::::T          H:::::H     H:::::H    E:::::E       EEEEEE
 *       TT:::::::TT      HH::::::H     H::::::HHEE::::::EEEEEEEE:::::E
 *       T:::::::::T      H:::::::H     H:::::::HE::::::::::::::::::::E
 *       T:::::::::T      H:::::::H     H:::::::HE::::::::::::::::::::E
 *       TTTTTTTTTTT      HHHHHHHHH     HHHHHHHHHEEEEEEEEEEEEEEEEEEEEEE
 *
 *    SSSSSSSSSSSSSSS UUUUUUUU     UUUUUUUUPPPPPPPPPPPPPPPPP   EEEEEEEEEEEEEEEEEEEEEERRRRRRRRRRRRRRRRR
 *  SS:::::::::::::::SU::::::U     U::::::UP::::::::::::::::P  E::::::::::::::::::::ER::::::::::::::::R
 * S:::::SSSSSS::::::SU::::::U     U::::::UP::::::PPPPPP:::::P E::::::::::::::::::::ER::::::RRRRRR:::::R
 * S:::::S     SSSSSSSUU:::::U     U:::::UUPP:::::P     P:::::PEE::::::EEEEEEEEE::::ERR:::::R     R:::::R
 * S:::::S             U:::::U     U:::::U   P::::P     P:::::P  E:::::E       EEEEEE  R::::R     R:::::R
 * S:::::S             U:::::U     U:::::U   P::::P     P:::::P  E:::::E               R::::R     R:::::R
 *  S::::SSSS          U:::::U     U:::::U   P::::PPPPPP:::::P   E::::::EEEEEEEEEE     R::::RRRRRR:::::R
 *   SS::::::SSSSS     U:::::U     U:::::U   P:::::::::::::PP    E:::::::::::::::E     R:::::::::::::RR
 *     SSS::::::::SS   U:::::U     U:::::U   P::::PPPPPPPPP      E:::::::::::::::E     R::::RRRRRR:::::R
 *        SSSSSS::::S  U:::::U     U:::::U   P::::P              E::::::EEEEEEEEEE     R::::R     R:::::R
 *             S:::::S U:::::U     U:::::U   P::::P              E:::::E               R::::R     R:::::R
 *             S:::::S U::::::U   U::::::U   P::::P              E:::::E       EEEEEE  R::::R     R:::::R
 * SSSSSSS     S:::::S U:::::::UUU:::::::U PP::::::PP          EE::::::EEEEEEEE:::::ERR:::::R     R:::::R
 * S::::::SSSSSS:::::S  UU:::::::::::::UU  P::::::::P          E::::::::::::::::::::ER::::::R     R:::::R
 * S:::::::::::::::SS     UU:::::::::UU    P::::::::P          E::::::::::::::::::::ER::::::R     R:::::R
 *  SSSSSSSSSSSSSSS         UUUUUUUUU      PPPPPPPPPP          EEEEEEEEEEEEEEEEEEEEEERRRRRRRR     RRRRRRR
 *
 * TTTTTTTTTTTTTTTTTTTTTTTIIIIIIIIIINNNNNNNN        NNNNNNNNYYYYYYY       YYYYYYY
 * T:::::::::::::::::::::TI::::::::IN:::::::N       N::::::NY:::::Y       Y:::::Y
 * T:::::::::::::::::::::TI::::::::IN::::::::N      N::::::NY:::::Y       Y:::::Y
 * T:::::TT:::::::TT:::::TII::::::IIN:::::::::N     N::::::NY::::::Y     Y::::::Y
 * TTTTTT  T:::::T  TTTTTT  I::::I  N::::::::::N    N::::::NYYY:::::Y   Y:::::YYY
 *         T:::::T          I::::I  N:::::::::::N   N::::::N   Y:::::Y Y:::::Y
 *         T:::::T          I::::I  N:::::::N::::N  N::::::N    Y:::::Y:::::Y
 *         T:::::T          I::::I  N::::::N N::::N N::::::N     Y:::::::::Y
 *         T:::::T          I::::I  N::::::N  N::::N:::::::N      Y:::::::Y
 *         T:::::T          I::::I  N::::::N   N:::::::::::N       Y:::::Y
 *         T:::::T          I::::I  N::::::N    N::::::::::N       Y:::::Y
 *         T:::::T          I::::I  N::::::N     N:::::::::N       Y:::::Y
 *       TT:::::::TT      II::::::IIN::::::N      N::::::::N       Y:::::Y
 *       T:::::::::T      I::::::::IN::::::N       N:::::::N    YYYY:::::YYYY
 *       T:::::::::T      I::::::::IN::::::N        N::::::N    Y:::::::::::Y
 *       TTTTTTTTTTT      IIIIIIIIIINNNNNNNN         NNNNNNN    YYYYYYYYYYYYY
 *
 *         CCCCCCCCCCCCC     OOOOOOOOO     MMMMMMMM               MMMMMMMMPPPPPPPPPPPPPPPPP   IIIIIIIIIILLLLLLLLLLL             EEEEEEEEEEEEEEEEEEEEEERRRRRRRRRRRRRRRRR
 *      CCC::::::::::::C   OO:::::::::OO   M:::::::M             M:::::::MP::::::::::::::::P  I::::::::IL:::::::::L             E::::::::::::::::::::ER::::::::::::::::R
 *    CC:::::::::::::::C OO:::::::::::::OO M::::::::M           M::::::::MP::::::PPPPPP:::::P I::::::::IL:::::::::L             E::::::::::::::::::::ER::::::RRRRRR:::::R
 *   C:::::CCCCCCCC::::CO:::::::OOO:::::::OM:::::::::M         M:::::::::MPP:::::P     P:::::PII::::::IILL:::::::LL             EE::::::EEEEEEEEE::::ERR:::::R     R:::::R
 *  C:::::C       CCCCCCO::::::O   O::::::OM::::::::::M       M::::::::::M  P::::P     P:::::P  I::::I    L:::::L                 E:::::E       EEEEEE  R::::R     R:::::R
 * C:::::C              O:::::O     O:::::OM:::::::::::M     M:::::::::::M  P::::P     P:::::P  I::::I    L:::::L                 E:::::E               R::::R     R:::::R
 * C:::::C              O:::::O     O:::::OM:::::::M::::M   M::::M:::::::M  P::::PPPPPP:::::P   I::::I    L:::::L                 E::::::EEEEEEEEEE     R::::RRRRRR:::::R
 * C:::::C              O:::::O     O:::::OM::::::M M::::M M::::M M::::::M  P:::::::::::::PP    I::::I    L:::::L                 E:::::::::::::::E     R:::::::::::::RR
 * C:::::C              O:::::O     O:::::OM::::::M  M::::M::::M  M::::::M  P::::PPPPPPPPP      I::::I    L:::::L                 E:::::::::::::::E     R::::RRRRRR:::::R
 * C:::::C              O:::::O     O:::::OM::::::M   M:::::::M   M::::::M  P::::P              I::::I    L:::::L                 E::::::EEEEEEEEEE     R::::R     R:::::R
 * C:::::C              O:::::O     O:::::OM::::::M    M:::::M    M::::::M  P::::P              I::::I    L:::::L                 E:::::E               R::::R     R:::::R
 *  C:::::C       CCCCCCO::::::O   O::::::OM::::::M     MMMMM     M::::::M  P::::P              I::::I    L:::::L         LLLLLL  E:::::E       EEEEEE  R::::R     R:::::R
 *   C:::::CCCCCCCC::::CO:::::::OOO:::::::OM::::::M               M::::::MPP::::::PP          II::::::IILL:::::::LLLLLLLLL:::::LEE::::::EEEEEEEE:::::ERR:::::R     R:::::R
 *    CC:::::::::::::::C OO:::::::::::::OO M::::::M               M::::::MP::::::::P          I::::::::IL::::::::::::::::::::::LE::::::::::::::::::::ER::::::R     R:::::R
 *      CCC::::::::::::C   OO:::::::::OO   M::::::M               M::::::MP::::::::P          I::::::::IL::::::::::::::::::::::LE::::::::::::::::::::ER::::::R     R:::::R
 *         CCCCCCCCCCCCC     OOOOOOOOO     MMMMMMMM               MMMMMMMMPPPPPPPPPP          IIIIIIIIIILLLLLLLLLLLLLLLLLLLLLLLLEEEEEEEEEEEEEEEEEEEEEERRRRRRRR     RRRRRRR
 *
 * =======================================================================================================================================================================
 * =======================================================================================================================================================================
 * =======================================================================================================================================================================
 * =======================================================================================================================================================================
 */

/**
 * 今天我们会一起编写一个编译器。一个非常非常简化的微型编译器！这个编译器非常小，如果你移除这个
 * 文件里的注释，那么这个文件只剩下大概200行代码。
 *
 * 我们会将类似于LISP的函数调用编译成类似于C的函数调用。
 *
 * 如果你对这两个语言中的一个或者两个不熟悉。下面是一个快速的介绍。
 *
 * 如果我有两个函数`add`和`subtract`，它们会像下面这样被写出来：
 *
 *                  LISP                      C
 *
 *   2 + 2          (add 2 2)                 add(2, 2)
 *   4 - 2          (subtract 4 2)            subtract(4, 2)
 *   2 + (4 - 2)    (add 2 (subtract 4 2))    add(2, subtract(4, 2))
 *
 * 非常简单直观不是吗？
 *
 * 非常好，因为这就是我们要编译的代码。尽管这并不是一个完整的LISP或者C的编译器，但是它足够展示
 * 现代编译器的很多大部分组成部件。
 */

/**
 * 大部分编译器的工作可以被分解为三个主要阶段：解析（Parsing），转化（Transformation）以及
 * 代码生成（Code Generation）。
 *
 * 1. *解析* 将源代码转换为一个更抽象的形式。
 *
 * 2. *转换* 接受解析产生的抽象形式并且操纵这些抽象形式做任何编译器想让它们做的事。
 *
 * 3. *代码生成* 基于转换后的代码表现形式（code representation）生成目标代码。
 */

/**
 * 解析
 * -------
 *
 * 解析一般被分为两个部分：词法分析和语法分析。
 *
 * 1. *词法分析* 通过一个叫做tokenizer（词素生成器，也叫lexer）的工具将源代码分解成一个个词素。
 *
 *    词素是描述编程语言语法的对象。它可以描述数字，标识符，标点符号，运算符等等。
 *
 * 2. *语法分析* 接收词素并将它们组合成一个描述了源代码各部分之间关系的中间表达形式：抽象语法树。
 *
 *    抽象语法树是一个深度嵌套的对象，这个对象以一种既能够简单地操作又提供很多关于源代码信息的形式
 *    来展现代码。
 *
 * 看下面的代码:
 *
 *   (add 2 (subtract 4 2))
 *
 * 上面代码产生的词素会像下面这样：
 *
 *   [
 *     { type: 'paren',  value: '('        },
 *     { type: 'name',   value: 'add'      },
 *     { type: 'number', value: '2'        },
 *     { type: 'paren',  value: '('        },
 *     { type: 'name',   value: 'subtract' },
 *     { type: 'number', value: '4'        },
 *     { type: 'number', value: '2'        },
 *     { type: 'paren',  value: ')'        },
 *     { type: 'paren',  value: ')'        },
 *   ]
 *
 * 而产生的抽象语法树会像下面这样：
 *
 *   {
 *     type: 'Program',
 *     body: [{
 *       type: 'CallExpression',
 *       name: 'add',
 *       params: [{
 *         type: 'NumberLiteral',
 *         value: '2',
 *       }, {
 *         type: 'CallExpression',
 *         name: 'subtract',
 *         params: [{
 *           type: 'NumberLiteral',
 *           value: '4',
 *         }, {
 *           type: 'NumberLiteral',
 *           value: '2',
 *         }]
 *       }]
 *     }]
 *   }
 */

/**
 * 转换
 * --------------
 *
 * 编译器的下一个阶段是转换阶段。再回顾一遍，这个过程接收解析生成的抽象语法树并对它做出改动。
 * 转换阶段可以改变抽象语法树使代码保持在同一个语言（例如Babel，Babel接收的是JS代码生成的也是
 * JS代码），或者编译成另外一门语言。
 *
 * 让我们一起来看如何转换一个抽象语法树。
 *
 * 你可能会注意到我们的抽象语法树包含了长得非常相似的元素。观察那些含有type属性的元素。这些元素
 * 被称为抽象语法树的节点。每一个节点都描述了源代码中的一部分。
 *
 * 针对NumberLiteral我们有一个节点：
 *
 *   {
 *     type: 'NumberLiteral',
 *     value: '2',
 *   }
 *
 * 针对CallExpression我们也有一个节点：
 *
 *   {
 *     type: 'CallExpression',
 *     name: 'subtract',
 *     params: [...nested nodes go here...],
 *   }
 *
 * 在转换抽象语法树的时候，我们可以通过添加/删除/替换节点属性来操纵节点。我们也可以添加节点，
 * 删除节点，或者基于现有的抽象语法树创建一个全新的抽象语法树。
 *
 * 由于我们的编译目标是另外一门语言，所以我们集中注意力新建一个针对目标语言的全新抽象语法树。
 *
 * 遍历
 * ---------
 *
 * 为了处理节点，我们需要遍历它们。这个遍历的过程按照深度优先规则遍历每一个节点。
 *
 *   {
 *     type: 'Program',
 *     body: [{
 *       type: 'CallExpression',
 *       name: 'add',
 *       params: [{
 *         type: 'NumberLiteral',
 *         value: '2'
 *       }, {
 *         type: 'CallExpression',
 *         name: 'subtract',
 *         params: [{
 *           type: 'NumberLiteral',
 *           value: '4'
 *         }, {
 *           type: 'NumberLiteral',
 *           value: '2'
 *         }]
 *       }]
 *     }]
 *   }
 *
 * 所以针对上面这个抽象语法树我们会按照下面步骤遍历节点：
 *
 *   1. Program - 从抽象语法树的最顶端开始
 *   2. CallExpression (add) - 移动到Program的body属性中的第一个元素
 *   3. NumberLiteral (2) - 移动到CallExpression的params中的第一个元素
 *   4. CallExpression (subtract) - 移动到CallExpression的params中的第二个元素
 *   5. NumberLiteral (4) - 移动到CallExpression的params中的第一个元素
 *   6. NumberLiteral (2) - 移动到CallExpression的params中的第二个元素
 *
 * 如果我们直接操纵这个抽象语法树，而不是创建一个新的抽象语法树，那么我们就需要在这个步骤使用到
 * 很多不同的抽象概念。然而为了满足我们的需求，在这一步我们仅仅需要访问抽象语法树中的每一个节点
 * 即可。
 *
 * The reason I use the word "visiting" is because there is this pattern of how
 * to represent operations on elements of an object structure.
 * 在这里我使用“访问”这个词的与原因是因为存在着下面这个用来表示一个对象结构中元素行为的模式。
 *
 * 访问者
 * --------
 *
 * 基本的思想是我们会创建一个“访问者”对象，这个访问者对象有不同的方法来接受不同的节点类型。
 *
 *   var visitor = {
 *     NumberLiteral() {},
 *     CallExpression() {},
 *   };
 *
 * 当我们遍历抽象语法树的时候，我们会根据现在“进入”的节点的类型调用访问者对象相对应的方法。
 *
 * 为了使这个对象能够正常工作，我们需要传入当前节点以及当前节点的父节点的引用。
 *
 *   var visitor = {
 *     NumberLiteral(node, parent) {},
 *     CallExpression(node, parent) {},
 *   };
 *
 * 然而，也存在着在“离开”节点的时候调用方法的可能性。假设我们有以下的抽象语法树结构：
 *
 *   - Program
 *     - CallExpression
 *       - NumberLiteral
 *       - CallExpression
 *         - NumberLiteral
 *         - NumberLiteral
 *
 * 当我们向下遍历语法树的时候，我们会碰到所谓的叶子节点。我们在处理完一个节点后会“离开”这个节点。
 * 所以向下遍历树的时候我们“进入”节点，而向上返回的时候我们“离开”节点。
 *
 *   -> Program (enter)
 *     -> CallExpression (enter)
 *       -> Number Literal (enter)
 *       <- Number Literal (exit)
 *       -> Call Expression (enter)
 *          -> Number Literal (enter)
 *          <- Number Literal (exit)
 *          -> Number Literal (enter)
 *          <- Number Literal (exit)
 *       <- CallExpression (exit)
 *     <- CallExpression (exit)
 *   <- Program (exit)
 *
 * 为了支持上面所讲的功能，我们的访问者对象的最终形态如下：
 *
 *   var visitor = {
 *     NumberLiteral: {
 *       enter(node, parent) {},
 *       exit(node, parent) {},
 *     }
 *   };
 */

/**
 * 代码生成
 * ---------------
 *
 * 编译器的最后步骤是代码生成。有时候编译器在这个步骤也会执行转换阶段的一些行为，但是大体而言代
 * 码生成阶段的工作就是基于转换步骤产生的抽象语法树生成目标代码。
 *
 * 代码生成器的工作方式多种多样，一些编译器会重新利用更早阶段产生的词素，还有一些编译器会创建一
 * 个独立的代码表达形式从而能够线性地打印节点，但是基于我的经验大部分编译器会使用我们刚刚创造的
 * 那个抽象语法树，这也是我们接下来讲的方法。
 *
 * 一个有效的代码生成器知道如何“打印”抽象语法树不同类型的节点，并且会递归地调用自己来打印嵌套的
 * 节点直到整个语法树被打印成一长串完整的代码字符串。
 */

/**
 * 上面所讲到的就是编译器的所有不同部分了。
 *
 * 这并不表明所有编译器都像我上面描述的那样工作。不同的编译器有各种各样不同的目的，它们可能需要
 * 一些我没有讲到的步骤。
 *
 * 但是现在你应该已经有了一个编译器如何工作的大体概念了。
 *
 * 既然现在我已经解释了所有东西，你就可以立马动手写一个你自己的编译器了不是吗？
 *
 * 开个玩笑，我会帮助你理解如何写一个编译器 :P。
 *
 * 那么我们开始吧……
 */

/**
 * ============================================================================
 *                                   (/^▽^)/
 *                                THE TOKENIZER!
 * ============================================================================
 */

/**
 * 我们从解析步骤的第一个部分开始，词法分析。也就是tokenizer词素生成器的工作。
 *
 * 我们将源代码分解成一个词素数组。
 *
 *   (add 2 (subtract 4 2))   =>   [{ type: 'paren', value: '(' }, ...]
 */


function tokenizer(input) {
  let current = 0;

  let tokens = [];

  while (current < input.length) {
    let char = input[current];

    if (char === '(') {
      tokens.push({
        type: 'paren',
        value: '(',
      });

      current++;

      continue;
    }

    if (char === ')') {
      tokens.push({
        type: 'paren',
        value: ')',
      });
      current++;
      continue;
    }

    let WHITESPACE = /\s/;
    if (WHITESPACE.test(char)) {
      current++;
      continue;
    }

    let NUMBERS = /[0-9]/;
    if (NUMBERS.test(char)) {
      let value = '';

      while (NUMBERS.test(char)) {
        value += char;
        char = input[++current];
      }

      tokens.push({ type: 'number', value });

      continue;
    }

    if (char === '"') {
      let value = '';

      char = input[++current];

      while (char !== '"') {
        value += char;
        char = input[++current];
      }

      char = input[++current];

      tokens.push({ type: 'string', value });

      continue;
    }

    let LETTERS = /[a-z]/i;
    if (LETTERS.test(char)) {
      let value = '';

      while (LETTERS.test(char)) {
        value += char;
        char = input[++current];
      }

      tokens.push({ type: 'name', value });

      continue;
    }

    throw new TypeError('I dont know what this character is: ' + char);
  }

  return tokens;
}

/**
 * ============================================================================
 *                                 ヽ/❀o ل͜ o\ﾉ
 *                                THE PARSER!!!
 * ============================================================================
 */

/**
 * 我们的语法分析器接受我们的词素数组并创造出一个抽象语法树。
 *
 *   [{ type: 'paren', value: '(' }, ...]   =>   { type: 'Program', body: [...] }
 */

// 好的，那么我们定义一个`parser`函数，这个函数接收词素数组tokens。
function parser(tokens) {
  let current = 0;

  function walk() {
    let token = tokens[current];

    if (token.type === 'number') {
      current++;

      return {
        type: 'NumberLiteral',
        value: token.value,
      };
    }

    if (token.type === 'string') {
      current++;

      return {
        type: 'StringLiteral',
        value: token.value,
      };
    }

    if (token.type === 'paren' && token.value === '(') {
      token = tokens[++current];

      let node = {
        type: 'CallExpression',
        name: token.value,
        params: [],
      };

      token = tokens[++current];


      while (
        token.type !== 'paren' ||
        (token.type === 'paren' && token.value !== ')')
      ) {
        node.params.push(walk());
        token = tokens[current];  // 更新token，否则死循环
      }

      current++;

      return node;
    }

    throw new TypeError(token.type);
  }

  let ast = {
    type: 'Program',
    body: [],
  };

  while (current < tokens.length) {
    ast.body.push(walk());
  }

  return ast;
}

/**
 * ============================================================================
 *                                 ⌒(❀>◞౪◟<❀)⌒
 *                               THE TRAVERSER!!!
 * ============================================================================
 */

/**
 * 现在我们有了抽象语法树，而我们希望可以使用一个访问者对象来访问各个节点。我们需要能够在碰到一
 * 个节点的时候调用访问者对象相应的方法。
 *
 *   traverse(ast, {
 *     Program: {
 *       enter(node, parent) {
 *       },
 *       exit(node, parent) {
 *       },
 *     },
 *
 *     CallExpression: {
 *       enter(node, parent) {
 *       },
 *       exit(node, parent) {
 *       },
 *     },
 *
 *     NumberLiteral: {
 *       enter(node, parent) {
 *       },
 *       exit(node, parent) {
 *       },
 *     },
 *   });
 */

// 所以我们定义一个traverser函数，这个函数接收抽象语法树以及一个访问者对象。在这个函数内部我们
// 还会定义两个函数……
function traverser(ast, visitor) {
  function traverseArray(array, parent) {
    array.forEach(child => {
      traverseNode(child, parent);
    });
  }

  function traverseNode(node, parent) {
    let methods = visitor[node.type];

    if (methods && methods.enter) {
      methods.enter(node, parent);
    }

    switch (node.type) {
      case 'Program':
        traverseArray(node.body, node);
        break;

      case 'CallExpression':
        traverseArray(node.params, node);
        break;

      case 'NumberLiteral':
      case 'StringLiteral':
        break;

      default:
        throw new TypeError(node.type);
    }

    if (methods && methods.exit) {
      methods.exit(node, parent);
    }
  }

  traverseNode(ast, null);
}

/**
 * ============================================================================
 *                                   ⁽(◍˃̵͈̑ᴗ˂̵͈̑)⁽
 *                              THE TRANSFORMER!!!
 * ============================================================================
 */

/**
 * 接下来就是转换器。我们的转换器会接收我们创造的抽象语法树并将它和一个访问者对象传给traverser
 * 函数。然后创造一个新的抽象语法树。
 *
 * ----------------------------------------------------------------------------
 *   Original AST                     |   Transformed AST
 * ----------------------------------------------------------------------------
 *   {                                |   {
 *     type: 'Program',               |     type: 'Program',
 *     body: [{                       |     body: [{
 *       type: 'CallExpression',      |       type: 'ExpressionStatement',
 *       name: 'add',                 |       expression: {
 *       params: [{                   |         type: 'CallExpression',
 *         type: 'NumberLiteral',     |         callee: {
 *         value: '2'                 |           type: 'Identifier',
 *       }, {                         |           name: 'add'
 *         type: 'CallExpression',    |         },
 *         name: 'subtract',          |         arguments: [{
 *         params: [{                 |           type: 'NumberLiteral',
 *           type: 'NumberLiteral',   |           value: '2'
 *           value: '4'               |         }, {
 *         }, {                       |           type: 'CallExpression',
 *           type: 'NumberLiteral',   |           callee: {
 *           value: '2'               |             type: 'Identifier',
 *         }]                         |             name: 'subtract'
 *       }]                           |           },
 *     }]                             |           arguments: [{
 *   }                                |             type: 'NumberLiteral',
 *                                    |             value: '4'
 * ---------------------------------- |           }, {
 *                                    |             type: 'NumberLiteral',
 *                                    |             value: '2'
 *                                    |           }]
 *  (sorry the other one is longer.)  |         }
 *                                    |       }
 *                                    |     }]
 *                                    |   }
 * ----------------------------------------------------------------------------
 */

// 所以我们定义一个transformer函数，这个函数接收一个lisp抽象语法树对象。
function transformer(ast) {
  let newAst = {
    type: 'Program',
    body: [],
  };

  ast._context = newAst.body;

  traverser(ast, {
    NumberLiteral: {
      enter(node, parent) {
        parent._context.push({
          type: 'NumberLiteral',
          value: node.value,
        });
      },
    },

    StringLiteral: {
      enter(node, parent) {
        parent._context.push({
          type: 'StringLiteral',
          value: node.value,
        });
      },
    },

    CallExpression: {
      enter(node, parent) {
        let expression = {
          type: 'CallExpression',
          callee: {
            type: 'Identifier',
            name: node.name,
          },
          arguments: [],
        };

        node._context = expression.arguments; // 通过_context的引用关系完善newAst结构

        if (parent.type !== 'CallExpression') {
          expression = {
            type: 'ExpressionStatement',
            expression: expression,
          };
        }

        parent._context.push(expression);
      },
    },
  });

  return newAst;
}

/**
 * ============================================================================
 *                               ヾ（〃＾∇＾）ﾉ♪
 *                            THE CODE GENERATOR!!!!
 * ============================================================================
 */

/**
 * 现在我们进入最后的阶段：代码生成器。
 *
 * 我们的代码生成器会递归地调用自身将树中的每一个节点打印出来，最终形成一个巨大的字符串。
 */

function codeGenerator(node) {
  switch (node.type) {
    case 'Program':
      return node.body.map(codeGenerator).join('\n');

    case 'ExpressionStatement':
      return (
        codeGenerator(node.expression) + ';'
      );

    case 'CallExpression':
      return (
        codeGenerator(node.callee) +
        '(' +
        node.arguments.map(codeGenerator).join(', ') +
        ')'
      );

    case 'Identifier':
      return node.name;

    case 'NumberLiteral':
      return node.value;

    case 'StringLiteral':
      return '"' + node.value + '"';

    default:
      throw new TypeError(node.type);
  }
}

/**
 * ============================================================================
 *                                  (۶* ‘ヮ’)۶”
 *                         !!!!!!!!THE COMPILER!!!!!!!!
 * ============================================================================
 */

/**
 * 终于到了！我们定义我们的`compiler`函数。这个函数会将所有部分连接起来。
 *
 *   1. input  => tokenizer   => tokens
 *   2. tokens => parser      => ast
 *   3. ast    => transformer => newAst
 *   4. newAst => generator   => output
 */

function compiler(input) {
  let tokens = tokenizer(input);
  let ast = parser(tokens);
  let newAst = transformer(ast);
  let output = codeGenerator(newAst);

  return output;
}

/**
 * ============================================================================
 *                                   (๑˃̵ᴗ˂̵)و
 * !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!YOU MADE IT!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
 * ============================================================================
 */

// 格式化路由
function normalizeRouteRecord(record) {
  return {
    path: record.path,
    // redirect: record.redirect,
    name: record.name,
    meta: record.meta || {},
    // aliasOf: undefined,
    beforeEnter: record.beforeEnter,
    // props: normalizeRecordProps(record),
    children: record.children || [],
    // instances: {},
    // leaveGuards: new Set(),
    // updateGuards: new Set(),
    // enterCallbacks: {},
    components:
      'components' in record
        ? record.components || {}
        : { default: record.component },
  }
}
// 创建匹配记录链表，构建父子关系
function createRouteRecordMatcher(record, parent) {
  const matcher = {
    path: record.path,
    record,
    parent,
    children: []
  }
  if (parent) parent.children.push(matcher)
  return matcher
}

export default function createRouterMatcher(routes) {
  // 将用户输入的嵌套路由配置拍平放入matchers
  const matchers = [];
  routes.forEach(route => addRoute(route))
  // 公共API：用于动态添加路由
  function addRoute(route, parent = null) {
    // 格式化路由
    const normalizedRecord = normalizeRouteRecord(route);
    if (parent) {
      // 拼接子路由的完整路由
      let connectingSlash = parent.path.endsWith('/') ? '' : '/'
      normalizedRecord.path = parent.path + connectingSlash + normalizedRecord.path
    }
    // 构建父子关系（双向链表）
    const matcher = createRouteRecordMatcher(normalizedRecord, parent)
    const children = normalizedRecord.children
    for (let i = 0; i < children.length; i++) {
      addRoute(children[i], matcher)
    }
    matchers.push(matcher)
  }

  function resolve(location) {
    const path = location.path;
    const matched = [];
    let matcher = matchers.find(m => m.path === path)
    while(matcher) {
      matched.unshift(matcher.record) // 父组件要放子组件之前
      matcher = matcher.parent
    }
    return {path, matched} // START_LOCATION_NORMALIZED 对象
  }
  
  return { resolve, addRoute }
}

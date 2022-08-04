export function deepClone(source) {
  let target = {};
  for(let prop in source) {
    if (typeof source[prop] === 'object') target[prop] = deepClone(source[prop])
    else target[prop] = source[prop]
  }
  return target
}
var re = {
  qq: /[1-9][0-9]{4,9}/,
  email: /^\w+@[a-z0-9]+(\.[a-z]+){1,3}$/,
  phone: /^1[3,4,5,7,8,9]\d{9}$/,
  trim: /^\s*|\s*$/,         //行首行尾空格
  chinese: /[\u4e00-\u9fa5]/,    //匹配中文,最新写法： /\p{Unified_Ideograph}/u  u代表Unicode
  url: /[a-zA-z]+:\/\/[^\s]*/,   //网址
  postalcode: /[0-9]\d{5}/,    //邮编
  ID: /[1-9]\d{14}|[1-9]\d{17}|[1-9]\d{16}x/  //身份证号
}
// 加千分位 "12345678".replace(/(\d)(?=(?:\d{3})+$)/g,'$1,')

function type(o) {
  return Object.prototype.toString.call(o).slice(8, -1).toLowerCase();
}
// 数组扁平化
function flat (arr) {
  return [].concat(...arr.map(item => (Array.isArray(item) ? flat(arr) : [item])));
}

function generateId() {
  return Math.random().toString(36).substring(2) + Date.now().toString(36);
}

// 创建过去七天的数组，如果将代码中的减号换成加号，你将得到未来7天的数组集合
// [...Array(7).keys()].map(i => new Date(Date.now() - 86400000*i))

// 获取URL的查询参数
function query(){
  const q = {};
  location.search.replace(/([^?&=]+)=([^&]+)/g, (_, k, v) => q[k] = v)
  return q;
}

// 数组去重
// 1、new Set()
// 2、arr.filter((i,j,arr) => arr.indexOf(i) === j)
// 3、arr.reduce((n,i) => (n.indexOf(i) === -1 ? n.push(i) : n), [])
// 4、双循环一一对比，用splice(j,1)剔除

// 判断空对象：1、Object.keys(obj).length  2、JSON.stringify()==='{}'  3、空对象不会执行for...in...

// 前端路由实现：https://juejin.im/post/5ac61da66fb9a028c71eae1b

function getStyle(obj, attr) {
  return obj.currentStyle ? obj.currentStyle[attr] : getComputedStyle(obj)[attr];
}

function insertAfter(newElement, targetElement) {
  const parent = targetElement.parentNode;
  if (parent.lastChild == targetElement) {
    parent.appendChild(newElement);
  } else {
    parent.insertBefore(newElement, targetElement.nextSibling);
  }
}

// 拖拽效果
function drag(obj) {
  obj.onmousedown = function (ev) {
    const ev = ev || window.event;
    const disX = ev.clientX - this.offsetLeft;
    const disY = ev.clientY - this.offsetTof;
    if (obj.setCapture) obj.setCapture(); //兼容IE
    document.onmousemove = function () {
      obj.style.left = ev.clientX - disX;
      obj.style.top = ev.clientY - disY;
    }
    document.onmouseup = function () {
      document.onmousemove = document.onmouseup = null;
      //释放全局捕获 releaseCapture();
      if (obj.releaseCapture) obj.releaseCapture();
    }
    //阻止冒泡
    return false;
  }
}

//抖动效果
function shake(json = {}) { //配置
  //默认
  let opt = {
    callback: function () { },
    attr: 'left',
    n: 10,
    target: null
  }
  // 有配置走配置，没配置走默认
  Object.assign(opt, json);
  //console.log(opt);
  let arr = [];
  let num = 0;
  let timer = null;
  for (var i = opt.n; i > 0; i -= 2) {
    arr.push(-i, i);
  }
  arr.push(0);
  clearInterval(timer);
  timer = setInterval(function () {
    opt.target.style[opt.attr] = parseInt(getComputedStyle(opt.target)[opt.attr]) + arr[num++] + 'px';
    if (num >= arr.length) {
      clearInterval(timer);
      num = 0;
      opt.callback && opt.callback();//钩子函数
    }
  }, 30);
}

//倒计时
function countDown(fullyear, month, date, hours, minutes, secounds) {
  const target = new Date(fullyear, month, date, hours, minutes, secounds);
  const dNow = new Date();
  const t = Math.floor((target - dNow) / 1000);
  if (t >= 0) {
    const str = Math.floor(t / 86400) + '天' + Math.floor(t % 86400 / 3600) + '时' + Math.floor(t % 86400 % 3600 / 60) + '分' + t % 60 + '秒';
    return str;
  } else {
    alert('It has expired');
  }
}

function add(num1, num2) {
  let r1, r2, m;
  r1 = ('' + num1).split('.')[1].length;
  r2 = ('' + num2).split('.')[1].length;

  m = Math.pow(10, Math.max(r1, r2));
  return (num1 * m + num2 * m) / m;
}
function add2(x, y) {
  return x.toPrecision() + y.toPrecision()  // 或toFixed(),返回都为字符串
}

function setcookie(name, value, expires, path, domain, secure) {
  var cookie = encodeURIComponent(name) + '=' + encodeURIComponent(value);
  if (expires) cookie += '; expires=' + expires.toGMTString();
  if (path) cookie += '; path=' + path;
  if (domain) cookie += '; domain=' + domain;
  if (secure) cookie += '; secure=' + secure;
  document.cookie = cookie;
}

function getcookie() {
  var cookie = {};
  var all = document.cookie;
  if (all === '') return cookie;
  var list = all.split('; ');
  for (var i = 0; i < list.length; i++) {
    var p = list[i].indexOf('=');
    var name = decodeURIComponent(list[i].substring(0, p));
    var value = decodeURIComponent(list[i].substring(p + 1));
    cookie[name] = value;
  }
  return cookie;
}

function removecookie(name, path, domain) {
  document.cookie = name + '=' + '; path=' + path + ';domain=' + domain + '; max-age=0';
}

function ajax(json) {
  var opt = {
    url: '',
    data: {},
    method: 'get',
    dataType: 'json',
    success: function () { },
    fail: function () { }
  };
  Object.assign(opt, json);
  let arr = [];
  for (let attr in opt.data) {
    arr.push(attr + '=' + opt.data[attr]);
  }
  opt.data = arr.join('&');

  let xhr = new XMLHttpRequest;
  if (opt.method === 'get') {
    xhr.open('get', opt.url + '?' + encodeURI(opt.data), true);
    xhr.send();
  } else if (opt.method === 'post') {
    xhr.open('post', opt.url, true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.send(opt.data);
  }
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {//只能说可以接收到服务器的信息，但是不保证成功还是失败
      if (xhr.status >= 200 && xhr.status <= 207) {
        if (opt.dataType === 'json') {
          opt.success(JSON.parse(xhr.responseText));
        } else if (opt.dataType === 'xml') {
          opt.success(xhr.responseXML);
        } else {
          opt.success(xhr.responseText);
        }
      } else {
        opt.fail(xhr.status);
      }
    }
  }
}

function jsonp(obj) {
  let opt = {
    url: '',
    success: function () { },
    data: {},
    error: function () { },
    callback: 'callback'
  }
  Object.assign(opt, obj);
  let onOff = false;
  let arr = [];
  //函数名不能有小数
  let fnName = Math.random().replace('.', '') + '_' + new Date().getTime();
  opt.data[opt.callback] = fnName;
  for (let attr in opt.data) {
    arr.push(attr + '=' + opt.data[attr]);
  }
  opt.data = arr.join('&');//wd=ser&cb=jquery32332
  window[fnName] = function (data) {
    onOff = true;
    opt.success(data);
  }
  setTimeout(function () {
    if (!onOff) {
      opt.error();
    }
  }, 10000);
  let os = document.createElement('script');
  os.src = opt.url + '?' + opt.data;
  document.getElementsByTagName('head')[0].appendChild(os);
  os.remove();
}


//深拷贝
// 方法一：JSON.parse(JSON.stringify(obj)) function、undefined、symbol不被拷贝，无法解决循环引用
function deepClone(obj) { // 深度优先拷贝
  if (obj === null || typeof obj !== 'object') {
    return obj;
  }
  var newobj = obj.push ? [] : {};
  for (var attr in obj) {
    newobj[attr] = deepClone(obj[attr]);
  }
  return newobj;
}

class EventEmitter {
  constructor() {
    this.handlers = {}
  }
  on(type, cb) {  // cb: 函数名
    const handlers = this.handlers[type]
    const added = handlers && handlers.push(cb)
    if (!added) this.handlers[type] = [cb]
    return () => this.handlers[type] = arr.filter(e => e.name !== cb.name) // 解绑
  }
  emit(type, ...arg) {
    if (this.handlers[type])
      this.handlers[type].forEach(e => e(...arg))
  }
}

//call的实现
Function.prototype.myCall = function(context) {
  if (typeof this !== 'function') {
    throw new TypeError('Error');
  }
  context = context || window;
  context.fn = this;
  const args = [...arguments].slice(1);
  const result = context.fn(...args);
  delete context.fn;
  return result;
}

// new 的实现
function _new(fn, ...arg) {
  const obj = Object.create(fn.prototype);
  const ret = fn.apply(obj, arg);
  return ret instanceof Object ? ret : obj;
}

// 防抖
const debounce = (func, wait = 100) => {
  let timer = 0
  return function(...args) { // arguments
    if (timer) clearTimeout(timer) // func触发频率小于100ms会被取消再新建
    timer = setTimeout(() => {
      func.apply(this, args) // this绑定当前执行环境，指向调用对象
    }, wait)
  }
}

// 节流(throttle)
const throttle = (func, wait = 50) => {
  let lastTime = 0
  return function(...args) {
    let now = +new Date()
    if (now - lastTime > wait) {
      lastTime = now
      func.apply(this, args)
    }
  }
}

// Currying
const curry = (fn, arr = []) => (...args) => (
  arg => arg.length === fn.length
    ? fn(...arg)
    : curry(fn, arg)
)([...arr, ...args])


/*深度优先遍历一个DOM树三种方式*/
let deepTraversal1 = (node, nodeList = []) => {
  if (node !== null) {
    nodeList.push(node)
    let children = node.children
    for (let i = 0; i < children.length; i++) {
      deepTraversal1(children[i], nodeList)
    }
  }
  return nodeList
}
let deepTraversal2 = (node) => {
    let nodes = []
    if (node !== null) {
      nodes.push(node)
      let children = node.children
      for (let i = 0; i < children.length; i++) {
        nodes = nodes.concat(deepTraversal2(children[i]))
      }
    }
    return nodes
  }
// 非递归
let deepTraversal3 = (node) => {
  let stack = []
  let nodes = []
  if (node) {
    stack.push(node)
    while (stack.length) {
      let item = stack.pop()
      nodes.push(item)
      let children = item.children
      for (let i = children.length - 1; i >= 0; i--) {
        stack.push(children[i])
      }
    }
  }
  return nodes
}
// 广度优先遍历
let widthTraversal = (node) => {
  let nodes = []
  let stack = []
  if (node) {
    stack.push(node)
    while (stack.length) {
      let item = stack.shift()
      nodes.push(item)
      let children = item.children
      for (let i = 0; i < children.length; i++) {
        stack.push(children[i])
      }
    }
  }
  return nodes
}

// 优点：稳定、用于链表
function bubbleSort(arr) {
  let len = arr.length;
  for (let i = len - 1; i >= 0; i--) {
    let flag = 0;
    for (let j = 0; j < i; j++) {
      if (arr[j] > arr[j+1]) {
        [arr[j], arr[j+1]] = [arr[j+1], arr[j]];
        flag = 1;
      }
    }
    if (!flag) break;
  }
  return arr;
}
// 优点： 稳定
function insertSort(arr) {
  const len = arr.length;
  for (let i = 1; i < len; i++) {
    const num = arr[i];
    for (var j = i; j > 0 && arr[j-1] > num; j--) arr[j] = arr[j-1];
    arr[j] = num;
  }
  return arr;
}
// 希尔排序：插入排序的优化，但不稳定
function shellSort(arr) {
  const len = arr.length;
  const Sedgewick = [929, 505, 209, 109, 41, 19, 5, 1, 0]; // Sedgewick一部分增量序列，另一种增量序列：Hibbard增量序列
  for (var d = 0; Sedgewick[d] >= len; d++);
  for (let i = Sedgewick[d]; i > 0; i = Sedgewick[++d]) {
    for (let j = i; j < len; j++) {
      const num = arr[j];
      for (var k = j; k > 0 && arr[k-i] > num; k-=i) arr[k] = arr[k-i];
      arr[k] = num;
    }
  }
  return arr;
}

function selectSort(arr) {
  let len = arr.length;
  for (let i = 0; i < len; i++) {
    let min = i;
    for (let j = i + 1; j < len; j++) {
      if (arr[j] < arr[min]) min = j;
    }
    if (min !== i) [arr[i], arr[min]] = [arr[min], arr[i]];
  }
  return arr;
}

function quickSort(arr) {
  if(arr.length <= 1) return arr;
  let pivot = arr.splice(0,1)[0];
  let left = [];
  let right = [];
  for (let i = 0; i < arr.length; i++) {
    arr[i] < pivot ? left.push(arr[i]) : right.push(arr[i])
  }
  return quickSort(left).concat([pivot],quickSort(right));
}
// node内置util.promisify实现
function promisify(fn) {
  return (...args) => {
    return new Promise((resolve, reject) => {
      args.push(function (err, ...args) {
        if (err) reject(err)
        else resolve(...args)
      })
      fn.apply(null, args)
    })
  }
}
// Promise.queue实现
function queue(promiseFns) {
  const len = promiseFns.length
  const arr = Array(len)
  let promiseFn = promiseFns[0]
  for (let i = 0; i < len; i++) {
    promiseFn = promiseFn.then(res => {
      arr[i] = res
      const next = promiseFns[i+1]
      return next ? next : Promise.resolve(arr)
    }, (err) => console.log(err))
  }
  return promiseFn
}

function queue2(fns) {
  const arr = []
  fns.reduce((acc, cur, i) => acc.then(res => arr.push(res) && fns[i+1]?.()), fns[0]())
  return Promise.resolve(arr)
}

var re = {
  qq: /[1-9][0-9]{4,9}/,
  email: /^\w+@[a-z0-9]+(\.[a-z]+){1,3}$/,
  phone: /^(\d{3,4}-)?\d{7,8}$|^1\d{2,10}$/,
  trim: /^\s*|\s*$/,         //行首行尾空格
  chinese: /[\u4e00-\u9fa5]/,    //匹配中文,最新写法： /\p{Unified_Ideograph}/u  u代表Unicode
  url: /[a-zA-z]+:\/\/[^\s]*/,   //网址
  postalcode: /[0-9]\d{5}/,    //邮编
  ID: /[1-9]\d{14}|[1-9]\d{17}|[1-9]\d{16}x/  //身份证号
}

function type(o) {
  let s = Object.prototype.toString.call(o);
  return s.slice(8, -1).toLowerCase();
}

function generateId() {
  return Math.random().toString(36).substring(2) + (new Date()).getTime().toString(36);
}

function addClass(element, value) {
  if (!element.className)  element.className = value;
  else element.className += '' + value;
}

function getStyle(obj, attr) {
  return obj.currentStyle ? obj.currentStyle[attr] : getComputedStyle(obj)[attr];
}

function getElementsByClassName(element, classname) {
  if (element.getElementsByClassName) {
    return element.getElementsByClassName(classname);
  } else {
    const elements = element.getElementsByTagName('*');
    const result = [];
    const names = classname.split(' ');
    for (let i = 0, el = elements.length; i < el; i++) {
      const getname = elements[i].className;
      let flag = true;
      for (let j = 0, nl = names.length; j < nl; j++) {
        if (getname.indexOf(names[j]) == -1) {
          flag = false;
          break;
        }
      }
      if (flag) {
        result.push(elements[i]);
      }
    }
    return result;
  }
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
  return x.toPrecision() + y.toPrecision()  //或toFixed(),返回都为字符串
}

/*function setcookie(key,value,date) {
  var oDate=new Date();
  oDate.setDate(oDate.getDate()+date);
  document.cookie=key+'='+value+';expires='+oDate.toGMTString();
}
function getcookie(key) {
  var arr1=document.cookie.split('; ');
  for (var i = 0; i < arr1.length; i++) {
    var arr2=arr1[i].split('=');
    if (arr2[0]==key) {
      return decodeURI(arr2[1]);
    }
  }
}
function removecookie(key) {
  setcookie(key,'',-1);
}*/
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
// 方法一：JSON.parse(JSON.stringify(obj))
function deepClone(obj) {
  if (obj === null || typeof obj !== 'object') {
    return obj;
  }
  var newobj = obj.push ? [] : {};
  for (var attr in obj) {
    newobj[attr] = deepClone(obj[attr]);
  }
  return newobj;
}



//-------ES6 自定义事件
class SubscribeEvent {
  constructor() {
    this.listeners = {}
  }
  subscribe(type, cb) {  //unSubscribe用了Function的name,所以cb不要写成匿名函数
    this.listeners[type] = this.listeners[type] || [];
    this.listeners[type].push(cb);
    this.listeners[type] = [...new Set(this.listeners[type])];
  }
  trigger(type) {
    if (!this.listeners[type]) return;
    this.listeners[type].forEach(e => e.call(this))
  }
  unSubscribe(type, cb) {
    this.listeners[type] = this.listeners[type].filter(e => e.name !== cb.name)//利用Function的name属性
  }
}

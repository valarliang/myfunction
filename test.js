(function (root) {
  var _ = function (obj) {
    if(!(this instanceof _)) return new _(obj);
    this.wrap = obj;
  }
  _.uniq = function (target, cb) {
    var result = [];
    var computed;
    for (let i = 0; i < target.length; i++) {
      computed = cb ? cb(target[i]) : target[i];
      if(result.indexOf(computed) === -1) result.push(computed);
    }
    return result;
  }
  _.reduce = function () {
    
  }
  _.each = function (arr, cb) {
    for (let i = 0; i < arr.length; i++) cb.call(arr, arr[i]);
  }
  _.functions = function (obj) {
    var result = [];
    for(var key in obj) result.push(key);
    return result;
  }
  _.mixin = function (obj) {
    _.each(_.functions(obj), function (key) {
      var func = obj[key];
      obj.prototype[key] = function () {
        var args = [this.wrap];
        Array.prototype.push.apply(args, arguments);
        return func.apply(this, args);
      }
    })
  }
  _.mixin(_);
  root._ = _; 
})(this);

_([1,2,3,4,2,3,4,'a','A']).uniq(function (val) {
  return typeof val === 'string' ? val.toLocaleLowerCase() : val;
});

const aa = {
  a:{
    b:{
      c:11
    }
  },
  get(id) {
    return id.split('.').reduce((next,item) => next[item],this);
  }
}
aa.get('a.b.c');

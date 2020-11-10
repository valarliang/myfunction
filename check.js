// this
var number = 5;
var obj = {
    number: 3,
    fn: (function () {
        var number;
        this.number *= 2;
        number = number * 2;
        number = 3;
        return function () {
            var num = this.number;
            this.number *= 2;
            console.log(num);
            number *= 3;
            console.log(number);
        }
    })()
}
var myFun = obj.fn;
myFun.call(null); // 10 9
obj.fn(); // 3 27
console.log(window.number); // 20

// 引用
var aa={n:1}
var b=aa;
aa.x=aa={n:2};
console.log(aa.x)
console.log(b.x)

class foo{
  a = 1
  static b = 2
  constructor() {
    this.c = 3
  }
  static fa() {
    this.c = 5
    console.log(this.a,this.b)
  }
  fb() {
    console.log(this.c, this.c)
  }
}
foo.prototype.fb()

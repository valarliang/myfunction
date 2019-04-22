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
myFun.call(null); //
obj.fn(); //
console.log(window.number); //

// 引用
var a={n:1}
var b=a;
a.x=a={n:2};
console.log(a.x) 
console.log(b.x)
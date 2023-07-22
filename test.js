// import assert from 'assert';
// import { deepClone } from './index.js';

// it("clone a object", () => {
//   let o1 = {a:1, b:{x:2}};
//   let o2 = deepClone(o1)
//   assert.equal(JSON.stringify(o1), JSON.stringify(o2));
//   assert.notEqual(o1, o2)
//   assert.notEqual(o1.b, o2.b)
// })

// it("clone a object with circular reference", () => {
//   let o1 = {a:1, b:{x:2}};
//   o1.c = o1;
//   let o2 = deepClone(o1)
//   assert.equal(o2.c, o2)
//   assert.notEqual(o1, o2)
//   assert.notEqual(o1.b, o2.b)
// })

// it("clone a object with prototype", () => {
//   function Cls() {
//     this.a = 1
//   }
//   Cls.prototype.b = 2
//   let o1 = new Cls;
//   let o2 = deepClone(o1)
//   assert.equal(o1.a, o2.a)
//   assert.equal(o1.b, o2.b)
//   assert(!o2.hasOwnProperty('b'))
// })

// it("clone a object with property with enumerable:false", () => {
//   let o1 = {}
//   Object.defineProperty(o1, 'a', {
//     value: 1,
//     enumerable: false,
//   })
//   let o2 = deepClone(o1)
//   for (let p in o2) assert(false)
// })

// it("clone a frozen object", () => {
//   let o1 = {a:1, b:{x:2}};
//   Object.freeze(o1)
//   let o2 = deepClone(o1)
//   assert(Object.isFrozen(o2))
// })

// it("clone a sealed object", () => {
//   let o1 = {a:1, b:{x:2}};
//   Object.seal(o1)
//   let o2 = deepClone(o1)
//   assert(Object.isSealed(o2))
// })

// it("clone a unextensiable object", () => {
//   let o1 = {a:1, b:{x:2}};
//   Object.preventExtensions(o1)
//   let o2 = deepClone(o1)
//   assert(!Object.isExtensible(o2))
// })
import assert from 'assert';
import { deepClone } from './index.js';

it("clone a object", () => {
  let o1 = {a:1, b:{x:2}};
  let o2 = deepClone(o1)
  assert.equal(JSON.stringify(o1), JSON.stringify(o2));
  assert.notEqual(o1, o2)
  assert.notEqual(o1.b, o2.b)
})
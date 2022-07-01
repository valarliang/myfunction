const PENDING = 'pending'
const FULFILLED = 'fulfilled'
const REJECTED = 'rejected'

/**
 * 依据Promises/A+ 规范 对resolve()、reject() 进行改造增强 针对resolve()和reject()中不同值情况 进行处理。
 * @param  {promise} promise2 promise1.then方法返回的新的promise对象
 * @param  {[type]} x         promise1中onFulfilled或onRejected的返回值
 * @param  {[type]} resolve   promise2的resolve方法
 * @param  {[type]} reject    promise2的reject方法
 */
function resolvePromiseWithAPlus(promise2, x, resolve, reject) {
  // 2.3.1规范 如果 promise 和 x 指向同一对象，以 TypeError 为据因拒绝执行 promise
  if (x === promise2) {
      return reject(new TypeError('Chaining cycle detected for promise'));
  }

  // 2.3.2规范 如果 x 为 Promise ，则使 promise2 接受 x 的状态
  if (x instanceof myPromise) {
      if (x.PromiseState === myPromise.PENDING) {
          /**
           * 2.3.2.1 如果 x 处于等待态， promise 需保持为等待态直至 x 被执行或拒绝
           *         注意"直至 x 被执行或拒绝"这句话，
           *         这句话的意思是：x 被执行x，如果执行的时候拿到一个y，还要继续解析y
           */
          x.then(y => {
              resolvePromiseWithAPlus(promise2, y, resolve, reject)
          }, reject);
      } else if (x.PromiseState === myPromise.FULFILLED) {
          // 2.3.2.2 如果 x 处于执行态，用相同的值执行 promise
          resolve(x.PromiseResult);
      } else if (x.PromiseState === myPromise.REJECTED) {
          // 2.3.2.3 如果 x 处于拒绝态，用相同的据因拒绝 promise
          reject(x.PromiseResult);
      }
  } else if ((x !== null && typeof x === 'object') || typeof x === 'function') {
      // 2.3.3 promise要有then方法
      try {
          var then = x.then;
      } catch (e) {
          // 2.3.3.2 如果取 x.then 的值时抛出错误 e ，则以 e 为据因拒绝 promise
          return reject(e);
      }

      /**
       * 2.3.3.3
       * 如果 then 是函数，将 x 作为函数的作用域 this 调用之。
       * 传递两个回调函数作为参数，
       * 第一个参数叫做 `resolvePromise` ，第二个参数叫做 `rejectPromise`
       */
      if (typeof then === 'function') {
          // 2.3.3.3.3 如果 resolvePromise 和 rejectPromise 均被调用，或者被同一参数调用了多次，则优先采用首次调用并忽略剩下的调用
          let called = false; // 避免多次调用
          try {
              then.call(
                  x,
                  // 2.3.3.3.1 如果 resolvePromise 以值 y 为参数被调用，则运行 [[Resolve]](promise, y)
                  y => {
                      if (called) return;
                      called = true;
                      resolvePromiseWithAPlus(promise2, y, resolve, reject);
                  },
                  // 2.3.3.3.2 如果 rejectPromise 以据因 r 为参数被调用，则以据因 r 拒绝 promise
                  r => {
                      if (called) return;
                      called = true;
                      reject(r);
                  }
              )
          } catch (e) {
              /**
               * 2.3.3.3.4 如果调用 then 方法抛出了异常 e
               * 2.3.3.3.4.1 如果 resolvePromise 或 rejectPromise 已经被调用，则忽略之
               */
              if (called) return;
              called = true;

              /**
               * 2.3.3.3.4.2 否则以 e 为据因拒绝 promise
               */
              reject(e);
          }
      } else {
          // 2.3.3.4 如果 then 不是函数，以 x 为参数执行 promise
          resolve(x);
      }
  } else {
      // 2.3.4 如果 x 不为对象或者函数，以 x 为参数执行 promise
      return resolve(x);
  }
}
function resolvePromise(x,resolve,reject) {
  try {
    x instanceof Promise
    ? x.then(y => resolvePromise(y,resolve,reject), reject) // 可能resolve的值还是Promise，要递归
    : resolve(x)
  } catch (err) {
    reject(err)
  }
}

class Promise {
  constructor(executor) {
    this.result = undefined
    this.status = PENDING
    this.onResolvedCallbacks = []
    this.onRejectedCallbacks = []
    const resolve = value => {
      if (value instanceof Promise) { // 处理resolve值为Promise的情况
        return value.then(resolve, reject)
      }
      if (this.status == PENDING) {
        this.status = FULFILLED
        this.result = value
        this.onResolvedCallbacks.forEach(fn => fn())
      }
    }
    const reject = reason => {
      if (this.status == PENDING) {
        this.status = REJECTED
        this.result = reason
        this.onRejectedCallbacks.forEach(fn => fn())
      }
    }
    try {
      executor(resolve, reject)
    } catch (error) {
      reject(error)
    }
  }
  then(onFulfilled, onRejected) {
    // 处理无参数情况
    onFulfilled = typeof onFulfilled == 'function' ? onFulfilled : data => data
    onRejected = typeof onRejected == 'function' ? onRejected : error => {throw error}
    return new Promise((resolve, reject) => {
      if (this.status == FULFILLED) {
        setTimeout(() => { // Promise要异步执行，可以使用 MutationObserver模拟微任务
          try {
            const x = onFulfilled(this.result)
            resolvePromise(x,resolve,reject) // resolvePromise函数：处理then回调函数返回值为Promise的情况(此处不考虑返回自己导致死循环的情况，所以没有传参自己)
          } catch (e) {
            reject(e)
          }
        })
      }
      if (this.status == REJECTED) {
        setTimeout(() => {
          try {
            const x = onRejected(this.result)
            resolvePromise(x,resolve,reject)
          } catch (e) {
            reject(e)
          }
        })
      }
      if (this.status == PENDING) {
        this.onResolvedCallbacks.push(() => {
          setTimeout(() => {
            try {
              const x = onFulfilled(this.result)
              resolvePromise(x,resolve,reject)
            } catch (e) {
              reject(e)
            }
          })
        })
        this.onRejectedCallbacks.push(() => {
          setTimeout(() => {
            try {
              const x = onRejected(this.result)
              resolvePromise(x,resolve,reject)
            } catch (e) {
              reject(e)
            }
          })
        })
      }
    })
  }
  catch(errCallback) {
    return this.then(null, errCallback)
  }
  finally(cb) {
    return this.then(y => {
      return Promise.resolve(cb()).then(() => y) // 处理finally返回Promise的情况
    },r => {
      return Promise.resolve(cb()).then(() => {throw r})
    })
  }
  static resolve(value) {
    return new Promise((resolve, reject) => {
      resolve(value)
    })
  }
  static reject(reason) {
    return new Promise((resolve, reject) => {
      reject(reason)
    })
  }
  static all(arr) {
    return new Promise((resolve, reject) => {
      const ret = []
      let index = 0 // 异步元素执行完成计数
      function process(key, value) {
        ret[key] = value
        if (++index == arr.length) resolve(ret)
      }

      for (let i = 0; i < arr.length; i++) {
        Promise.resolve(arr[i]).then(res => process(i, res), reject)
      }
    })
  }
  static allSettled(arr) {
    return new Promise((resolve, reject) => {
      const ret = []
      let index = 0 // 异步元素执行完成计数
      function process(key, value) {
        ret[key] = value
        if (++index == arr.length) resolve(ret)
      }

      for (let i = 0; i < arr.length; i++) {
        Promise.resolve(arr[i]).then(
          value => process(i, { status: 'fulfilled', value}),
          reason => process(i, { status: 'rejected', reason})
        )
      }
    })
  }
  static race(arr) {
    return new Promise((resolve, reject) => {
      for (let i = 0; i < arr.length; i++) {
        Promise.resolve(arr[i]).then(resolve,reject)
      }
    })
  }
}

// 测试
let p1 = new Promise((resolve,reject) => {
  setTimeout(() => {
    resolve(new Promise((res,rej) => {
      res('p1')
    }))
  },1000);
})
let p2 = new Promise((resolve,reject) => {
  setTimeout(() => {
    resolve('p2')
  },500);
})
p1.then(res => {
  console.log('then1',res)
  return new Promise((resolve,reject) => {
    setTimeout(() => {
      resolve(new Promise((res,rej) => {
        rej(321)
      }))
    }, 2000);
  })
})
.then(res => console.log('then2',res))
.catch(err => console.log('catch', err))
// 延迟对象
// function deferred() {
//   const dfd = {}
//   dfd.promise = new Promise((resolve, reject) => {
//     dfd.resolve = resolve
//     dfd.reject = reject
//   })
//   return dfd
// }
// function readFile(...args) {
//   const dfd = deferred()
//   fs.readFile(...args, (err, data) => {
//     err ? dfd.reject(err) : dfd.resolve(data)
//   })
//   return dfd.promise
// }
// readFile('a.txt', 'utf8').then(data => console.log(data))

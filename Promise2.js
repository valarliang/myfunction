const PENDING = 'pending'
const FULFILLED = 'fulfilled'
const REJECTED = 'rejected'

function resolvePromise(x,resolve,reject) {
  try {
    x instanceof sketchyPromise 
    ? x.then(y => resolvePromise(y,resolve,reject), reject) // 可能resolve的值还是Promise，要递归
    : resolve(x)
  } catch (err) {
    reject(err)
  }
}

class sketchyPromise {
  constructor(executor) {
    this.value = undefined
    this.reason = undefined
    this.status = PENDING
    this.onResolvedCallbacks = []
    this.onRejectedCallbacks = []
    const resolve = value => {
      if (value instanceof sketchyPromise) { // 处理resolve值为Promise的情况
        return value.then(resolve, reject)
      }
      if (this.status == PENDING) {
        this.status = FULFILLED
        this.value = value
        this.onResolvedCallbacks.forEach(fn => fn())
      }
    }
    const reject = reason => {
      if (this.status == PENDING) {
        this.status = REJECTED
        this.reason = reason
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
    onFulfilled = typeof onFulfilled == 'function' ? onFulfilled : data => data
    onRejected = typeof onRejected == 'function' ? onRejected : error => {throw error}
    return new sketchyPromise((resolve, reject) => {
      if (this.status == FULFILLED) {
        try {
          const x = onFulfilled(this.value)
          resolvePromise(x,resolve,reject) // resolvePromise函数：处理then回调函数返回值为Promise的情况(此处不考虑返回自己导致死循环的情况，所以没有套setTimeout()——通过异步得到自己)
        } catch (e) {
          reject(e)
        }
      }
      if (this.status == REJECTED) {
        try {
          const x = onRejected(this.reason)
          resolvePromise(x,resolve,reject)
        } catch (e) {
          reject(e)
        }
      }
      if (this.status == PENDING) {
        this.onResolvedCallbacks.push(() => {
          try {
            const x = onFulfilled(this.value)
            resolvePromise(x,resolve,reject)
          } catch (e) {
            reject(e)
          }
        })
        this.onRejectedCallbacks.push(() => {
          try {
            const x = onRejected(this.reason)
            resolvePromise(x,resolve,reject)
          } catch (e) {
            reject(e)
          }
        })
      }
    })
  }
  catch(errCallback) { 
    return this.then(null, errCallback)
  }
  finally(cb) {
    return this.then(y => {
      return sketchyPromise.resolve(cb()).then(() => y) // 处理finally返回Promise的情况
    },r => {
      return sketchyPromise.resolve(cb()).then(() => {throw r})
    })
  }
  static resolve(value) {
    return new sketchyPromise((resolve, reject) => {
      resolve(value)
    })
  }
  static reject(reason) {
    return new sketchyPromise((resolve, reject) => {
      reject(reason)
    })
  }
  static all(arr) {
    return new sketchyPromise((resolve, reject) => {
      const ret = []
      let index = 0 // 异步元素执行完成计数
      function process(key, value) {
        ret[key] = value
        if (++index == arr.length) resolve(ret)
      }

      for (let i = 0; i < arr.length; i++) {
        const item = arr[i]
        item instanceof sketchyPromise ? item.then(res => process(i, res), reject) : process(i, item)
      }
    })
  }
  static race(arr) {
    return new sketchyPromise((resolve, reject) => {
      for (let i = 0; i < arr.length; i++) {
        sketchyPromise.resolve(arr[i]).then(resolve,reject)
      }
    })
  }
}

// 测试
let p1 = new sketchyPromise((resolve,reject) => {
  setTimeout(() => {
    resolve(new sketchyPromise((res,rej) => {
      res('p1')
    }))
  },1000);
})
let p2 = new sketchyPromise((resolve,reject) => {
  setTimeout(() => {
    resolve('p2')
  },500);
})
p1.then(res => {
  console.log('then1',res)
  return new sketchyPromise((resolve,reject) => {
    setTimeout(() => {
      resolve(new sketchyPromise((res,rej) => {
        rej(321)
      }))
    }, 1000);
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
function MyPromise(fn) {
  this.status = 'pending'
  this.result = undefined
  this.thenCb = undefined
  this.catchCb = undefined

  const resolve = value => {
    if (this.status == 'pending') {
      this.status = 'fulfilled'
      this.result = value

      value instanceof MyPromise
      ? value.then(res => this.thenCb(res))  // 3.resolve()一个'fulfilled' Promise的本质：就是利用给定的Promise 来执行后面跟着的 then 里的函数
      : setTimeout(() => {
          this.thenCb && this.thenCb(value)  // 1.resolve()的本质：就是利用异步特性执行后面跟着的 then 里的函数
        })
    }
  }

  const reject = err => {
    if (this.status == 'pending') {
      this.status = 'rejected'
      this.result = err

      setTimeout(() => {
        if (this.catchCb) this.catchCb(err)    // 4.reject()的本质：就是利用异步特性执行后面跟着的 catch 里的函数
        else if (this.thenCb) this.thenCb(err) // 5.reject()没有执行后面then的本质：只是利用 then 链式地传递reject()，见68行
        else throw('this Promise was reject, but can not found catch!')
      })
    }
  }
  if (fn) {
    fn(resolve, reject)
  } else {
    throw('Init Error, Please use a function to init MyPromise!')
  }
}

MyPromise.prototype.then = function (cb) {
  return new MyPromise((resolve,reject) => {
    this.thenCb = res => {
      if (this.status == 'rejected') {
        reject(res)
      } else {
        const cbreturn = cb(res)
        cbreturn?.status == 'rejected' // 6.处理 then 的函数返回Promise情况：是'rejected'时注册catchCb，注意给reject作为参数以便执行后面跟着的 catch 里的函数；是'fulfilled'时直接交给resolve处理
        ? cbreturn.catch(reject)
        : resolve(cbreturn) // 2.链式 then 的本质：就是不断得模仿第一个 then 的行为，注意给上 resolve()的入参
      }
    }
  })
}
MyPromise.prototype.catch = function (cb) {
  return new MyPromise((resolve,reject) => {
    this.catchCb = err => {
      resolve(cb(err))
    }
  })
}
MyPromise.resolve = function (value) {
  return new MyPromise((resolve, reject) => {
    resolve(value)
  })
}
MyPromise.reject = function (err) {
  return new MyPromise((resolve, reject) => {
    reject(err)
  })
}
MyPromise.all = function (promiseArr) {
  return new MyPromise((resolve, reject) => {
    const len = promiseArr.length, resArr = []
    for (let i = 0; i < len; i++) {
      promiseArr[i].then(res => {
        resArr[i] = res
        promiseArr.every(e => e.status == 'fulfilled') && resolve(resArr)
      }).catch(reject)
    }
  })
}
MyPromise.race = function (promiseArr) {
  return new MyPromise((resolve, reject) => {
    const len = promiseArr.length
    for (let i = 0; i < len; i++) {
      promiseArr[i].then(resolve).catch(reject)
    }
  })
}

const mp1 = new MyPromise((resolve, reject) => {
  setTimeout(() => {
    console.log('mp1')
    resolve(123)
  }, 1000)
})
const mp2 = new MyPromise((resolve, reject) => {
  setTimeout(() => {
    console.log('mp2')
    resolve(321)
  }, 100)
})
MyPromise.all([mp1,mp2])
.then(res => {
  console.log('then1',res)
  return MyPromise.resolve(res)
}).then(res => console.log('then2',res))
.catch(err => console.log('catch',err))

// const p = new Promise((resolve, reject) => {
//   resolve(123)
// })
// p.then(() => Promise.resolve('rest'))
// .then(res => console.log('then',res))
// .catch(err => console.log('catch',err))
// .finally(res => console.log('finally',res))
// console.log(p)
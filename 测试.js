fetch('https://fetch.spec.whatwg.org/')
  .then(res => res.body)
  .then(async body => {
    const reader = body.getReader()
    // 1.使用while循环
    while(1) {
      const { value, done } = await reader.read()
      if (done) break
      console.log(value)
    }
    // 2.封装 Iterable接口配合 for-await-of
    const asyncIterable = {
      [Symbol.asyncIterator]() {
        return { next() { return reader.read() } }
      }
    }
    for await (chunk of asyncIterable) {
      console.log(chunk)
    }
  })
// 将异步逻辑封装到生成器函数中
async function* streamGenerator(stream) {
  const reader = stream.getReader()
  try {
    while(1) {
      const { value, done } = await reader.read()
      if (done) break
      yield value
    }
  } finally {
    reader.releaseLock() // 释放锁
  }
}
fetch('https://fetch.spec.whatwg.org/')
  .then(res => res.body)
  .then(async body => {
    for await (chunk of streamGenerator(body)) {
      console.log(chunk)
    }
  })


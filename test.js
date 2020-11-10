function abc() {
  return Promise.resolve(123)
}

abc().then((res) => console.log(res))

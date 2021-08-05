const VerifyPolicy = {
  isEmpty: function (value, errorMsg) {
      if (value == '') {
          return errorMsg;
      }
  },
  minLength: function (value, length, errorMsg) {
      console.log('a', value, length)
      if (value.length < length) {
          return errorMsg;
      }
  },
  isMobile: function (value, errorMsg) {
      if (!/(^1[3|5|8][0-9]{9}$)/.test(value)) {
          return errorMsg;
      }
  }
}
class FormValidation {
  constructor(verifyPolicy) {
    this.strategies = VerifyPolicy
    this.validationFns = []
  }
  add(value, rule, errMsg) {
    this.validationFns.push(() => {
      const ary = rule.split(':')
      const ruleName = ary[0]
      const arg = [value]
      if (ary[1]) arg.push(ary[1])
      arg.push(errMsg)
      return this.strategies[ruleName](...arg)
    })
  }
  start() {
    for (let i = 0; i < this.validationFns.length; i++) {
      const msg = this.validationFns[i]()
      if (msg) return msg
    }
  }
}

mounted() {
  const validation = new Formvalidation(VerifiPolicy);
  validation.add(value, 'isNoEmpty', '用户名不能为空');
  validation.add(value, 'minLength:6', '长度不能小于6个字符');
}
methods: {
  function valid() {
    var msg = validation.start()
    document.getElementById('msg').innerHTML = msg
  }
}

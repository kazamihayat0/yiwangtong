function _debounce(fn, delay) {
  let timer = null
  console.log(this)
  return function () {
    if (timer !== null)
      clearTimeout(timer)
    timer = setTimeout(() => {
      console.log(this)
      fn()
    }, delay);
  }
}
_debounce(function name(params) {
  console.log(10000)
}, 200)()

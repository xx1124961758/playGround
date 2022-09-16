function loader(code) {
  console.log('normal --- loader4')
  return `let code4 = 4;`;
}
loader.pitch = function() {
  console.log('loader4 -- pitch')
}
module.exports = loader
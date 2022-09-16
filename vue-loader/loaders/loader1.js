function loader(code) {
  console.log('normal --- loader1')
  return `let code1 = 1;`;
}
loader.pitch = function() {
  console.log('loader1 -- pitch')
}
module.exports = loader
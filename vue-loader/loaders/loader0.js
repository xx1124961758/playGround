function loader(code) {
  console.log('normal --- loader0')
  return `let code0 = 0;`;
}
loader.pitch = function() {
  console.log('loader0 -- pitch')
}
module.exports = loader
function loader(code) {
  console.log('normal --- loader2')
  return `let code2 = 2;`;
}
loader.pitch = function() {
  console.log('loader2 -- pitch')
}
module.exports = loader
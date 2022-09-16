function loader(code) {
  console.log('loader3 -- normal')
  return `let code3 = 3;`;
}

loader.pitch = function() {
  console.log('loader3 -- pitch')
}

module.exports = loader
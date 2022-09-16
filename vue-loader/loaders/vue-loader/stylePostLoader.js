const compiler = require('vue/compiler-sfc')
function stylePostLoader(source) {
  const loaderContext = this;
  const { resourceQuery} = loaderContext;
  const query = new URLSearchParams(resourceQuery.slice(1))
  const {code} = compiler.compileStyle({
    source,
    id: `data-v-${query.get('id')}`,
    scoped: !!query.get('scoped')
  })
  loaderContext.callback(null, code)
}

module.exports = stylePostLoader
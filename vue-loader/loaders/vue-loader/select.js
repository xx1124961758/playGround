const compiler = require('vue/compiler-sfc')
function selectBlock(descriptor, scopeId, loaderContext, query) {
  if (query.get('type') === 'script') {
    const script = compiler.compileScript(descriptor, { id: scopeId })
    loaderContext.callback(null, script.content);
    return;
  }

  if(query.get('type') === 'template') {
    const template =descriptor.template
    loaderContext.callback(null, template.content);
    return;
  }

  if(query.get('type') === 'style') {
    const styleEle =descriptor.styles[query.get('index')]
    loaderContext.callback(null, styleEle.content);
    return;
  }
}

exports.selectBlock = selectBlock
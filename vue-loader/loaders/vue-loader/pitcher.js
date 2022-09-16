const { stringifyRequest } = require("./utils");
const stylePostLoaderPath = require.resolve('./stylePostLoader')

const pitcher = code => code;

const isNotCur = loader => loader.path !== __filename;
const isCSSLoader = loader => /css-loader/.test(loader.path);
pitcher.pitch = function () {
  const loaderContext = this;
  const loaders = loaderContext.loaders.filter(isNotCur)
  const query = new URLSearchParams(loaderContext.resourceQuery.slice(1))
  console.log('pitcher', loaderContext.loaders, loaderContext.loaders[0].request)

  if(query.get('type') === 'style') {
    // 支持 scope

    const cssLoaderIndex = loaders.findIndex(isCSSLoader)
    return genProxyModule([...loaders.slice(0, cssLoaderIndex+1), {request: stylePostLoaderPath}, ...loaders.slice(cssLoaderIndex+1)], loaderContext)
  }

  return genProxyModule(loaders, loaderContext, query.get('type') !== 'template');
}


function genProxyModule(loaders, loaderContext, exportDefault=true) {
  const request = genRequest(loaders, loaderContext);
  return exportDefault ? `export { default } from ${request}`:`export * from ${request}`
}

function genRequest(loaders, loaderContext) {
  const loaderStrings = loaders.map(loader => loader.request);
  const resource = loaderContext.resourcePath + loaderContext.resourceQuery;

  return stringifyRequest(loaderContext, '!!' + [...loaderStrings, resource].join('!'))
}

module.exports = pitcher;
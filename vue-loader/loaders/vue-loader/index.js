const compiler = require('vue/compiler-sfc')
const { stringifyRequest } = require('./utils')
const VueLoaderPlugin = require('./plugin')
const hash = require('hash-sum')
const select = require('./select')

function VueLoader(source) {
  const loaderContext = this;
  const { resourcePath, resourceQuery } = loaderContext;
  const { descriptor } = compiler.parse(source);

  // 第三次进来
  const rawQuery = resourceQuery.slice(1);
  const incomingQuery = new URLSearchParams(rawQuery)
  const id = hash(resourcePath)
  if (incomingQuery.get('type')) {
    return select.selectBlock(descriptor, id, loaderContext, incomingQuery)
  }
  console.log('dd', this.loaders[0].request)

  const hasScoped = descriptor.styles.some(style => style.scoped)

  const code = []
  if (descriptor.script) {
    const query = `?vue&type=script&lang=js`;
    const stringifyRequestStr = stringifyRequest(loaderContext,
      resourcePath + query
    );

    console.log('vv', loaderContext.context)
    console.log(loaderContext.resource, loaderContext.resourcePath, loaderContext.resourceQuery, stringifyRequest)

    code.push(`import script from ${stringifyRequestStr};`)
  }

  if (descriptor.template) {
    const scopedQuery = hasScoped ? `&scoped=true` : ''
    const query = `?vue&type=template&id=${id}${scopedQuery}&lang=js`;
    const stringifyRequestStr = stringifyRequest(loaderContext,
      resourcePath + query
    );

    code.push(`import { render } from ${stringifyRequestStr};`)
    code.push(`script.render = render;`)
  }

  if (descriptor.styles.length !== 0) {

    descriptor.styles.forEach((style, index) => {
      const scopedQuery = style.scoped ? `&scoped=true` : ''
      const query = `?vue&type=style&id=${id}${scopedQuery}&index=${index}&lang=css`;
      const stringifyRequestStr = stringifyRequest(loaderContext,
        resourcePath + query
      );
      code.push(`import  ${stringifyRequestStr};`)
    })
  }

  if (hasScoped) {
    code.push(`script.__scopeId = "data-v-${id}";`)
  }


  code.push(`export default script;`)
  return code.join('\n');
}




VueLoader.VueLoaderPlugin = VueLoaderPlugin;

module.exports = VueLoader;

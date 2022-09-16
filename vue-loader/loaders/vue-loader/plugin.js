const path = require('path')

const ruleResource = (query, resource) => `${resource}.${query.get('lang')}`

class VueLoaderPlugin {
  constructor() { }
  apply(compiler) {

    const rules = compiler.options.module.rules;
    console.log('plugin', rules)

    const pitcher = {
      loader: path.resolve(__dirname, './pitcher'),
      resourceQuery: (query) => {
        if (!query) { return false }

        let parsed = new URLSearchParams(query)
        return parsed.get('vue') !== null;
      }
    }


    const templateCompilerRule = {
      loader: require.resolve('./templateLoader'),
      resourceQuery: (query) => {
        if (!query) { return false }

        let parsed = new URLSearchParams(query)
        return parsed.get('vue') !== null && parsed.get('type') === 'template';
      }
    }

    const cloneRules = rules.filter(rule => !'foo.vue'.match(rule.test)).map(cloneRule);

   

    compiler.options.module.rules = [
      pitcher,
      ...cloneRules,
      templateCompilerRule, // 必须放 cloneRules 后面，否则报 jsx错误
      ...rules
    ]
  }
}

function cloneRule(rule) {
  let currentResource;
  const result = Object.assign(Object.assign({}, rule), {
    resource(r) {
      currentResource = r;
      return true;
    },
    resourceQuery(query) {
      if (!query) {
        return false;
      }

      const parsed = new URLSearchParams(query.slice(1));
      if (parsed.get('vue') === null) {
        return false
      }

      const fakeResourcePath = ruleResource(parsed, currentResource)
      if (!fakeResourcePath.match(rule.test)) {
        return false;
      }

      return true
    }
  });
  delete result.test;
  return result;
}

module.exports = VueLoaderPlugin
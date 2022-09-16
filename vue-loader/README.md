context
const stringifyRequest = JSON.stringify(loaderContext.utils.contextify(
      loaderContext.context,
      resourcePath+resourceQuery
    ));

    2. 为什么加 stringify
    
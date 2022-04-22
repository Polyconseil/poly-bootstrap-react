const { getDotKeys, getFromDotKey } = require('./ast');

function checkMissing(sourceAST, resourcesAST, config) {
  let missingCount = 0;
  const lngs = config.lngs;
  const namespaces = [...config.ns, config.defaultNs];
  // Extract unique dotKeys from all sources namespaces
  let sourceDotKeys = [];
  Object.keys(sourceAST).forEach(sourceNs => {
    nsKeys = getDotKeys(sourceAST[sourceNs], config);
    sourceDotKeys = [...sourceDotKeys, ...nsKeys];
  });
  sourceDotKeys = Array.from(new Set(sourceDotKeys));

  sourceDotKeys.forEach(dotKey => {
    lngs.forEach(lng => {
      namespaces.forEach(ns => {
        const nsResource = resourcesAST[lng][ns] || {};
        const match = getFromDotKey(dotKey, nsResource, config);
        if (!match) {
          const files = getFromDotKey(dotKey, sourceAST[ns], config);
          console.warn(`Missing ${lng}/${ns}/${dotKey} used by ${files.join(', ')}`);
          missingCount++;
        }
      });
    });
  });

  return missingCount;
}

function checkUnused(sourceAST, resourcesAST, config) {
  let unusedCount = 0;
  const lngs = config.lngs;
  const namespaces = [...config.ns, config.defaultNs];
    
  lngs.forEach(lng => {
    namespaces.forEach(ns => {
      const nsResource = resourcesAST[lng][ns] || {};
      const dotResourceKeys = getDotKeys(nsResource, config);
      dotResourceKeys.forEach(dotKey => {
        const match = getFromDotKey(dotKey, sourceAST[ns], config);
        if (!match) {
          console.warn(`Unused ${lng}/${ns}/${dotKey}`);
          unusedCount++;
        }
      });
    });
  });
  return unusedCount;
}

module.exports = {
  checkMissing,
  checkUnused
}
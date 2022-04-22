function _consumeAstKeys(keys, astNode) {
  if (keys === undefined || keys.length === 0 || !astNode || Object.keys(astNode).length === 0) {
    return undefined;
  }

  const rootKey = keys[0];
  const childNode = astNode[rootKey];
  const childKeys = keys.slice(1);
  if (keys.length == 1) {
    return childNode;
  }
  return _consumeAstKeys(childKeys, childNode);
}

function _insertAstKeys(keys, astNode, value) {
  if (keys === undefined || keys.length === 0) {
    return {};
  }

  const rootKey = keys[0];
  const childNode = astNode[rootKey] || {};
  const childKeys = keys.slice(1);
  if (childKeys && childKeys.length > 0) {
    return {
      ...astNode,
      [rootKey]: _insertAstKeys(childKeys, childNode, value)
    };
  }
  const rootValue = astNode[rootKey] || [];  
  return { 
    ...astNode, 
    [rootKey]: [...rootValue, value]
  };
}

function getFromDotKey(dotKey, astNode, options = { keySeparator: '.' }) {
  const keys = dotKey.split(options.keySeparator);
  return _consumeAstKeys(keys, astNode);
}

function setFromDotKey(dotKey, astNode, value, options = { keySeparator: '.' }) {
  const keys = dotKey.split(options.keySeparator);
  return _insertAstKeys(keys, astNode, value);
}

function _consumeAstNode(astNode, sep) {
  let keys = [];
  for (const [key, value] of Object.entries(astNode)) {
    if (Array.isArray(value) || typeof value !== 'object') {
      keys.push(key);
    }
    else {
      const subKeys = _consumeAstNode(value, sep);
      subKeys.forEach(subKey => {
        keys.push([key, subKey].join(sep));
      });
    }
  }
  return keys;
}

function getDotKeys(astNode, options = { keySeparator: '.' }) {
  return _consumeAstNode(astNode, options.keySeparator);
}

module.exports = {
  getFromDotKey,
  setFromDotKey,
  getDotKeys,
};
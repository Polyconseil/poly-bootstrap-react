const fs = require('fs');
const path = require('path');
const Parser = require('i18next-scanner').Parser;
const { setFromDotKey } = require('./ast');

const matchFilesRecursive = (dir, fileExt) => {
  let files = [];
  fs.readdirSync(dir).forEach(file => {
    file = path.join(dir, file);
    let stat = fs.statSync(file);
    if (stat && stat.isDirectory()) {
      files = files.concat(matchFilesRecursive(file, fileExt));
    } else if (fileExt.some(ext => file.endsWith(ext))) {
      files.push(path.relative(process.cwd(), file));
    }
  });
  return files;
};


function scanSources(config, srcPath) {
  const parser = new Parser({...config, resource: {}});

  let sourceAstToFiles = {};
  const usageHandler = (file, key) => {
    const nsDotKey = key.split(parser.options.nsSeparator);
    const dotKey = nsDotKey.pop();
    let nsKey = parser.options.defaultNs;
    if (nsDotKey && nsDotKey.length) {
      nsKey = nsDotKey[0];
    }

    const nsAst = sourceAstToFiles[nsKey] || {};
    sourceAstToFiles = Object.assign(sourceAstToFiles, { [nsKey]: setFromDotKey(key, nsAst, file, config) });
    parser.set(key);
  };

  const funcFiles = matchFilesRecursive(srcPath, parser.options.func.extensions);
  funcFiles.forEach(file => {
    const content = fs.readFileSync(file, 'utf-8');
    parser.parseFuncFromString(content, parser.options, usageHandler.bind(this, file));
  });

  const transFiles = matchFilesRecursive(srcPath, parser.options.trans.extensions);
  const transRegex1 = new RegExp(`.*<${parser.options.trans.component}.*${parser.options.trans.i18nKey}=["|'].+["|'].*\/>.*`, "g");
  const transRegex2 = new RegExp(`.*(<${parser.options.trans.component}.*${parser.options.trans.i18nKey}=["|'].+["|'].*[^/]>[^]*<\/${parser.options.trans.component}>).*`, "g");
  transFiles.forEach(file => {
    const content = fs.readFileSync(file, 'utf-8');
    const transContents1 = content.match(transRegex1);
    if (transContents1) {
      transContents1.forEach(transContent => {
        parser.parseTransFromString(transContent, parser.options, usageHandler.bind(this, file));
      });
    }
    const transContents2 = content.match(transRegex2);
    if (transContents2) {
      transContents2.forEach(transContent => {
        parser.parseTransFromString(transContent, parser.options, usageHandler.bind(this, file));
      });
    }
  });

  const attrFiles = matchFilesRecursive(srcPath, parser.options.attr.extensions);
  attrFiles.forEach(file => {
    const content = fs.readFileSync(file, 'utf-8');
    parser.parseAttrFromString(content, parser.options, usageHandler.bind(this, file));
  });

  return sourceAstToFiles;
}

function scanResources(config) {
  const parser = new Parser(config);
  return parser.get();
}


module.exports = {
  scanSources,
  scanResources
};
#!/usr/bin/env node
'use strict';

const path = require('path'); 
const { ArgumentParser } = require('argparse');
const { scanSources, scanResources } = require('./scan');
const { checkMissing, checkUnused } = require('./diff');

function cli() {
  const parser = new ArgumentParser({
    description: 'i18next tool',
    add_help: true
  });
 
  parser.add_argument('-c', '--config', { 
    metavar: '<path>', 
    help: 'Path to the config file (default: i18next-scanner.config.js)',
    default: 'i18next-scanner.config.js'
  });
  parser.add_argument('-m', '--missing', { 
    help: 'Check for missing translations', 
    action: 'store_true'
  });
  parser.add_argument('-u', '--unused', {
    help: 'Check for unused translations',
    action: 'store_true'
  });
  parser.add_argument('-s', '--srcDir', {
    metavar: '<path>',
    help: 'Path to root sources directory (default: src)',
    default: 'src'
  });
  
  return parser.parse_args();
}

function formatCliPath(rawPath) {
  if (path.isAbsolute(rawPath))
    return rawPath;
  return path.resolve(path.join(process.cwd(), rawPath));
}
function loadCliConfig(argConfig) {
  const configPath = formatCliPath(argConfig);
  const config = require(configPath);
  return config;
}

if (require.main === module) {
  const args = cli();
  const config = loadCliConfig(args.config);
  const sourcesAST = scanSources(config, formatCliPath(args.srcDir));
  const resourcesAST = scanResources(config);

  let errors = 0;
  if (args.missing) {
    errors += checkMissing(sourcesAST, resourcesAST, config);
  }
  if (args.unused) {
    errors += checkUnused(sourcesAST, resourcesAST, config);
  }
  process.exit(errors !== 0);
}
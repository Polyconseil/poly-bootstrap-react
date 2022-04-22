module.exports = {
  debug: false, // verbose logging

  sort: false, // sort keys in alphabetical order

  attr: { // HTML attributes to parse
      list: ['data-i18n'],
      extensions: ['.html', '.htm']
  },

  func: { // function names to parse
      list: ['i18next.t', 'i18n.t', 't'],
      extensions: ['.js', '.jsx', '.ts', '.tsx']
  },

  trans: { // Trans component (https://github.com/i18next/react-i18next)
      component: 'Trans',
      i18nKey: 'i18nKey',
      defaultsKey: 'defaults',
      extensions: ['.js', '.jsx', '.ts', '.tsx'],
      fallbackKey: false,
      acorn: {
          ecmaVersion: 2020, // defaults to 2020
          sourceType: 'module', // defaults to 'module'
          // Check out https://github.com/acornjs/acorn/tree/master/acorn#interface for additional options
      }
  },

  lngs: ['fr'], // array of supported languages
  fallbackLng: 'fr', // language to lookup key if not found while calling `parser.get(key, { lng: '' })`

  ns: [], // string or array of namespaces

  defaultLng: 'fr', // default language used for checking default values

  defaultNs: 'translation', // default namespace used if not passed to translation function

  defaultValue: '', // default value used if not passed to `parser.set`

  // resource
  resource: {
      // The path where resources get loaded from. Relative to current working directory.
      loadPath: './src/locales/{{lng}}_{{ns}}.json',

      // The path to store resources. Relative to the path specified by `gulp.dest(path)`.
      savePath: 'tmp/{{lng}}/{{ns}}.json',

      // Specify the number of space characters to use as white space to insert into the output JSON string for readability purpose.
      jsonIndent: 2,

      // Normalize line endings to '\r\n', '\r', '\n', or 'auto' for the current operating system. Defaults to '\n'.
      // Aliases: 'CRLF', 'CR', 'LF', 'crlf', 'cr', 'lf'
      lineEnding: '\n'
  },

  keySeparator: '.', // char to separate keys
  nsSeparator: ':', // char to split namespace from key

  // Context Form
  context: true, // whether to add context form key
  contextFallback: true, // whether to add a fallback key as well as the context form key
  contextSeparator: '_', // char to split context from key
  contextDefaultValues: [], // list of values for dynamic values

  // Plural Form
  plural: true, // whether to add plural form key
  pluralFallback: true, // whether to add a fallback key as well as the plural form key
  pluralSeparator: '_', // char to split plural from key

  // interpolation options
  interpolation: {
      prefix: '{{', // prefix for interpolation
      suffix: '}}' // suffix for interpolation
  }
}

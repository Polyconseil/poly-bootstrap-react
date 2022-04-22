const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');

const baseEntryConfig = "./src/index.tsx";

const baseOutputConfig = {
  filename: "[name].[fullhash].bundle.js",
  path: path.resolve(__dirname, 'dist'),
  clean: true,
};

const baseResolveConfig = {
  extensions: [".ts", ".tsx", ".js"]
};

const baseModuleConfig = {
  rules: [
    { test: /\.tsx?$/, loader: "ts-loader" },
  ]
};

const devServerConfig = {
  static: {
    directory: path.resolve(__dirname, 'static'),
    publicPath: '/static'
  },
  client: {
    overlay: false,
  },
  historyApiFallback: true,
  compress: true,
  port: 9000,
};

const basePlugins = [
  new HtmlWebpackPlugin({ template: 'src/index.html' }),
];

const devPlugins = [
  ...basePlugins,
  new ESLintPlugin({ 
    failOnError: false, 
    context: path.resolve(__dirname, 'src'),
    extensions: ["js", "jsx", "ts", "tsx"]
  }),
];

const buildPlugins = [
  ...basePlugins,
  new CopyWebpackPlugin({
    patterns: [
      { 
        from: path.resolve(__dirname, 'static'),
        to: path.resolve(__dirname, 'dist', 'static') 
      }
    ]
  }),
];

const baseOptimizationConfig = {
  moduleIds: "named",
  chunkIds: "named",
  splitChunks: {
    chunks: 'all',
    cacheGroups: {
      vendors: {
        test: /[\\/]node_modules[\\/]/,
        name: 'vendors',
        enforce: true,
      },
      locales: {
        type: 'json',
        test: /[\\/]locales[\\/]/,
        name: 'locales',
        enforce: true,
      },
    },
  },
};

const buildOptimizationConfig = {
  ...baseOptimizationConfig,
  moduleIds: 'deterministic',
  chunkIds: 'deterministic',
  minimize: true,
  usedExports: true,
}

module.exports = [
  {
    name: "dev",
    mode: "development",
    devtool: "inline-source-map",
    entry: baseEntryConfig,
    output: baseOutputConfig,
    resolve: baseResolveConfig,
    module: baseModuleConfig,
    devServer: devServerConfig,
    plugins: devPlugins,
    optimization: baseOptimizationConfig,
  },
  {
    name: "build",
    mode: "production",
    devtool: "hidden-source-map",
    entry: baseEntryConfig,
    output: baseOutputConfig,
    resolve: baseResolveConfig,
    module: baseModuleConfig,
    plugins: buildPlugins,
    optimization: buildOptimizationConfig,
  }
];
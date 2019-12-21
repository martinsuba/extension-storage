const path = require('path');
const { argv } = require('yargs');

module.exports = (target) => {
  const babelLoader = {
    test: /\.ts|\.tsx$/,
    use: {
      loader: 'babel-loader',
      options: {
        presets: [
          '@babel/preset-env',
          '@babel/typescript',
        ],
        plugins: [
          '@babel/proposal-class-properties',
          '@babel/proposal-object-rest-spread',
        ],
      },
    },
    include: [
      path.resolve(__dirname, '../source'),
    ],
    exclude: [
      path.resolve(__dirname, '../node_modules'),
    ],
  };

  const config = {
    mode: argv.mode || 'development',
    entry: {
      index: '../source/index.ts',
    },
    context: path.resolve(__dirname, '../source'),
    devtool: argv.mode === 'production' ? 'none' : 'inline-source-map',
    node: {
      fs: 'empty',
    },
    output: {
      libraryTarget: 'umd',
      path: path.resolve(__dirname, '../dist'),
      filename: '[name].js',
    },
    resolve: {
      extensions: ['.ts', '.js', '.json'],
      modules: ['node_modules'],
    },
    module: {
      rules: [
        babelLoader,
      ],
    },
    target: 'web',
  };

  if (target === 'test') {
    babelLoader.use.options.plugins.push('istanbul');
  }

  return config;
};

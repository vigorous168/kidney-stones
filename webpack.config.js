const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// const CopyPlugin = require('copy-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

const REPO_NAME = 'kidney-stones';

module.exports = (env, argv) => {
  const isProd = argv.mode === 'production';

  return {
    entry: './src/index.tsx',
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: isProd ? 'js/[name].[8].js' : 'js/[name].js',
      publicPath: isProd ? `/${REPO_NAME}/` : '/',
      clean: true,
    },
    resolve: { extensions: ['.tsx', '.ts', '.js'] },
    devtool: isProd ? 'source-map' : 'eval-cheap-module-source-map',
    module: {
      rules: [
        { test: /\.[jt]sx?$/, exclude: /node_modules/, use: 'babel-loader' },
        {
          test: /\.css$/,
          use: [isProd ? MiniCssExtractPlugin.loader : 'style-loader', 'css-loader'],
        },
        {
          test: /\.(png|jpe?g|gif|svg|webp|avif)$/i,
          type: 'asset',
          parser: { dataUrlCondition: { maxSize: 8 * 1024 } },
          generator: { filename: 'images/[name].[8][ext]' },
        },
        {
          test: /\.(woff2?|ttf|eot)$/i,
          type: 'asset/resource',
          generator: { filename: 'fonts/[name].[8][ext]' },
        },
        { test: /\.md$/, type: 'asset/source' },
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({ template: './src/index.html' }),
      // new CopyPlugin({ patterns: [{ from: 'public', to: '.' }] }),
      new ForkTsCheckerWebpackPlugin(),
      ...(isProd
        ? [new MiniCssExtractPlugin({ filename: 'css/[name].[8].css' })]
        : []),
    ],
    devServer: {
      port: 3000,
      hot: true,
      open: true,
      historyApiFallback: true,
    },
    performance: { hints: isProd ? 'warning' : false },
  };
};

var _defineProperty = require("@babel/runtime/helpers/defineProperty").default;
var _objectSpread = require("@babel/runtime/helpers/objectSpread2").default;
var _toConsumableArray = require("@babel/runtime/helpers/toConsumableArray").default;
var fs = require('fs-extra');
var path = require('path');
var webpack = require('webpack');
var TerserPlugin = require('terser-webpack-plugin');
var nodeExternals = require('webpack-node-externals');
var AssetsPlugin = require('assets-webpack-plugin');
var StartServerPlugin = require('start-server-webpack-plugin');
var MiniCssExtractPlugin = require('mini-css-extract-plugin');
var safePostCssParser = require('postcss-safe-parser');
var OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
var paths = require('./paths');
var runPlugin = require('./plugin');
var clientEnvironment = require('./env').clientEnvironment;
var errorOverlayMiddleware = require('react-dev-utils/errorOverlayMiddleware');
var WebpackBar = require('webpackbar');
var ManifestPlugin = require('webpack-manifest-plugin');
var modules = require('./modules');
var chalk = require('chalk');
var logging = require('webpack/lib/logging/runtime');

module.exports = function () {
  var target = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'web';
  var env = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'dev';
  var _ref = arguments.length > 2 ? arguments[2] : undefined,
      _ref$clearConsole = _ref.clearConsole,
      clearConsole = _ref$clearConsole === void 0 ? true : _ref$clearConsole,
      _ref$host = _ref.host,
      host = _ref$host === void 0 ? 'localhost' : _ref$host,
      _ref$port = _ref.port,
      port = _ref$port === void 0 ? 3000 : _ref$port,
      plugins = _ref.plugins,
      modifybabelConfiguration = _ref.modifybabelConfiguration;

  var webpackObject = arguments.length > 3 ? arguments[3] : undefined;
  var useOnlyForClient = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
  var installedPlugins = [];
  var nessPlugins = (plugins !== undefined)? plugins : {};
  // Define some useful shorthands.
  var IS_NODE = target === 'node';
  var IS_WEB = target === 'web';
  var IS_PRODUCTION = env === 'prod';
  var IS_DEVELOPMENT = env === 'dev';

  IS_WEB? console.warn = console.error = () => {} : console.warn = console.error = console.log;

  process.env.NODE_ENV = IS_PRODUCTION ? 'production' : 'development';
  var hasBabelRc = fs.existsSync(paths.babelConfigPath);
  var mainbabelConfiguration = {
    babelrc: true,
    cacheDirectory: true,
    presets: []
  };
  if (!hasBabelRc) mainbabelConfiguration.presets.push(require.resolve('../babel'));
  var babelConfiguration = modifybabelConfiguration ? modifybabelConfiguration(mainbabelConfiguration, {
    target: target,
    dev: IS_DEVELOPMENT
  }) : mainbabelConfiguration;
  if (hasBabelRc && babelConfiguration.babelrc) console.log('Using .babelrc defined in your application root directory');
  var dotenv = clientEnvironment(target, {
    clearConsole: clearConsole,
    host: host,
    port: port
  });
  var portOffset = useOnlyForClient ? 0 : 1;
  var devServerPort = process.env.PORT && parseInt(process.env.PORT) + portOffset || 3000 + portOffset;
  var clientPublicPath = dotenv.raw.CLIENT_PUBLIC_PATH || (IS_DEVELOPMENT ? "http://".concat(dotenv.raw.HOST, ":").concat(devServerPort, "/") : '/');
  const devMode = process.env.NODE_ENV !== 'production';

  var config = {
    mode: IS_DEVELOPMENT ? 'development' : 'production',
    context: process.cwd(),
    target: target,
    devtool: IS_DEVELOPMENT ? 'cheap-module-source-map' : 'source-map',
    resolve: {
      modules: ['node_modules', paths.nodeModulesDirectory].concat(modules.additionalModulePaths || []),
      extensions: ['.mjs', '.js', '.jsx', '.json', '.tsx', '.ts'],
      alias: {
        'webpack/hot/poll': require.resolve('webpack/hot/poll'),
        'react-native': 'react-native-web'
      }
    },
    resolveLoader: {
      modules: [paths.nodeModulesDirectory, paths.ownNodeModules]
    },
    module: {
      strictExportPresence: true,
      rules: [{
        test: /\.mjs$/,
        include: /node_modules/,
        type: 'javascript/auto'
      }, {
        test: /\.(js|jsx|mjs)$/,
        include: [paths.applicationSource],
        use: [{
          loader: require.resolve('babel-loader'),
          options: babelConfiguration
        }]
      }, {
        exclude: [/\.html$/, /\.(js|jsx|mjs)$/, /\.(ts|tsx)$/, /\.(vue)$/, /\.(less)$/, /\.(re)$/, /\.(s?css|sass)$/, /\.json$/, /\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
        loader: require.resolve('file-loader'),
        options: {
          name: 'static/media/[name].[hash:8].[ext]',
          emitFile: IS_WEB
        }
      }, {
        test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
        loader: require.resolve('url-loader'),
        options: {
          limit: 10000,
          name: 'static/media/[name].[hash:8].[ext]',
          emitFile: IS_WEB
        }
      }, {
        test: /\.s[ac]ss$/i,
        use: IS_WEB? [
          devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
          // Creates `style` nodes from JS strings
          // "style-loader",
          // Compiles Sass to CSS
          "css-loader",
          // Translates CSS into CommonJS
          { 
            loader: 'postcss-loader', 
          },
          "sass-loader",
        ] : [
          // Creates `style` nodes from JS strings
          {
            loader: require.resolve('url-loader'),
            options: {
              limit: 10000,
              name: 'static/media/[name].[hash:8].[ext]',
              emitFile: IS_WEB
            }
          },
          // Compiles Sass to CSS
          "sass-loader",
        ]
      }, {
        test: /\.css$/i,
        use: [
          'style-loader',
          'css-loader',
        ]
      }
    ]
    }
  };

  if (IS_NODE) {
    config.node = {
      __console: false,
      __dirname: false,
      __filename: false
    };
    config.externals = [nodeExternals({
      whitelist: [IS_DEVELOPMENT ? 'webpack/hot/poll?300' : null, /\.(eot|woff|woff2|ttf|otf)$/, /\.(svg|png|jpg|jpeg|gif|ico)$/, /\.(mp4|mp3|ogg|swf|webp)$/, /\.(css|scss|sass|sss|less)$/].filter(function (x) {
        return x;
      })
    })];

    config.output = {
      path: paths.appdeploy,
      publicPath: clientPublicPath,
      filename: 'server.js',
      libraryTarget: 'commonjs2'
    };
    const HtmlWebpackPlugin = require('html-webpack-plugin') 
    config.plugins = [new webpack.DefinePlugin(dotenv.stringified), new HtmlWebpackPlugin()];
    if (IS_PRODUCTION) config.plugins.push(new webpack.optimize.LimitChunkCountPlugin({
      maxChunks: 1
    }));
    config.entry = [paths.serverEntry];

    if (IS_DEVELOPMENT) {
      config.watch = true;
      config.entry.unshift('webpack/hot/poll?300');
      config.entry.unshift(path.join(__dirname, '..', 'utils/nodeErrors.js'));

      var nodeArgs = ['-r', 'source-map-support/register'];

      config.plugins = [].concat(_toConsumableArray(config.plugins), [new webpack.HotModuleReplacementPlugin(), new StartServerPlugin({
        name: 'server.js',
        nodeArgs: nodeArgs
      }), new webpack.WatchIgnorePlugin([paths.assets, paths.chunks])]);
    }
  }

  if (IS_WEB) {
    config.plugins = [new AssetsPlugin({
      path: paths.appdeploy,
      filename: 'assets.json'
    }), new ManifestPlugin({
      fileName: path.join(paths.appdeploy, 'chunks.json'),
      writeToFileEmit: true,
      filter: function filter(item) {
        return item.isChunk;
      },
      generate: function generate(seed, files) {
        var entrypoints = new Set();
        files.forEach(function (file) {
          return ((file.chunk || {})._groups || []).forEach(function (group) {
            return entrypoints.add(group);
          });
        });

        var entries = _toConsumableArray(entrypoints);

        var entryArrayManifest = entries.reduce(function (acc, entry) {
          var _ref2;

          var name = (entry.options || {}).name || (entry.runtimeChunk || {}).name;

          var files = (_ref2 = []).concat.apply(_ref2, _toConsumableArray((entry.chunks || []).map(function (chunk) {
            return chunk.files.map(function (path) {
              return config.output.publicPath + path;
            });
          }))).filter(Boolean);

          var cssFiles = files.map(function (item) {
            return item.indexOf('.css') !== -1 ? item : null;
          }).filter(Boolean);
          var scssFiles = files.map(function (item) {
            return item.indexOf('.scss') !== -1 ? item : null;
          }).filter(Boolean);
          var jsFiles = files.map(function (item) {
            return item.indexOf('.js') !== -1 ? item : null;
          }).filter(Boolean);
          return name ? _objectSpread(_objectSpread({}, acc), {}, _defineProperty({}, name, {
            scss: scssFiles,
            css: cssFiles,
            js: jsFiles,
          })) : acc;
        }, seed);
        return entryArrayManifest;
      }
    })];

    if (IS_DEVELOPMENT) {
      config.infrastructureLogging = {
        level: 'error'
      };
      config.entry = {
        client: [require.resolve('../utils/webpackClient'), paths.clientIndex]
      };
      config.output = {
        path: paths.appdeployPublic,
        publicPath: clientPublicPath,
        pathinfo: true,
        libraryTarget: 'var',
        filename: 'static/js/bundle.js',
        chunkFilename: 'static/js/[name].chunk.js',
        devtoolModuleFilenameTemplate: function devtoolModuleFilenameTemplate(info) {
          return path.resolve(info.resourcePath).replace(/\\/g, '/');
        }
      };
      config.performance = {
        hints: false
      }

      config.devServer = {
        // noInfo: true,
        disableHostCheck: true,
        compress: true,
        headers: {
          'Access-Control-Allow-Origin': '*'
        },
        // historyApiFallback: {disableDotRule: true},
        host: dotenv.raw.HOST,
        hotOnly: true,
        overlay: true,
        port: devServerPort,
        // historyApiFallback: true,
        watchOptions: {
          ignored: /node_modules/
        },
        stats: {
          warnings: false,
          errors: false
        },
        // stats: {
        //   all: false,
        //   minimal: false,
        //   assets: false,
        //   colors: false,
        //   version: false,
        //   hash: false,
        //   timings: false,
        //   chunks: false,
        //   chunkModules: false
        // },
        logLevel: 'silent',
        before: function before(app) {
          app.use(errorOverlayMiddleware());
        }
      };
      config.plugins = [].concat(_toConsumableArray(config.plugins), [new webpack.HotModuleReplacementPlugin({
        multiStep: !useOnlyForClient
      }), new webpack.DefinePlugin(dotenv.stringified)]);
      config.optimization = {};
    } else {
      config.entry = {
        client: [paths.clientIndex]
      };
      config.output = {
        path: paths.appdeployPublic,
        publicPath: dotenv.raw.PUBLIC_PATH || '/',
        filename: 'static/js/bundle.[chunkhash:8].js',
        chunkFilename: 'static/js/[name].[chunkhash:8].chunk.js',
        libraryTarget: 'var' // quiet: true,
        // stats: 'none',
        // noInfo: true,
        // historyApiFallback: true,

      };
      config.plugins = [].concat(_toConsumableArray(config.plugins), [new webpack.DefinePlugin(dotenv.stringified), new MiniCssExtractPlugin({
        filename: 'static/css/bundle.[contenthash:8].css',
        chunkFilename: 'static/css/[name].[contenthash:8].chunk.css'
      }), new webpack.HashedModuleIdsPlugin(), new webpack.optimize.AggressiveMergingPlugin()]);
      config.optimization = {
        minimize: true,
        minimizer: [new TerserPlugin({
          terserOptions: {
            parse: {
              ecma: 8
            },
            compress: {
              ecma: 5,
              warnings: false,
              comparisons: false,
              inline: 2,
              drop_console: true
            },
            mangle: {
              safari10: true
            },
            output: {
              ecma: 5,
              comments: false,
              ascii_only: true
            }
          },
          sourceMap: true
        }), new OptimizeCSSAssetsPlugin({
          cssProcessorOptions: {
            parser: safePostCssParser,
            map: {
              inline: false,
              annotation: true
            }
          }
        })]
      };
    }

    if (useOnlyForClient) {
      if (IS_DEVELOPMENT) {
        config.devServer.contentBase = paths.publicDirectory;
        config.devServer.watchContentBase = true;
        config.devServer.publicPath = '/';
      }

      config.plugins = [].concat(_toConsumableArray(config.plugins), [new HtmlWebpackPlugin(Object.assign({}, {
        inject: true,
        template: paths.appTemplate
      }, IS_PRODUCTION ? {
        minify: {
          removeComments: true,
          collapseWhitespace: true,
          removeRedundantAttributes: true,
          useShortDoctype: true,
          removeEmptyAttributes: true,
          removeStyleLinkTypeAttributes: true,
          keepClosingSlash: true,
          minifyJS: true,
          minifyCSS: true,
          minifyURLs: true
        }
      } : {}))]);
    }
  }

  logging.configureDefaultLogger({
    level: 'error',
  });

  if (!IS_WEB) config.plugins = [].concat(_toConsumableArray(config.plugins));
  if (IS_DEVELOPMENT) config.plugins = [].concat(_toConsumableArray(config.plugins), [new WebpackBar({
    color: target === 'web' ? '#5590CB' : '#5590CB',
    name: target === 'web' ? 'client side' : 'server side',
    reporter: {
      start(context) {
        var clearConsole = require('react-dev-utils/clearConsole');
        clearConsole();
        if (target === 'web') {
          if (context.state.hasErrors) {
            console.log(chalk.bgRed.bold(' ERROR '), chalk.red(`Compiles failed: \n ${context.state.message}`));
          } else {
            console.log(chalk.bgBlue.bold(' INFO '), chalk.blue('Running ness application...'));
          }
        }
      },
      change(context) {
        var clearConsole = require('react-dev-utils/clearConsole');
        clearConsole();
        if (target !== 'web') {
          console.log(chalk.bgBlue.bold(' INFO '), chalk.blue('Recompiling ness application...'));
        }

        if (context.state.hasErrors) {
          console.log(chalk.bgRed.bold(' ERROR '), chalk.red(`Compiles failed: \n ${context.state.message}`));
        }
      },
      afterAllDone(context) {
        const { networkInterfaces } = require('os');
        const nets = networkInterfaces();
        const port = 3000;
        const results = Object.create(null);

        // retrieve networkInterfaces
        for (const name of Object.keys(nets)) {
          for (const net of nets[name]) {
            const familyV4Value = typeof net.family === 'string' ? 'IPv4' : 4
            if (net.family === familyV4Value && !net.internal) {
              if (!results[name]) results[name] = [];
              results[name].push(net.address);
            }
          }
        }
        console.log(chalk.bgBlue.bold(' SUCCESS '), `🌱 NessApp started on: ${chalk.hex('#5590CB').bold('http://localhost:' + process.env.PORT || port)} and ${chalk.hex('#5590CB').bold('http://' + results['en0'] instanceof Object?results['en0'] [0] : 'http://localhost' + ':' + process.env.PORT || port)}`);
      },
     }
  })]);

  if (typeof plugins === 'object' && plugins.length > 0) {
    plugins.forEach(function (plugin) {
      if (installedPlugins[typeof plugin === 'string'? plugin : plugin.name] === undefined) {
        const plg = runPlugin(plugin);
        config = plg.install(config, { target: target, dev: IS_DEVELOPMENT, ...plugin });
        // mark as installed
        installedPlugins.push(typeof plugin === 'string'? plugin : plugin.name);
      }
    });
  }

  return config;
};
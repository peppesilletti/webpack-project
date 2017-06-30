const ExtractTextPlugin = require('extract-text-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const webpack           = require('webpack')
const path              = require('path')

const __DEV__ = (process.env.NODE_ENV !== 'production')
console.log(`Compiling in ${process.env.NODE_ENV || 'development'} mode`)

const VENDOR_LIBS = [
	'react',
	'react-dom',
	'react-router',
	'react-router-dom',
	'redux',
	'react-redux',
	'redux-thunk',
	'underscore',
	'react-hot-loader'
]

const APP_ENTRY = './src/client/main.js'

// Css loader options
const cssLoaderOptions = {
	sourceMap: true,

	minimize: {
		autoprefixer: {
			add: true,
			remove: true,
			browsers: ['last 2 versions'],
		},

		discardComments: {
			removeAll : true,
		},

		discardUnused: false,
		mergeIdents: false,
		reduceIdents: false,
		safe: true,
		sourcemap: true
	}
}

// Webpack configuration
webpackConfig = {

	devtool: (__DEV__) ? "cheap-eval-source-map" : "eval-source-map",

	entry: {
		bundle : (__DEV__)
			? [APP_ENTRY].concat('webpack-hot-middleware/client?path=/__webpack_hmr')
			: [APP_ENTRY],
		vendor: VENDOR_LIBS
	},

	output: {
		path: path.join(__dirname, 'dist'),
		filename: (__DEV__) ? "[name].js" : "[name].[chunkhash].js",
		chunkFilename: (__DEV__) ? "[name].js" : "[name].[chunkhash].js"
	},

	module: {
		rules: [
			{
				test: /\.js$/,
				use: ['babel-loader'],
				exclude: /node_modules/
			},

			{
				test: /\.css$/,
				use: !(__DEV__)
					? ExtractTextPlugin.extract({
						fallback: 'style-loader',
						use: [{
							loader: 'css-loader',
							options: cssLoaderOptions
						}]
					})
					: [ 'style-loader', 'css-loader' ]
			},

			{
				test: /\.(jpe?g|png|gif)$/,
				use: [
					{
						loader: 'url-loader',
						options: { limit: 40000 }
					},
					'image-webpack-loader'
				]
			},

			{
				test: /\.(ttf|eot|woff|woff2|svg)$/,
				loader: 'file-loader',
				options: {
					name: 'fonts/[name].[ext]',
					limit: 40000
				}
			}
		]
	},

	plugins: [
		new webpack.NoEmitOnErrorsPlugin(),
		new webpack.NamedModulesPlugin(),

		new CopyWebpackPlugin([{ from: 'assets/'}]),

		new webpack.optimize.CommonsChunkPlugin({ // add duplicate modules only to the vendor.js bundle
			names: ['vendor', 'manifest']
		}),

		new HtmlWebpackPlugin({
			template: 'src/client/index.html',
			filename: 'index.html',
			minify: {
				collapseWhitespace: true
			}
		}),

		new webpack.DefinePlugin({ // Used to define windows variables
			'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
		}),

		new webpack.optimize.UglifyJsPlugin({
			sourceMap: true,
			comments: false,
			compress: {
				warnings: false,
				screw_ie8: true,
				conditionals: true,
				unused: true,
				comparisons: true,
				sequences: true,
				dead_code: true,
				evaluate: true,
				if_return: true,
				join_vars: true,
			},
		}),

		// new (require('webpack-bundle-analyzer').BundleAnalyzerPlugin)()
	]
}

// Add HMR if in development mode
if (__DEV__)
	webpackConfig.plugins.push(new webpack.HotModuleReplacementPlugin())

module.exports = webpackConfig

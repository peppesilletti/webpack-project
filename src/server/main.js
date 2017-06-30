const express = require('express')
const debug   = require('debug')('server')
const config  = require('config')
const path    = require('path')

const app = express()

if (process.env.NODE_ENV !== 'production') {
	const webpackHotMiddleware = require('webpack-hot-middleware')
	const webpackMiddleware    = require('webpack-dev-middleware')
	const webpackConfig        = require('../../webpack.config.js')
	const webpack              = require('webpack')

	const compiler = webpack(webpackConfig)

	// Middlewares for webpack
	debug('Enabling webpack dev and HMR middlewares...')
	app.use(webpackMiddleware(compiler, {
		hot: true,
		stats: {
			colors: true,
			chunks: false,
			chunksModules: false
		},
		historyApiFallback: true
	}))

	app.use(webpackHotMiddleware(compiler, { path: '/__webpack_hmr' }))

	app.use('*', (req, res, next) => {
		const filename = path.join(compiler.outputPath, 'index.html')
		compiler.outputFileSystem.readFile(filename, (err, result) => {
			if (err)
				return next(err)
			res.set('content-type', 'text/html')
			res.send(result)
			res.end()
		})
	})
}

else {
	app.use(express.static('dist'))
	app.get('*', (req, res) => res.sendFile(path.join(__dirname, 'dist/index.html')))
}

const port = config.server.port
app.listen(process.env.PORT || port, () => console.log(`Server listening on port ${port}`))

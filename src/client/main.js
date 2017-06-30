import 'react-hot-loader/patch'

import React    from 'react'
import ReactDOM from 'react-dom'
import { AppContainer }         from 'react-hot-loader'

import App from './components/App'

import getRoutes from './routes'

// ========================================================
// Render Setup
// ========================================================
const render = () => {
	ReactDOM.render(
		<AppContainer>
			<App getRoutes={getRoutes} />
		</AppContainer>,
		document.getElementById('root')
	)
}

render()

// Hot Module Replacement API
if (module.hot) {
	module.hot.accept()
}

import React, { Component } from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import { Provider } from 'react-redux'

import CoreLayout from './core_layout'

import createStore from '../store/createStore'

// ========================================================
// Store Instantiation
// ========================================================
const initialState = window.__INITIAL_STATE__
const store = createStore(initialState)

class App extends Component {

	render() {
		const routes = this.props.getRoutes(store)

		return (
			<Provider store={store}>
				<BrowserRouter>
					<CoreLayout children={
							routes.map((route, index) => (
								<Route
									key={index}
									path={route.path}
									exact={route.exact}
									component={route.component}
								/>
							))
						}
					/>
				</BrowserRouter>
			</Provider>
		)
	}
}

export default App

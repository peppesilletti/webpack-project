import React from 'react'

import Loader from '../loader'
import loadtest from 'bundle-loader?lazy&name=test!./components/test'

export default (store) => { // Use the store to inject reducers asyncronously TODO write example

	const Loading = () => {
		return <div>Loading...</div>
	}

	const TestRoute = () => (
		<Loader load={loadtest}>
			{ (Comp) => Comp ? <Comp/> : <Loading /> }
		</Loader>
	)

	const route = {
		path: '/test',
		exact: true,
		component: TestRoute
	}

	return route
}

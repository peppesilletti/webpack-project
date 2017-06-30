import React from 'react'

import Homepage from './components/homepage'

const HomepageRoute = () => <Homepage />

const route = {
	path: '/',
	exact: true,
	component: HomepageRoute
}

export default route

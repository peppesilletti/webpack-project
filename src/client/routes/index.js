import React from 'react'

import HomepageRoute from './homepage'
import TestRoute     from './test'

export default (store) => { // The stored is passed to eventually inject reducers asyncronously
	return [
		TestRoute(store),
		HomepageRoute // This will be loaded syncronously
	]
}

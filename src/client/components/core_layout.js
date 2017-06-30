import React from 'react'

import Navbar from './navbar'

const CoreLayout = ({ children }) => {

	return(
		<div>
			<Navbar />
			<div>{ children }</div>

		</div>
	)
}

export default CoreLayout

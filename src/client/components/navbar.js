import React from 'react'
import { NavLink } from 'react-router-dom'

const Navbar = () => {
	return(
		<nav style={{ "width": "100%", "background-color": 'grey' }}>
			<button><NavLink to="/">Go To Home Route</NavLink></button>
			<button><NavLink to="/test">Go To Test Route</NavLink></button>
			<span><strong>THIS NAVBAR CAN BE CHANGED WITH WATHEVER YOU LIKE FOR NAVIGATION</strong></span>
		</nav>
	)
}

export default Navbar

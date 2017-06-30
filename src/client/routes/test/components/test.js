import React from 'react'
import { connect } from 'react-redux'

import { sayHola, sayCiao } from '../actions'

const Test = (props) => {

	const onHolaClick = () => {
		props.sayHola('Hola!')
	}

	const onCiaoClick = () => {
		props.sayCiao('Ciao!')
	}

	return (
		<div>
			{ props.greetings }! I'M TEST!
			<div>
				<button onClick={onHolaClick}>Say hola!</button>
				<button onClick={onCiaoClick}>Say ciao!</button>
			</div>
		</div>
	)
}

const mapStateToProps = (state) => {
	return {
		greetings: state.greetings
	}
}

export default connect(mapStateToProps, { sayHola, sayCiao })(Test)

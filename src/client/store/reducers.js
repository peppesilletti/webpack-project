import { combineReducers } from 'redux'
import { extend } from 'underscore'

import greetingsReducer from '../routes/test/reducers/greetings_reducer'

export const makeRootReducer = (asyncReducers) => {
	return combineReducers(
		extend(
			{	greetings: greetingsReducer },
			asyncReducers
		)
	)
}

export const injectReducer = (store, { key, reducer }) => {
	if (Object.hasOwnProperty.call(store.asyncReducers, key)) return

	store.asyncReducers[key] = reducer
	store.replaceReducer(makeRootReducer(store.asyncReducers))
}

export default makeRootReducer

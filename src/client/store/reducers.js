import { combineReducers } from 'redux'

import greetingsReducer from '../routes/test/reducers/greetings_reducer'

export const makeRootReducer = (asyncReducers) => {
	return combineReducers({
		...asyncReducers,
		greetings: greetingsReducer
	})
}

export const injectReducer = (store, { key, reducer }) => {
	if (Object.hasOwnProperty.call(store.asyncReducers, key)) return

	store.asyncReducers[key] = reducer
	store.replaceReducer(makeRootReducer(store.asyncReducers))
}

export default makeRootReducer

import { SAY_HOLA } from '../actions'

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
	[SAY_HOLA]  : (state, payload) => {
		return payload.payload
	}
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = 'Hello'
export default function greetingsReducer (state = initialState, action) {
	const handler = ACTION_HANDLERS[action.type]

	return handler ? handler(state, action) : state
}

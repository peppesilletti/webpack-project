// ------------------------------------
// Constants
// ------------------------------------
export const SAY_HOLA = 'SAY_HOLA'
export const SAY_CIAO = 'SAY_CIAO'


// ------------------------------------
// Actions
// ------------------------------------
export function sayHola (payload) {
	return {
		type    : SAY_HOLA,
		payload : payload
	}
}

export function sayCiao (payload) {
	return {
		type    : SAY_CIAO,
		payload : payload
	}
}

import { useReducer } from "react";

export function useLocalConfig(reducer, initialState) {
	const [localConfig, dispatch] = useReducer(reducer, initialState)
	const handleColor = (newColor) => dispatch({type: 'CHANGE_COLOR', payload: newColor})
	const handleFont = (newFont) => dispatch({type: 'CHANGE_FONT', payload: newFont})
	const handleTime = (newTime, clockType) => dispatch({type: 'CHANGE_TIME', payload: {newTime, clockType}})
	const handleIncrease = (clockType) => dispatch({type: 'INCREASE_TIME', payload: clockType})
	const handleDecrease = (clockType) => dispatch({type: 'DECREASE_TIME', payload: clockType})
	return {
		handleColor,
		handleFont,
		handleTime,
		handleIncrease,
		handleDecrease,
		localConfig
	}
}

function handleTime(oldState, newTime, clockType) {
	let oldTimeObj = oldState.time
	return {...oldState, time: {...oldTimeObj, [clockType]: newTime}}
}

export function localConfigReducer(state, action) {
	switch(action.type) {
		case 'CHANGE_COLOR': {
			return {...state, color: action.payload}
		}
		case 'CHANGE_FONT': {
			return {...state, fontFamily: action.payload}
		}
		case 'CHANGE_TIME': {
			let { newTime, clockType } = action.payload
			return handleTime(state, newTime, clockType)
		}
		case 'INCREASE_TIME': {
			let oldTime = state.time[action.payload]
			if(Number.isNaN(parseFloat(oldTime)))
				return handleTime(state, 1, action.payload)
			else {
				return handleTime(
					state,
					parseFloat(oldTime) + 1 > 99 ? 99 : parseFloat(oldTime) + 1,
					action.payload
				)
			}
		}
		case 'DECREASE_TIME': {
			let oldTime = state.time[action.payload]
			if(Number.isNaN(parseFloat(oldTime)))
				return handleTime(state, 1, action.payload)
			else {
				return handleTime(
					state,
					parseFloat(oldTime) - 1 < 0 ? 0 : parseFloat(oldTime) - 1,
					action.payload
				)
			}
		}
		default: {
			throw Error('Unknown action: ' + action.type)
		}
	}
}
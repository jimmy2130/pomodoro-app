// import React from "react";
import styled from 'styled-components/macro';
import { useInterval, getShowTime } from './TimerDisplay.helpers';
import { FAMILIES } from '../../constants';

const TIMER_TEXT_STYLE = {
	sansSerif: {
		lineHeight: '80px',
		letterSpacing: '-5px',
		fontWeight: 700,
		translateX: 'translateX(-2px)',
	},
	serif: {
		lineHeight: '132px',
		letterSpacing: '0px',
		fontWeight: 700,
		translateX: 'translateX(0px)',
	},
	mono: {
		lineHeight: '148px',
		letterSpacing: '-10px',
		fontWeight: 400,
		translateX: 'translateX(-6px)',
	}
}

const TimerDisplay = ({ counter, onTick, animationState, fontFamily }) => {
	const isOn = animationState === 'playing'
	const showTime = getShowTime(counter)
  useInterval(onTick, isOn ? 100 : null)

	return (
		<Wrapper>
			<Timer
				style={{
					'--font-family': FAMILIES[fontFamily],
					'--line-height': TIMER_TEXT_STYLE[fontFamily]['lineHeight'],
					'--letter-spacing': TIMER_TEXT_STYLE[fontFamily]['letterSpacing'],
					'--font-weight': TIMER_TEXT_STYLE[fontFamily]['fontWeight'],
					'--translate-x': TIMER_TEXT_STYLE[fontFamily]['translateX'],
				}}
			>{showTime}</Timer>
		</Wrapper>
	)
}

const Wrapper = styled.div`
`

const Timer = styled.div`
	font-family: var(--font-family);
	line-height: var(--line-height);
	letter-spacing: var(--letter-spacing);
	transform: var(--translate-x);
	font-weight: var(--font-weight);
	font-size: 100px;
`

export default TimerDisplay;

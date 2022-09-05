import React from "react";
import styled from 'styled-components/macro';
import { useInterval, getShowTime } from './TimerDisplay.helpers';
import { FAMILIES } from '../../constants';

const TimerDisplay = ({ counter, onTick, animationState, fontFamily }) => {
	const isOn = animationState === 'playing'
	const showTime = getShowTime(counter)
  useInterval(onTick, isOn ? 1000 : null)

	return (
		<Wrapper>
			<Timer
				style={{'--font-family': FAMILIES[fontFamily]}}
			>{showTime}</Timer>
		</Wrapper>
	)
}

const Wrapper = styled.div`
`

const Timer = styled.div`
	font-family: var(--font-family);
	padding: 32px;
	font-size: 64px;
`

export default TimerDisplay;

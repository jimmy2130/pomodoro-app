import React, { useState } from "react";
import { useAnimation } from "framer-motion";
import styled from 'styled-components/macro';
import AnimationRing from '../AnimationRing';
import TimerDisplay from '../TimerDisplay';
import { COLORS, BUTTON_TEXT, FAMILIES } from '../../constants';

const Timer = ({ time, color, size, fontFamily }) => {
	const control = useAnimation()
	const [animationState, setAnimationState] = useState('start')
	const [counter, setCounter] = useState(time * 60)
	const [key, setKey] = useState(0)

	const onTick = () => {
		setCounter(counter - 1)
		if(counter - 1 === 0) {
			setAnimationState('end')
		}
	}
	const handleAnimationState = () => {
		if(animationState === 'start') {
			setAnimationState('playing')
			control.set({
				pathLength: 0
			})
			control.start({
	      pathLength: 1,
	      transition: { duration: counter, ease: "linear" },
	    })
		}
		else if(animationState === 'playing') {
			setAnimationState('pausing')
			control.stop()
		}
		else if(animationState === 'pausing') {
			setAnimationState('playing')
			control.start({
	      pathLength: 1,
	      transition: {	duration: counter, ease: "linear"},
	    })
		}
		else if(animationState === 'end') {
			setCounter(time * 60)
			setAnimationState('playing')
			control.set({
				pathLength: 0
			})
			control.start({
	      pathLength: 1,
	      transition: { duration: time * 60, ease: "linear" },
	    })
		}
	}

	const onComplete = () => {
		setKey(key + 1)
	}
	return (
		<>
			<PlayButtonWrapper>
				<PlayButton onClick={handleAnimationState}>
					<StatusText style={{'--font-family': FAMILIES[fontFamily]}}>
						{BUTTON_TEXT[animationState].toUpperCase()}
					</StatusText>
				</PlayButton>
				<AnimationRingWrapper>
					<AnimationRing
						color={color}
						size={size}
						onComplete={onComplete}
						key={key}
						control={control}
						animationState={animationState}
					/>
				</AnimationRingWrapper>
			</PlayButtonWrapper>
			<TimerDisplay
				counter={counter}
				onTick={onTick}
				animationState={animationState}
				fontFamily={fontFamily}
			/>
		</>
	)
}

const PlayButtonWrapper = styled.div`
	position: relative;
	width: fit-content;
	border: 1px solid white;
`

const PlayButton = styled.button`
  display: block;
  margin: 0;
  padding: 0;
  width: 366px;
  height: 366px;
  border: none;
  border-radius: 50%;
  background: ${COLORS.backgroundDark};
  color: ${COLORS.text};
  cursor: pointer;

  &:focus {
    outline-offset: 2px;
  }
  /* Focusing the button with a mouse, touch, or stylus */
  &:focus:not(:focus-visible) {
    outline: none;
  }	
`

const StatusText = styled.span`
	position: absolute;
	top: 259px;
	left: 0%;
	right: 0%;
	letter-spacing: 15px;
	font-family: var(--font-family);
`

const AnimationRingWrapper = styled.div`
	border: 1px solid yellow;
	pointer-events: none;
	position: absolute;
	top: 0%;
	left: 0%;
	right: 0%;
	bottom: 0%;
`

export default Timer;

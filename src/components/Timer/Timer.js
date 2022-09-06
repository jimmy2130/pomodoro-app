import React, { useState } from "react";
import { useAnimation } from "framer-motion";
import styled from 'styled-components/macro';
import AnimationRing from '../AnimationRing';
import TimerDisplay from '../TimerDisplay';
import { COLORS, BUTTON_TEXT, FAMILIES } from '../../constants';

const STATUS_TEXT_STYLE = {
	sansSerif: {
		positionTop: '281px',
		lineHeight: '19px',
		translateX: 'translateX(7px)',
	},
	serif: {
		positionTop: '279px',
		lineHeight: '21px',
		translateX: 'translateX(7px)',
	},
	mono: {
		positionTop: '278px',
		lineHeight: '24px',
		translateX: 'translateX(7px)',
	}
}

const TIMER_TEXT_STYLE = {
	sansSerif: {
		positionTop: '161px',
		positionLeft: '79px',  //prevent timer text from moving when counting down
		lineHeight: '80px',
		letterSpacing: '-5px',
		fontWeight: 700,
	},
	serif: {
		positionTop: '127px',
		positionLeft: '79px',
		lineHeight: '132px',
		letterSpacing: '0px',
		fontWeight: 700,
	},
	mono: {
		positionTop: '120px',
		positionLeft: '72px',
		lineHeight: '148px',
		letterSpacing: '-10px',
		fontWeight: 400,
	}	
}

// const MOBILE_STATUS_TEXT_STYLE = {
// 	sans: {

// 	},
// 	sansSerif: {

// 	},
// 	mono: {
		
// 	}
// }

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
				pathLength: 0,
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
	const onComplete = () => setKey(key + 1)

	return (
		<>
			<PlayButtonWrapper>
				<PlayButton onClick={handleAnimationState}>
					<StatusText
						style={{
							'--font-family': FAMILIES[fontFamily],
							'--position-top': STATUS_TEXT_STYLE[fontFamily]['positionTop'],
							'--line-height': STATUS_TEXT_STYLE[fontFamily]['lineHeight'],
							'--translate-x': STATUS_TEXT_STYLE[fontFamily]['translateX'],

					}}>
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
				<TimerDisplayWrapper style={{
					'--position-top': TIMER_TEXT_STYLE[fontFamily]['positionTop'],
					'--position-left': TIMER_TEXT_STYLE[fontFamily]['positionLeft'],
				}}>
					<TimerDisplay
						counter={counter}
						onTick={onTick}
						animationState={animationState}
						fontFamily={fontFamily}
					/>
				</TimerDisplayWrapper>
				<ClockReference style={{
					'--font-family': FAMILIES[fontFamily],
					'--position-top': TIMER_TEXT_STYLE[fontFamily]['positionTop'],
					'--position-left': TIMER_TEXT_STYLE[fontFamily]['positionLeft'],
					'--line-height': TIMER_TEXT_STYLE[fontFamily]['lineHeight'],
					'--font-weight': TIMER_TEXT_STYLE[fontFamily]['fontWeight'],
					'--letter-spacing': TIMER_TEXT_STYLE[fontFamily]['letterSpacing'],
				}}>
					00:06
				</ClockReference>
				<StatusTextReference
					style={{
						'--font-family': FAMILIES[fontFamily],
						'--position-top': STATUS_TEXT_STYLE[fontFamily]['positionTop'],
						'--line-height': STATUS_TEXT_STYLE[fontFamily]['lineHeight'],
					}}>
					{BUTTON_TEXT[animationState].toUpperCase()}
				</StatusTextReference>
			</PlayButtonWrapper>
		</>
	)
}

const PlayButtonWrapper = styled.div`
	position: relative;
	width: 410px;
	height: 410px;
	border-radius: 50%;
	background: linear-gradient(315deg, hsl(235deg, 32%, 27%) 0%, hsl(234deg, 50%, 11%) 100%);
	box-shadow: -50px -50px 100px hsl(234deg, 40%, 25%), 50px 50px 100px hsl(234deg, 45%, 13%);
	display: grid;
	place-content: center;
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
	top: var(--position-top);
	left: 0px;
	right: 0px;
	margin-left: auto;
	margin-right: auto;
	width: fit-content;
	font-family: var(--font-family);
	font-size: 16px;
	font-weight: 700;
	line-height: var(--line-height);
	letter-spacing: 15px;
	transform: var(--translate-x);
`

const AnimationRingWrapper = styled.div`
	pointer-events: none;
	position: absolute;
	top: 0px;
	left: 0px;
	right: 0px;
	bottom: 0px;
	width: 410px;
	height: 410px;
	margin: auto;
`

const TimerDisplayWrapper = styled.div`
	pointer-events: none;
	position: absolute;
	top: var(--position-top);
	left: var(--position-left);
`

const ClockReference = styled.div`
	pointer-events: none;
	position: absolute;
	top: var(--position-top);
	left: var(--position-left);

	font-family: var(--font-family);
	font-size: 100px;
	font-weight: var(--font-weight);
	// border: 1px solid yellow;
	line-height: var(--line-height);
	letter-spacing: var(--letter-spacing);
	color: transparent;
`

const StatusTextReference = styled.span`
	position: absolute;
	top: var(--position-top);
	left: 0px;
	right: 0px;
	margin-left: auto;
	margin-right: auto;
	width: fit-content;
	font-family: var(--font-family);
	font-size: 16px;
	font-weight: 700;
	line-height: var(--line-height);
	letter-spacing: 15px;
	// border: 1px solid red;
	color: transparent;
`

export default Timer;

import { useState } from "react";
import { useAnimation } from "framer-motion";
import styled from 'styled-components/macro';
import AnimationRing from './AnimationRing';
import TimerDisplay from './TimerDisplay';
import UnstyledButton from '../UnstyledButton';
import { QUERIES } from '../../constants';
import {
	BUTTON_TEXT,
	STATUS_TEXT_STYLE,
	TIMER_TEXT_STYLE
} from './Timer.constants';

const Timer = ({ config, showMenu }) => {
	const { color, fontFamily, clockType } = config
	const time = config['time'][clockType]
	const control = useAnimation()
	const [animationState, setAnimationState] = useState('start')
	const [counter, setCounter] = useState(time * 60 * 10)
	const [key, setKey] = useState(0)

	const onTick = () => {
		setCounter(counter - 1)
		if(counter - 1 < 0) {
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
	      transition: { duration: counter / 10, ease: "linear" },
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
	      transition: {	duration: counter / 10, ease: "linear"},
	    })
		}
		else if(animationState === 'end') {
			setCounter(time * 60 * 10)
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
		<Wrapper>
			<PlayButton
				onClick={handleAnimationState}
				tabIndex={showMenu ? -1 : 0}
			>
				<StatusText
					style={{
						'--font-family': `var(--font-family-${fontFamily})`,
						'--position-top': STATUS_TEXT_STYLE[fontFamily]['positionTop'],
						'--line-height': STATUS_TEXT_STYLE[fontFamily]['lineHeight'],
						'--translate-x': STATUS_TEXT_STYLE[fontFamily]['translateX'],
						'--color': `var(--color-${color})`,

				}}>
					{BUTTON_TEXT[animationState].toUpperCase()}
				</StatusText>
			</PlayButton>
			<AnimationRingWrapper>
				<AnimationRing
					color={color}
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
{/*			<ClockReference style={{
				'--font-family': `var(--font-family-${fontFamily})`,
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
					'--font-family': `var(--font-family-${fontFamily})`,
					'--position-top': STATUS_TEXT_STYLE[fontFamily]['positionTop'],
					'--line-height': STATUS_TEXT_STYLE[fontFamily]['lineHeight'],
				}}>
				{BUTTON_TEXT[animationState].toUpperCase()}
			</StatusTextReference>*/}
		</Wrapper>
	)
}

const Wrapper = styled.div`
	position: relative;
	width: 410px;
	height: 410px;
	border-radius: 50%;
	background: linear-gradient(315deg, hsl(235deg, 32%, 27%) 0%, hsl(234deg, 50%, 11%) 100%);
	box-shadow: -50px -50px 100px hsl(234deg, 40%, 25%), 50px 50px 100px hsl(234deg, 45%, 13%);
	display: grid;
	place-content: center;
	user-select: none;
	@media ${QUERIES.phoneAndDown} {
		transform: scale(calc(300 / 410))
	}
`

const PlayButton = styled(UnstyledButton)`
  width: 366px;
  height: 366px;
  border-radius: 50%;
  background: var(--color-background-dark);
  color: var(--color-text);
`

const StatusText = styled.span`
	position: absolute;
	top: var(--position-top);
	left: 0px;
	right: 0px;
	margin-left: auto;
	margin-right: auto;
	width: fit-content;
	pointer-events: none;
	cursor: pointer;

	font-family: var(--font-family);
	font-size: 16px;
	font-weight: 700;
	line-height: var(--line-height);
	letter-spacing: 15px;
	transform: var(--translate-x);

	${PlayButton}:hover & {
		color: var(--color);
	}
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

// const ClockReference = styled.div`
// 	pointer-events: none;
// 	position: absolute;
// 	top: var(--position-top);
// 	left: var(--position-left);

// 	font-family: var(--font-family);
// 	font-size: 100px;
// 	font-weight: var(--font-weight);
// 	// border: 1px solid yellow;
// 	line-height: var(--line-height);
// 	letter-spacing: var(--letter-spacing);
// 	color: transparent;
// 	pointer-events: none;
// 	cursor: pointer;
// `

// const StatusTextReference = styled.span`
// 	position: absolute;
// 	top: var(--position-top);
// 	left: 0px;
// 	right: 0px;
// 	margin-left: auto;
// 	margin-right: auto;
// 	width: fit-content;
// 	font-family: var(--font-family);
// 	font-size: 16px;
// 	font-weight: 700;
// 	line-height: var(--line-height);
// 	letter-spacing: 15px;
// 	// border: 1px solid red;
// 	color: transparent;
// 	pointer-events: none;
// 	cursor: pointer;
// `

export default Timer;

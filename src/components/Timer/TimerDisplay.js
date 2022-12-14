import styled from 'styled-components/macro';
import { getShowTime } from './Timer.helpers';
import { useInterval }  from './use-interval.hook';
import { TIMER_TEXT_STYLE } from './Timer.constants';

const TimerDisplay = ({ counter, onTick, animationState, fontFamily }) => {
	const isOn = animationState === 'playing'
	const showTime = getShowTime(counter)
  useInterval(onTick, isOn ? 100 : null)

	return (
		<Wrapper>
			<Timer
				style={{
					'--font-family': `var(--font-family-${fontFamily})`,
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
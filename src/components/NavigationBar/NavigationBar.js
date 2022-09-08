import styled from 'styled-components/macro';
import { motion } from "framer-motion";
import { COLORS, QUERIES, BREAKPOINTS } from '../../constants';
import NavigationButton from './NavigationButton';

const NavigationBar = ({ config, handleClick, showMenu, size }) => {
	const { color, clockType } = config
	const ANIMATION_TRANSLATE_X = {
	pomodoro: 1,
	shortBreak: size.width > BREAKPOINTS.phoneMax ? 118 : 106,
	longBreak: size.width > BREAKPOINTS.phoneMax ? 236 : 212,
}
	return (
		<Wrapper>
			<NavigationButton config={config} showMenu={showMenu} id="pomodoro" handleClick={handleClick}>pomodoro</NavigationButton>
			<NavigationButton config={config} showMenu={showMenu} id="shortBreak" handleClick={handleClick}>short break</NavigationButton>
			<NavigationButton config={config} showMenu={showMenu} id="longBreak" handleClick={handleClick}>long break</NavigationButton>
			<Floater
				initial={{translateX: ANIMATION_TRANSLATE_X[clockType]}}
			  animate={{translateX: ANIMATION_TRANSLATE_X[clockType]}}
			  transition={{duration: 0.2, ease: 'easeOut'}}
				style={{'--background': COLORS[color]}}
			/>
		</Wrapper>
	)
}

const Wrapper = styled.div`
	position: relative;
	max-width: 373px;
	padding: 8px;
	margin-left: 24px;
	margin-right: 24px;
	border-radius: 31.5px;
	background: ${COLORS.backgroundDark};
	display: flex;
	isolation: isolate;
	@media ${QUERIES.phoneAndDown} {
		padding-left: 6px;
		padding-right: 6px;
	}
`

const Floater = styled(motion.div)`
	position: absolute;
	width: 120px;
	height: 48px;
	border-radius: 23.5px;
	background: var(--background);

	@media ${QUERIES.phoneAndDown} {
		width: 106px;
	}
`

export default NavigationBar;

import styled from 'styled-components/macro';
import { motion } from "framer-motion";
import { QUERIES, BREAKPOINTS } from '../../constants';
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
			<NavigationButton config={config} showMenu={showMenu} id="pomodoro" handleClick={handleClick}>Pomodoro</NavigationButton>
			<NavigationButton config={config} showMenu={showMenu} id="shortBreak" handleClick={handleClick}>Short break</NavigationButton>
			<NavigationButton config={config} showMenu={showMenu} id="longBreak" handleClick={handleClick}>Long break</NavigationButton>
			<Floater
				initial={{translateX: ANIMATION_TRANSLATE_X[clockType]}}
			  animate={{translateX: ANIMATION_TRANSLATE_X[clockType]}}
			  transition={{duration: 0.2, ease: 'easeOut'}}
				style={{'--background': `var(--color-${color})`}}
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
	background: var(--color-background-dark);
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

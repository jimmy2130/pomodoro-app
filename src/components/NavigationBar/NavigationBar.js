import React from "react";
import styled from 'styled-components/macro';
import { motion } from "framer-motion";
import { COLORS, FAMILIES } from '../../constants';

const BUTTON_TEXT_SIZE = {
	sansSerif: '14px',
	serif: '14px',
	mono: '13px',
}

const ANIMATION_TRANSLATE_X = {
	pomodoro: 1,
	shortBreak: 118,
	longBreak: 236,
}

const NavigationBar = ({ config, handleClick }) => {
	const { color, clockType } = config
	return (
		<NavigationWrapper>
			<NavigationButton config={config} id="pomodoro" handleClick={handleClick}>pomodoro</NavigationButton>
			<NavigationButton config={config} id="shortBreak" handleClick={handleClick}>short break</NavigationButton>
			<NavigationButton config={config} id="longBreak" handleClick={handleClick}>long break</NavigationButton>
			<Floater
				initial={{translateX: ANIMATION_TRANSLATE_X[clockType]}}
			  animate={{translateX: ANIMATION_TRANSLATE_X[clockType]}}
			  transition={{duration: 0.2, ease: 'easeOut'}}
				style={{'--background': COLORS[color]}}
			/>
		</NavigationWrapper>
	)
}

const NavigationButton = ({ children, config, id, handleClick }) => {
	const { color, fontFamily, clockType } = config
	return (
		<NavigationButtonWrapper
			onClick={() => handleClick(id)}
			style={{
				'--background': clockType === id ? COLORS[color] : COLORS['backgroundDark'],
				'--font-family': FAMILIES[fontFamily],
				'--font-size': BUTTON_TEXT_SIZE[fontFamily],
				'--color': clockType === id ? COLORS['background'] : COLORS['text'],
				'--hover-color': clockType === id ? COLORS['background'] : COLORS['white'],
			}}
		>
			{children}
		</NavigationButtonWrapper>
	)
}

const NavigationWrapper = styled.div`
	position: relative;
	max-width: 373px;
	padding: 8px;
	border-radius: 31.5px;
	background: ${COLORS.backgroundDark};
	display: flex;
	isolation: isolate;
`

const NavigationButtonWrapper = styled.button`
  display: block;
  margin: 0;
  padding: 0;
	width: 120px;
	height: 48px;
  border: none;
	background: transparent;
	color: var(--color);
	font-family: var(--font-family);
	font-size: var(--font-size);
	font-weight: 700;
  cursor: pointer;
  z-index: 1;

  &:hover {
  	color: var(--hover-color);
  }

  &:focus {
    outline-offset: -4px;
  }
  /* Focusing the button with a mouse, touch, or stylus */
  &:focus:not(:focus-visible) {
    outline: none;
  }
`

const Floater = styled(motion.div)`
	position: absolute;
	width: 120px;
	height: 48px;
	border-radius: 23.5px;
	background: var(--background);
`

export default NavigationBar;

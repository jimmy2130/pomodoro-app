import { useState, useRef } from "react";
import { flushSync } from 'react-dom';
import styled from 'styled-components/macro';
import Spacer from '../Spacer';
import Timer from '../Timer';
import NavigationBar from '../NavigationBar';
import SettingsMenu from '../SettingsMenu';
import UnstyledButton from '../UnstyledButton';
import VisuallyHidden from '../VisuallyHidden';
import { BREAKPOINTS, QUERIES } from '../../constants';
import { SettingsIcon, Logo } from '../../svg';
import useWindowSize from './use-window-size.hook';

const App = () => {
	const [showMenu, setShowMenu] = useState(false)
	const [config, setConfig] = useState({
		color: 'primary',
		fontFamily: 'sansSerif',  //sansSerif, serif, mono
		time: {
			pomodoro: 20,
			shortBreak: 5,
			longBreak: 10,
		},
		clockType: 'pomodoro',
	})
	const [timerKey, setTimerKey] = useState(0)
	const [menuKey, setMenuKey] = useState(0)
	const size = useWindowSize();
	const openBtnRef = useRef(null)
	const closeBtnRef = useRef(null)

	const handleOpenMenu = () => {
		flushSync(() => setShowMenu(true))
		closeBtnRef.current.focus()
	}

	const handleCloseMenu = () => {
		flushSync(() => setShowMenu(false))
		openBtnRef.current.focus()
		renewMenu()
	}

	const handleNavClick = (id) => {
		setConfig({...config, clockType: id})
		renewTimer()
	}

	const renewTimer = () => {
		setTimerKey(timerKey + 1)
	}

	const renewMenu = () => {
		setMenuKey(menuKey + 1)
	}

	return (
		<Wrapper>
			<Spacer
				size={
					size.width > BREAKPOINTS.tabletMax ? 48 : (
						size.width > BREAKPOINTS.phoneMax ? 80 : 32
					)
				}
			/>
			<VisuallyHidden>
				<header>
					<h1>Pomodoro App</h1>
				</header>
			</VisuallyHidden>
			<LogoWrapper>
				<Logo/>
			</LogoWrapper>
			<Spacer size={size.width > BREAKPOINTS.phoneMax ? 55 : 45}/>
			<NavigationWrapper>
				<nav>
					<NavigationBar
						config={config}
						handleClick={handleNavClick}
						showMenu={showMenu}
						size={size}
					/>
				</nav>
			</NavigationWrapper>
			<Spacer
				size={
					size.width > BREAKPOINTS.tabletMax ? 45 : (
						size.width > BREAKPOINTS.phoneMax ? 109 : 48
					)
				}
			/>
			<TimerWrapper>
				<main>
					<Timer config={config} showMenu={showMenu} key={timerKey}/>
				</main>
			</TimerWrapper>
			<Spacer
				size={
					size.width > BREAKPOINTS.tabletMax ? 63 - 15 : (
						size.width > BREAKPOINTS.phoneMax ? 144 - 15 : 79 - 15
					)
				}
			/>
			<MenuWrapper>
				<SettingsMenu
					key={menuKey}
					isOpen={showMenu}
					onDismiss={handleCloseMenu}
					ref={closeBtnRef}
					config={config}
					setConfig={setConfig}
					renewTimer={renewTimer}
				/>
			</MenuWrapper>
			<MiddleWrapper>
				<OpenBtn
					onClick={handleOpenMenu}
					ref={openBtnRef}
					tabIndex={showMenu ? -1 : 0}
				>
					<SettingsIcon/>
					<VisuallyHidden>Open menu</VisuallyHidden>
				</OpenBtn>
			</MiddleWrapper>
		</Wrapper>
	)
}

const Wrapper = styled.div`
	isolation: isolate;
`

const MiddleWrapper = styled.div`
	width: fit-content;
	margin-left: auto;
	margin-right: auto;
`

const LogoWrapper = styled(MiddleWrapper)`
	@media ${QUERIES.phoneAndDown} {
		transform: scale(0.77);
	}
`

const NavigationWrapper = styled(MiddleWrapper)`
	position: relative;
	z-index: 2;
`

const TimerWrapper = styled(MiddleWrapper)`
	position: relative;
	z-index: 1;
`

const MenuWrapper = styled.div`
	position: relative;
	z-index: 3;
`

const OpenBtn = styled(UnstyledButton)`
	padding: 15px;
	&:hover, &:focus {
		& path {
			opacity: 1;
		}
	}
	&:hover, &:focus {
		transform: rotate(15deg);
	}
`

export default App;
import { useState, useRef } from "react";
import { flushSync } from 'react-dom';
import styled from 'styled-components/macro';
import Spacer from '../Spacer';
import Timer from '../Timer';
import NavigationBar from '../NavigationBar';
import SettingsMenu from '../SettingsMenu';
import { SettingsIcon, Logo } from '../../svg';
import UnstyledButton from '../UnstyledButton';


const App = () => {
	const [showMenu, setShowMenu] = useState(false)
	const [config, setConfig] = useState({
		color: 'secondary',
		size: 'big',
		fontFamily: 'sansSerif',  //sansSerif, serif, mono
		time: {
			pomodoro: 1,
			shortBreak: 2,
			longBreak: 3,
		},
		clockType: 'longBreak',
	})
	const [timerKey, setTimerKey] = useState(0)
	const [menuKey, setMenuKey] = useState(0)
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
		<>
			<Spacer size="48"/>
			<MiddleWrapper>
				<Logo/>
			</MiddleWrapper>
			<Spacer size="55"/>
			<MiddleWrapper>
				<NavigationBar config={config} handleClick={handleNavClick} showMenu={showMenu}/>
			</MiddleWrapper>
			<Spacer size="45"/>
			<MiddleWrapper>
				<Timer config={config} showMenu={showMenu} key={timerKey}/>
			</MiddleWrapper>
			<Spacer size={63 - 15}/>
			<SettingsMenu
				key={menuKey}
				isOpen={showMenu}
				onDismiss={handleCloseMenu}
				ref={closeBtnRef}
				config={config}
				setConfig={setConfig}
				renewTimer={renewTimer}
			/>
			<MiddleWrapper>
				<OpenBtn
					onClick={handleOpenMenu}
					ref={openBtnRef}
					tabIndex={showMenu ? -1 : 0}
				>
					<SettingsIcon/>
				</OpenBtn>
			</MiddleWrapper>
		</>
	)
}

const MiddleWrapper = styled.div`
	width: fit-content;
	margin-left: auto;
	margin-right: auto;
`

const OpenBtn = styled(UnstyledButton)`
	padding: 15px;
`

export default App;

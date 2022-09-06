import React, { useState } from "react";
import styled from 'styled-components/macro';
// import Timer from '../Timer';
import NavigationBar from '../NavigationBar';


const App = () => {
	const [config, setConfig] = useState({
		color: 'secondary',
		size: 'big',
		fontFamily: 'sansSerif',  //sansSerif, serif, mono
		time: {
			pomodoro: 0.1,
			shortBreak: 0.2,
			longBreak: 0.3,
		},
		clockType: 'longBreak',

	})

	const handleNavClick = (id) => setConfig({...config, clockType: id})

	return (
		<Wrapper>
			<NavigationBar config={config} handleClick={handleNavClick}/>
			{/*<Timer config={config}/>*/}
		</Wrapper>
	)
}

const Wrapper = styled.div`
	height: 100%;
	display: grid;
	place-content: center;
`

export default App;

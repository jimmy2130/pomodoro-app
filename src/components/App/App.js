import React from "react";
import styled from 'styled-components/macro';
import Timer from '../Timer';


const App = () => {
	return (
		<Wrapper>
			<Timer
				time={0.1}
				color="secondary"
				size="big"
				// fontFamily="sansSerif"
				fontFamily="serif"
				// fontFamily="mono"
			/>
		</Wrapper>
	)
}

const Wrapper = styled.div`
	height: 100%;
	display: grid;
	place-content: center;
`

export default App;

import React from "react";
import styled from 'styled-components/macro';

function App() {
  return (
  	<>
  		<Header>Hello World!!</Header>
  		<Subtitle>subtitle</Subtitle>
  		<Title>title</Title>
  	</>
  	
  );
}

const Header = styled.h1`
	margin: 32px;
	font-size: 64px;
	font-family: var(--font-family-sans-serif);
`

const Subtitle = styled.h2`
	margin: 32px;
	font-size: 64px;
	font-family: var(--font-family-serif);
`

const Title = styled.h3`
	margin: 32px;
	font-size: 64px;
	font-family: var(--font-family-mono);
`

export default App;

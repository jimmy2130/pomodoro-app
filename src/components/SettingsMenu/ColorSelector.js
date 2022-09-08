// import { useRef } from "react";
import styled from 'styled-components/macro';
import { COLORS } from '../../constants';
import { CheckIcon } from '../../svg';

const ColorSelector = ({ color, colorId, onChange }) => {
	return (
		<>
			<ColorLabel>
  			<ColorRadioButton
  				type="radio"
  				name="color"
  				value={colorId}
  				style={{'--background': COLORS[colorId]}}
  				onChange={(e) => onChange(e.target.value)}
  				checked={color === colorId}
  			/>
  			<CheckIconWrapper>
  				<CheckIcon/>
  			</CheckIconWrapper>
  			<HoverRing/>
			</ColorLabel>
		</>
	)
}

const ColorLabel = styled.label`
	position: relative;
	display: block;
	width: 40px;
	height: 40px;
	cursor: pointer;
`

const ColorRadioButton = styled.input`
	appearance: none;
	margin: 0;
	padding: 0;
	display: block;
	width: 40px;
	height: 40px;
	border-radius: 50%;
	background: var(--background);
	cursor: pointer;
`

const CheckIconWrapper = styled.span`
	display: none;
	position: absolute;
	top: 0px;
	left: 0px;
	right: 0px;
	bottom: 0px;
	width: 40px;
	height: 40px;
	margin: auto;
	background: transparent;
	pointer-events: none;

	${ColorRadioButton}:checked + & {
		display: grid;
		place-content: center;
	}
`

const HoverRing = styled.span`
	display: none;
	position: absolute;
	top: -10px;
	left: -10px;
	right: -10px;
	bottom: -10px;
	width: 50px;
	height: 50px;
	margin: auto;
	background: transparent;
	border: 1px solid ${COLORS.offWhite};
	border-radius: 50%;
	pointer-events: none;

	${ColorLabel}:hover ${ColorRadioButton}:not(:checked) ~ & {
		display: block;
	}
`

export default ColorSelector;

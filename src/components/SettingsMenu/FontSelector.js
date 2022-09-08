// import { useRef } from "react";
import styled from 'styled-components/macro';
import { COLORS, FAMILIES } from '../../constants';

const FontSelector = ({ children, family, familyId, onChange }) => {
	return (
		<>
			<FontLabel>
  			<FontRadioButton
  				type="radio"
  				name="font"
  				value={familyId}
  				checked={family === familyId}
  				onChange={(e) => onChange(e.target.value)}
  			/>
  			<FontText
					style={{
						'--font-family': FAMILIES[familyId],
						'--font-weight': familyId === 'serif' ? 400 : 700,
					}}
  			>
  				{children}
  			</FontText>
  			<HoverRing/>
			</FontLabel>
		</>
	)
}

const FontLabel = styled.label`
	position: relative;
	display: block;
	width: 40px;
	height: 40px;
	cursor: pointer;
`

const FontRadioButton = styled.input`
	appearance: none;
	margin: 0;
	padding: 0;
	display: block;
	width: 40px;
	height: 40px;
	border-radius: 50%;
	background: ${COLORS.offWhite};

	&:checked {
		background: ${COLORS.background};
	}
`

const FontText = styled.span`
	position: absolute;
	top: 0;
	left: 0;
	bottom: 0;
	right: 0;
	width: 40px;
	height: 40px;
	margin: auto;
	color: ${COLORS.background};
	font-family: var(--font-family);
	font-weight: var(--font-weight);
	display: grid;
	place-content: center;

	${FontRadioButton}:checked + & {
		color: ${COLORS.white};
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

	${FontLabel}:hover ${FontRadioButton}:not(:checked) ~ & {
		display: block;
	}
`

export default FontSelector;

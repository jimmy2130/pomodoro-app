import styled from 'styled-components/macro';

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
  				aria-label={`${familyId} font`}
  			/>
  			<FontText
					style={{
						'--font-family': `var(--font-family-${familyId})`,
						'--font-weight': familyId === 'serif' ? 400 : 700,
					}}
					aria-hidden={true}
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
	background: var(--color-off-white);

	&:checked {
		background: var(--color-background);
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
	color: var(--color-background);
	font-family: var(--font-family);
	font-weight: var(--font-weight);
	display: grid;
	place-content: center;

	${FontRadioButton}:checked + & {
		color: var(--color-white);
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
	border: 1px solid var(--color-off-white);
	border-radius: 50%;
	pointer-events: none;

	${FontLabel}:hover ${FontRadioButton}:not(:checked) ~ & {
		display: block;
	}
`

export default FontSelector;

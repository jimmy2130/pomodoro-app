// import React from "react";
import styled from 'styled-components/macro';
import UnstyledButton from '../UnstyledButton';
import VisuallyHidden from '../VisuallyHidden';
import { ArrowUpIcon, ArrowDownIcon } from '../../svg';
import { QUERIES } from '../../constants';

const TimeSelector = ({ children, id, time, onChange, onIncrease, onDecrease }) => {
	const keyUpHandler = (e) => {
		if(e.key === 'ArrowUp')
			onIncrease(e.target.id)
		else if(e.key === 'ArrowDown')
			onDecrease(e.target.id)
	}
	return (
		<TimeSelectorWrapper>
			<TimeSelectorLabel htmlFor={id}>{children}</TimeSelectorLabel>
			<ControlWrapper>
				<TimeSelectorInput
					id={id}
					type="text"
					value={time}
					onChange={(e) => onChange(e.target.value, e.target.id)}
					onKeyUp={keyUpHandler}
				></TimeSelectorInput>
				<ButtonAnchor>			
					<IncreaseButton onClick={(id) => onIncrease(id)}>
						<ArrowUpIcon/>
						<VisuallyHidden>Add one minute</VisuallyHidden>
					</IncreaseButton>
					<DecreaseButton  onClick={(id) => onDecrease(id)}>
						<ArrowDownIcon/>
						<VisuallyHidden>Subtract one minute</VisuallyHidden>
					</DecreaseButton>
				</ButtonAnchor>
			</ControlWrapper>
		</TimeSelectorWrapper>
	)
}

const TimeSelectorWrapper = styled.div`
	--anchor-width: 48px;

	@media ${QUERIES.phoneAndDown} {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
`

const TimeSelectorLabel = styled.label`
	display: block;
	margin-bottom: 8px;
	font-size: 12px;
	line-height: 15px;
	font-weight: 700;
	font-family: var(--font-family-sansSerif);
	opacity: 0.4;

	@media ${QUERIES.phoneAndDown} {
		margin-bottom: 0px;
	}
`

const ControlWrapper = styled.div`
	display: flex;
`

const TimeSelectorInput = styled.input`
	display: block;
	max-width: calc(140px - var(--anchor-width));
	height: 48px;
	padding-left: 16px;
	padding-right: 16px;
	border: none;
	border-radius: 10px 0px 0px 10px;
	background: var(--color-off-white);
	color: var(--color-background);
	font-family: var(--font-family-sansSerif);
	font-size: 14px;
	font-weight: 700;
	line-height: 17px;

  &:focus {
    outline-offset: -4px;
  }

  @media ${QUERIES.phoneAndDown} {
  	height: 40px;
  }
`

const ButtonAnchor = styled.div`
	width: var(--anchor-width);
	height: 48px;

	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	gap: 1px;

	border-radius: 0px 10px 10px 0px;
	background: var(--color-off-white);

  @media ${QUERIES.phoneAndDown} {
  	height: 40px;
  }
`

const IncreaseButton = styled(UnstyledButton)`
	padding: 20px 16px 4px 16px;
	// border: 1px solid green;
	&:hover path {
		stroke-opacity: 1;
	}

	@media ${QUERIES.phonadAndDown} {
		padding-top: 8px;
	}
`

const DecreaseButton = styled(UnstyledButton)`
	padding: 4px 16px 20px 16px;
	// border: 1px solid green;
	&:hover path {
		stroke-opacity: 1;
	}

	@media ${QUERIES.phonadAndDown} {
		padding-bottom: 8px;
	}
`

export default TimeSelector;

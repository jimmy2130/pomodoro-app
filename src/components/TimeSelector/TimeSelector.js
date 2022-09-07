// import React from "react";
import styled from 'styled-components/macro';
import UnstyledButton from '../UnstyledButton';
import { ArrowUpIcon, ArrowDownIcon } from '../../svg';
import { COLORS, FAMILIES } from '../../constants';

const TimeSelector = ({ children, time, onChange, onIncrease, onDecrease }) => {
	return (
		<TimeSelectorWrapper>
			<TimeSelectorLabel htmlFor={children}>{children}</TimeSelectorLabel>
			<ControlWrapper>
				<TimeSelectorInput
					id={children}
					type="text"
					value={time}
					onChange={(e) => onChange(e.target.value)}
				></TimeSelectorInput>
				<ButtonAnchor>			
					<IncreaseButton onClick={(id) => onIncrease(id)}>
						<ArrowUpIcon/>
					</IncreaseButton>
					<DecreaseButton  onClick={(id) => onDecrease(id)}>
						<ArrowDownIcon/>
					</DecreaseButton>
				</ButtonAnchor>
			</ControlWrapper>
		</TimeSelectorWrapper>
	)
}

const TimeSelectorWrapper = styled.div`
	--anchor-width: 48px;
`

const TimeSelectorLabel = styled.label`
	display: block;
	margin-bottom: 8px;
	font-size: 12px;
	line-height: 15px;
	font-weight: 700;
	font-family: ${FAMILIES.sansSerif};
	opacity: 0.4;
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
	background: ${COLORS.offWhite};
	color: ${COLORS.background};
	font-family: ${FAMILIES.sansSerif};
	font-size: 14px;
	font-weight: 700;
	line-height: 17px;

  &:focus {
    outline-offset: -4px;
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
	background: ${COLORS.offWhite};
`

const IncreaseButton = styled(UnstyledButton)`
	padding: 20px 16px 4px 16px;
	// border: 1px solid green;
	&:hover path {
		stroke-opacity: 1;
	}
`

const DecreaseButton = styled(UnstyledButton)`
	padding: 4px 16px 20px 16px;
	// border: 1px solid green;
	&:hover path {
		stroke-opacity: 1;
	}
`

export default TimeSelector;

import { forwardRef, useRef } from "react";
import styled from 'styled-components/macro';
import TimeSelector from './TimeSelector';
import FontSelector from './FontSelector';
import ColorSelector from './ColorSelector';
import UnstyledButton from '../UnstyledButton';
import VisuallyHidden from '../VisuallyHidden';
import { CloseIcon } from '../../svg';
import { QUERIES } from '../../constants';
import { getDialogFn, validateTime } from './SettingsMenu.helpers';
import { localConfigReducer, useLocalConfig } from './use-local-config.hook';

const SettingsMenu = forwardRef((props, ref) => {
	const { isOpen, onDismiss, config, setConfig, renewTimer } = props
	const contentRef = useRef(null)
	const applyBtnRef = useRef(null)

	const {
		handleColor,
		handleFont,
		handleTime,
		handleIncrease,
		handleDecrease,
		localConfig
	} = useLocalConfig(localConfigReducer, config)

	const {
		handleEscape,
		handleMouseEscape,
		moveToFirst,
		backToLast
	} = getDialogFn(ref, applyBtnRef, contentRef, onDismiss)

	const handleApply = () => {
		let clockType = config.clockType
		let { color, fontFamily, time: { pomodoro, shortBreak, longBreak }} = localConfig
		setConfig({
			...config,
			color: color,
			fontFamily: fontFamily,
			time: {
				pomodoro: validateTime(pomodoro),
				shortBreak: validateTime(shortBreak),
				longBreak: validateTime(longBreak)
			}
		})
		if(validateTime(config['time'][clockType]) !== validateTime(localConfig['time'][clockType]))
			renewTimer()
	}

  return (
  	<Wrapper
  		style={{'--display': isOpen ? 'block' : 'none'}}
  		onKeyUp={(e) => handleEscape(e)}
  		onClick={(e) => handleMouseEscape(e)}
  	>
  		<DialogOverlay>
	  		<DialogContentWrapper>
	  			<DialogContent ref={contentRef}>
	  				<CloseBtn
	  					onClick={onDismiss}
	  					ref={ref}
	  					onKeyDown={(e) => backToLast(e)}
	  				>
	  					<CloseIcon/>
	  					<VisuallyHidden>Dismiss menu</VisuallyHidden>
	  				</CloseBtn>
	  				<Title>Settings</Title>
	  				<TimeSection>
	  					<TimeTitle>Time (minutes)</TimeTitle>
	  					<TimeSelectorGroup>
	  						<TimeSelector
	  							id="pomodoro"
	  							time={localConfig.time.pomodoro}
	  							onChange={handleTime}
	  							onIncrease={() => handleIncrease('pomodoro')}
	  							onDecrease={() => handleDecrease('pomodoro')}
	  						>pomodoro
	  						</TimeSelector>
	  						<TimeSelector
	  							id="shortBreak"
	  							time={localConfig.time.shortBreak}
	  							onChange={handleTime}
	  							onIncrease={() => handleIncrease('shortBreak')}
	  							onDecrease={() => handleDecrease('shortBreak')}
	  						>short break
	  						</TimeSelector>
	  						<TimeSelector
	  							id="longBreak"
	  							time={localConfig.time.longBreak}
	  							onChange={handleTime}
	  							onIncrease={() => handleIncrease('longBreak')}
	  							onDecrease={() => handleDecrease('longBreak')}
	  						>long break
	  						</TimeSelector>
	  					</TimeSelectorGroup>
	  				</TimeSection>
	  				<FontSection>
	  					<FontTitle>Font</FontTitle>
	  					<FontSelectorGroup>
	  						<FontSelector family={localConfig.fontFamily} familyId="sansSerif" onChange={handleFont}>Aa</FontSelector>
	  						<FontSelector family={localConfig.fontFamily} familyId="serif" onChange={handleFont}>Aa</FontSelector>
	  						<FontSelector family={localConfig.fontFamily} familyId="mono" onChange={handleFont}>Aa</FontSelector>
	  					</FontSelectorGroup>
	  				</FontSection>
	  				<ColorSection>
	  					<ColorTitle>Color</ColorTitle>
	  					<ColorSelectorGroup>
	  						<ColorSelector color={localConfig.color} colorId="primary" onChange={handleColor}></ColorSelector>
	  						<ColorSelector color={localConfig.color} colorId="secondary" onChange={handleColor}></ColorSelector>
	  						<ColorSelector color={localConfig.color} colorId="tertiary" onChange={handleColor}></ColorSelector>
	  					</ColorSelectorGroup>
	  				</ColorSection>
	  			</DialogContent>
	  			<ApplyButton
	  				ref={applyBtnRef}
	  				onClick={handleApply}
	  				onKeyDown={(e) => moveToFirst(e)}
	  			>Apply
	  				<ApplyButtonMask/>
	  			</ApplyButton>
	  		</DialogContentWrapper>  			
  		</DialogOverlay>
  	</Wrapper>
  );
});

const Wrapper = styled.div`
	display: var(--display);
`

const DialogOverlay = styled.div`
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	background: hsl(234deg 47% 8% / 50%);
`

const DialogContentWrapper = styled.div`
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	max-width: 540px;
	height: 490px;
	margin: auto;

	@media ${QUERIES.phoneAndDown} {
		max-width: 327px;
		height: 575px;
	}
`

const DialogContent = styled.div`
	position: relative;
	height: 464px;
	padding: 34px 39px;
	background: var(--color-white);
	border-radius: 25px;
	color: var(--color-background);

	@media ${QUERIES.phoneAndDown} {
		border-radius: 15px;
		height: 549px;
		padding: 24px;
	}
`

const CloseBtn = styled(UnstyledButton)`
	position: absolute;
	top: calc(47px - 15px);
	right: calc(38px - 15px);
	padding: 15px;

	&:hover,&:focus {
		& path {
			opacity: 1;
		}
	}

	@media ${QUERIES.phoneAndDown} {
		top: calc(30px - 15px);
		right: calc(24px - 15px);
	}
`

const Title = styled.h2`
	padding-left: 39px;
	padding-right: 39px;
	padding-bottom: 31px;
	margin-left: -39px;
	margin-right: -39px;
	border-bottom: 1px solid hsl(0deg 3% 89%);
	font-size: 28px;
	line-height: 35px;
	font-weight: 700;
	font-family: var(--font-family-sansSerif);

	@media ${QUERIES.phoneAndDown} {
		padding-left: 24px;
		padding-right: 24px;
		padding-bottom: 28px;
		margin-left: -24px;
		margin-right: -24px;
		font-size: 20px;
		line-height: 25px;
	}
`

const SubTitle = styled.h3`
	font-size: 13px;
	line-height: 16px;
	letter-spacing: 5px;
	text-transform: uppercase;
	font-weight: 700;
	font-family: var(--font-family-sansSerif);

	@media ${QUERIES.phoneAndDown} {
		font-size: 11px;
		line-height: 14px;
		letter-spacing: 4.23px;
		text-align: center;
		transform: scale(calc(11 / 13))
	}
`

const TimeSection = styled.div`
	padding-top: 24px;
	padding-bottom: 24px;
	border-bottom: 1px solid hsl(0deg 3% 89%);
`

const TimeTitle = styled(SubTitle)`
	margin-bottom: 22px;

	@media ${QUERIES.phoneAndDown} {
		margin-bottom: 18px;
	}
`

const TimeSelectorGroup = styled.div`
	display: flex;
	gap: 20px;

	@media ${QUERIES.phoneAndDown} {
		flex-direction: column;
		gap: 8px;
	}
`

const FontSection = styled.div`
	padding-top: 24px;
	padding-bottom: 24px;
	border-bottom: 1px solid hsl(0deg 3% 89%);
	display: flex;
	justify-content: space-between;
	align-items: center;

	@media ${QUERIES.phoneAndDown} {
		flex-direction: column;
		justify-content: flex-start;
		gap: 18px;
	}
`

const FontTitle = styled(SubTitle)`
`

const FontSelectorGroup = styled.div`
	display: flex;
	gap: 16px;
`

const ColorSection = styled.div`
	padding-top: 24px;
	padding-bottom: 24px;
	display: flex;
	justify-content: space-between;
	align-items: center;

	@media ${QUERIES.phoneAndDown} {
		padding-top: 16px;
		flex-direction: column;
		justify-content: flex-start;
		gap: 18px;
	}
`

const ColorTitle = styled(SubTitle)`
`

const ColorSelectorGroup = styled.div`
	display: flex;
	gap: 16px;
	cursor: pointer;
`

const ApplyButton = styled(UnstyledButton)`
	position: relative;
	width: 140px;
	height: 53px;
	margin-left: auto;
	margin-right: auto;
	margin-top: -27px;
	border-radius: 26.5px;
	background: var(--color-primary);
	color: var(--color-white);
	font-size: 16px;
	font-weight: 700;
	font-family: var(--font-family-sansSerif);
	line-height: 20px;
`

const ApplyButtonMask = styled.span`
	display: none;
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	width: 140px;
	height: 53px;
	border-radius: 26.5px;
	background: var(--color-white);
	opacity: 0.2;

	${ApplyButton}:hover & {
		display: block;
	}
	${ApplyButton}:focus & {
		display: block;
	}
`

export default SettingsMenu;

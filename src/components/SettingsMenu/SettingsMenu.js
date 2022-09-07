import { forwardRef, useRef, useState } from "react";
import styled from 'styled-components/macro';
import UnstyledButton from '../UnstyledButton';
import TimeSelector from '../TimeSelector';
import FontSelector from '../FontSelector';
import ColorSelector from '../ColorSelector';
import { CloseIcon } from '../../svg';
import { COLORS, FAMILIES } from '../../constants';

const SettingsMenu = forwardRef((props, ref) => {
	const { isOpen, onDismiss, config, setConfig, renewTimer } = props
	const { color, fontFamily, time: { pomodoro, shortBreak, longBreak }, clockType} = config

	const [localConfig, setLocalConfig] = useState({
		color: color,
		size: 'big',
		fontFamily: fontFamily,
		time: {
			pomodoro: pomodoro,
			shortBreak: shortBreak,
			longBreak: longBreak,
		},
		clockType: clockType,
	})
	const handleColor = (newColor) => setLocalConfig({...localConfig, color: newColor})
	const handleFont = (newFont) => setLocalConfig({...localConfig, fontFamily: newFont})
	const handlePomodoro = (newTime) => {
		newTime = parseInt(newTime)
		newTime = newTime > 99 ? 99 : newTime
		let oldTime = localConfig.time
		setLocalConfig({...localConfig, time: {...oldTime, pomodoro: newTime}})
	}
	const handleShortBreak = (newTime) => {
		newTime = parseInt(newTime)
		newTime = newTime > 99 ? 99 : newTime
		let oldTime = localConfig.time
		setLocalConfig({...localConfig, time: {...oldTime, shortBreak: newTime}})
	}
	const handleLongBreak = (newTime) => {
		newTime = parseInt(newTime)
		newTime = newTime > 99 ? 99 : newTime
		let oldTime = localConfig.time
		setLocalConfig({...localConfig, time: {...oldTime, longBreak: newTime}})
	}
	const handleIncrease = (clockType) => {
		let oldTime = localConfig.time
		let oldCounter = localConfig.time[clockType]
		oldCounter = oldCounter + 1 > 99 ? 99 : oldCounter + 1
		setLocalConfig({...localConfig, time: {...oldTime, [clockType]: oldCounter}})
	}
	const handleDecrease = (clockType) => {
		let oldTime = localConfig.time
		let oldCounter = localConfig.time[clockType]
		oldCounter = oldCounter - 1 < 0 ? 0 : oldCounter - 1
		setLocalConfig({...localConfig, time: {...oldTime, [clockType]: oldCounter}})
	}
	const handleApply = () => {
		setConfig(localConfig)
		renewTimer()
	}

	const contentRef = useRef(null)
	const applyBtnRef = useRef(null)

	const handleEscape = (e) => {
		if(e.key === 'Escape') {
			onDismiss()
		}
	}
	const handleMouseEscape = (e) => {
		if(!contentRef.current.contains(e.target))
			onDismiss()
	}
	const moveToFirst = (e) => {
		if(e.key === 'Tab' && !e.shiftKey) {
			e.preventDefault()
			ref.current.focus()
		}
	}
	const backToLast = (e) => {
		if(e.key === 'Tab' && e.shiftKey) {
			e.preventDefault()
			applyBtnRef.current.focus()
		}
	}

  return (
  	<Wrapper
  		style={{'--display': isOpen ? 'block' : 'none'}}
  		onKeyUp={(e) => handleEscape(e)}
  		onClick={(e) => handleMouseEscape(e)}
  	>
  		<DialogOverlay></DialogOverlay>
  		<DialogContentWrapper>
  			<DialogContent ref={contentRef}>
  				<CloseBtn
  					onClick={onDismiss}
  					ref={ref}
  					onKeyDown={(e) => backToLast(e)}
  				>
  					<CloseIcon/>
  				</CloseBtn>
  				<Title>Settings</Title>
  				<TimeSection>
  					<TimeTitle>Time(minutes)</TimeTitle>
  					<TimeSelectorGroup>
  						<TimeSelector
  							time={localConfig.time.pomodoro}
  							onChange={handlePomodoro}
  							onIncrease={() => handleIncrease('pomodoro')}
  							onDecrease={() => handleDecrease('pomodoro')}
  						>pomodoro
  						</TimeSelector>
  						<TimeSelector
  							time={localConfig.time.shortBreak}
  							onChange={handleShortBreak}
  							onIncrease={() => handleIncrease('shortBreak')}
  							onDecrease={() => handleDecrease('shortBreak')}
  						>short break
  						</TimeSelector>
  						<TimeSelector
  							time={localConfig.time.longBreak}
  							onChange={handleLongBreak}
  							onIncrease={() => handleIncrease('longBreak')}
  							onDecrease={() => handleDecrease('longBreak')}
  						>long break
  						</TimeSelector>
  					</TimeSelectorGroup>
  				</TimeSection>
  				<FontSection>
  					<FontTitle>font</FontTitle>
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
  			>Apply</ApplyButton>
  		</DialogContentWrapper>
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
	background: hsl(234deg 47% 8% / 50%)
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
`

const DialogContent = styled.div`
	position: relative;
	height: 464px;
	padding: 34px 39px;
	background: ${COLORS.white};
	border-radius: 25px;
	color: ${COLORS.background};
`

const CloseBtn = styled(UnstyledButton)`
	position: absolute;
	top: calc(47px - 15px);
	right: calc(38px - 15px);
	padding: 15px;
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
	font-family: ${FAMILIES.sansSerif};
`

const SubTitle = styled.h3`
	font-size: 13px;
	line-height: 16px;
	letter-spacing: 5px;
	text-transform: uppercase;
	font-weight: 700;
	font-family: ${FAMILIES.sansSerif};
`

const TimeSection = styled.div`
	padding-top: 24px;
	padding-bottom: 24px;
	border-bottom: 1px solid hsl(0deg 3% 89%);
`

const TimeTitle = styled(SubTitle)`
	margin-bottom: 22px;
`

const TimeSelectorGroup = styled.div`
	display: flex;
	gap: 20px;
`

const FontSection = styled.div`
	padding-top: 24px;
	padding-bottom: 24px;
	border-bottom: 1px solid hsl(0deg 3% 89%);
	display: flex;
	justify-content: space-between;
	align-items: center;
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
	background: ${COLORS.primary};
	color: ${COLORS.white};
	font-size: 16px;
	font-weight: 700;
	font-family: ${FAMILIES.sansSerif};
	line-height: 20px;
`

export default SettingsMenu;

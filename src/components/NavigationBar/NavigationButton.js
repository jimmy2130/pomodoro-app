import styled from 'styled-components/macro';
import { QUERIES } from '../../constants';
import UnstyledButton from '../UnstyledButton';

const BUTTON_TEXT_SIZE = {
	sansSerif: '14px',
	serif: '14px',
	mono: '13px',
}

const NavigationButton = ({ children, showMenu, config, id, handleClick }) => {
	const { fontFamily, clockType } = config
	return (
		<Wrapper
			onClick={() => handleClick(id)}
			style={{
				'--font-family': `var(--font-family-${fontFamily})`,
				'--font-size': BUTTON_TEXT_SIZE[fontFamily],
				'--color': clockType === id ? 'var(--color-background)' : 'var(--color-text)',
				'--hover-color': clockType === id ? 'var(--color-background)' : 'var(--color-white)',
			}}
			tabIndex={showMenu ? -1 : 0}
		>
			<h2>{children}</h2>
		</Wrapper>
	)
}

const Wrapper = styled(UnstyledButton)`
	width: 120px;
	height: 48px;
	color: var(--color);
	font-family: var(--font-family);
	font-size: var(--font-size);
	font-weight: 700;
	text-transform: lowercase;
  z-index: 1;

  &:hover {
  	color: var(--hover-color);
  }

  &:focus {
    outline-offset: -4px;
  }

	@media ${QUERIES.phoneAndDown} {
		width: 106px;
		font-size: 12px;
	}
`

export default NavigationButton;
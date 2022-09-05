export const COLORS = {
	primary: 'hsl(0deg 91% 71%)',
	secondary: 'hsl(182deg 91% 71%)',
	tertiary: 'hsl(284deg 89% 74%)',
	white: 'hsl(0deg 0% 100%)',
	offWhite: 'hsl(229deg 52% 96%)',
	text: 'hsl(227deg 100% 92%)',
	background: 'hsl(235deg 35% 18%)',
	backgroundDark: 'hsl(234deg 39% 14%)',
};

const BREAKPOINTS = {
  phoneMax: 587,
};

export const QUERIES = {
  'phoneAndDown': `(max-width: ${BREAKPOINTS.phoneMax / 16}rem)`,
};

export const FAMILIES = {
	sansSerif: '"Kumbh Sans", sans-serif',
	serif: '"Roboto Slab", serif',
	mono: '"Space Mono", monospace',
};

export const BUTTON_TEXT = {
	start: 'start',
	playing: 'pause',
	pausing: 'start',
	end: 'restart'
};
export const getX = (cx, r, deg) => {
	return cx + r * Math.cos(Math.PI * (90 - deg) / 180)
}

export const getY = (cy, r, deg) => {
	return cy - r * Math.sin(Math.PI * (90 - deg) / 180)
}
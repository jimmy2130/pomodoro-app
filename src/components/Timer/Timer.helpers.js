export function getX(cx, r, deg) {
	return cx + r * Math.cos(Math.PI * (90 - deg) / 180)
}

export function getY(cy, r, deg) {
	return cy - r * Math.sin(Math.PI * (90 - deg) / 180)
}

export function getShowTime(sec) {
	sec = Math.ceil(sec / 10)
	let min = ((sec - (sec % 60)) / 60).toString().padStart(2, '0')
	sec = (sec % 60).toString().padStart(2, '0')
	return `${min}:${sec}`
}
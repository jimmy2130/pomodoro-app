export function getDialogFn(firstRef, lastRef, contentRef, dismissFn) {
	const handleEscape = (e) => {
		if(e.key === 'Escape') {
			dismissFn()
		}
	}
	const handleMouseEscape = (e) => {
		if(!contentRef.current.contains(e.target))
			dismissFn()
	}
	const moveToFirst = (e) => {
		if(e.key === 'Tab' && !e.shiftKey) {
			e.preventDefault()
			firstRef.current.focus()
		}
	}
	const backToLast = (e) => {
		if(e.key === 'Tab' && e.shiftKey) {
			e.preventDefault()
			lastRef.current.focus()
		}
	}
	return { handleEscape, handleMouseEscape, moveToFirst, backToLast }
}

export function validateTime(str) {
	let num = Number.isNaN(parseFloat(str)) ? 1 : parseFloat(str)
	if(num >= 99)
		return 99
	if(num < 0)
		return 1
	return num
}
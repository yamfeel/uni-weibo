function debounce(fn, delay) {
	let timer
	return function() {
		timer&&clearTimeout(timer)
		timer = setTimeout(() => {
			let self = this
			let arg = arguments
			fn.apply(self,arg)
		},delay)
	}
}

module.exports = {
	debounce
}
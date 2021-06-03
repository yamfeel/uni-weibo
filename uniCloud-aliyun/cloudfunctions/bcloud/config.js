const {genValidator} = require("./middlewares/validator.js")
const userValidate = require("./validator/user.js")

module.exports = {
	debug: true,
	baseDir: __dirname,
	middleware: [
		[
			genValidator(userValidate),
			{ enable: true, match: /\/register$/}
		]
	]
}
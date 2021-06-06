const {
	genValidator
} = require("./middlewares/validator.js")
const loginCheck = require("./middlewares/loginChecks.js")
const userValidate = require("./validator/user.js")

module.exports = {
	debug: true,
	baseDir: __dirname,
	middleware: [
		[
			genValidator(userValidate),
			{
				enable: true,
				match: /\/register$/
			}
		],
		[
			loginCheck(),
			{
				enable: true,
				ignore: /\/(login|register|isExist)$/
			}
		]
	]
}

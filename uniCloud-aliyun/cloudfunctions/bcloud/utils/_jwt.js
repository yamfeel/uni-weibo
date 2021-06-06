/**
 * @description jwt 签发和验证
 */
const jwt = require("jsonwebtoken")
const util = require("util")
const verify = util.promisify(jwt.verify)
const { TOKEN_SECRET_KEY } = require("../conf/secretKeys.js")

/**
 * @param {Object} payload 打包数据
 * @param {Object} secret 密钥
 * @param {String} exp 有效期
 */
async function jwtSign(payload, exp) {
	return jwt.sign(payload, TOKEN_SECRET_KEY, { expiresIn: exp }) // ms h
}

async function jwtVerify(token) {
	return await verify(token, TOKEN_SECRET_KEY)
}

module.exports = {
	jwtSign,
	jwtVerify
}

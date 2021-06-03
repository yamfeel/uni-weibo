/**
 * @description jwt 签发和验证
 */
const jwt = require("jsonwebtoken")
const util = require("util")
const verify = util.promisify(jwt.verify)

/**
 * @param {Object} payload 打包数据
 * @param {Object} secret 密钥
 * @param {String} exp 有效期
 */
async function jwtSign(payload, secret, exp) {
	return jwt.sign(payload, secret, { expiresIn: exp }) // ms h
}

module.exports = {
	jwtSign,
	verify
}

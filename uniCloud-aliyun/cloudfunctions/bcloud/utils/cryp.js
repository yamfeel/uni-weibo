/**
 * @description 加密方法
 */

const crypto = require('crypto')

// 密钥
const { CREYPTO_SECRET_KEY } = require('../conf/secretKeys.js')

/**
 * md5 加密
 * @param {string} content 明文
 */
function _md5(content) {
	const md5 = crypto.createHash('md5')
	return md5.update(content).digest('hex')
}

/**
 * @param {String} content 明文
 */
function doCrypto(content) {
	const str = `password=${content}&key=${CREYPTO_SECRET_KEY}`
	return _md5(str)
}

module.exports = doCrypto
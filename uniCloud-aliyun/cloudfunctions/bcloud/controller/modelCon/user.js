/**
 * @description  user controller
 * @auther yukee
 */

// const UserService = require("../../service/user.js")
const {
	SuccessModel,
	ErrorModel
} = require("../../model/ResModel.js")
const {
	registerUserNameNotExistInfo,
	registerUserNameExistInfo,
	registerFailInfo
} = require("../../model/ErrorInfo.js")

const doCrypto = require('../../utils/cryp.js')

/**
 * 用户名是否存在
 * @param {string} userName 用户名
 */
async function isExist(userName) {
	const userInfo = await this.service.user.getUserInfo(userName)
	if (userInfo.affectedDocs == 1) {
		// 已存在
		return new SuccessModel(userInfo.data)
		// { errno:0, data: {...}}
	} else {
		// 不存在
		return new ErrorModel(registerUserNameNotExistInfo)
	}
	// 业务逻辑处理
	// 调用 services层
	// 统一返回格式

}

/**
 * @param {string} userNamw 
 * @param {string} password 
 * @param {number} gender 
 * @param {string} email 
 */
async function register({
	userName,
	password,
	gender,
	email
}) {
	const userInfo = await this.service.user.getUserInfo(userName)
	if (userInfo.affectedDocs == 1) {
		// 已存在
		return new ErrorModel(registerUserNameExistInfo)
		// { errno:0, data: {...}}
	}
	// 不存在,注册 service
	
	try {
		await this.service.user.createUser({
			userName, password: doCrypto(password), gender, email
		})
		return new SuccessModel()
	} catch (ex) {
		console.error(ex.message, ex.stack)
		return new ErrorModel(registerFailInfo)
	}
}

module.exports = {
	isExist,
	register
}

/**
 * @description  user controller
 * @auther yukee
 */

// const UserService = require("../../service/user.js")
const { SuccessModel, ErrorModel } = require("../../model/ResModel.js")
const { registerUserNameNotExistInfo } = require("../../model/ErrorInfo.js")


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

module.exports = {
	isExist
}

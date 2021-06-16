/**
 * @description upload controller
 */

const {
	SuccessModel,
	ErrorModel
} = require("../../model/ResModel.js")
const {
	registerUserNameNotExistInfo,
	registerUserNameExistInfo,
	registerFailInfo,
	loginFailInfo
} = require("../../model/ErrorInfo.js")

/**
 * 缓存临时文件状态
 * @param {string} userName 用户名
 */
async function fileCache(userName, action) {
	const result = await this.service.upload.fileCache(userName, action)
	console.log(result)
	if (result) {
		// 已存在
		this.ctx.data.fileName = result
		return new SuccessModel(this.ctx.data)
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
	fileCache
}

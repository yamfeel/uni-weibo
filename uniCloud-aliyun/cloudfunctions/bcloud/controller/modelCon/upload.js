/**
 * @description upload controller
 */

const {
	SuccessModel,
	ErrorModel,
	verityModel
} = require("../../model/ResModel.js")
const {
	registerUserNameNotExistInfo,
	registerUserNameExistInfo,
	registerFailInfo,
	loginFailInfo
} = require("../../model/ErrorInfo.js")

const {
	DEFAULT_PICTURE
} = require('../../conf/constant.js')
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


async function updatePicInfo(userName, picOld, fileName, fileID) {
	// 1. 更新fileID
	const updatePic = await this.service.user.updatePic(userName, fileID)
	// 2. 删除picOld 云储存
	if (DEFAULT_PICTURE != picOld) {
		const delImg = await uniCloud.deleteFile({
			fileList: [picOld]
		})
		console.log(';;;',picOld)
	}
	// 3. 清楚fileName缓存
	const delCache = this.service.upload.delCache(userName, fileName)
	// 4. return verityModel
	return verityModel.call(this, {
		updatePic,
		delCache,
		picOld
	})
}
module.exports = {
	fileCache,
	updatePicInfo
}

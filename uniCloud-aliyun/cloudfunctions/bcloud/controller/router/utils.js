const Controller = require("uni-cloud-router").Controller
const {
	updatePicInfo: updatePicInfoCon,
	fileCache: fileCacheCon
} = require("../modelCon/upload.js")

// 继承uni-router.Controller 生成 controller 实例
module.exports = class UtilsController extends(
	Controller
) {
	async fileCache() {
		const action = this.ctx.data.action
		const {
			userName
		} = this.ctx.userInfo
		const data = await fileCacheCon.call(this, userName, action)
		return data
	}
	async updatePicInfo() {
		const {
			picOld,
			fileName,
			fileID
		} = this.ctx.data
		const {
			userName
		} = this.ctx.userInfo
		const data = await updatePicInfoCon.call(this, userName, picOld, fileName, fileID)
		return data
	}

}

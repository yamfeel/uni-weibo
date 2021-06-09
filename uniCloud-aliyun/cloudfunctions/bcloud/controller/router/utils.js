const Controller = require("uni-cloud-router").Controller
const { fileCache:fileCacheCon } = require("../modelCon/upload.js")
 
// 继承uni-router.Controller 生成 controller 实例
module.exports = class UtilsController extends (
	Controller
) {
	async fileCache() {
		const { userName } = this.ctx.userInfo
		const data = await fileCacheCon.call(this, userName)
		return data
	}
}
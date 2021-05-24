const Controller = require("uni-cloud-router").Controller
const { isExist:isExistFn } = require("../modle/user.js")
 
// 继承uni-router.Controller 生成 controller 实例
module.exports = class UserController extends (
	Controller
) {
	async isExist() {
		const { ctx, service } = this
		const { userName } = ctx.data
		// return userName
		const data = await isExistFn.call(this, userName)
		return data
	}
}
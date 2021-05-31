const Controller = require("uni-cloud-router").Controller
const { isExist:isExistCon, register:registerCon } = require("../modelCon/user.js")
 
// 继承uni-router.Controller 生成 controller 实例
module.exports = class UserController extends (
	Controller
) {
	async isExist() {
		const { userName } = this.ctx.data
		// return userName
		const data = await isExistCon.call(this, userName)
		return data
	}
	async register() {
		const { userName, email, password, gender } = this.ctx.data
		const data = await registerCon.call(this, {userName, email, password, gender})
		return data
	}
}
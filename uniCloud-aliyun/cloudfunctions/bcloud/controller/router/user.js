const Controller = require("uni-cloud-router").Controller
const {
	isExist: isExistCon,
	register: registerCon,
	login: loginCon,
	changeInfo: changeInfoCon
} = require("../modelCon/user.js")

// 继承uni-router.Controller 生成 controller 实例
module.exports = class UserController extends(
	Controller
) {
	async isExist() {
		const {
			userName
		} = this.ctx.data
		// return userName
		const data = await isExistCon.call(this, userName)
		return data
	}

	async register() {
		const {
			userName,
			email,
			password,
			gender
		} = this.ctx.data
		const data = await registerCon.call(this, {
			userName,
			email,
			password,
			gender
		})
		return data
	}

	async login() {
		const {
			userName,
			password
		} = this.ctx.data
		const data = await loginCon.call(this, userName, password)
		return data
	}

	async userTest() {
		return {
			code: 0,
			message: '中间件成功',
			data: this.ctx.data.token
		}
	}

	async changeInfo() {
		const {
			nickName
		} = this.ctx.data
		// controller
		const result = await changeInfoCon.call(this, nickName)
		return result
	}
}

/**
 * @description user service
 * @author yukee
 */

const {
	formatUser
} = require("./_format.js")

const {
	Service
} = require("uni-cloud-router")
module.exports = class UserService extends(
	Service
) {
	/**
	 * 获取用户信息
	 * @param {string} userName 用户名
	 * @param {string} password 密码
	 */
	async getUserInfo(userName, password) {
		// 查询条件
		const whereOpt = {
			userName
		}
		if (password) {
			Object.assign(whereOpt, {
				password
			})
		}

		// 查询
		const collerction = this.db.collection('blog-user')
		const result = await collerction.where(whereOpt).get()
		if (result == null) {
			// 未找到
			return result
		}

		// 格式化
		const formatRes = formatUser(result)
		return formatRes
	}

	/**
	 * @param {string} userName 
	 * @param {string} password 
	 * @param {number} gender 
	 * @param {string} email 
	 */
	async createUser({
		userName,
		password,
		gender = 3,
		email
	}) {
		const collerction = this.db.collection('blog-user')
		const result = await collerction.add({
			userName,
			password,
			gender,
			email
		})
	}
}

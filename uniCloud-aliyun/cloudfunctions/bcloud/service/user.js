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
		const result = await collerction.where(whereOpt).field({
			'userName': true,
			'nickName': true,
			'email': true,
			'gender': true,
			'token': true,
			'picture': true
		}).get()
		if (result == null) {
			// 未找到
			return result
		}

		// 格式化
		result.data = formatUser(result.data)
		return result
	}

	/**
	 * 注册新用户
	 * @param {string} userName 
	 * @param {string} password 
	 * @param {number} gender 
	 * @param {string} email 
	 */
	async createUser({
		userName,
		password,
		gender = 2,
		email
	}) {
		const collerction = this.db.collection('blog-user')
		const result = await collerction.add({
			userName,
			password,
			gender,
			email,
			'register_date': Date.now(),
			'register_ip': this.ctx.context.CLIENTIP
		})
		return result
	}

	/**
	 * 设置token
	 * @param {String} doc
	 * @param {String} token
	 */
	async updateToken(id, token) {
		const collerction = this.db.collection('blog-user')
		const result = await collerction.doc(id).update({
			'token': token,
			'last_login_date': Date.now(),
			'last_login_ip': this.ctx.context.CLIENTIP
		})
		return result
	}

	async updatePic(userName, fileID) {
		const collerction = this.db.collection('blog-user')
		const result = await collerction.where({
			'userName': userName
		}).update({
			'picture': fileID
		})
		return result
	}
	
	async updateNickName(userName, nickName) {
		const collerction = this.db.collection('blog-user')
		const result = await collerction.where({
			userName
		}).update({
			nickName
		})
		return result
	}
	
	async updatePwd(userName, password, newPassword) {
		const collerction = this.db.collection('blog-user')
		const result = await collerction.where({
			userName,
			password
		}).update({
			password: newPassword,
			token: ''
		})
		return result
	}
}

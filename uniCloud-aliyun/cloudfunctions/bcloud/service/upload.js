/**
 * @description upload service
 * @author yukee
 */

const {
	Service
} = require("uni-cloud-router")
module.exports = class UploadService extends(
	Service
) {
	/**
	 * 缓存文件状态
	 * @param {string} userName 用户名
	 * @param {string} action 缓存事件
	 */
	async fileCache(userName, action) {
		const now = Date.now()
		const fileName = now + '-' + Math.random().toString(16).split('.')[1]
		const collerction = this.db.collection('files-cache')
		const result = await collerction.add({
			'fileName': fileName,
			'action': action,
			'created_date': now,
			'created_userName': userName,
			'created_ip': this.ctx.context.CLIENTIP,
			'state': 0
			})
		if (result == null) {
			// 添加失败
			return result
		}
		return fileName
	}
}

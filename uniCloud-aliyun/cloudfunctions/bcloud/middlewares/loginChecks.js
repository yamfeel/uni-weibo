const {
	jwtSign,
	jwtVerify
} = require("../utils/_jwt.js")
const {
	loginCheckFailInfo
} = require("../model/ErrorInfo.js")
const { ErrorModel } = require("../model/ResModel.js")

async function loginCheck(ctx, next) {
	let userInfo
	let token = ctx.data.token
	let clientIP = ctx.context.CLIENTIP
	// 1. 验证token是否过有效期，过期则返回错误信息
	try {
		userInfo = await jwtVerify(token)
		ctx.userInfo = userInfo
	} catch (ex) {
		throw new ErrorModel(loginCheckFailInfo)
	}
	// 2. 验证当前客户端ip是否和token.last_ip保持一致，不一致则进一步对齐token
	if (userInfo.login_ip != ctx.context.CLIENTIP) {
		const result = await uniCloud.database().collection('blog-user').where({
			userName: UserInfo.userName
		}).field('token').get()
		if(token.split('.')[2] != result.data[0]) return new ErrorModel(loginCheckFailInfo)
	}

	// 3. 检测token剩余2天有效期时自动更新
	if (userInfo.exp - userInfo.iat < 3600 * 24 * 2) {
		const collection = uniCloud.database().collection('blog-user')
		const payload = {
			userName: userInfo.userName,
			login_ip: ctx.context.CLIENTIP,
		}
		token = await jwtSign(payload, '7days')
		const result = collection.where({
			userName: userInfo.userName
		}).update({ 'token': token.split('.')[2]})
		ctx.data.token = token
	}
	next()
}

module.exports = () => loginCheck
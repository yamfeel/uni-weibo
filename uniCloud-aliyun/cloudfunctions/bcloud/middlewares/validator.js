/**
 * @description  json schema 验证中间价
 */

const { ErrorModel } = require("../model/ResModel.js")
const {
	jsonSchemaFileInfo
} = require("../model/ErrorInfo.js")

/**
 * 生成 json schema 验证的中间件
 * @param {function} validateFn 验证函数
 */
function genValidator(validateFn) {
	// 定义中间价函数
	async function validator(ctx, next) {
		// 校验
		const data = ctx.data
		const error = validateFn(data)
		if (error) {
			// 验证失败
			const result = new ErrorModel(jsonSchemaFileInfo)
			throw result
			// throw error
		}
		// 验证成功继续
		await next()
	}
	return validator
}

module.exports = {
	genValidator
}
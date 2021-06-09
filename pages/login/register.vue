<template>
	<view>
		<view class="register_box">
			<u-form :model="form" ref="uForm">
				<u-form-item prop="userName" label-width="0" style="height: 120rpx;">
					<u-input v-model="form.userName" placeholder="请输入用户名" :border="true" />
				</u-form-item>
				<u-form-item label="性别">
					<u-radio-group v-model="form.sex" style="height: 120rpx;">
						<u-radio v-for="(item, index) in form.sexList" :key="index" :name="item.name"
							:disabled="item.disabled">
							{{ item.name }}
						</u-radio>
					</u-radio-group>
				</u-form-item>
				<u-form-item prop="email" label-width="0" style="height: 120rpx;">
					<u-input v-model="form.email" placeholder="请输入邮箱" :border="true" />
				</u-form-item>
				<u-form-item prop="password" label-width="0" style="height: 120rpx;">
					<u-input v-model="form.password" placeholder="请输入密码" :type="type" :maxlength="16" :border="true"
						:clearable="false" />
				</u-form-item>
				<u-form-item prop="password2" label-width="0" style="height: 120rpx;">
					<u-input v-model="form.password2" placeholder="请重新输入密码" :type="type" :maxlength="16" :border="true"
						:clearable="false" />
				</u-form-item>
			</u-form>
			<u-button @click="submit" style="margin-top: 30rpx;">注册</u-button>
			<u-toast ref="uToast" />
		</view>
	</view>
</template>

<script>
	import {
		debounce
	} from "../../utils/tools.js"
	export default {
		data() {
			return {
				form: {
					userName: '',
					email: '',
					password: '',
					password2: '',
					sexList: [{
							name: '男',
							disabled: false
						},
						{
							name: '女',
							disabled: false
						},
						{
							name: '保密',
							disabled: false
						}
					],
					sex: ''
				},
				removeName: false,
				type: 'password',
				border: true,
				rules: {
					email: [{
						validator: (rule, value, callback) => {
							// 上面有说，返回true表示校验通过，返回false表示不通过
							// this.$u.test.mobile()就是返回true或者false的
							return this.$u.test.email(value);
						},
						message: '邮箱格式不对',
						// 触发器可以同时用blur和change
						trigger: ['change', 'blur'],
					}],
					userName: [{
						min: 5,
						max: 16,
						message: '长度在5-16个字符之间',
						// 触发器可以同时用blur和change
						trigger: ['blur']
					}, {
						validator: (rule, value, callback) => {
							// 上面有说，返回true表示校验通过，返回false表示不通过
							// this.$u.test.mobile()就是返回true或者false的
							// console.log(this.removeName)
							return this.removeName;
						},
						message: '用户名已存在',
						// 触发器可以同时用blur和change
						trigger: ['blur','change'],
					}],
					password: [{
						required: true,
						message: '请输入密码',
						trigger: ['change', 'blur']
					}],
					password2: [{
						required: true,
						message: '重复输入密码',
						trigger: ['change', 'blur']
					}, {
						validator: (rule, value, callback) => {
							// 上面有说，返回true表示校验通过，返回false表示不通过
							// this.$u.test.mobile()就是返回true或者false的
							return this.form.password == value;
						},
						message: '两次密码不相同，请确认',
						// 触发器可以同时用blur和change
						trigger: ['blur'],
					}]
				}
			}
		},
		onLoad() {
			this.debouncedGetisExistCall = debounce(this.isExistCall, 500)
		},
		computed: {
			isExistOn() {
				return this.form.userName
			}
		},
		watch: {
			isExistOn(n, o) {
				if (n != o) {
					this.debouncedGetisExistCall()
				}
			}
		},
		methods: {
			submit() {
				let {
					userName,
					email,
					password,
					sex
				} = this.form
				sex = sex == '男' ? 1 : sex == '女' ? 2 : 0
				this.$refs.uForm.validate(valid => {
					if (valid) {
						uniCloud.callFunction({
							name: 'bcloud',
							data: {
								action: 'router/user/register',
								data: {
									userName,
									email,
									password,
									gender: sex
								}
							}
						}).then(res => {
							console.log(res.result)
							if (res.result.code == 0) {
								this.$refs.uToast.show({
									title: '注册成功',
									type: 'success',
									url: '/pages/login/login'
								})
							} else {
								// this.removeName = false
							}
						}).cache(err => {
							console.log(err)
						})
					} else {
						console.log('验证失败')
					}
				});
			},
			isExistCall() {
				uniCloud.callFunction({
					name: 'bcloud',
					data: {
						action: 'router/user/isExist',
						data: {
							userName: this.form.userName,
						}
					}
				}).then(res => {
					console.log(res.result)
					if (res.result.code == 10003) {
						this.removeName = true
					} else {
						this.removeName = false
					}
				})
			}
		},
		onReady() {
			this.$refs.uForm.setRules(this.rules);
		}
	}
</script>

<style>
	.register_box {
		margin: 60rpx;
	}
</style>

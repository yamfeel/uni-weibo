<template>
	<view>
		<view class="login_box">
			<u-form :model="form" ref="uForm">
				<u-form-item prop="userName" label-width="0" style="height: 120rpx;">
					<u-input v-model="form.userName" placeholder="请输入邮箱" :border="true"/>
				</u-form-item>
				<u-form-item prop="passwrod" label-width="0" style="height: 120rpx;">
					<u-input v-model="form.passwrod" placeholder="请输入密码" :type="type" :maxlength="16" :border="true" :clearable="false"/>
				</u-form-item>
			</u-form>
			<u-button @click="submit" style="margin-top: 30rpx;">登录</u-button>
			<u-button @click="reg" style="margin-top: 30rpx;">注册</u-button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				form: {
					userName: '',
					passwrod: ''
				},
				type: 'password',
				border: true,
				rules: {
					userName: [{
						validator: (rule, value, callback) => {
							// 上面有说，返回true表示校验通过，返回false表示不通过
							// this.$u.test.mobile()就是返回true或者false的
							return this.$u.test.email(value);
						},
						message: '邮箱格式不对',
						// 触发器可以同时用blur和change
						trigger: ['change', 'blur'],
					}],
					passwrod: [{
						required: true,
						message: '请输入密码',
						trigger: ['change', 'blur']
					}]
				}
			}
		},
		methods: {
			submit() {
				this.$refs.uForm.validate(valid => {
					if (valid) {
						console.log('验证通过');
					} else {
						console.log('验证失败');
					}
				});
			},
			reg() {
				uni.navigateTo({
					url: 'register'
				})
			}
		},
		onReady() {
			this.$refs.uForm.setRules(this.rules);
		}
	}
</script>

<style>
	.login_box {
		margin: 60rpx;
	}
</style>

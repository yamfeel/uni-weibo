<template>
	<view>
		<view class="login_box">
			<u-form :model="form" ref="uForm">
				<u-form-item prop="userName" label-width="0" style="height: 120rpx;">
					<u-input v-model="form.userName" placeholder="请输入用户名" :border="true"/>
				</u-form-item>
				<u-form-item prop="password" label-width="0" style="height: 120rpx;">
					<u-input v-model="form.password" placeholder="请输入密码" :type="type" :maxlength="16" :border="true" :clearable="false"/>
				</u-form-item>
			</u-form>
			<u-button @click="submit" style="margin-top: 30rpx;">登录</u-button>
			<u-button @click="reg" style="margin-top: 30rpx;">注册</u-button>
		</view>
	</view>
</template>

<script>
	import { mapGetters, mapMutations } from 'vuex'
	export default {
		data() {
			return {
				form: {
					userName: '',
					password: ''
				},
				type: 'password',
				border: true,
				rules: {
					userName: [{
						min: 5,
						max: 16,
						message: '长度在5-16个字符之间',
						// 触发器可以同时用blur和change
						trigger: ['blur']
					}],
					password: [{
						required: true,
						message: '请输入密码',
						trigger: ['change', 'blur']
					}]
				}
			}
		},
		computed: {
			...mapGetters('user', [
				'GET_TOKEN',
				'GET_USER_INFO'
			])
		},
		methods: {
			...mapMutations('user',[
				'SET_TOKEN',
				'SET_USER_INFO',
				'REMOVE_TOKEN'
			]),
			submit() {
				// this.SET_TOKEN()
				this.REMOVE_TOKEN()
				// console.log(this.GET_TOKEN)
				this.$refs.uForm.validate(valid => {
					if (valid) {
						console.log('验证通过');
						uniCloud.callFunction({
							name: 'bcloud',
							data: {
								action: 'router/user/login',
								data: {
									userName: this.form.userName,
									password: this.form.password
								}
							}
						}).then(res => {
							if (res.result.code == 0) {
								const data = res.result.data
								console.log('res',res.result)
								this.SET_USER_INFO(data.userInfo)
								this.SET_TOKEN(data.token)
								console.log('sd',this.GET_USER_INFO)
								uni.switchTab({
								    url: '/pages/index/index?test=1'
								})
							} else {
								console.log('error',res.result)
							}
						})
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

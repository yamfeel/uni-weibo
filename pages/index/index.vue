<template>
	<view class="content">
		<image class="logo" src="/static/logo.png"></image>
		<view class="text-area">
			<text class="title">{{title}}</text>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: 'Hello'
			}
		},
		onLoad() {
			uni.getStorage({
				key: 'userId'
			}).then(res => {
				let userId = res.data
				if (userId) {
					// 校验用户名
				} else {
					// 用户不存在，跳转注册登录页面
					console.log('用户名不存在')
					let pages = getCurrentPages()
					console.log(pages[pages.length - 1].route)
					uni.navigateTo({
						url: '../login/login'
					})
				}
			})

		},
		methods: {

		}
	}
</script>

<style>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.logo {
		height: 200rpx;
		width: 200rpx;
		margin-top: 200rpx;
		margin-left: auto;
		margin-right: auto;
		margin-bottom: 50rpx;
	}

	.text-area {
		display: flex;
		justify-content: center;
	}

	.title {
		font-size: 36rpx;
		color: #8f8f94;
	}
</style>

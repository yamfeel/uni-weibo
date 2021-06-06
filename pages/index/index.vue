<template>
	<view class="content">
		<image class="logo" src="/static/logo.png"></image>
		<view class="text-area">
			<text class="title">{{title}}</text>
			
		</view>
	</view>
</template>

<script>
	import { mapState } from 'vuex'
	export default {
		data() {
			return {
				title: 'Hello'
			}
		},
		onShow(option) {
			uniCloud.callFunction({
				name: 'bcloud',
				data: {
					action: 'router/user/userTest',
					data: {
						token: this.token
					}
				}
			}).then(res => {
				console.log('token',this.token)
				console.log(res.result)
				
			})

		},
		computed: {
			...mapState('user',[
				'userInfo',
				'token'
			])
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

<template>
	<view>
		<view class="header">
			<view class="header-left">
				<u-image width="150rpx" height="150rpx" shape="circle" :fade="true" duration="450"
					:src="this.userInfo.picture" mode=""></u-image>
			</view>
			<view class="header-right">
				<view class="userInfo-name">
					<u-cell-group>
						<u-cell-item :icon="this.GET_GENDER_ICON" :title="'UID：'+this.userInfo.userName"
							hover-class="cell-hover-class" @click="setting()"></u-cell-item>
					</u-cell-group>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		mapState,
		mapGetters
	} from "vuex"
	export default {
		data() {
			return {

			}
		},
		computed: {
			...mapState('user', [
				'userInfo'
			]),
			...mapGetters('user', [
				'GET_GENDER_ICON'
			]),
		},
		methods: {
			setting() {
				uni.navigateTo({
					url: 'user-info'
				})
			}
		}
	}
</script>

<style scoped>
	.header {
		margin: 50rpx;
		display: flex;
		/* background-color: #007AFF; */
		overflow: hidden;
	}

	.header-left {
		width: 25%;
		/* background-color: #ff948b; */
	}

	.header-right {
		width: 100%;
		height: 80rpx;
		/* background-color: #00ffd7; */
	}

	.userInfo-name {
		/* display: flex; */
		margin-top: 20rpx;
		width: 100%;
		/* background-color: #00ffd7; */
	}

	.cell-hover-class {
		opacity: 0.5;
	}
</style>

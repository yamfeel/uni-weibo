<template>
	<view>
		<view class="user-avatar" style="margin:50rpx 0; width: 100%; height: 200rpx;">
			<view style="margin: 0 auto; width: 200rpx; height: 200rpx;">
				<u-avatar :src="avatar" style="width: 200rpx;height: 200rpx;"></u-avatar>
			</view>
		</view>
		<view class="user-info">
			<u-cell-group>
				<u-cell-item :icon="'camera-fill'" :title="'修改头像'" hover-class="cell-hover-class" @click="chooseAvatar">
				</u-cell-item>
				<u-cell-item :icon="'account'" :title="'修改昵称'" hover-class="cell-hover-class" @click="showNickName"></u-cell-item>
				<u-cell-item :icon="'lock'" :title="'修改密码'" hover-class="cell-hover-class" @click="showPassword"></u-cell-item>
			</u-cell-group>
		</view>
		<u-popup v-model="show" mode="bottom" length="60%" :closeable="true" close-icon="close-circle">
			<view v-show="nickNameModify" class="modify" style="margin: 50rpx; margin-top: 120rpx;">
				<u-input placeholder="请输入昵称" v-model="value" type="text" :border="true"
					:clearable="false" />
				<u-button @click="submit" style="margin-top: 30rpx;">保存</u-button>
			</view>
			<view v-show="passwordModify" class="modify" style="margin: 50rpx; margin-top: 120rpx;">
				<u-input placeholder="请输入旧密码" v-model="pwd.oldPwd" type="password" :border="true"
					:clearable="false" />
				<u-input placeholder="请输入新密码" v-model="pwd.newPwd" type="password" :border="true" style="margin-top: 30rpx;"
					:clearable="false" />
				<u-input placeholder="请重复输入密码" v-model="pwd.rePwd" type="password" :border="true" style="margin-top: 30rpx;"
					:clearable="false" />
				<u-button @click="submit" style="margin-top: 30rpx;">修改</u-button>
			</view>
		</u-popup>
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
				avatar: '',
				show: false,
				value: '',
				nickNameModify: false,
				passwordModify: false,
				pwd: {
					oldPwd: '',
					newPwd: '',
					rePwd: ''
				}
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
		onShow() {
			if (this.avatar == '') this.avatar = this.userInfo.picture
			// 监听从裁剪页发布的事件，获得裁剪结果
			uni.$on('uAvatarCropper', path => {
				this.avatar = path;
				// 可以在此上传到服务端
				uni.uploadFile({
					url: 'http://www.example.com/upload',
					filePath: path,
					name: 'file',
					complete: (res) => {
						console.log(res);
					}
				});
			})
		},
		methods: {
			chooseAvatar() {
				// 此为uView的跳转方法，详见"文档-JS"部分，也可以用uni的uni.navigateTo
				this.$u.route({
					// 关于此路径，请见下方"注意事项"
					url: '/uview-ui/components/u-avatar-cropper/u-avatar-cropper',
					// 内部已设置以下默认参数值，可不传这些参数
					params: {
						// 输出图片宽度，高等于宽，单位px
						destWidth: 300,
						// 裁剪框宽度，高等于宽，单位px
						rectWidth: 200,
						// 输出的图片类型，如果'png'类型发现裁剪的图片太大，改成"jpg"即可
						fileType: 'jpg',
					}
				})
			},
			showNickName() {
				this.nickNameModify = true
				this.passwordModify = false
				this.show = true
			},
			showPassword() {
				this.nickNameModify = false
				this.passwordModify = true
				this.show = true
			},
		}
	}
</script>

<style scoped>
	.cell-hover-class {
		opacity: 0.5;
	}

	.wrap {
		padding: 40rpx;
	}

	.u-avatar-wrap {
		margin-top: 80rpx;
		overflow: hidden;
		margin-bottom: 80rpx;
		text-align: center;
	}

	.u-avatar-demo {
		width: 150rpx;
		height: 150rpx;
		border-radius: 100rpx;
	}
</style>

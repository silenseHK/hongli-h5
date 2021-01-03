<template>
	<view>

		<view class="lang">
			<text>Currently selected language: {{text}}</text>
		</view>
		<button type="primary" @tap="handleLang">language</button>
		<u-action-sheet :list="langList" v-model="isLanguage" cancel-text="cancel" @click="handleLangs"></u-action-sheet>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				titleStyles: {
					fontSize: '54rpx',

				},
				isLanguage: false,
				langList: [{
					text: 'English',
					color: 'blue',
					fontSize: 28,

				}, {
					text: 'हिंदी'
				}],
				text:''
			}
		},
		onLoad() {
			const system_info = uni.getStorageSync('system_info')
			if(system_info.language === 'en' ) {
				this.text = 'English'
			} else {
				this.text = "हिंदी"
			}
		},
		methods: {
			handelLogin() {
				this.$Router.push({
					name: 'login'
				})
			},
			handleLang() {
				this.isLanguage = !this.isLanguage
			},
			handleLangs(index) {
				const system_info = uni.getStorageSync('system_info')
				// console.log(system_info)
				if(index===0) {
					system_info.language = this._i18n
						.locale = 'en'
					uni.setStorageSync('system_info', system_info)
					uni.reLaunch({
						url: 'index'
					})
					this.$Router.push({
						name:'index'
					})
					this.text = 'English'
				} else {
					system_info.language = this._i18n.locale = 'fr'
					uni.setStorageSync('system_info', system_info)
					uni.reLaunch({
						url: 'index'
					})
					this.$Router.push({
						name:'index'
					})
					this.text = "हिंदी"
				}
				
			},
			// change() {
			// 	const system_info = uni.getStorageSync('system_info')
			// 	console.log(system_info)

			// 	system_info.language === 'en' ? system_info.language = this._i18n.locale = 'fr' : system_info.language = this._i18n
			// 		.locale = 'en'
			// 	uni.setStorageSync('system_info', system_info)
			// 	uni.reLaunch({
			// 		url: 'index'
			// 	})
			// },
		}
	}
</script>

<style lang="scss" scoped>
	/* App.vue */
	.cell-hover-class {
		background-color: rgb(235, 237, 238);
	}

	/* 或者单是设置透明度 */
	.cell-hover-class {
		opacity: 0.5;
	}
	.lang{
		margin: 30upx 0;
		padding: 0 30upx;
	}
</style>

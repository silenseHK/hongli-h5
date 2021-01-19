<template>
	<view>
		<view class="u-text-center u-font-35 u-p-t-30 u-p-b-30" style="color: #e2bf88;">{{i18.enjoy.guessNavbar}}</view>
		<view class=" u-p-l-20 u-p-r-20 text-body u-flex-col">
			<text class=""> {{i18.enjoy.text1}}</text>
			<text class=""> {{i18.enjoy.text7}}</text>
			<text class=""> {{i18.enjoy.text8}}</text>
			<text class=""> {{i18.enjoy.text9}}</text>
			<text class=""> {{i18.enjoy.text10}}</text>
			<text class=""> {{i18.enjoy.text11}}</text>
			<text>
				{{i18.enjoy.text2}}
			</text>
			<text> {{i18.enjoy.text3}}</text>
			<text> {{i18.enjoy.text4}}</text>
			<text> {{i18.enjoy.text5}}</text>
			<text> {{i18.enjoy.text6}}
			</text>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			}
		},
		computed: {
			i18() {
				return this.$t('index')
			}
		},
		onReady() {
			uni.setNavigationBarTitle({
				title: this.i18.enjoy.guessNavbar
			})
		},
		methods: {

		}
	}
</script>

<style lang="scss" scoped>
	.text-body {
		color: black;
		opacity: 0.6;
		line-height: 60rpx;
	}
</style>

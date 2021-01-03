<template>
	<view class="friends">
		<view>
			<img src="../../common/promotion/invite_icon.acd132c4.png" alt="" width="100%" height="400rpx">

		</view>
		<view class="u-p-l-40 u-p-r-40 u-m-t-40">
			<view class="erweima u-flex u-row-around ">
				<view class="canvasBox">
					<canvas canvas-id="canvas" id="canvas" class="canvasCss"/>
					<image :src="imgUrl" style="width: 200rpx; height: 200rpx;" ></image>
				</view>
				<view class="u-flex-col" style="color: #000000;">
					<text>{{i18.active.invite}}</text>
					<text class="u-m-t-20 u-m-b-20">{{codes}}</text>
					<u-button size="mini" @click="copy()">{{i18.active.copy}}</u-button>
				</view>
			</view>
		</view>
		<!-- <image :src="imgUrl" style="width: 100%; height: 100%" /> -->


	</view>
</template>

<script>
	import DrawPoster from "../../components/js_sdk/u-draw-poster";
	import drawQrCode from "../../components/js_sdk/u-draw-poster/extends/draw-qr-code";

	DrawPoster.useCtx(drawQrCode);
	import h5Copy from '../../components/junyi-h5-copy/junyi-h5-copy.js'
	import baseUrl from '../../utils/baseUrl.js'
	export default {

		data() {
			return {
				numList: [{
					name: '下单'
				}, {
					name: '出库'
				}, {
					name: '运输'
				}, {
					name: '签收'
				}, ],
				imgUrl: '',
				code: '',
				codes: ''
			}
		},
		computed: {
			i18() {
				return this.$t('index')
			}
		},
		onLoad() {
			const codes = uni.getStorageSync('code')
			this.codes = codes
			this.code = `${baseUrl.shareUrl}?code=${codes}#/pages/register/register`
			// this.code = `http://999666.in/?code=${codes}#/pages/register/register`
			// console.log(this.code)
		},
		async onReady() {
			uni.setNavigationBarTitle({
				title: this.i18.active.fridNavbar
			})
			// 创建绘制工具
			const dp = await DrawPoster.build("canvas");
			const w = (dp.canvas.width = 300);
			const h = (dp.canvas.height = 300);
			// 创建一个绘制任务
			dp.draw(async (ctx) => {
				ctx.fillStyle = "#fff";
				ctx.fillRect(0, 0, w, h);
				// 绘制二维码
				ctx.drawQrCode({
					x: 0,
					// y: h / 2 - 50,
					text: this.code,
					// size: 110
					size:300
				});
			});
			this.imgUrl = await dp.createImagePath();
			// console.log('this.imgUrl---->',this.imgUrl)
		},

		methods: {
			copy() {
				let content = this.code 
				const result = h5Copy(content)
				if (result === false) {
					uni.showToast({
						title: 'error',
					})
				} else {
					uni.showToast({
						title: 'success',
						icon: 'none'
					})
				}
			},

		}
	}
</script>

<style scoped lang="scss">
	.friends {
		background-color: black;
		// height: 100%;
		height: 100vh;
		overflow: hidden;

		.erweima {
			background-image: linear-gradient(to right, #e6c593, #ebebeb);
			width: 100%;
			height: 300rpx;
			border-radius: 10rpx;
		}
	}
	.canvasCss{
		width: 300px;
		height: 300px;
		position: absolute;
		top: -300%;
	}
</style>

<template>
	<view class="">
		<uni-nav-bar left-icon="back" :title="title" @clickLeft="navLink" :backgroundColor="backgroundColor" :color="color"></uni-nav-bar>
		<NavTabs :modelData="orderList" :initIndex="currentIndex" @change="handelChange"></NavTabs>

		<view class="record">
			<view class="record-header">
				<!-- top -->
				<view class="u-flex u-row-between">
					<view class=" u-flex-col">
						<text>Period</text>
						<text class="record-header-text">20201113870</text>
					</view>
					<view class=" u-flex-col">
						<text>Count Down</text>
						<text class="record-header-text"><u-count-down :timestamp="timestamp"></u-count-down></text>
					</view>
				</view>
				<view class="u-flex u-row-between u-m-t-45">
					<view class=" u-flex-col">
						<text>PrePeriod</text>
						<text class="record-header-text">20201113879</text>
					</view>
					<view class=" u-flex-col">
						<text>Result</text>
						<text class="record-header-text">32</text>
					</view>
				</view>
				<!-- bottom -->

				<view class=" u-flex u-row-around u-m-t-40">
					<text>Red:98</text>
					<text>Green:102</text>
					<text>Violet:42</text>
				</view>
			</view>
			<view class="record-main">
				
			</view>
			<view class="record-footer"></view>
		</view>
	</view>
</template>

<script>
	import NavTabs from '../../../components/NavTabs/NavTabs.vue'
	import uniNavBar from "../../../components/uni-nav-bar/uni-nav-bar.vue"
	export default {
		components: {
			NavTabs,
			uniNavBar
		},
		data() {
			return {
				timestamp:86400,
				backgroundColor: 'black',
				color: 'white',
				currentIndex: 0,

				title: 'Gold Record',
				orderList: [{
					label: 'Gold'
				}, {
					label: 'Jewelry'
				}, {
					label: 'Silver',

				}, {
					label: 'Other',

				}],
			}
		},
		methods: {
			handelChange(index) {

			},
			navLink() {
				this.$Router.push({
					name: 'enjoy'
				})
			}

		}
	}
</script>

<style lang="scss" scoped>
	.record {
		padding: 0 30upx;

		&-header {
			margin-top: 30upx;

			&-text {
				font-size: 45upx;
				margin-top: 8upx;
			}
		}

		&-main {}

		&-footer {}
	}
</style>

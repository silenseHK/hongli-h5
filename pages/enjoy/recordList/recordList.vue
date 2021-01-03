<template>
	<view class="wrap">
		<view class="recor-top">
			<view class=" u-flex u-row-between u-p-r-15 u-p-l-15 u-p-t-20 u-p-b-20">
				<text>{{i18.enjoy.Period}}</text>
				<text>{{i18.enjoy.num}}</text>
				<text>{{i18.enjoy.result}}</text>
			</view>
		</view>

		<view class=" u-p-t-80">
			<block v-for="(item,index) in recordLists ">
				<view class=" u-flex u-row-between  u-p-r-15 u-p-l-15 u-p-t-20 " :key=" index">
					<text>{{item.number}}</text>
					<view :class="daawTextList[item.prize_number]">{{item.prize_number}}</view>
					<text style="width: 230upx ; text-align: right;">
						{{(item.prize_number == 0 ? 'Even Lucky' : item.prize_number == 5 ? 'Odd Lucky' : item.prize_number%2==0 ? 'Even' : 'Odd')}}
					</text>
					<!-- <text v-if="item.prize_number==0" style="width: 230upx ; text-align: right;">Even Lucky</text>
					<text v-if="item.prize_number==1" style="width: 230upx ; text-align: right;">Odd</text>
					<text v-if="item.prize_number==2" style="width: 230upx ; text-align: right;">Even Lucky</text>
					<text v-if="item.prize_number==3" style="width: 230upx ; text-align: right;">Even</text>
					<text v-if="item.prize_number==4" style="width: 230upx ; text-align: right;">Odd</text>
					<text v-if="item.prize_number==5" style="width: 230upx ; text-align: right;">Even Lucky</text>
					<text v-if="item.prize_number==6" style="width: 230upx ; text-align: right;">Odd</text>
					<text v-if="item.prize_number==7" style="width: 230upx ; text-align: right;">Even</text>
					<text v-if="item.prize_number==8" style="width: 230upx ; text-align: right;">Odd</text>
					<text v-if="item.prize_number==9" style="width: 230upx ; text-align: right;">Even</text> -->
				</view>
			</block>
		</view>
		<view v-show="isLoadMore">
			<u-loadmore :status="status" :icon-type="iconType" :load-text="loadText"  />
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				status: 'loadmore',
				iconType: 'flower',
				recordLists: [],
				pagesize: 30,
				page: 1,
				loadStatus: 'loading', //加载样式：more-加载前样式，loading-加载中样式，nomore-没有数据样式
				isLoadMore: false, //是否加载中
				loadText: {
					loadmore: '',

					loading: 'loadding more',
					nomore: 'No more data'
				},
				daawTextList: [
					"draw-text0",
					"draw-text1",
					"draw-text2",
					"draw-text3",
					"draw-text4",
					"draw-text5",
					"draw-text6",
					"draw-text7",
					"draw-text8",
					"draw-text9"
				],
			}
		},
		onLoad() {
			this.getbetting()

		},

		computed: {
			i18() {
				return this.$t('index')
			}
		},
		onReady() {
			// console.log(this.$Route.query.titleName)
			uni.setNavigationBarTitle({
				// title: this.i18.enjoy.golidNavbar
				title: this.$Route.query.titleName + 'Record'
			})
		},
		onReachBottom() { //上拉触底函数
			if (!this.isLoadMore) { //此处判断，上锁，防止重复请求
				this.isLoadMore = true
				this.page += 1
				this.getbetting()
			}
		},
		methods: {
			async getbetting() {
				const params = {
					limit: this.pagesize,
					page: this.page,
					game_id: this.$Route.query.gameId
				}
				const {
					code,
					data
				} = await this.$api.gameList(params)
				if (code == 200) {
					if (data) {
						this.recordLists = this.recordLists.concat(data)
						if (data.length < this.pagesize) { //判断接口返回数据量小于请求数据量，则表示此为最后一页
							this.isLoadMore = true
							this.loadStatus = 'nomore'
						} else {
							this.isLoadMore = false
						}
					} else {
						this.isLoadMore = true
						this.loadStatus = 'nomore'
					}
				} else { //接口请求失败的处理
					uni.showToast({
						title: res.data.msg,
						icon: 'none'
					})
					this.isLoadMore = false
					if (this.page > 1) {
						this.page -= 1
					}
				}

			},
			// async getbettings() {
			// 	const params = {
			// 		limit: this.list,
			// 		page: this.page,
			// 		game_id: this.$Route.query.gameId
			// 	}
			// 	const data = await this.$api.gameList(params)
			// 	if (data.code === 200) {
			// 		this.recordLists = this.recordLists.concat(data.data)
			// 	}

			// },

		}
	}
</script>

<style lang="scss" scoped>
	.recor-top {
		width: 100%;
		position: fixed;
		background-color: #ebecef;
	}

	.tab-list {
		width: 150rpx;
		text-align: center;
	}

	// 文本颜色--------------
	.draw-text0 {
		color: #8b6de9 !important;
		width: 150rpx;
		text-align: center;
	}

	.draw-text1 {
		color: #2cc747 !important;
		width: 150rpx;
		text-align: center;
	}

	.draw-text2 {
		color: #ff5153 !important;
		width: 150rpx;
		text-align: center;
	}

	.draw-text3 {
		color: #2cc747 !important;
		width: 150rpx;
		text-align: center;
	}

	.draw-text4 {
		color: #ff5153 !important;
		width: 150rpx;
		text-align: center;
	}

	.draw-text5 {
		color: #8b6de9 !important;
		width: 150rpx;
		text-align: center;
	}

	.draw-text6 {
		color: #ff5153 !important;
		width: 150rpx;
		text-align: center;
	}

	.draw-text7 {
		color: #2cc747 !important;
		width: 150rpx;
		text-align: center;
	}

	.draw-text8 {
		color: #ff5153 !important;
		width: 150rpx;
		text-align: center;
	}

	.draw-text9 {
		color: #2cc747 !important;
		width: 150rpx;
		text-align: center;
	}
</style>

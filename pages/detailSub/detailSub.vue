<template>
	<view class="u-m-t-20 ">
		<view class="u-p-l-40 u-p-r-40">
			<MyTabs :tabList="tabList" :tabIndex="tabIndex" @changeTab="changeTab" />

		</view>
		<view class="">
			<block v-for="item in commissionList" :key="item.id">
				<view class="container">
					<view class=" u-flex u-row-between u-m-t-30 ">
						<text>username:</text>
						<text class="title">{{item.user.nickname}}}</text>
					</view>
					<view class="u-flex u-row-between u-m-t-30 u-m-b-30">
						<text>Creation time:</text>
						<text>{{item.create_time*1000|friendDate}}</text>
					</view>
					<view class="u-flex u-row-between">
						<text>Income type:</text>
						<text v-if="item.type===0">System benefits</text>
						<text v-if="item.type===1">First class agent</text>
						<text v-if="item.type===2">Secondary agent</text>
					</view>
					<view class="u-flex u-row-between u-m-t-30 u-m-b-30">
						<text>Income amount:</text>
						<text>{{item.money}}</text>
					</view>
				</view>
			</block>
		</view>

	</view>
</template>

<script>
	import MyTabs from '../../components/MyTabs'
	export default {
		components: {
			MyTabs
		},
		data() {
			return {
				tabIndex: 0,
				currentIndex: 1,
				tabList: [{
						index: 0,
						name: ' Level 1 ',
						component: 'one'
					},
					{
						index: 1,
						name: ' Level 2',
						component: 'two'
					}
				],
				commissionList: []
			}
		},
		computed: {
			i18() {
				return this.$t('index')
			}
		},
		onLoad() {
			this._requestCommission()
		},
		// activated() {
		// 	this._requestCommission()
		// },
		onReady() {
			uni.setNavigationBarTitle({
				title: this.i18.active.dataNavbar
			})
			this.tabList[0].name = this.i18.active.level1
			this.tabList[1].name = this.i18.active.level2
		},
		methods: {
			// 切换选项卡
			changeTab(tab) {
				this.currentIndex = tab.index + 1
				this._requestCommission()
				this.tabIndex = tab.index
				// this.currentContent = tab.component
			},
			/* 
				获取一二级记录
			 */
			async _requestCommission(num) {
				const params = {
					type: this.currentIndex
				}
				const {
					data,
					code
				} = await this.$api.requestCommission(params)
				if (code === 200) {
					this.commissionList = data
				} else {
					this.$util.msg(data.msg)
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.container {
		display: flex;
		flex-direction: column;
		border-radius: 12upx;
		padding: 30upx;
		margin: 30upx;
		box-shadow: 0 0.5px 5px 0 rgba(0, 0, 0, 0.2);

		.title {
			width: 300upx;
			overflow: hidden;
			text-overflow: ellipsis;
			white-space:nowrap; 
		}
	}
</style>

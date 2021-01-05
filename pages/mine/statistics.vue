<template>
	<view class="main">
		<view>
			<u-tabs-swiper ref="uTabs" 
				font-size="35" 
				active-color="#e2bf88" 
				:list="types" 
				:bold="false"
				:current="current" 
				@change="tabsChange" 
				:is-scroll="false" 
				swiperWidth="750"
			>
				
			</u-tabs-swiper>
		</view>
		<swiper class="uni-swiper-group" :current="swiperCurrent" @transition="transition" @animationfinish="animationfinish">
			<swiper-item class="swiper-item" v-for="(type, index) in types" :key="index">
				<u-table padding="14px 2px"
				>
						<u-tr>
							<u-th>#</u-th>
							<u-th class="u-th">{{i18.mine.betting}}</u-th>
							<u-th>{{i18.mine.winning}}</u-th>
							<u-th>{{i18.mine.winOrLose}}</u-th>
						</u-tr>
						<u-tr v-for="(tabItem, index) in tabs.list" :key="index">
							<u-td>{{tabItem.name}}</u-td>
							<u-td>{{tabItem.t_money}}</u-td>
							<u-td>{{tabItem.t_win_money}}</u-td>
							<u-td>{{tabItem.win_lose}}</u-td>
						</u-tr>
						<u-tr v-if="tabs.list && tabs.list.length">
							<u-td>-</u-td>
							<u-td>{{tabs.count_money}}</u-td>
							<u-td>{{tabs.count_win_money}}</u-td>
							<u-td>{{tabs.count_win_lose_money}}</u-td>
						</u-tr>
					</u-table>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				types: [],
				// 因为内部的滑动机制限制，请将tabs组件和swiper组件的current用不同变量赋值
				current: 0, // tabs组件的current值，表示当前活动的tab选项
				swiperCurrent: 0,
				tabs: [],
			}
		},
		onReady() {
			this.initTypes();
			this.getStatistics(this.swiperCurrent);
		},
		computed: {
			i18() {
				return this.$t('index')
			}
		},
		watch: {
			swiperCurrent(newVal, old){
				if(newVal != old){
					this.getStatistics(newVal);
				}
			}
		},
		methods: {
			initTypes(){
				this.types = [{
					name: this.i18.mine.today,
					type: 1
				}, {
					name: this.i18.mine.yesterday,
					type: 2
				}, {
					name: this.i18.mine.thisMonth,
					type: 3
				}];
			},
			// tabs通知swiper切换
			tabsChange(index) {
				this.swiperCurrent = index;
			},
			// swiper-item左右移动，通知tabs的滑块跟随移动
			transition(e) {
				let dx = e.detail.dx;
				this.$refs.uTabs.setDx(dx);
			},
			// 由于swiper的内部机制问题，快速切换swiper不会触发dx的连续变化，需要在结束时重置状态
			// swiper滑动结束，分别设置tabs和swiper的状态
			animationfinish(e) {
				let current = e.detail.current;
				this.$refs.uTabs.setFinishCurrent(current);
				this.swiperCurrent = current;
				this.current = current;
			},
			async getStatistics(index) {
				let type = this.types[index].type;
				let res = await this.$api.statistics({params: {type: type}});
				this.tabs = res.data;
			}
		}
		
	}
</script>

<style lang="scss">
	.uni-swiper-group {
		min-height: calc(100vh - 40px);
	}
	.u-th {
		background: #FFFFFF;
	}
</style>

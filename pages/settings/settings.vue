<template>
	<view>
		<view class="u-m-t-20">
			<view class="setting">
				<SettingList :titleList="titleList" @settings="handelSting" />
				
			</view>
		</view>
	</view>
</template>

<script>
	import SettingList from '../../components/SettingList.vue'
	export default {
		components: {
			SettingList
		},
		data() {
			return {
				titleList: [{
						title: 'Account Security',
						icon: 'rmb-circle',
						link: 'security'
					},
					{
						title: 'About Us',
						icon: 'info',
						link: 'about'
					},
					// {
					// 	title: 'Complaints&Suggestions',
					// 	icon: 'info-circle',
					// 	link: 'sdffs'
					// }
				]
			}
		},
		computed: {
			i18() {
				return this.$t('index')
			}
		},
	
		onReady() {
			uni.setNavigationBarTitle({
				title: this.i18.setting.settingNavbar
			})
			this.titleList[0].title = this.i18.setting.account
			this.titleList[1].title = this.i18.setting.about
			// this.titleList[2].title = this.i18.setting.compli

		},
		methods: {
			handelSting(item) {
				this.$Router.push({
					name:item.name
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.setting {
		color: #e2bf88;
		font-size: 30rpx;
		padding: 0 30rpx;
	}

	.setting-item {
		color: #e2bf88;
		font-size: 30rpx;
	}
</style>

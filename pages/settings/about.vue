<template>
	<view>
		<SettingList :titleList="titleList"  @settings="handelStings" />
	</view>
</template>

<script>
	import SettingList from '../../components/SettingList.vue'
	export default {
		components:{
			SettingList
		},
		data() {
			return {
				titleList: [{
						title: 'Privacy Policy',
						icon: 'lock-fill',
						link: 'privacy'
					},
					{
						title: 'Risk Disclosure Agreement',
						icon: 'chat',
						link: 'agreement'
					},{
						title: 'About Us',
						icon: 'error-circle',
						link: 'aboutinfo'
					}
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
				title: this.i18.setting.about
			})
			this.titleList[0].title = this.i18.setting.policy
			this.titleList[1].title = this.i18.setting.risk
			this.titleList[2].title = this.i18.setting.about
			
		},
		methods: {
			handelStings(options){
				this.$Router.push({
					name: "privacy",
					params: {type: options.type, titleItem: this.titleList[options.type - 1]}
				})
			}
		}
	}
</script>

<style>

</style>

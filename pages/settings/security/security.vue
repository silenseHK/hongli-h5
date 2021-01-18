<template>
	<view>
		<SettingList :titleList="titleList"  @settings="handelStings" />
	</view>
</template>

<script>
	import SettingList from '../../../components/SettingList.vue'
	export default {
		components:{
			SettingList
		},
		data() {
			return {
				titleList: [{
						title: 'Modify Name',
						icon: 'zhuanfa',
						link: 'modifyName'
					},
					{
						title: 'Modify Login Password',
						icon: 'lock',
						link: 'modifyWord'
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
				title: this.i18.setting.security
			})
			this.titleList[0].title = this.i18.setting.modify
			this.titleList[1].title = this.i18.setting.password

			
		},
		methods: {
			handelStings(item){
				this.$Router.push({
					name:item.name
				})
			}
		}
	}
</script>

<style>

</style>

<template>
	<view>
		<!-- 顶部navbar--start -->
		<view>
			<view class="app-customer" @click="handelService" :class="isServer?'service-bg1':'service-bg'" v-show="isGroup">
				<view class=" u-flex-col u-row-center u-p-t-20">
					<image src="../static/service.png" mode="" style="width: 40upx; height: 40upx; margin: auto;"></image>
					<text class="u-text-center" style="color: white; font-size: 20upx;">Service</text>
				</view>
			</view>
			<view class="" v-if="isServer">
				<view class="app-grouap  u-flex-col u-row-center u-p-t-10" @tap="handleClick(0)">
					<image v-if="setting[0].icon == 'whats_app'" src="../static/service/whats_app.png" mode="" style="width: 40upx; height: 40upx; margin: auto;"></image>
					<image v-else src="../static/service/group.png" mode="" style="width: 40upx; height: 40upx; margin: auto;"></image>
					<text class="u-text-center u-p-b-20" style="color: white; font-size: 18upx;">{{setting[0].title}}</text>
				</view>
				<view class="app-whates  u-flex-col u-row-center u-p-t-10" @tap="handleClick(1)">
					<image v-if="setting[1].icon == 'whats_app'" src="../static/service/whats_app.png" mode="" style="width: 40upx; height: 40upx; margin: auto;"></image>
					<image v-else src="../static/service/group.png" mode="" style="width: 40upx; height: 40upx; margin: auto;"></image>
					<text class="u-text-center u-p-b-20" style="color: white; font-size: 18upx;">{{setting[1].title}}</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				isServer: false,
				isGroup: true,
				setting: [],
				img : "../static/service/whats_app.png"
			};
		},
		created(){
			this.getServiceSetting();
		},
		methods:{
			handelService() {
				this.isServer = !this.isServer;
			},
			async getServiceSetting(){
				const data = await this.$api.getServiceSetting();
				if(data.code === 200){
					let setting = data.data;
					this.setting = setting;
				}
			},
			
			handleClick(index){
				window.location.href = this.setting[index].link
			}
		}
	}
</script>

<style lang="scss">

</style>

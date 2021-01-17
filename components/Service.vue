<template>
	<view v-show="isShow">
		<!-- 顶部navbar--start -->
		<view>
			<view class="app-customer" @click="handelService" :class="isServer?'service-bg1':'service-bg'" v-show="isGroup">
				<view class=" u-flex-col u-row-center u-p-t-20">
					<image src="../static/service.png" mode="" style="width: 40upx; height: 40upx; margin: auto;"></image>
					<text class="u-text-center" style="color: white; font-size: 20upx;">Service</text>
				</view>
			</view>
			<view class="" v-if="isServer">
				<view v-for="(item, k) in setting" v-if="k < 2" :key="k" :class="{'app-grouap':k==0?true:false, 'app-whates':k==1?true:false, 'u-flex-col':true,'u-row-center':true, 'u-p-t-10':true}" @tap="handleClick(0)">
					<image :src="require(`../static/service/${item.icon}.png`)" mode="" style="width: 40upx; height: 40upx; margin: auto;"></image>
					<text class="u-text-center u-p-b-20" style="color: white; font-size: 18upx;">{{item.title}}</text>
				</view>
				<!-- <view class="app-whates  u-flex-col u-row-center u-p-t-10" @tap="handleClick(1)">
					<image v-if="setting[1].icon == 'whats_app'" :src="require(`../static/service/${setting[1].icon}.png`)" mode="" style="width: 40upx; height: 40upx; margin: auto;"></image>
					<image v-else src="../static/service/group.png" mode="" style="width: 40upx; height: 40upx; margin: auto;"></image>
					<text class="u-text-center u-p-b-20" style="color: white; font-size: 18upx;">{{setting[1].title}}</text>
				</view>
				<view class="app-whates  u-flex-col u-row-center u-p-t-10" @tap="handleClick(1)">
					<image v-if="setting[1].icon == 'telegram'" :src="require(`../static/service/${setting[1].icon}.png`)" mode="" style="width: 40upx; height: 40upx; margin: auto;"></image>
					<image v-else src="../static/service/group.png" mode="" style="width: 40upx; height: 40upx; margin: auto;"></image>
					<text class="u-text-center u-p-b-20" style="color: white; font-size: 18upx;">{{setting[1].title}}</text>
				</view> -->
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				isShow: false,
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
					if(setting[2] == 1){
						this.isShow = true;
					}
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

<template>
	<view>
		<!-- 顶部navbar--start -->
		<!-- <view>
			<view class="app-customer" @click="handelService" :class="isServer?'service-bg1':'service-bg'" v-show="isGroup">
				<view class=" u-flex-col u-row-center u-p-t-20">
					<image src="../../static/service.png" mode="" style="width: 40upx; height: 40upx; margin: auto;"></image>
					<text class="u-text-center" style="color: white; font-size: 20upx;">Service</text>
				</view>
			</view>
			<view class="" v-if="isServer">
				<view class="app-grouap  u-flex-col u-row-center u-p-t-10" @tap="handelservices">
					<image src="../../static/phoneicon.png" mode="" style="width: 40upx; height: 40upx; margin: auto;"></image>
					<text class="u-text-center u-p-b-20" style="color: white; font-size: 20upx;">Group</text>
				</view>
				<view class="app-whates  u-flex-col u-row-center u-p-t-10" @tap="handelGrop">
					<image src="../../static/whatsapp.f636c058.png" mode="" style="width: 40upx; height: 40upx; margin: auto;"></image>
					<text class="u-text-center u-p-b-20" style="color: white; font-size: 18upx;">WhatsApp</text>
				</view>
			</view>
		</view> -->
		<service></service>
		<view class="app-download" v-if="appDownloadInfo.status != 0">
			<view class="u-flex">
				<image src="../../static/app.png" mode="" class="app-img"></image>
				<text>{{i18n.home.top}}</text>
			</view>
			<view class="">
				<u-button type="primary" @click="downloadApp" size="mini" :ripple="true" style="background: #a88571;">{{i18n.home.topbtn}}</u-button>
			</view>
		</view>
		<!-- <view class="u-text-center app-text">
			<text>{{i18n.home.toptext}}</text>

		</view> -->
		<!-- 轮播图 --start -->
		<view class="wrap">
			<u-swiper @click="swiperClick" :list="list" height="400"></u-swiper>
		</view>
		<!-- 轮播图 --end -->

		<!-- 搜索框--start -->

		<view class="top-input u-flex u-p-r-32">
			<u-search :placeholder="i18n.home.input" :action-text="i18n.home.inputText" class="" shape="square" v-model="keyword"></u-search>
			<!-- <u-icon name="search" color="#df974b" size="28" class="u-padding-left-26"></u-icon>
			<u-input v-model="value" :type="type" class="u-padding-left-10" placeholder="Please enter the search content" />
			<u-button class="custom-style" size="mini" style="background: #df974b;" ripple>search</u-button> -->
		</view>
		<!-- 搜索框--end -->
		<!-- 列表区域--start -->
		<view class="u-m-b-60">
			<view class="u-font-xl  u-border-bottom list-title ">{{i18n.home.listTitle}}</view>
			<u-grid :col="2">
				<u-grid-item v-for="(item, index) in listItem" :key="index" class="u-padding-x-26" @click="commodity(item)">
					<image :src="item.cover_img.path" class="list-items"></image>
					<view class="grid-text u-font-xl list-item-2">{{item.name}}</view>
					<view class="grid-text u-font-xl" style="color: #df974b;">₹{{item.price}}</view>
				</u-grid-item>
			</u-grid>
			<!-- 	<button type="primary" @tap="change">切换语言</button> -->
            <u-loadmore color="#6e7074"  margin-top="10" icon-type="flower" :load-text="productSearch.loadText" :status="productSearch.status" />
        </view>
		<!-- 列表区域--end -->

		<!-- 模态框 -->
		<u-modal v-model="showLoginAlert" :show-title="false" confirm-color="#a7866e" border-radius="22" show-cancel-button
		 show-confirm-button :confirm-text="i18n.tabbar.group" :cancel-text="i18n.tabbar.chat" @confirm="handelHaidel"
		 @cancel="handlehia">
			<image src="../../static/home/home_dialog_top.ac6d64ef.png" mode="scaleToFill" style="width: 100%; height: 300upx; position: relative;">
				<u-icon name="close" color="#8d8d8d" size="28" style="position: absolute; top: 10px; right: 12px;" @click="showLoginAlert = false;"></u-icon>
			</image>
			<view class="modal-top">
				<rich-text :nodes="alertContentLogin"></rich-text>
			</view>
		</u-modal>

		<!-- 公告弹窗-未登录 -->
		<u-modal v-model="showLogoutAlert" :show-title="false" confirm-color="#a7866e" border-radius="22" :show-cancel-button="false"
		 :show-confirm-button="false" :confirm-text="i18n.tabbar.group" :cancel-text="i18n.tabbar.chat" @confirm="handelHaidel"
		 @cancel="handlehia">
			<image src="../../static/home/home_dialog_top.ac6d64ef.png" mode="scaleToFill" style="width: 100%; height: 300upx; position: relative;">
				<u-icon name="close" color="#8d8d8d" size="28" style="position: absolute; top: 10px; right: 12px;" @click="hideLogoutAlert()"></u-icon>
			</image>
			<view class="modal-top" style="max-height:160px;">
				<rich-text :nodes="alertContentLogout"></rich-text>
			</view>
		</u-modal>

	</view>
</template>
<script>
	import uniNavBar from '../../components/uni-nav-bar/uni-nav-bar.vue'
	import popup from "@/components/ge-popup.vue";
	import service from '@/components/Service.vue'
	export default {
		components: {
			uniNavBar,
			popup,
			service
		},
		data() {
			return {
			    productSearch: {
			        page: 1,
                    size: 10,
                    hasMore: true,
                    status: 'loadmore',
                    loadText: {}
                },
				isGroup: false,
				isServer: false,
				value: '',
				type: 'text',
				keyword: '',
				isModul: false,
				alertContentLogout: '',
				alertContentLogin: '',
				showLoginAlert: false,
				showLogoutAlert: false,
				isAlertLoginAlert: false,
				list: [],
				listItem: [],
				appDownloadInfo: {
			    	status: 0,
					link: ""
				}
			}
		},
		computed: {
			i18n() {
				const t = this.$t('index')
				uni.setTabBarItem({
					index: 0,
					text: t.tabbar.home
				})
				uni.setTabBarItem({
					index: 1,
					text: t.tabbar.active
				})
				uni.setTabBarItem({
					index: 2,
					text: t.tabbar.shop
				})
				uni.setTabBarItem({
					index: 3,
					text: t.tabbar.enjoy
				})
				uni.setTabBarItem({
					index: 4,
					text: t.tabbar.mine
				})
                //提示语
                this.productSearch.loadText = {
                    loadmore: t.home.loadMore,
                    loading: t.home.loading,
                    nomore: t.home.noMore
                };
				return t
			}
		},
        watch: {
		    "productSearch.page": function (page){
                this.products();
            }
        },
		onReady() {
			// this.isModul = true;
			const token = uni.getStorageSync('token');
			this.downloadUrl();

		},
		onShow() {
			const token = uni.getStorageSync('token')
			if (token && this.isAlertLoginAlert) {
				// this.isModul = true
				this.isGroup = true
				// this.showLoginAlert = true;
				return;
			}
			this.isModul = false
			this.isGroup = false
			this.showLogoutAlert = true;
		},
		onLoad(){
			this.handelAlert();
            this.banners();
            this.products();
		},
        onReachBottom() {
            if (!this.productSearch.hasMore) {
                return;
            }
            //加载更多数据
            this.productSearch.page ++;
        },
		methods: {
			// change() {
			// 	const system_info = uni.getStorageSync('system_info')
			// 	console.log(system_info)

			// 	system_info.language === 'en' ? system_info.language = this._i18n.locale = 'fr' : system_info.language = this._i18n
			// 		.locale = 'en'
			// 	uni.setStorageSync('system_info', system_info)
			// 	uni.reLaunch({
			// 		url: 'index'
			// 	})
			// },
			swiperClick(index){
				let swiperItem = this.list[index];
				if (swiperItem.type == 2) { //内链
					this.$Router.push({
						path: swiperItem.url
					})
				} else if (swiperItem.type == 3) { //外链
					window.location.href = swiperItem.url
				}
			},
			hideLogoutAlert(){
				this.showLogoutAlert = false;
				const token = uni.getStorageSync('token')
				if (token) {
					// this.isModul = true
					this.isGroup = true
					this.showLoginAlert = true;
					this.isAlertLoginAlert = true;
					return;
				}
			},

            async commodity(item) {
                let product = await this.productDetail(item);
			    if (product !== false) {
                    this.$Router.push({
                        name: 'commodity',
                        params: {
                            product: product
                        }
                    })
                }
			},

            //加载详情
            async productDetail(product) {
                const data = await this.$api.productDetail(product.product_id);
                if (data.code === 200) {
                    return data.data;
                }
                return false;
            },

			async handelAlert() {
				this.isModul = false;
				const data = await this.$api.getAlert()
				if (data.code === 200) {
					const result = data.data;
					[this.alertContentLogout, this.alertContentLogin] = [result.logout_alert, result.login_alert]
					// [this.alertContentLogout, this.alertContentLogin] = ["<h1>你好</h1>", result.login_alert]
				}
			},

			async handelHaidel() {
				this.isModul = false;
				const data = await this.$api.getGroup()
				if (data.code === 200) {
					console.log('执行')
					// window.open(data.data.whats_group_url)
					window.location.href = data.data.whats_group_url
				}
			},

			async banners() {
				let data = await this.$api.banners({params: {
					location: 1, //1 表示首页banner
				}});
				if (data.code === 200) {
					if (data.data.length) {
						let list = [];
						data.data.map((item) => {
							list.push({
								"id": item.id,
								"url": item.url,
								"type": item.type,
								"image": item.uploads.path_url
							});
						});
						this.list = list;
					} else {
						this.list = [
						    {
								image: '../../static/home/banner01.jpg',
								title: 'banner',
								type: 1,
							},
							{
								image: '../../static/home/banner02.jpg',
								title: 'banner',
								type: 1,
							},
							{
								image: '../../static/home/banner03.jpg',
								title: 'banner',
								type: 1,
							}, {
								image: '../../static/home/banner04.jpg',
								title: 'banner',
								type: 1,
							}
						];
					}
				}
			},

			handelService() {
				this.isServer = !this.isServer;
			},
			async handelservices() {
				const data = await this.$api.getGroup()
				if (data.code === 200) {
					// window.open(data.data.whats_group_url)
					window.location.href = data.data.whats_group_url
				}
			},
			async handelGrop() {
				const data = await this.$api.getservice()

				if (data.code === 200) {
					// this.$Router.replace({
					// 	name: data.data.whats_service_url
					// })
					// window.open(data.data.whats_service_url)
					window.location.href = data.data.whats_service_url

				}
			},
			async handlehia() {
				const data = await this.$api.getservice()
				// this.isModul = false;
				if (data.code === 200) {
					// this.$Router.replace({
					// 	name: data.data.whats_service_url
					// })
					// window.open(data.data.whats_service_url)
					window.location.href = data.data.whats_service_url
				}
			},
            async products() {
			    this.productSearch.status = 'loading';
			    let options = {
			        params: {
			            page: this.productSearch.page,
			            size: this.productSearch.size,
                    }
                };
			    const res = await this.$api.products(options);
			    //渲染商品数据
                let {data, code} = res;
                if (code === 200) {
                    if (data.data && data.data.length) {
                        this.listItem = this.listItem.concat(data.data)
                        this.productSearch.status = 'loadmore';
                    } else {
                        this.productSearch.hasMore = false;
                        this.productSearch.status = "nomore";
                    }
                    if (!data.next_page_url) {
                        this.productSearch.hasMore = false;
                        this.productSearch.status = "nomore";

                    }

                } else {
					this.productSearch.hasMore = false;
					this.productSearch.status = "nomore";
				}
            },
			async downloadUrl() {
				const data = await this.$api.downloadUrl()
				if (data.code === 200) {
					this.appDownloadInfo = data.data;
				}
			},
			//下载app
			downloadApp() {
				this.appDownloadInfo.link && (window.location.href = this.appDownloadInfo.link);
			}
		}
	}
</script>

<style lang="scss" scoped>
	.top-input {

		height: 110rpx;
		background: #EEEEEE;
		border-radius: 10rpx;
		// margin: 0 40rpx;

		padding-right: 20rpx;

		z-index: 999;


		.custom-style {
			background-color: #df974b;
			width: 150rpx;
		}
	}

	.list-title {
		width: 250rpx;
		margin-left: 40rpx;
		border-bottom: 4rpx solid #df974b;
		margin-top: 40rpx;
	}

	.list-items {
		width: 300rpx;
		height: 320rpx;
	}

	.list-item-2 {
		width: 350upx;
		text-align: center;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		overflow: hidden;
		-webkit-box-orient: vertical;
	}

	.wrap {}

	.app-download {
		height: 100upx;
		background: black;
		display: flex;
		justify-content: space-between;
		padding: 0 30upx;
		color: white;
		align-items: center;
	}

	.app-img {
		width: 60upx;
		height: 60upx;
		margin-right: 20upx;
	}

	.app-text {
		background: black;
		color: white;

		font-weight: bold;
		padding-bottom: 10upx;
	}

	.modal-top {
		padding: 30upx;
		max-height: 300upx;
		overflow-y: auto;
	}

	.modal-text {
		font-size: 18upx;
	}

	.modal-top {
		font-size: 18upx !important;
		line-height:46upx !important;
	}
</style>

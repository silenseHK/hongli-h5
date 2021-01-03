<template>
	<view class="">
		<!-- 客服中心 --start -->
		<view>
			<view class="app-customer" @click="handelService" :class="isServer ? 'service-bg1' : 'service-bg'" v-show="isGroup">
				<view class="u-flex-col u-row-center u-p-t-20">
					<image src="../../static/service.png" mode="" style="width: 40upx; height: 40upx; margin: auto"></image>
					<text class="u-text-center" style="color: white; font-size: 20upx">Service</text>
				</view>
			</view>
			<view class="" v-if="isServer">
				<view class="app-grouap u-flex-col u-row-center u-p-t-10" @tap="handelservices">
					<image src="../../static/phoneicon.png" mode="" style="width: 40upx; height: 40upx; margin: auto"></image>
					<text class="u-text-center u-p-b-20" style="color: white; font-size: 20upx">Group</text>
				</view>
				<view class="app-whates u-flex-col u-row-center u-p-t-10" @tap="handelGrop">
					<image src="../../static/whatsapp.f636c058.png" mode="" style="width: 40upx; height: 40upx; margin: auto"></image>
					<text class="u-text-center u-p-b-20" style="color: white; font-size: 18upx">WhatsApp</text>
				</view>
			</view>
		</view>
		<!-- 客服中心 --end-->
		<!-- 顶部navbar--start -->

		<uni-nav-bar background-color="black" border="none">
			<view class="u-flex u-row-between">
				<view class="u-flex u-m-r-40" @click="handelRule">
					<image src="../../common/enjoy/rule.png" mode="" class="top-imgs"></image>
					<text class="top-text">{{ i18.enjoy.ruleNavbar }}</text>
				</view>
				<view class="u-flex u-m-r-40" @click="handelRechar">
					<image src="../../common/enjoy/card.png" mode="" class="top-imgs"></image>
					<text class="top-text">{{ i18.enjoy.rechargeNavba }}</text>
				</view>
				<!-- <view class="u-flex u-m-r-40" @click="handelTrend">
					<image src="../../common/enjoy/tren.png" mode="" class="top-imgs"></image>
					<text class="top-text">Trend</text>
				</view> -->
			</view>
			<view slot="left"></view>
			<view slot="right"></view>
		</uni-nav-bar>
		<!-- 顶部navbar--end -->
		<!-- 卡片--start -->

		<view class="top-box u-p-l-40 u-p-r-40 u-p-t-40">
			<view class="enjoy-centent">
				<view class="u-flex u-row-between">
					<view class="u-flex-col">
						<text class="u-font-xl">{{ i18.enjoy.balance }}</text>
						<text class="u-font-xl" style="font-weight: 700">₹ {{ numMony }}</text>
					</view>
					<view :class="drawList[lastterm]">
						<text class="esult-text fz50" style="font-weight: bold; color: white;">{{ lastterm }}</text>
					</view>
				</view>
				<view class="u-m-t-30">
					<text class="u-font-18">{{ i18.enjoy.period }}</text>
				</view>
				<view class="u-flex u-m-t-30">
					<view class="u-font-35 u-m-r-10">
						<text class=" periods">{{currentperiod.number}}</text>
					</view>
					<view class="u-flex u-m-l-30">
						<!-- <countdown :startTime="currentperiod.start_time" :endTime="currentperiod.end_time" /> -->
				<!-- 		<u-count-down ref="uCountDown" @end="handleStop" :timestamp="timestamp" @change="countdownMonitor" :show-border="true"
						 font-size="58" color="#000000" border-color="#909399"></u-count-down> -->
						<u-count-down ref="uCountDown" @end="handleStop" :timestamp="timestamp" :show-border="true"
						 font-size="58" color="#000000" border-color="#909399"></u-count-down>
						<!-- <text>{{timestamp}}</text> -->
					</view>
				</view>
			</view>
		</view>
		<!-- 卡片--end -->

		<!-- tab --start -->
		<view class="u-m-t-80 u-p-l-40 u-p-r-40">
			<u-line color="#cfa65f" />
			<u-subsection 
			mode="subsection" 
			bold 
			class="u-m-t-20 tab-switch" 
			button-color="#cfa65f" 
			@change="submenu" 
			bg-color="white"
			inactive-color="#cfa65f" 
			:list="navBarList" 
			:current="subsectionCurrent" 
			:animation="true" 
			active-color="#cfa65f"></u-subsection>
		</view>
		<!-- tab --end -->
		<view class="u-m-t-30 u-p-l-40 u-p-r-40">
			<!-- 彩色球区域--start -->

			<view class="digital-box" v-if="current == 4">
				<!-- 11111111111111111111111 -->
				<view class="u-flex u-row-between">
					<block v-for="(items, index) in luckyList1" :key="index">
						<view class="odd-text fz34" :class="luckyColor[index]" @click="handelOrder(items, index)" :key="index">
							<text>{{ items.title }}</text>
						</view>
					</block>
				</view>

				<view class="u-flex u-m-t-30 u-m-b-30" style="flex-wrap: wrap;justify-content: space-around;">
					<block v-for="(itemlg, index) in digitalList1" :key="index">
						<view class="numberBox">
							<view class="odd-text1 fz50 event-text1" :class="digitalColo[index]" @click="placeaBet1(itemlg, index)" :key="index"> 
								<text>{{ itemlg.title }}</text>
							</view>
						</view>
					</block>
				</view>
			</view>
			<view class="digital-box" v-else-if="current == 1">
				<!-- 1111111111111111111111 -->
				<view class="u-flex u-row-between">
					<block v-for="(items, index) in luckyList4" :key="index">
						<view class="odd-text fz34" :class="luckyColor[index]" @click="handelOrder(items, index)" :key="index">
							<text>{{ items.title }}</text>
						</view>
					</block>
				</view>

				<view class="u-flex u-m-t-30 u-m-b-30" style="flex-wrap: wrap">
					<block v-for="(itemlg, index) in digitalList4" :key="index">
						<view class="numberBox">
							<view class="odd-text1 fz50 event-text1" :class="digitalColo[index]" @click="placeaBet1(itemlg, index)" :key="index">
								<text>{{ itemlg.title }}</text>
							</view>
						</view>
					</block>
				</view>
			</view>
			<view class="digital-box" v-else-if="current == 3">
				<!-- 1111111111111111111 -->
				<view class="u-flex u-row-between">
					<block v-for="(items, index) in luckyList2" :key="index">
						<view class="odd-text fz34" :class="luckyColor[index]" @click="handelOrder(items, index)" :key="index">
							<text>{{ items.title }}</text>
						</view>
					</block>
				</view>

				<view class="u-flex u-m-t-30 u-m-b-30" style="flex-wrap: wrap">
					<block v-for="(itemlg, index) in digitalList2" :key="index">
						<view class="numberBox">
							<view class="odd-text1 event-text1 fz50" :class="digitalColo[index]" @click="placeaBet1(itemlg, index)" :key="index">
								<text>{{ itemlg.title }}</text>
							</view>
						</view>
					</block>
				</view>
			</view>
			<view class="digital-box" v-else-if="current == 2">
				<!-- 11111111111111111111111 -->
				<view class="u-flex u-row-between">
					<block v-for="(items, index) in luckyList3" :key="index">
						<view class="odd-text fz34" :class="luckyColor[index]" @click="handelOrder(items, index)" :key="index">
							<text>{{ items.title }}</text>
						</view>
					</block>
				</view>

				<view class="u-flex u-m-t-30 u-m-b-30" style="flex-wrap: wrap">
					<block v-for="(itemlg, index) in digitalList3" :key="index">
						<view class="numberBox">
							<view class="odd-text1 event-text1 fz50" :class="digitalColo[index]" @click="placeaBet1(itemlg, index)" :key="index">
								<text>{{ itemlg.title }}</text>
							</view>
						</view>
					</block>
				</view>
			</view>
			<!-- 彩色球区域--end -->
			<!-- 列表区域--start -->
			<view class="u-flex u-row-between u-m-t-20 u-m-b-20">
				<view class="u-font-18" style="font-weight: bold">{{
          i18.enjoy.record
        }}</view>
				<view @click="handelrecordList">
					<text>{{ i18.enjoy.more }} ></text>
				</view>
			</view>
			<!-- 表格 -->
			<view class="enjoy-table">
				<u-tr class="u-tr">
					<u-th class="u-th">{{ i18.enjoy.Period }}</u-th>
					<u-th class="u-th" align="center">{{ i18.enjoy.num }}</u-th>
					<u-th class="u-th" align="center">{{ i18.enjoy.result }}</u-th>
				</u-tr>
				<u-line color="#cfa65f" class="u-p-t-20 u-p-b-20" />
				<block v-for="(item, index) in produceList" :key="index">
					<u-tr class="u-tr">
						<u-td class="u-td">{{ item.number }}</u-td>
						<u-td :class="daawTextList[item.prize_number]" align="center">{{
              item.prize_number
            }}</u-td>
				<u-td class="u-td" align="center">{{(item.prize_number == 0 ? i18.enjoy.evenLucky : item.prize_number == 5 ? i18.enjoy.oddLucky : item.prize_number%2==0 ? i18.enjoy.Even : i18.enjoy.Odd)}}</u-td>
						<!-- <u-td class="u-td" align="center" v-if="item.prize_number == 0">{{
              i18.enjoy.evenLucky
            }}</u-td>
						<u-td class="u-td" align="center" v-if="item.prize_number == 1">{{
              i18.enjoy.Odd
            }}</u-td>
						<u-td class="u-td" align="center" v-if="item.prize_number == 2">{{
              i18.enjoy.evenLucky
            }}</u-td>
						<u-td class="u-td" align="center" v-if="item.prize_number == 3">{{
              i18.enjoy.Even
            }}</u-td>
						<u-td class="u-td" align="center" v-if="item.prize_number == 4">{{
              i18.enjoy.Odd
            }}</u-td>
						<u-td class="u-td" align="center" v-if="item.prize_number == 5">{{
              i18.enjoy.evenLucky
            }}</u-td>
						<u-td class="u-td" align="center" v-if="item.prize_number == 6">{{
              i18.enjoy.Odd
            }}</u-td>
						<u-td class="u-td" align="center" v-if="item.prize_number == 7">{{
              i18.enjoy.Even
            }}</u-td>
						<u-td class="u-td" align="center" v-if="item.prize_number == 8">{{
              i18.enjoy.Odd
            }}</u-td>
						<u-td class="u-td" align="center" v-if="item.prize_number == 9">{{
              i18.enjoy.Even
            }}</u-td> -->
					</u-tr>
				</block>

				<!-- <u-tr class="u-tr">
					<u-td class="u-td">20201110290</u-td>
					<u-td class="u-td" align="center">0</u-td>
					<u-td class="u-td" align="center">Even Lucky</u-td>

				</u-tr>
				<u-tr class="u-tr">
					<u-td class="u-td">20201110290</u-td>
					<u-td class="u-td" align="center">0</u-td>
					<u-td class="u-td" align="center">Even Lucky</u-td>

				</u-tr>
				<u-tr class="u-tr">
					<u-td class="u-td">20201110290</u-td>
					<u-td class="u-td" align="center">0</u-td>
					<u-td class="u-td" align="center">Even Lucky</u-td>

				</u-tr> -->
			</view>
			<view class="u-flex u-row-between u-m-t-20 Record">
				<view class="u-font-18" style="font-weight: bold">{{
          i18.enjoy.order
        }}</view>
				<view @click="orderDetail">
					<text>{{ i18.enjoy.more }} ></text>
				</view>
			</view>
			<OrdeLists :orderList="ordersList"></OrdeLists>
			<!-- 列表区域--end -->
		</view>

		<!-- 	<u-popup v-model="showOrder" mode="bottom" height="60%" closeable close-icon-color="white">
			
			<view class="silver">
				<text>Silver Odd Gem</text>
			</view>
			<view class="contract">
				<view>
					<view>
						<text>Contract Money</text>
					</view>
					<view class="u-flex">
						<block v-for="(item,index) in contractList">
							<text class="contract-box" :key="index" @click="handelContract(index)" :class="[contractIndex==index?'active-bg':'']">
								{{item.num}}
							</text>
						</block>
					</view>
				</view>
			</view>
		
			<view class="contract u-m-t-40">
				<view>
					<view>
						<text>Number :</text>
					</view>
					<view class="u-flex">
						<block v-for="(item,index) in numList">
							<text class="contract-box" :key="index" @click="handelnum(item.num,index)" :class="[numIndex==index?'active-bg':'']">
								{{item.num}}
							</text>
						</block>
					</view>
				</view>
			</view>

			<view class="contract u-m-t-40 ">
				<view>
					<view>
						<view>Number :
							<text class="u-font-14">
								Maxinumlowersingular999 hands
							</text>
						</view>
					</view>
					<view class="u-flex u-m-t-30">
						<u-number-box v-model="values" @change="valChange" size="30"></u-number-box>
					</view>
				</view>
			</view>
	
			<view class="contract u-m-t-40 ">
				<view>
					<view>
						<view>Fee :
							<text class="u-font-14">
								123
							</text>
						</view>
					</view>
				</view>
				<u-radio-group v-model="terms" class="u-m-t-30 u-m-b-10">
								<u-radio active-color="#2cc747" v-for="(item, index) in radioList" :key="index" :name="item.name" >
									{{ item.name }}
								</u-radio>
							</u-radio-group>
			</view>

			<view class="u-m-b-0">
				<u-button class="confim" :ripple="true">Confirm</u-button>
			</view>
		</u-popup> -->
		<!-- 弹窗 -->
		<OrderGren @openMusic='myVideo' :title="title" :id="id" :shoWorder="showOrder" :luckdata="luckyId" :colors1="colors1" @handeloshow="handeloshow"
		 @handlePlacebet="handlePlacebet" :colors="colors" :contractList="contractList" :numList="numList"></OrderGren>
	</view>
</template>

<script>
	import uniNavBar from "../../components/uni-nav-bar/uni-nav-bar.vue";
	import countdown from "../../components/cz-countdown.vue";
	import formDate from "../../utils/getTimes.js";
	import OrderGren from "../../components/order/OrderGren.vue";
	import OrdeLists from "../../components/OrderLists.vue";
	export default {
		components: {
			uniNavBar,
			countdown,
			OrderGren,
			OrdeLists,
		},
		data() {
			return {
				innerAudioContext: "",
				requestTimes: 1,
				maxRequestTimes: 10,
				subsectionCurrent: null, //开奖时间区域被点击后的标识
				isGroup: false,
				isServer: false,
				colors: "#2cc747", //默认颜色
				colors1: "active-bg1",
				title: "Odd",
				showOrder: false, //下注菜单显示隐藏
				contractIndex: 0,
				numIndex: 0,
				values: 3,
				terms: "",
				id: 0,
				timestamp: "0",
				ordersList: [], //购买记录
				produceList: [], //开奖记录
				luckyId: {
					id: "",
					gameid: "",
					title: "",
				},
				luckyList4: [{
						id: 10,
						gamId: 1,
						title: "Odd",
					},
					{
						id: 11,
						gamId: 1,
						title: "Even",
					},
					{
						id: 12,
						gamId: 1,
						title: "Lucky",
					},
				],
				luckyList2: [{
						id: 34,
						gamId: 3,
						title: "Odd",
					},
					{
						id: 35,
						gamId: 3,
						title: "Even",
					},
					{
						id: 36,
						gamId: 3,
						title: "Lucky",
					},
				],
				luckyList3: [{
						id: 22,
						gamId: 2,
						title: "Odd",
					},
					{
						id: 23,
						gamId: 2,
						title: "Even",
					},
					{
						id: 24,
						gamId: 2,
						title: "Lucky",
					},
				],
				luckyList1: [{
						id: 46,
						gamId: 4,
						title: "Odd",
					},
					{
						id: 47,
						gamId: 4,
						title: "Even",
					},
					{
						id: 48,
						gamId: 4,
						title: "Lucky",
					},
				],

				digitalList4: [{
						id: 49,
						gamId: 1,
						title: "0",
					},
					{
						id: 1,
						gamId: 1,
						title: "1",
					},
					{
						id: 2,
						gamId: 1,
						title: "2",
					},
					{
						id: 3,
						gamId: 1,
						title: "3",
					},
					{
						id: 4,
						gamId: 1,
						title: "4",
					},
					{
						id: 5,
						gamId: 1,
						title: "5",
					},
					{
						id: 6,
						gamId: 1,
						title: "6",
					},
					{
						id: 7,
						gamId: 1,
						title: "7",
					},
					{
						id: 8,
						gamId: 1,
						title: "8",
					},
					{
						id: 9,
						gamId: 1,
						title: "9",
					},
				],
				digitalList2: [{
						id: 51,
						gamId: 3,
						title: "0",
					},
					{
						id: 25,
						gamId: 3,
						title: "1",
					},
					{
						id: 26,
						gamId: 3,
						title: "2",
					},
					{
						id: 27,
						gamId: 3,
						title: "3",
					},
					{
						id: 28,
						gamId: 3,
						title: "4",
					},
					{
						id: 29,
						gamId: 3,
						title: "5",
					},
					{
						id: 30,
						gamId: 3,
						title: "6",
					},
					{
						id: 31,
						gamId: 3,
						title: "7",
					},
					{
						id: 32,
						gamId: 3,
						title: "8",
					},
					{
						id: 33,
						gamId: 3,
						title: "9",
					},
				],
				digitalList3: [{
						id: 50,
						gamId: 2,
						title: "0",
					},
					{
						id: 13,
						gamId: 2,
						title: "1",
					},
					{
						id: 14,
						gamId: 2,
						title: "2",
					},
					{
						id: 15,
						gamId: 2,
						title: "3",
					},
					{
						id: 16,
						gamId: 2,
						title: "4",
					},
					{
						id: 17,
						gamId: 2,
						title: "5",
					},
					{
						id: 18,
						gamId: 2,
						title: "6",
					},
					{
						id: 19,
						gamId: 2,
						title: "7",
					},
					{
						id: 20,
						gamId: 2,
						title: "8",
					},
					{
						id: 21,
						gamId: 2,
						title: "9",
					},
				],
				digitalList1: [{
						id: 52,
						gamId: 4,
						title: "0",
					},
					{
						id: 37,
						gamId: 4,
						title: "1",
					},
					{
						id: 38,
						gamId: 4,
						title: "2",
					},
					{
						id: 39,
						gamId: 4,
						title: "3",
					},
					{
						id: 40,
						gamId: 4,
						title: "4",
					},
					{
						id: 41,
						gamId: 4,
						title: "5",
					},
					{
						id: 42,
						gamId: 4,
						title: "6",
					},
					{
						id: 43,
						gamId: 4,
						title: "7",
					},
					{
						id: 44,
						gamId: 4,
						title: "8",
					},
					{
						id: 45,
						gamId: 4,
						title: "9",
					},
				],

				digitalColo: [
					"digital0",
					"digital1",
					"digital2",
					"digital3",
					"digital4",
					"digital5",
					"digital6",
					"digital7",
					"digital8",
					"digital9",
				],
				drawList: [
					"drawnumber0",
					"drawnumber1",
					"drawnumber2",
					"drawnumber3",
					"drawnumber4",
					"drawnumber5",
					"drawnumber6",
					"drawnumber7",
					"drawnumber8",
					"drawnumber9",
				],
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
					"draw-text9",
				],
				radioList: [{
					name: "I agree thePresale management rule",
				}, ],
				navBarList: [{
						name: "  Other  ",
						game_id: 4
					}, {
						name: " Gold ",
						game_id: 1
					},
					{
						name: " Jewelry ",
						game_id: 3
					},
					{
						name: " Silver ",
						game_id: 2
					},

				],

				contractList: [{
						num: 10,
					},
					{
						num: 100,
					},
					{
						num: 1000,
					},
					{
						num: 10000,
					},
				],
				luckyColor: ["lucky1", "lucky2", "lucky3"],
				numList: [{
						num: 3,
					},
					{
						num: 5,
					},
					{
						num: 10,
					},
				],
				lastterm: "",
				currentperiod: {
					number: "",
					end_time: "",
					start_time: "",
				},
				current: null,
				numMony: "",
			};
		},
		onLoad() {
			const innerAudioContext = uni.createInnerAudioContext()
			innerAudioContext.src = '../../static/bet_select.mp3'
			this.innerAudioContext = innerAudioContext
			this.subsectionCurrent = uni.getStorageSync('subsectionCurrent') || 0
			switch(this.subsectionCurrent.toString()){
				case '0':
					this.current = 4
					break;
				case '1':
					this.current = 1
					break;
				case '2':
					this.current = 3
					break;
				case '3':
					this.current = 2
					break
			}
			this.getGames(this.current);
			this.numMony = uni.getStorageSync("money");
		},
		// activated() {
		// 	this.numMony = uni.getStorageSync("money");
		// 	this.getGames(this.current)
		// },
		computed: {
			i18() {
				return this.$t("index");
			},
		},
		onShow() {
			this.requestTimes = 1
			
			const token = uni.getStorageSync("token");

			if (token) {
				this.isGroup = true;
				return;
			}
			this.isGroup = false;
		},
		methods: {
			// 点击按钮发出声音
			myVideo(){
				this.innerAudioContext.stop()
				this.innerAudioContext.play()
				// this.innerAudioContext.pause()
			},
			handeloshow(index) {
				this.showOrder = index;
			},

			//获取获取彩票游戏当前期数信息
			async getGames(index) {
				// console.log(index)
				const data = await this.$api.getGame({
					id: index,
				});
				if (data.code === 200) {
					this.currentperiod.number = data.data.bq.number;
					// console.log(this.currentperiod.number)
					if (data.data.sq === null) {
						if(this.requestTimes > this.maxRequestTimes){
							uni.showModal({
								title: this.i18.active.waring,
								content: this.i18.enjoy.error,
								showCancel: false,
								success:  (res) => {
									if (res.confirm) {
										uni.reLaunch({url: '../enjoy/index'})
									}
								}
							})
						}else{
							this.requestTimes ++
							this.lastterm = ''
							setTimeout(() => {
								this.getGames(this.current)
							},1500)
						}
					}else{
						this.lastterm = data.data.sq.prize_number == null ? '' : Number(data.data.sq.prize_number)
					}
					this.id = data.data.bq.id;
					this.timestamp = data.data.count_down;
					this.produceList = data.data.pr;
					this.ordersList = data.data.lx;
				}
			},
			submenu(index) {
				this.myVideo()
				this.subsectionCurrent = index
				uni.setStorageSync('subsectionCurrent',index)
				this.lastterm = ''
				if (index == 0) {
					this.current = 4
					this.getGames(4);
				} else if (index == 1) {
					this.current = 1
					this.getGames(1)
				} else if (index == 2) {
					// this.current = 2
					// this.getGames(2)
					this.current = 3
					this.getGames(3)
				} else if (index == 3) {
					// this.current = 3
					// this.getGames(3)
					this.current = 2
					this.getGames(2)
				}
			},
			handelRule() {
				this.$Router.push({
					name: "rule",
				});
			},
			handelRechar() {
				this.$Router.push({
					name: "recharge",
				});
			},
			// handelTrend() {
			// 	this.$Router.push({
			// 		name: 'trend'
			// 	})
			// },
			// 跳转详情页面
			handelrecordList() {
				let titleName = null
				switch(Number(this.current)){
					case 4:
						titleName = this.navBarList[0].name
						break;
					case 1:
						titleName = this.navBarList[1].name
						break;
					case 2:
						titleName = this.navBarList[2].name
						break;
					case 3:
						titleName = this.navBarList[3].name
				}
				this.$Router.push({
					path: "/pages/enjoy/recordList/recordList",
					query: {
						gameId: this.current,
						titleName
					},
				});
			},
			orderDetail() {
				this.$Router.push({
					name: "enjoyOrder",
				});
			},
			// 订单
			handelOrder(item, index) {
				this.myVideo()
				// console.log(item, index)
				if (index == 0) {
					// console.log(item);
					this.showOrder = true;
					this.colors = "#2cc747";
					this.colors1 = "active-bg1";
					this.luckyId.title = item.title;
					this.luckyId.id = item.id;
					this.luckyId.gameid = item.gamId;
				} else if (index == 1) {
					this.showOrder = true;
					this.colors = "#ff5153";
					this.colors1 = "active-bg2";
					this.luckyId.title = item.title;
					(this.luckyId.id = item.id), (this.luckyId.gameid = item.gamId);
				} else if (index == 2) {
					this.showOrder = true;
					this.colors = "#8b6de9";
					this.colors1 = "active-bg3";
					this.luckyId.title = item.title;
					(this.luckyId.id = item.id), (this.luckyId.gameid = item.gamId);
				}
			},
			// 点击contrct
			handelContract(index) {
				this.contractIndex = index;
			},
			handelnum(item, index) {
				this.values = item;
				this.numIndex = index;
			},
			//步进chang
			valChange(e) {},
			handelEven() {
				this.colors = "#ff5153";
				this.showOrder = true;
				this.title = "Even";
				this.colors1 = "active-bg2";
			},
			handelLucky() {
				this.colors = "#8b6de9";
				this.showOrder = true;
				this.title = "Luck";
				this.colors1 = "active-bg3";
			},
			// 下注数字1
			placeaBet1(item) {
				this.myVideo()
				// console.log(item);
				this.showOrder = true;
				this.colors = "#a88571";
				this.colors1 = "active-bg4";
				this.luckyId.title = item.title;
				(this.luckyId.id = item.id), (this.luckyId.gameid = item.gamId);
			},
			// 事件触发，每秒一次
			async countdownMonitor(timeDatas) {
				//定时器为0
						
				if (timeDatas == 0) {
					// this.getGames(this.current);	
					/*
					 间隔5s请求数据
					 */
					setTimeout(async () => {
						const data = await this.$api.getGame({
							id: this.current,
						});
						if (data.code === 200) {
							this.currentperiod.number = data.data.bq.number;
							// this.lastterm = Number(data.data.sq.prize_number);
							this.lastterm = data.data.sq.prize_number == null ? '' : Number(data.data.sq.prize_number);
							this.id = data.data.bq.id;
							this.timestamp = data.data.count_down;
							this.produceList = data.data.pr;
							this.ordersList = data.data.lx;
							this.timestamp = data.data.count_down;
							this.numMony = data.data.balance;
							uni.setStorageSync('money', data.data.balance)
						}
					},5000)
				}
			},
			//定时器结束时候
			handleStop() {
				this.showOrder = false
				this.timestamp = 0
				uni.showLoading()
				this.$ajax('game_start',{
					data:{
						id: this.current
					},
					method: "POST",
					goHideLoading: true,
					hideShowLoading: true
				}).then(res => {
					if(res.sq.prize_number == null){
						this.handleStop()
					}else{
						this.currentperiod.number = res.bq.number;
						this.lastterm = res.sq.prize_number
						this.id = res.bq.id;
						this.produceList = res.pr;
						this.ordersList = res.lx;
						this.timestamp = res.count_down;
						this.numMony = res.balance;
						uni.setStorageSync('money', res.balance)
						uni.hideLoading()
					}
				})
				// const data = await this.$api.getGame({
				// 	id: this.current,
				// });
				// if (data.code === 200) {
				// 	if(data.data.sq.prize_number == null){
				// 		this.handleStop()
				// 	}else{
				// 		this.currentperiod.number = data.data.bq.number;
				// 		this.lastterm = data.data.sq.prize_number
				// 		this.id = data.data.bq.id;
				// 		this.timestamp = data.data.count_down;
				// 		this.produceList = data.data.pr;
				// 		this.ordersList = data.data.lx;
				// 		this.timestamp = data.data.count_down;
				// 		this.numMony = data.data.balance;
				// 		uni.setStorageSync('money', data.data.balance)
				// 	}
				// }
				// this.$forceUpdate();

			},
			// ref形式获取内部的值
			getSeconds() {
				// console.log(this.$refs.uCountDown.seconds);
			},
			handelService() {
				this.isServer = !this.isServer;
			},
			async handelservices() {
				const data = await this.$api.getGroup();
				if (data.code === 200) {
					// window.open(data.data.whats_group_url);
					window.location.href = data.data.whats_group_url
				}
			},
			async handelGrop() {
				const data = await this.$api.getservice();

				if (data.code === 200) {
					// window.open(data.data.whats_service_url);
					window.location.href = data.data.whats_service_url
				}
			},
			handlePlacebet(value) {
				this.getGames(this.current)
				this.numMony = value;
				uni.setStorageSync('money', value)
			}
		},
	};
</script>

<style lang="scss" scoped>
	.fz50{font-size: 40rpx !important;}
	.fz34{font-size: 34rpx !important; }
	.top-imgs {
		width: 50rpx;
		height: 50rpx;
	}

	.top-text {
		color: #daac5b;
		margin-left: 10rpx;
	}

	.periods {
		font-size: 35rpx;
		margin-right: 10rpx;
	}

	.top-box {
		background: url(../../common/enjoy/enjoy-top.png) no-repeat;
		background-size: cover;
		width: 100%;
		height: 350rpx;

		.enjoy-centent {
			// background: green;
			// background-image: linear-gradient(#e6c593, #d1c0ad);
			background: url('../../static/indexBg.png') no-repeat;
			background-size: cover;
			z-index: 100;
			height: 350rpx;
			border-radius: 10rpx;
			padding: 30rpx;

			.info-box-result-text {
				// background-color: #ff5153;
				border-radius: 50%;
				width: 80rpx;
				height: 80rpx;
				text-align: center;
				line-height: 80rpx;

				.esult-text {
					color: white;
					font-weight: bold;
					font-size: 40rpx;
				}
			}
		}
	}

	.digital-box {
		min-height: 350rpx;
		border-radius: 10rpx;
		box-shadow: 0 1rpx 1rpx 0 rgba(0, 0, 0, 0.2);
		background-color: #fff;
		border: 1px solid #eee;
		padding: 30rpx;

		.odd-text {
			width: 180rpx;
			background-color: #2cc747;
			border-radius: 30rpx;
			height: 70rpx;
			text-align: center;
			line-height: 70rpx;
			color: white;
			font-weight: bold;
		}

		.even-text {
			background-color: #ff5153;
		}

		.ucky-text {
			background: #8b6de9;
		}
		.numberBox{
			width: 20%;
			display: flex;
			justify-content: center;
			align-items: center;
			margin: 10rpx 0;
		}
		.odd-text1 {
			width: 80rpx;
			border-radius: 50%;
			height: 80rpx;
			background: #2cc747;
			text-align: center;
			line-height: 80rpx;
			font-weight: bold;
			font-size: 30rpx;
			color: white;
		}

		.odd-text3 {
			background: #8b6de9;
		}

		.event-text1 {
			background: linear-gradient(180deg,
				#ff5153 0,
				#ff5153 50%,
				#8b6de9 51%,
				#8b6de9);
		}

		.event-text2 {
			background: #ff5153;
		}
	}

	.enjoy-table {
		// height: 750rpx;
		border-radius: 10rpx;
		box-shadow: 0 1rpx 1rpx 0 rgba(0, 0, 0, 0.2);
		background-color: #fff;
		border: 1px solid #eee;
		padding: 30rpx;
		line-height: 60rpx;
	}

	.Record {
		margin-bottom: 40rpx;
	}

	// ----------------

	.lucky1 {
		background: #2cc747 !important;
	}

	.lucky2 {
		background: #ff5153 !important;
	}

	.lucky3 {
		background: #8b6de9 !important;
	}

	.silver {
		background: #2cc747;
		height: 90rpx;
		padding: 0 20rpx;
		line-height: 90rpx;
		color: white;
		font-size: 35rpx;
		font-weight: bold;
	}

	.contract {
		padding: 0 20rpx;
		color: black;
		margin-top: 15rpx;

		.contract-box {
			margin-top: 20rpx;
			padding: 15rpx 25rpx;
			width: 130rpx;
			text-align: center;
			background-color: #eee;
			margin-right: 15rpx;
			border-radius: 8rpx;
		}
	}

	// .active-bg {
	// 	background: #2cc747 !important;
	// }

	.confim {
		background: #2cc747;
		color: white;
		padding: 0 20rpx;
		font-size: 30rpx;
	}

	// -----------------------传值--------
	.digital0 {
		background: linear-gradient(180deg,
			#ff5153 0,
			#ff5153 50%,
			#8b6de9 51%,
			#8b6de9);
	}

	.digital1 {
		background: #2cc747 !important;
	}

	.digital2 {
		background: #ff5153 !important;
	}

	.digital3 {
		background: #2cc747 !important;
	}

	.digital4 {
		background: #ff5153 !important;
	}

	.digital5 {
		background: linear-gradient(180deg,
			#2cc747 0,
			#2cc747 50%,
			#8b6de9 51%,
			#8b6de9) !important;
	}

	.digital6 {
		background: #ff5153 !important;
	}

	.digital7 {
		background: #2cc747 !important;
	}

	.digital8 {
		background: #ff5153 !important;
	}

	.digital9 {
		background: #2cc747 !important;
	}

	// -------- 头部背景
	.drawnumber0 {
		background: linear-gradient(180deg,
			#ff5153 0,
			#ff5153 50%,
			#8b6de9 51%,
			#8b6de9);
		border-radius: 50%;
		width: 80rpx;
		height: 80rpx;
		text-align: center;
		line-height: 80rpx;
	}

	.drawnumber1 {
		background: #2cc747 !important;
		border-radius: 50%;
		width: 80rpx;
		height: 80rpx;
		text-align: center;
		line-height: 80rpx;
	}

	.drawnumber2 {
		background: #ff5153 !important;
		border-radius: 50%;
		width: 80rpx;
		height: 80rpx;
		text-align: center;
		line-height: 80rpx;
	}

	.drawnumber3 {
		background: #2cc747 !important;
		border-radius: 50%;
		width: 80rpx;
		height: 80rpx;
		text-align: center;
		line-height: 80rpx;
	}

	.drawnumber4 {
		background: #ff5153 !important;
		border-radius: 50%;
		width: 80rpx;
		height: 80rpx;
		text-align: center;
		line-height: 80rpx;
	}

	.drawnumber5 {
		background: linear-gradient(180deg,
			#2cc747 0,
			#2cc747 50%,
			#8b6de9 51%,
			#8b6de9) !important;
		border-radius: 50%;
		width: 80rpx;
		height: 80rpx;
		text-align: center;
		line-height: 80rpx;
	}

	.drawnumber6 {
		background: #ff5153 !important;
		border-radius: 50%;
		width: 80rpx;
		height: 80rpx;
		text-align: center;
		line-height: 80rpx;
	}

	.drawnumber7 {
		background: #2cc747 !important;
		border-radius: 50%;
		width: 80rpx;
		height: 80rpx;
		text-align: center;
		line-height: 80rpx;
	}

	.drawnumber8 {
		background: #ff5153 !important;
		border-radius: 50%;
		width: 80rpx;
		height: 80rpx;
		text-align: center;
		line-height: 80rpx;
	}

	.drawnumber9 {
		background: #2cc747 !important;
		border-radius: 50%;
		width: 80rpx;
		height: 80rpx;
		text-align: center;
		line-height: 80rpx;
	}

	// 文本颜色--------------
	.draw-text0 {
		color: #8b6de9 !important;
	}

	.draw-text1 {
		color: #2cc747 !important;
	}

	.draw-text2 {
		color: #ff5153 !important;
	}

	.draw-text3 {
		color: #2cc747 !important;
	}

	.draw-text4 {
		color: #ff5153 !important;
	}

	.draw-text5 {
		color: #8b6de9 !important;
	}

	.draw-text6 {
		color: #ff5153 !important;
	}

	.draw-text7 {
		color: #2cc747 !important;
	}

	.draw-text8 {
		color: #ff5153 !important;
	}

	.draw-text9 {
		color: #2cc747 !important;
	}
</style>

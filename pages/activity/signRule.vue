<template>
	<view>
		<view @click="handelLink">
			<image src="../../static/activity/sign_in_rule_banner.fb2562a6.png" mode="" style="width: 100%;"></image>
		</view>
		<view class="rule-main">
			<view class="rule-main-header">
				<!-- <text class="rule-main-header-text">Q1：How much can i earn？</text> -->
				<text class="rule-main-header-text">Question：{{i18.signRulePage.Q1}}</text>
				<!-- <text class="u-font-25 u-m-t-15 u-m-b-15 u-p-l-20">The monthly income of VIP 6 is 146 times that of VIP 1!</text> -->
				<text class="u-font-25 u-m-t-15 u-m-b-15 u-p-l-20">{{i18.signRulePage.monthly}}</text>
				<u-table color="#a88571">
					<u-tr>
						<!-- <u-th class="rule-main-header-table">Sign in package name</u-th>
						<u-th class="rule-main-header-table">Product amount</u-th>
						<u-th class="rule-main-header-table">Daily rebate amount</u-th>
						<u-th class="rule-main-header-table">monthly income</u-th>
						<u-th class="rule-main-header-table">Payback period</u-th> -->
						<u-th class="rule-main-header-table">{{i18.signRulePage.signInName}}</u-th>
						<u-th class="rule-main-header-table">{{i18.signRulePage.myProduct}}</u-th>
						<u-th class="rule-main-header-table">{{i18.signRulePage.myDaily}}</u-th>
						<u-th class="rule-main-header-table">{{i18.signRulePage.myMonthly}}</u-th>
						<u-th class="rule-main-header-table">{{i18.signRulePage.myPayback}}</u-th>
					</u-tr>
					<u-tr>
						<!-- <u-td style="color: #000000;">Sign in package 1</u-td> -->
						<u-td style="color: #000000;height: 96upx;">{{i18.signRulePage.mySignIn}} 1</u-td>
						<u-td style="height: 96upx;">500</u-td>
						<u-td style="height: 96upx;">18</u-td>
						<u-td style="height: 96upx;">540</u-td>
						<u-td style="height: 96upx;">30 {{i18.signRulePage.mySignDay}}</u-td>


					</u-tr>
					<u-tr>
						<!-- <u-td style="color: #000000;">Sign in package 2</u-td> -->
						<u-td style="color: #000000;height: 96upx;">{{i18.signRulePage.mySignIn}} 2</u-td>
						<u-td style="height: 96upx;">1000</u-td>
						<u-td style="height: 96upx;">40</u-td>
						<u-td style="height: 96upx;">1200</u-td>
						<u-td style="height: 96upx;">30 {{i18.signRulePage.mySignDay}}</u-td>


					</u-tr>
					<u-tr>
						<!-- <u-td style="color: #000000;">Sign in package 3</u-td> -->
						<u-td style="color: #000000;height: 96upx;">{{i18.signRulePage.mySignIn}} 3</u-td>
						<u-td style="height: 96upx;">2500</u-td>
						<u-td style="height: 96upx;">100</u-td>
						<u-td style="height: 96upx;">3000</u-td>
						<u-td style="height: 96upx;">30 {{i18.signRulePage.mySignDay}}</u-td>


					</u-tr>
					<u-tr>
						<!-- <u-td style="color: #000000;">Sign in package 4</u-td> -->
						<u-td style="color: #000000;height: 96upx;">{{i18.signRulePage.mySignIn}} 4</u-td>
						<u-td style="height: 96upx;">6000</u-td>
						<u-td style="height: 96upx;">230</u-td>
						<u-td style="height: 96upx;">6900</u-td>
						<u-td style="height: 96upx;">30 {{i18.signRulePage.mySignDay}}</u-td>


					</u-tr>
					<u-tr>
						<!-- <u-td style="color: #000000;">Sign in package 5</u-td> -->
						<u-td style="color: #000000;height: 96upx;">{{i18.signRulePage.mySignIn}} 5</u-td>
						<u-td style="height: 96upx;">15000</u-td>
						<u-td style="height: 96upx;">540</u-td>
						<u-td style="height: 96upx;">16200</u-td>
						<u-td style="height: 96upx;">30 {{i18.signRulePage.mySignDay}}</u-td>


					</u-tr>
					<u-tr>
						<!-- <u-td style="color: #000000;">Sign in package 6</u-td> -->
						<u-td style="color: #000000;height: 96upx;">{{i18.signRulePage.mySignIn}} 6</u-td>
						<u-td style="height: 96upx;">45000</u-td>
						<u-td style="height: 96upx;">1560</u-td>
						<u-td style="height: 96upx;">46800</u-td>
						<u-td style="height: 96upx;">30 {{i18.signRulePage.mySignDay}}</u-td>


					</u-tr>


				</u-table>
				<!-- <text class="u-p-l-20 u-p-r-20" style="color: #a88571;">
					E.g:
					VIP 5 the daily income is 360, and the total income is 262800 . It only takes 42 days to pay back. The tasks after
					the period are pure income.
				</text> -->
			</view>
			<!-- <view class="rule-main-body">
				<text class="rule-main-header-text">Q2：Can I get more?</text>
				<view class="u-p-l-20 u-p-r-20">
					<text>Of course! In addition to making money by yourself at undefined, you can also invite your friends to make
						money together. Friends can use your invitation code to register and activate members and complete tasks. You
						will enjoy the corresponding commission income privileges of the two-level distribution.
						Recommended sign-in activities under the first activation of income.
						User A uses your invitation code to register an account and becomes your first-level user. After he opens a
						membership, you can get 10% of the first-time membership fee for user A, and user B who registers with user A’s
						recommendation code becomes yours For the second-level user, you can get 5% of the income of his first activation
						membership fee.</text>
				</view>
				<u-table color="#a88571" style="margin-right: 20upx;">
					<u-tr>
						<u-th class="rule-main-header-table" width="20">Product Amount</u-th>
						<u-th class="rule-main-header-table" width="20">Level 1 commission ratio</u-th>
						<u-th class="rule-main-header-table" width="20">Level 1 commission</u-th>
						<u-th class="rule-main-header-table" width="20">Level 2 commission ratio</u-th>
						<u-th class="rule-main-header-table" width="20">Level 2 commission</u-th>

					</u-tr>
					<u-tr>
						<u-td style="color: #000000;">500</u-td>
						<u-td>10%</u-td>
						<u-td>50</u-td>
						<u-td>5%</u-td>
						<u-td>25</u-td>


					</u-tr>
					<u-tr>
						<u-td style="color: #000000;">1000</u-td>
						<u-td>10%</u-td>
						<u-td>100</u-td>
						<u-td>5%</u-td>
						<u-td>50</u-td>
					</u-tr>
					<u-tr>
						<u-td style="color: #000000;">2500</u-td>
						<u-td>10%</u-td>
						<u-td>250</u-td>
						<u-td>5%</u-td>
						<u-td>125</u-td>
					</u-tr>
					<u-tr>
						<u-td style="color: #000000;">6000</u-td>
						<u-td>10%</u-td>
						<u-td>600</u-td>
						<u-td>5%</u-td>
						<u-td>300</u-td>
					</u-tr>
					<u-tr>
						<u-td style="color: #000000;">15000</u-td>
						<u-td>10%</u-td>
						<u-td>1500</u-td>
						<u-td>5%</u-td>
						<u-td>750</u-td>
					</u-tr>
					<u-tr>
						<u-td style="color: #000000;">45000</u-td>
						<u-td>10%</u-td>
						<u-td>4500</u-td>
						<u-td>5%</u-td>
						<u-td>2250</u-td>
					</u-tr>

				</u-table>
			</view>
			<view class="rule-main-bottom u-flex-col">
				<text class="rule-main-bottom-text">Recommended sign-in activities under the first activation of income.</text>
				<text class="u-p-l-20 u-p-r-20 u-m-t-20 u-m-b-20">Open the superior agency mode, and the commission income is easy
					to earn
					non-stop;
					Each subordinate you invite completes the like, you will get commission.</text>
				<u-table color="#a88571">
					<u-tr>
						<u-th class="rule-main-header-table" width="20">Product Amount</u-th>
						<u-th class="rule-main-header-table" width="20">Level 1 Income ratio</u-th>
						<u-th class="rule-main-header-table" width="20">Level 1 Sign-In Reward</u-th>
						<u-th class="rule-main-header-table" width="20">Level 2 Income ratio</u-th>
						<u-th class="rule-main-header-table" width="20">Level 2 Sign-In Reward</u-th>

					</u-tr>
					<u-tr>
						<u-td style="color: #000000;">500</u-td>
						<u-td>5%</u-td>
						<u-td>0.4</u-td>
						<u-td>3%</u-td>
						<u-td>0.24</u-td>
					</u-tr>
					<u-tr>
						<u-td style="color: #000000;">1000</u-td>
						<u-td>5%</u-td>
						<u-td>0.9</u-td>
						<u-td>3%</u-td>
						<u-td>0.54</u-td>
					</u-tr>
					<u-tr>
						<u-td style="color: #000000;">2500</u-td>
						<u-td>5%</u-td>
						<u-td>2.5</u-td>
						<u-td>3%</u-td>
						<u-td>1.5</u-td>
					</u-tr>
					<u-tr>
						<u-td style="color: #000000;">6000</u-td>
						<u-td>5%</u-td>
						<u-td>6.6</u-td>
						<u-td>3%</u-td>
						<u-td>3.96</u-td>
					</u-tr>
					<u-tr>
						<u-td style="color: #000000;">15000</u-td>
						<u-td>5%</u-td>
						<u-td>18.0</u-td>
						<u-td>3%</u-td>
						<u-td>10.8</u-td>
					</u-tr>
					<u-tr>
						<u-td style="color: #000000;">45000</u-td>
						<u-td>5%</u-td>
						<u-td>58.5</u-td>
						<u-td>3%</u-td>
						<u-td>35.1</u-td>
					</u-tr>


				</u-table>
				<text class="u-p-l-20 u-p-r-20" style="color: #a88571;">E.g:
					There are 10 first-level users, and 100 second-level users. The daily sign-in income is 500. You can imagine your
					daily passive income.
					Level 1 user：500*10*5%=250
					Level 2 user：500*100*3%=1,500
					The passive income from the lower level rebate on the day is：250+1,500=1,750</text>
			</view> -->
		</view>
		<view @click="handelLink">
			<image src="../../static/activity/sign_in_rule_bottom.0c8bb69e.png" mode="" class="rule-footer"></image>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			}
		},
		computed:{
			i18(){
				return this.$t('index')
			}
		},
		methods: {
			handelLink() {
				this.$Router.push({
					name: 'friends'
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.rule-main {
		margin-bottom: 300upx;

		// padding: 30upx;
		&-header {
			display: flex;
			flex-direction: column;

			&-text {
				padding: 0 20upx;
				font-size: 35upx;
				font-weight: bold;
			}

			&-table {
				background-image: linear-gradient(0deg, #e2bf88, #f7dec3);
				width: 20% !important;
				font-size: 25upx;

				&-text {
					color: #a88571;
				}
			}
		}

		&-bottom {
			margin-top: 30upx;

			&-text {
				font-weight: bold;
				padding-left: 20upx;
			}
		}
	}

	.rule-footer {
		position: fixed;
		bottom: 0;
		width: 100%;
		height: 100upx;
	}
</style>

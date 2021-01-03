<template>
	<view>
		<view class=" u-p-r-20 u-p-l-20">
			<view class="u-text-center u-font-35 u-m-t-20 u-m-b-20">
				<text>AddNew</text>
			</view>
			<u-row gutter="12" class="u-m-b-30 u-m-t-30">
				<u-col span="4">Type</u-col>
				<u-col span="8">Order orsjkfj</u-col>
			</u-row>
			<u-line color="#c6c8ce" />
			<u-row gutter="12" class="u-m-b-30 u-m-t-30">
				<u-col span="4">OutId</u-col>
				<u-col span="8">{{historLists.title}}</u-col>
			</u-row>
			<u-line color="#c6c8ce" />
			<u-row gutter="12" class="u-m-b-30 u-m-t-30">
				<u-col span="4">Description</u-col>
				<u-col span="8">Describe your problems</u-col>
			</u-row>
			<view class="histor-card-input">
				<u-field v-model="texts" label="words" placeholder="limit500" maxlength="500" type="textarea" style="height: 100%; width: 100%;">

				</u-field>
			</view>
			<u-row gutter="12" class="u-m-b-30 u-m-t-30">
				<u-col span="4">WhatsApp</u-col>
				<u-col span="8">
					<u-input v-model="value" placeholder="WhatsApp to contact you" :type="type" />
				</u-col>
			</u-row>
			<u-line color="#c6c8ce" />
			<u-button class="submit-btn"> Submit</u-button>
			<view class="u-m-t-20 u-m-b-20">
				<text class="u-font-35">Service</text>
			</view><view>
				<text>10:00-17:00,Monday-Friday about 1-5 business days.</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				historLists: null,
				texts: '',
				value
			}
		},
		onLoad() {
			this.historLists = this.$Route.query.historList
		},
		methods: {

		}
	}
</script>

<style lang="scss" scoped>
	.histor-card-input {
		background-color: #e2bf88;
		height: 300rpx;
		border-radius: 8rpx;
	}
	.submit-btn{
		background-color: #a7866e;
		color: white;
	}
</style>

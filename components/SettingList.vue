<template>
	<view>
		<view class="setting">
			<u-cell-group>
				<block v-for="(item,index) in titleList">
					<u-cell-item :icon="item.icon" :title="item.title" class="setting-item" @click="settingLink(item.link, index + 1)"></u-cell-item>
					<u-line color="#cbcbcb" />
				</block>

			</u-cell-group>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			titleList: {
				type: Array,
				default () {
					return [{
						title: '未知',
						icon: 'chat',
						link: ''
					}]
				}
			}
		},
		data() {
			return {

			};
		},
		methods: {
			settingLink(item, type) {

				this.$emit('settings', {name: item, type})
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
		font-size: 35rpx;
	}
</style>

<template>
    <view>
        <view class="u-text-center u-font-35 u-p-t-30 u-p-b-30" style="color: #e2bf88;">{{i18.active.inviteRuleTitle}}</view>
        <view class=" u-p-l-20 u-p-r-20 text-body u-flex-col">
            <text class="u-p-b-10"> {{i18.active.rule_1}}</text>
            <text class="u-p-b-10"> {{i18.active.rule_2}}</text>
            <text class="u-p-b-10"> {{i18.active.rule_3}}</text>
            <text class="u-p-b-10"> {{i18.active.rule_4}}</text>
            <text class="u-p-b-10"> {{i18.active.rule_5}}</text>
            <text class="u-p-b-10"> {{i18.active.rule_6}}</text>
        </view>
    </view>
</template>

<script>
    export default {
        data() {
            return {

            };
        },
        computed: {
            i18() {
                return this.$t('index')
            }
        },
        onReady() {
            uni.setNavigationBarTitle({
                title: this.i18.active.inviteRuleTitle
            })
        },
        methods: {

        }
    }
</script>

<style lang="less">
    .container {
        padding: 20upx 30upx;
        .rule {

        }
    }
</style>

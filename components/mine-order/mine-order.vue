<template>
    <view>
        <view class="goods-item u-flex u-flex-nowrap">
            <view class="order-cover u-flex-3 u-flex u-row-center u-col-center">
                <image :src="order.product.cover_img.path" mode="scaleToFill" class="order-image"></image>
            </view>
            <view class="order-detail u-flex-8 u-flex u-flex-col u-col-top">
                <view class="goods-name u-line-2">{{order.product.name}}</view>
                <view class="order-price u-flex u-flex-nowrap u-flex-col u-col-top" style="width: 100%">
                    <view class="u-flex-1 u-flex-1">
                        <text class="u-font-10">{{i18.mine.RebateCommission}}:</text>
                        <text style="color: #df974b; padding-left: 6upx;">₹{{order.back_money}}</text>
                    </view>
                    <view class="u-flex-1 u-flex-1">
                        <text class="u-font-10">{{i18.mine.price}}:</text>
                        <text style="color: #df974b; padding-left: 6upx;">₹{{order.price}}</text>
                    </view>
                    <view class="u-flex-1 u-flex-1">
                        <text>{{i18.mine.Date}}: <text style="padding-left: 6upx;" class="u-font-10">{{order.created_at}}</text></text>
                    </view>
                </view>
            </view>
        </view>
        <u-gap height="15" bg-color="rgba(203, 203, 203, 0.4)"></u-gap>
    </view>
</template>

<script>
    export default {
        name: "mine-order",
        props: {
            order: {
                type: Object,
                default: {
                    name: '',
                    price: 0,
                    back_money: 0,
                },
            }
        },
        data(){
            return {

            }
        },
        computed: {
            i18() {
                return this.$t('index')
            }
        },
        methods: {

        }
    }
</script>

<style scoped lang="scss">
    .order-image {
        border-radius: 10upx;
        height: 180upx;
        width: 180upx;
        color: rgba(203, 203, 203, 0.2);
    }
    .goods-item {
        height: 200upx;
        .order-cover {
            height: 100%;
            overflow: hidden;
        }
        .order-detail {
            padding: 0upx 4px;
            height: 100%;
            justify-content: space-around;
            .goods-name {
                overflow : hidden;
            }
            .order-price {
                justify-content: flex-start;
            }
        }
    }

</style>
import Vue from 'vue'
import Router from 'uni-simple-router'
import store from '../store'

Vue.use(Router)

const router = new Router({
	 APP:{
	        holdTabbar:true        //默认是true
	    }, 
	routes: [{
			path: '/pages/index/index',
			name: 'index'
		}, {
			path: '/pages/shopping/index',
			name: 'shopping'
		}, {
			path: '/pages/activity/index',
			name: 'activity',
			requiredLogin: true,
			// meta:{
			// 	requiredLogin:true,
			// }
		},
		{
			path: '/pages/index/notice',
			name: 'notice'
		}, {
			path: '/pages/enjoy/index',
			name: 'enjoy',
			requiredLogin: true,
		}, {
			path: '/pages/mine/index',
			name: 'mine',
			requiredLogin: true,
		},
		{
			path: '/pages/commodity/index',
			name: 'commodity'
		},
		{
			path: '/pages/promotion/index',
			name: 'promotion'
		}, {
			path: '/pages/detailSub/detailSub',
			name: 'detailSub'
		}, {
			path: '/pages/friends/friends',
			name: 'friends'
		}, {
			path: '/pages/enjoy/rule/rule',
			name: 'rule'
		}, {
			path: '/pages/enjoy/recharge/recharge',
			name: 'recharge'
		}, {
			path: '/pages/enjoy/trend/trend',
			name: 'trend'
		},
		{
			path: '/pages/enjoy/recordList/recordList',
			name: 'recordList'
		}, {
			path: '/pages/enjoy/enjoyOrder/enjoyOrder',
			name: 'enjoyOrder'
		}, {
			path: '/pages/historiDetail/historiDetail',
			name: 'historiDetail'
		}, {
			path: '/pages/settings/settings',
			name: 'settings'
		}, {
			path: '/pages/settings/security/security',
			name: 'security'
		}, {
			path: '/pages/settings/modifyName/modifyName',
			name: 'modifyName'
		}, {
			path: '/pages/settings/modifyWord/modifyWord',
			name: 'modifyWord'
		}, {
			path: '/pages/settings/about',
			name: 'about'
		}, {
			path: '/pages/settings/privacy',
			name: 'privacy'
		}, {
			path: '/pages/settings/agreement',
			name: 'agreement'
		}, {
			path: '/pages/settings/aboutinfo',
			name: 'aboutinfo'
		}, {
			path: '/pages/mine/wallet',
			name: 'wallet'
		}, {
			path: '/pages/settings/bankCard',
			name: 'bankCard'
		}, {
			path: '/pages/address/index',
			name: 'address'
		}, {
			path: '/pages/address/addSite',
			name: 'addSite'
		}, {
			path: '/pages/mine/withdrawal',
			name: 'withdrawal'
		}, {
			path: '/pages/activity/signIn',
			name: 'signIn'
		}, {
			path: '/pages/activity/envelope',
			name: 'envelope'
		}, {
			path: '/pages/activity/redEnv',
			name: 'redEnv'
		}, {
			path: '/pages/mine/myOrder',
			name: 'myOrder'
		}, {
			path: '/pages/mine/mine-order',
			name: 'mineOrder'
		}, {
			path: '/pages/mine/statistics',
			name: 'statistics',
			requiredLogin: true,
		}, {
			path: '/pages/mine/records',
			name: 'records'
		}, {
			path: '/pages/mine/envelopes',
			name: 'envelopes'
		}, {
			path: '/pages/promotion/applyBalance',
			name: 'applyBalance'
		},{
			path: '/pages/activity/signRule',
			name: 'signRule'
		},{
			path: '/pages/activity/redRule',
			name: 'redRule'
		},{
			path: '/pages/language/language',
			name: 'language'
		},{
			path: '/pages/rechargeRecord/rechargeRecord',
			name: 'rechargeRecord'
		},{
			path: '/pages/promotionList/promotionList',
			name: 'promotionList'
		},{
			path: '/pages/application/application',
			name: 'application'
		},{
			path: '/pages/invite/invite',
			name: 'invite'
		},{
			path: '/pages/register/register',
			name: 'register'
		},
		{
			path: '/pages/myForgetPassword/index',
			name: 'forgetPassword'
		}, 
		{
			path: '/pages/center/index',
			name: 'center',
			H5Params: {
				H5Name: '' //使用一个临时变量来存储
			},
			beforeEnter: (to, from, next) => {
				to.H5Params.H5Name = to.query.name
				next();
			}
		},
		{
			path: '/pages/login/index',
			name: 'login'
		}
	]
})

// 白名单
export const whiteList = [
	'login', 'index', 'center',
	'shopping', "enjoy", "mine", "commodity",
	"promotion", "detailSub", "friends", "rule", "recharge", "trend", "recordList",
	"enjoyOrder", "historiDetail", "settings", "security", "modifyName", "modifyWord", "about", "privacy", "agreement",
	"aboutinfo", "wallet", "bankCard", "address", "addSite", "activity", "withdrawal", "signIn", "envelope", "redEnv",
	"myOrder", "records", "envelopes", "applyBalance","signRule","language","rechargeRecord","promotionList","application","invite","register","redRule"
]

//全局路由前置守卫
router.beforeEach((to, from, next) => {
	const tokenStr = uni.getStorageSync('token')
	if (whiteList.includes(to.name) && to.requiredLogin) {
		
		if ( !tokenStr) {
			next({
				name: 'login',
				NAVTYPE: 'push'
			})
		} else {
			next()
		}
	} else {
		next()
	}
	// next()


	// if (whiteList.includes(to.name) && to.requiredLogin) {
	// 	console.log('进入requ')
	// 	next({
	// 		name: 'login',

	// 	})
	// } else if (!tokenStr) {
	// 	next({
	// 		name: 'login',
	// 		NAVTYPE: 'push'
	// 	})
	// } else {
	// 	console.log('下一步了')
	// 	next()
	// }
})
// 全局路由后置守卫
router.afterEach((to, from) => {})
export default router;

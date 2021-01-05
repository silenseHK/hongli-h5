import { http } from '../utils'

export const login = data => http.post('login', data) //登录
export const register = data => http.post('register', data) //注册

export const userNames = data =>http.post('user/nickname',data) //修改昵称
export const userPassword = data =>http.post('user/password',data) //修改密码
export const phoneCode = data=>http.post('sendCode',data) //发送手机验证码
export const resetPassword = data=>http.post('/resetPass',data) //填写忘记密码重置的信息
export const sendVerificationCode = data=>http.post('/sendCode',data) //忘记密码发送验证码
/* 
	银行卡--start
 */
export const getCards = data =>http.get('bank/findAll',data) //查看
export const addCards = data =>http.post('bank/add',data) //添加
export const editCards = data =>http.post('bank/edit',data) //编辑
export const deleteCards = data =>http.post('bank/del',data) //删除
/* 
	银行卡--end
 */
/* 
	地址--start
 */
export const getAddress = data =>http.get('address/findAll',data) //查看
export const addAddress = data =>http.post('address/add',data) //添加
export const editAddress = data =>http.post('address/edit',data) //编辑
export const deleteAddress = data =>http.post('address/del',data) //删除
/* 
	地址--end
 */

export const getGame = data =>http.post('game_start',data) //获取获取彩票游戏当前期数信息和上期开奖 
export const getBetting = data =>http.post('betting',data) //彩票游戏投注接口
	

export const getWithdrawal = data =>http.post('user/withdrawal',data) //提交提现
export const getwithAll = data =>http.get('withdrawal/record',data) //获取提现记录
export const gameList = data =>http.post('game_list',data)//获取投注记录
export const requestsBetting = data =>http.post('betting_list',data)//获取投注记录

/* 
	代理 提现
 */

export const getPxory = data=>http.post('withdrawal/agent/extract',data)

/* 
	新代理 提现
 */

export const newPxoryGeyMoney = data=>http.post('withdrawal/apply',data)

/* 
获取任务列表
 */
export const getTasks = data=>http.get('activity/tasks',data)
export const getReward = data=>http.post('activity/task_reward_get',data)

/* 
	活动签到 --start
 */
	export const getSignIn = data =>http.get('activity/sign/packages',data)
	export const buySignIn = data =>http.post('activity/sign/buypackage',data)
	export const getMoney = data =>http.post('activity/sign/getmoney',data)
	export const getInfoList = data =>http.post('activity/sign/getpackagereceiveinfo',data)
	export const getactive = data =>http.post('activity/sign/info',data)
/* 
	活动签到 --end
 */

/* 
	k客服连接
 */

export const getGroup = (data)=>http.post('/groupUrl',data)
export const getservice = (data)=>http.post('/serviceUrl',data)

/**
 *  弹窗
 */
export const getAlert = (data)=>http.get('/h5Alert', data)

//充值接口
export const getRecharge  = (data) =>http.post('/user/recharge',data)
export const getRechargeList = (data) =>http.post('/user/rechargelog',data)

//查询推广人数和奖励
export const requestRecommend = (data) =>http.post('/user/recommend',data) 
//查看促销记录
export const requestExtension = (data) =>http.post('/user/extension',data)
//查看代理提现记录接口
export const requestRecord = (data)=>http.post('/withdrawal/agent/record',data)
//查询代理奖励记录
export const requestReward = (data) =>http.post('/withdrawal/agent/reward',data)
//查询一二级佣金记录
export const requestCommission = (data)=>http.post('/withdrawal/agent/reward',data)

//获取用户信息
export const requestInfo = (data)=>http.get('/user/info',data)
//获取支付方式
export const getrechargemethods = (data)=>http.post('/user/rechargemethods',data)

//获取统计
export const statistics = (data)=>http.get('/betting/statistics',data)

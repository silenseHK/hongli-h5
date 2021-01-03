// 登录

import {
	login
} from '../../../api/test.js'
import {
	whiteList
} from '../../../router/index.js'

const state = {
	token: "", //token令牌
	userName: "",
	nikename: '', //用户昵称
	money: '', //用户余额
	last_time: '', //注册时间
	id: '', //用户id
	isLogin: false,
	balance: ""
};
const mutations = {
	SET_TOKEN(state, val) {
		state.token = val;
		uni.setStorageSync("token", val);
		// whiteList.push('activity')
	},

	SET_NAME(state, payload) {
		// console.log(payload.phone)
		uni.setStorageSync("money", payload.balance);
		uni.setStorageSync("nikename", payload.nickname);
		uni.setStorageSync('commission', payload.commission)
		uni.setStorageSync('code', payload.code)
		uni.setStorageSync('phone', payload.phone)
		uni.setStorageSync('id', payload.id)

		state.id = payload.id;
		state.nikename = payload.nikename;
		state.money = payload.balance;
		state.last_time = payload.last_time;

	},
	GET_BANCKS(state, payload) {
		state.balance = payload
		uni.setStorageSync('money', payload)
	},
	IS_LOGIN(state, val) {
		state.isLogin = val
	}

};
const actions = {
	// user login
	_login({
		commit
	}, formdatas) {
		return new Promise((resolve, reject) => {
			login(formdatas)
				.then((res) => {
					if (res.code === 200) {
						commit('SET_TOKEN', res.data.token)
						commit('SET_NAME', res.data)
						commit('IS_LOGIN', true)
					}
					resolve(res)

				})
				.catch((error) => {
					reject(error);
				});
		});
	},

};
export default {
	namespaced: true,
	state,
	mutations,
	actions,
};

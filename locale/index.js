import LangEn from './en.js'
import LangEk from './ek.js'
import Vue from 'vue'
import VueI18n from './vue-i18n'
Vue.use(VueI18n)
const system_info = uni.getStorageSync('system_info')
if (!system_info) {
	// 获取设备信息
	uni.getSystemInfo({
		success: function(res) {
			uni.setStorageSync('system_info', res);
		}
	})
}
// const cur_lang = system_info.language.indexOf('en') !== -1 ? 'en' : 'fr'
// console.log(cur_lang)
const i18n = new VueI18n({
	locale:  'en', // 默认选择的语言
	messages: {
		'en': LangEn,
		'fr': LangEk
	}
})
export default i18n

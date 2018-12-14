import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex);

var state={
	DeliverType: 'EveryDay',
	HalfDateType: 'Morning',
	beginDate: undefined,
	addressId: undefined,
	/* 立即购买的字段 */
	buyNow: {
		count: undefined,
		deliveryMethod: undefined,
		number: undefined,
		produtId: undefined
	},
	/* 拼团购买的字段 */
	pintuan: {
		count: undefined,
		deliveryMethod: undefined,
		number: undefined,
		produtId: undefined,
	}
};

const mutations={
};

const getters ={
}

const actions={
};

export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters
});
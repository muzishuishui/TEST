import Vuex from 'vuex'
import Vue from 'vue'
Vue.use(Vuex);

//基础数据
//年级管理
import GradeStore from './modules/base/GradeStore'
import SchoolStore from './modules/base/SchoolStore'

export default new Vuex.Store({
	modules:{
		
		GradeStore,
		SchoolStore
	}
});
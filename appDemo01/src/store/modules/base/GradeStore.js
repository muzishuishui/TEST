import axios from '@/store/axios.js'




export default {
	state:{
		gradeList:[]
	},
	getters:{
		getGradeList:state=>state.gradeList

	},
	mutations:{
		alterGradeList:(state,data)=>{
			state.gradeList = data;
		}
	},
	actions:{
		//批量删除
		batchDeleteGrade(context,ids){
			return new Promise((resolve,reject)=>{
				axios.get('/grade/batchDelete',{params:{ids}}).then(({data})=>{
					if(data.status == 200){
						resolve(data);
					}else{
						reject(data)
					}
				}).catch((error)=>{reject(error)})
			})
		},
		//通过id删除年级信息
		deleteGradeById:(context,id)=>{
			return new Promise((resolve,reject)=>{
				axios.get('/grade/deleteById',{params:{id}}).then((data)=>{
					if(data.status == 200){
						resolve(data)
					}else{
						reject(data)
					}
				}).catch((error)=>{reject(error)})
			})
		},

		//保存或更新年级信息
		saveOrUpdateGrade:(context,grade)=>{
			return new Promise((resolve,reject)=>{
				axios.post('/grade/saveOrUpdate',grade).then(({data})=>{
					if(data.status == 200){
						resolve(data)
					}else{
						reject(data)
					}
				}).catch((error)=>{reject(error)})
			})
		},

		//1.返回一个承若对象(方便调用者添加事件处理函数)
		//2.一般为异步操作
		//查询所有年级信息
		findGradeList:(context)=>{
			return new Promise((resolve,reject)=>{
				axios.get('/grade/findAll').then(({data})=>{
					if(data.status == 200){
						// console.log('---',data);
						//提交突变，更新状态库中gradeList
						context.commit('alterGradeList',data.data);
						resolve(data.data);
					}else{
						reject(data)
					}
					
					
				}).catch((error)=>{reject(error)})
			}) 	
		}
	}
}
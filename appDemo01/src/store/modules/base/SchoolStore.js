import axios from '@/store/axios.js'

export default{
	state:{
		school:{}
	},
	getters:{
		getSchool:state=>state.school
	},
	mutations:{
		alterSchool:(state,school)=>{
			state.school = school;
		}
	},
	actions:{
		//保存或者更新校园信息
		saveOrUpdateSchool:(context,school)=>{
			return new Promise((resolve,reject)=>{
				axios.post('/school/saveOrUpdate',school).then(({data})=>{
					if(data.status ==200){
						
						resolve(data)
					}else{
						reject(data)
					}
					
				}).catch((error)=>reject(error))
				})
			},
		
		//查询学校信息
		findSchool:(context,id=1)=>{
			return new Promise((resolve,reject)=>{
				axios.get('/school/findById',{params:{id}}).then(({data})=>{
					if(data.status ==200){
						// context.commit('alterSchool',data.data);
						resolve(data)
					}else{
						reject(data)
					}
					
				}).catch((error)=>reject(error))
			})
		}
	}
}
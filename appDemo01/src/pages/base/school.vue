<template>
	<div class="school" v-loading="schoolFormLoading">
		<!-- {{form}} -->
		<el-form ref="form" :model="form" label-width="80px">
		  <el-form-item label="校园名称">
		    <el-input size='small' v-model="form.name"></el-input>
		  </el-form-item>
		  <el-form-item label="校园地址">
		    <el-input size='small' v-model="form.address"></el-input>
		  </el-form-item>
		  <el-form-item label="校园电话">
		    <el-input size='small' v-model="form.telephone"></el-input>
		  </el-form-item>
		  <el-form-item label="版权信息">
		    <el-input size='small' v-model="form.copyright"></el-input>
		  </el-form-item>
		  <el-form-item label="校园介绍">
		    <el-input size='small' type="textarea" v-model="form.description"></el-input>
		  </el-form-item>
	  
		  
		  <el-form-item class="content-right">
		    <el-button type="primary" @click="submitSchoolForm">保存</el-button>
		    
		  </el-form-item>
		</el-form>
	</div>
</template>

<script>
	import {mapGetters,mapActions} from 'vuex'
	export default{
		data(){
			return {
				schoolFormLoading:false,
				form:{
					

				}
			}
		},
		created(){
			this.loadSchool();
		},
		computed:{
			...mapGetters(['getSchool'])
		},
		methods:{
			...mapActions(['findSchool','saveOrUpdateSchool']),

			//更新学校信息
			loadSchool(){
				this.schoolFormLoading =true;
				this.findSchool().then((result)=>{
					console.log(result);
					this.form = result.data;
				}).catch((error)=>{
					this.$notify({title: '失败',
				          message: '数据异常:'+error.message, type: 'error'});
				}).finally(()=>{
					this.schoolFormLoading =false;
				})
			},
			//提交学校表单
			submitSchoolForm(){
				 //1.向后台发送数据
				
				let school =this.form;
				this.saveOrUpdateSchool(school).then(()=>{
					//2.当添加成功，提示用户，然后关闭模态框
		    	 		this.$notify({title: '成功', message: '学校信息保存成功', type: 'success'});
		    	 	//更新
		    	 	this.loadSchool();
				}).catch((error)=>{
					//3.当添加失败，提示用户，不关闭模态框
		    	 	 this.$notify({title: '失败', message: '学校信息保存失败', type: 'error'});

				})
			}
		}
	}
</script>
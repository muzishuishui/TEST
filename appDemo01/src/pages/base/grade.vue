<template>
	
	<div class="grade">
		<el-row class="topBtns">
			<el-col :span='12'>
				<el-input style="width: 220px"></el-input>
			</el-col>
			<el-col :span='12' class="content-right">
				<el-button @click='toAddGrade'>添加</el-button>
				<el-button @click='toBatchDelete'>批量删除</el-button>
			</el-col>
		</el-row>

		<el-row class="">
			<el-col :span='24'>
			  <el-table
			    v-loading="gradeTblLoading"
			    size='mini'
			  	border
			    ref="multipleTable"
			    :data="getGradeList"
			    tooltip-effect="dark"
			    style="width: 100%"
			    @selection-change="handleSelectionChange">
			    <el-table-column
			      align='center'
			      type="selection"
			      width="55">
			    </el-table-column>
			    <el-table-column
			      align='center'
			      prop="name"
			      label="名称">
			      
			    </el-table-column>
			    <el-table-column
			      align='center'
			      prop="description"
			      label="简介">
			    </el-table-column>
			    <el-table-column
			      align='center'
			      label="操作"
			      width='120'>
			     <template slot-scope='scope'> 
				     <el-button type='text' @click='toEditGrade(scope.row)'>修改</el-button>
				     <el-button type='text' @click='toDeleteGrade(scope.row)'>删除</el-button>
			     </template>
			    </el-table-column>
			  </el-table>
			</el-col>
		</el-row>
<!-- 模态框  添加 修改年级 -->
		<el-dialog
		  :title="gradeDialog.title"
		  :visible.sync="gradeDialog.visible"
		  :before-close="handleGradeDialogClose">
		  {{gradeDialog.form}}
		  <el-form
		   ref='gradeDialogForm'
		   :rules="gradeDialog.rules" 
		   :model='gradeDialog.form' 
		   label-width='100px'
		   label-position='right'
		  >
		  	<el-form-item label='年级名称' prop='name'>
		  		<el-input v-model='gradeDialog.form.name' ></el-input>
		  	</el-form-item>
		  	<el-form-item  label='年级简介' prop='description'>
		  		<el-input type='textarea' v-model='gradeDialog.form.description' ></el-input>
		  	</el-form-item>
		  </el-form>




		  <span slot="footer" class="dialog-footer">
		    <el-button @click="gradeDialog.visible = false">取 消</el-button>
		    <el-button type="primary" @click="submitGradeForm">确 定</el-button>
		  </span>
		</el-dialog>

	</div>
</template>

<script>
	import {mapGetters,mapActions} from 'vuex'
	export default{
		data(){
			return{
				gradeTblLoading:false,
				selectedGrades:[],//复选的年级信息
				//今维护年纪模态框中相关数据
				gradeDialog:{
					visible:false,  //可见性
					title:'',		//标题
					form:{			//表单数据
						id:'',
						name:'',
						description:''
					},
					rules:{  	//校验规则
						name:[{required:true,message:'请输入年纪名称',trigger:'blur'}],
						description:[{required:true,message:'请输入年纪简介',trigger:'blur'}]
					}

				}


			}
		},
		computed:{
			/*getGradeList(){
				return [{
					id:1001,
					name:'webui',
					description:'前端开发'
				},{
					id:1002,
					name:'javaee',
					description:'服务端端开发'
				}]
			}*/
			...mapGetters(['getGradeList'])
		},
		created(){
			this.loadGeadeList();
		},
		methods:{
			...mapActions(['findGradeList','saveOrUpdateGrade','deleteGradeById','batchDeleteGrade']),
			//家在年级数据
			loadGeadeList(){
				//查询所有年级信息
				this.gradeTblLoading = true;
				this.findGradeList().catch((error)=>{
					this.$notify({title: '失败',
				          message: '数据异常:'+error.message, type: 'error'});
				}).finally(()=>{
					this.gradeTblLoading = false;
				});
			},
			//去添加年级数据
			toAddGrade(row){
				// //初始化
				this.resetForm();
				// this.$refs['gradeDialogForm'].resetFields();
				//1.弹出模态框
				this.gradeDialog.title = '添加年纪信息'
				this.gradeDialog.visible =true;

				//2.初始化或者重置模态框中的默认值
			
				 
				 
			},
			//去修改年级数据
    	 	toEditGrade(row){
    	 		this.gradeDialog.title = '修改年纪信息'
				this.gradeDialog.visible =true;

				this.gradeDialog.form = row;
    	 		console.log('edit',JSON.stringify(row));
    	 	},
    	 	//去批量删除
    	 	toBatchDelete(){
    	 		if(this.selectedGrades && this.selectedGrades.length>0){
    	 			//1.询问用户是否删除
    	 		this.$confirm('此操作将永久删除这些数据, 是否继续?', '提示', {
		          confirmButtonText: '确定',
		          cancelButtonText: '取消',
		          type: 'warning'
		        }).then(() => {
		        	//2.获取要删除id
		        	let ids = this.selectedGrades.map((item)=>{
		        		return item.id;
		        	});
		        	//3.调用接口删除
		        	this.batchDeleteGrade(ids.join()).then(()=>{
		        		this.loadGeadeList();
		        	});
		        	this.$notify({type: 'success', message: '删除成功!'});
		         	
		        })
		    }else{
		    	this.$notify({type: 'warning', message: '请选择要删除的数据!'});
		    }
    	 		
    	 		
    	 	},
    	 	//去删除年纪数据
    	 	toDeleteGrade(row){
    	 		//询问用户是否删除
    	 		this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
		          confirmButtonText: '确定',
		          cancelButtonText: '取消',
		          type: 'warning'
		        }).then(() => {
		        	//确定删除，调用store中的函数 删除
		        	this.deleteGradeById(row.id).then(()=>{
		        		 this.$notify({
			            type: 'success',
			            message: '删除成功!'
			          });
		        		 //3.刷新列表
		        		 this.loadGeadeList();
		        		}).catch(()=>{
		        			 this.$notify({
				            type: 'error',
				            message: '删除失败!'
				          });
		        		})
		         
		        })
    	 		
    	 	},
    	 	//提交年纪表单
    	 	submitGradeForm(){
    	 		//0.数据校验
    	 		this.$refs['gradeDialogForm'].validate((valid)=>{
    	 			if(valid){
    	 			  //1.向后台发送数据
		    	 		let grade = this.gradeDialog.form;
		    	 		this.saveOrUpdateGrade(grade).then(()=>{
		    	 			//2.当添加成功，提示用户，然后关闭模态框
		    	 			 this.$notify({title: '成功',
				          message: '年级信息保存成功', type: 'success'});
		    	 			 //更新
		    	 			 this.loadGeadeList();
		    	 			this.$refs['gradeDialogForm'].resetFields();
		    	 		    this.gradeDialog.visible = false;

		    	 		}).catch(()=>{
		    	 			//3.当添加失败，提示用户，不关闭模态框
		    	 			 this.$notify({title: '失败',
				          message: '年级信息保存失败', type: 'error'});

		    	 		})
		    	 		
		    	 		
		    	 		
		    	 		
	    	 			}
    	 		})	
    	 		

    	 	},
    	 	//初始化
    	 	resetForm(){
    	 		this.gradeDialog.form={
    	 				id:'',
						name:'',
						description:''
    	 		}
    	 	},
    	 	handleSelectionChange(val) {

        		this.selectedGrades = val;
    	 	},
    	 	handleGradeDialogClose(done){
    	 		this.$refs['gradeDialogForm'].resetFields();
    	 		done();
    	 	}
		}
	}
</script>

<style scoped="scoped">
	.topBtns{
		margin-bottom: .5em;
	}
</style>
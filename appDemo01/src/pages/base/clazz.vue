<template>
	<div class="clazz">
		<el-row class="topBtns">
			<el-col :span='6'>
				<el-select placeholder='Webui'></el-select>
			</el-col>
			<el-col :span='6'>
				<el-input></el-input>
			</el-col>
			<el-col :span='12' class="content-right">
				<el-button @click="toAddClazz">添加</el-button>
				<el-button>批量删除</el-button>
			</el-col>
		</el-row>
	
		<el-row>
			<el-col :span='24'>
				<el-table
				  size='mini'
			      :data="getClazzList"
			      border
			      style="width: 100%"
			      ref="multipleTable"
			       @selection-change="handleSelectionChange">
			    <el-table-column
			      prop="id"
			      label="编号"
			      width="55"
			      align='center'>
			    </el-table-column>
			    <el-table-column
			      prop="name"
			      label="班级名称"
			      align='center'
			      >
			    </el-table-column>
			    <el-table-column
			      prop="description"
			      label="班级简介"
			      align='center'>
			    </el-table-column>
			    <el-table-column
			      prop="man"
			      label="班主任"
			      align='center'>
			    </el-table-column>
			    <el-table-column  
			      label="操作"
			      align='center'>
			      <template slot-scope='scope'>
			      	<!-- {{scope.row}} -->
			      	<el-button type='text' @click='toEditClazz(scope.row)'>修改</el-button>
			      	<el-button type='text' @click='toDeleteClazz(scope.row)'>删除</el-button>
			      </template>
			     
			    </el-table-column>
			  </el-table>
			</el-col>
		</el-row>


		<!-- 添加 修改班级模态框 -->
		<el-dialog :title="clazzDialog.title" :visible.sync="clazzDialog.visible"
			:before-close='handleClazzDialogClose'>
			{{clazzDialog.form}}
		  <el-form 
		  ref='clazzDialogForm'
		  :model="clazzDialog.form"
		  :rules='clazzDialog.rules'>
		  	<!-- <el-form-item label="所属班级" label-width="100px" prop='id'>
		      <el-select v-model="clazzDialog.form.id" placeholder="请选择活动区域">
		        <el-option label="区域一" value="shanghai"></el-option>
		        <el-option label="区域二" value="beijing"></el-option>
		      </el-select>
		    </el-form-item> -->
		    <el-form-item label="班级名称" label-width="100px" prop='name'>
		      <el-input v-model="clazzDialog.form.name" auto-complete="off"></el-input>
		    </el-form-item>
		    <el-form-item label="班主任" label-width="100px" prop='man'>
		      <el-select v-model="clazzDialog.form.man" placeholder="请选择班主任">
		        <!-- <el-option label="区域一" value="shanghai"></el-option>
		        <el-option label="区域二" value="beijing"></el-option> -->
		      </el-select>
		    </el-form-item>
		     <el-form-item label="班级介绍" label-width="100px" prop='description'>
		      <el-input v-model="clazzDialog.form.description" type='textarea'></el-input>
		    </el-form-item>
		  </el-form>
		  <div slot="footer" class="dialog-footer">
		    <el-button @click="clazzDialog.visible = false">取 消</el-button>
		    <el-button type="primary" @click="submitClazzForm">确 定</el-button>
		  </div>
		</el-dialog>

	</div>
</template>

<script>
	export default{
		data(){
			return{
				//模态框中数据
				clazzDialog:{
					visible:false,
					title:'',
					form:{
						id:'',
						name:'',
						description:'',
						man:''
					},
					rules:{
						name:[{required:true,message:'请输入班级名称',trigger:'blur'}],
						description:[{required:true,message:'请输入班纪简介',trigger:'blur'}],
						man:[{required:true,message:'请选择班主任',trigger:'change'}]
					}
				}
			}
		},
		computed:{
			getClazzList(){
				return [{
					id:'',
					name:'web1801',
					description:'校企合作',
					man:'赵佳恒'
				},{
					id:'',
					name:'web1801',
					description:'校企合作',
					man:'赵佳恒'
				}]
			}
		},
		methods:{
			//去添加班级数据
			toAddClazz(){
				this.resetForm();
				/*this.$refs['clazzDialogForm'].resetFields();*/
				this.clazzDialog.title='添加班级数据';
				this.clazzDialog.visible = true;
			},	
			//去修改数据
			toEditClazz(row){
				//弹出模态框
				this.clazzDialog.title='修改班级数据';
				this.clazzDialog.visible = true;
				//拿数据
				this.clazzDialog.form = row;
				console.log('edit',JSON.stringify(row));

			},
			//去删除班级数据
			toDeleteClazz(row){
				console.log('delete',JSON.stringify(row));
			},
			//提交班级数据	
			submitClazzForm(){
				//1.数据校验
				this.$refs['clazzDialogForm'].validate((valid) => {
					if(valid){
						//2.当添加成功，提示用户，然后关闭模态框
		    	 		//3.当添加失败，提示用户，不关闭模态框
		    	 		/*this.$refs['clazzDialogForm'].resetFields();*/
		    	 		this.clazzDialog.visible = false;
					}
				})	
			},
			//初始化
			resetForm(){
				this.clazzDialog.form={
						id:'',
						name:'',
						description:'',
						man:''
				}
			},
			handleSelectionChange(val) {
        		this.multipleSelection = val;
    	 	},
    	 	handleClazzDialogClose(done){
    	 		done();
    	 	}
		}
	}
</script>

<style>
	.topBtns{
		margin-bottom: .5em
	}
</style>
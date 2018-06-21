<template>
	<div class="list">
		<el-row class="topBtns">
			<el-col :span='12'>
				<el-input style="width: 220px"></el-input>
			</el-col>
			<el-col :span='12' class="content-right">

				<el-button @click='toAddList'>添加</el-button>
				<el-button>批量删除</el-button>
			</el-col>
		</el-row>

		<el-row class="">
			<el-col :span='24'>
			  <el-table
			    size='mini'
			  	border
			    ref="multipleTable"
			    :data="getListList"
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
			      prop="grade"
			      label="年级">
			      
			    </el-table-column>
			    <el-table-column
			      align='center'
			      prop="course"
			      label="课程">
			    </el-table-column>
			    <el-table-column
			      align='center'
			      prop="question"
			      label="问卷">
			    </el-table-column>
			    <el-table-column
			      align='center'
			      prop="man"
			      label="讲师">
			    </el-table-column>
			    <el-table-column
			      align='center'
			      prop="clazz"
			      label="班级">
			    </el-table-column>
			    <el-table-column
			      align='center'
			      prop="data"
			      label="课调时间">
			    </el-table-column>
			    <el-table-column
			      align='center'
			      label="操作"
			      width='180'>
			     <template slot-scope='scope'> 
			     	<el-button type='text'>预览</el-button>
				     <el-button type='text' @click='toEditList(scope.row)'>修改</el-button>
				     <el-button type='text' @click='toDeleteList(scope.row)'>删除</el-button>
			     </template>
			    </el-table-column>
			  </el-table>
			</el-col>
		</el-row>
<!-- 模态框  添加 修改年级 -->
		<el-dialog
		  :title="listDialog.title"
		  :visible.sync="listDialog.visible"
		  :before-close="handleListDialogClose">
		  {{listDialog.form}}
		  <el-form
		   ref='listDialogForm'
		   :rules="listDialog.rules" 
		   :model='listDialog.form' 
		   label-width='100px'
		   label-position='right'
		  >
		  	 <el-form-item label="年级" label-width="100px" prop='grade'>
		      <el-select v-model="listDialog.form.grade" placeholder="请选择年级">
		        <!-- <el-option label="区域一" value="shanghai"></el-option>
		        <el-option label="区域二" value="beijing"></el-option> -->
		      </el-select>
		    </el-form-item>
		    <el-form-item label="班级" label-width="100px" prop='clazz'>
		      <el-select v-model="listDialog.form.clazz" placeholder="请选择班级">
		        <!-- <el-option label="区域一" value="shanghai"></el-option>
		        <el-option label="区域二" value="beijing"></el-option> -->
		      </el-select>
		    </el-form-item>
		    <el-form-item label="课程" label-width="100px" prop='course'>
		      <el-select v-model="listDialog.form.course" placeholder="请选择课程">
		        <!-- <el-option label="区域一" value="shanghai"></el-option>
		        <el-option label="区域二" value="beijing"></el-option> -->
		      </el-select>
		    </el-form-item>
		    <el-form-item label="问卷" label-width="100px" prop='question'>
		      <el-select v-model="listDialog.form.question" placeholder="请选择问卷">
		        <!-- <el-option label="区域一" value="shanghai"></el-option>
		        <el-option label="区域二" value="beijing"></el-option> -->
		      </el-select>
		    </el-form-item>
		    <el-form-item label="讲师" label-width="100px" prop='man'>
		      <el-select v-model="listDialog.form.man" placeholder="请选择班主任">
		        <!-- <el-option label="区域一" value="shanghai"></el-option>
		        <el-option label="区域二" value="beijing"></el-option> -->
		      </el-select>
		    </el-form-item>
		     <el-form-item label="开启" prop="type">
			    <el-checkbox-group v-model="listDialog.form.type">
			      <el-checkbox label="创建完成后开启课调" name="type"></el-checkbox>
			     
			    </el-checkbox-group>
			  </el-form-item>
		  </el-form>




		  <span slot="footer" class="dialog-footer">
		    <el-button @click="listDialog.visible = false">取 消</el-button>
		    <el-button type="primary" @click="submitListForm">确 定</el-button>
		  </span>
		</el-dialog>

	</div>
</template>

<script>
	export default{
		data(){
			return{
				//今维护年纪模态框中相关数据
				listDialog:{
					visible:false,  //可见性
					title:'',		//标题
					form:{			//表单数据
						id:'',
						grade:'',
						clazz:'',
						course:'',
						question:'',
						man:'',
					},
					rules:{  	//校验规则
						grade:[{required: true, message: '请选择年级', trigger: 'change'}],
						clazz:[{required: true, message: '请选择班级', trigger: 'change'}],
						course:[{required: true, message: '请选择课程', trigger: 'change'}],
						question:[{required: true, message: '请选择问卷', trigger: 'change'}],
						man:[{required: true, message: '请选择讲师', trigger: 'change'}],
					}

				}


			}
		},
		computed:{
			getListList(){
				return [{
					id:1001,
					grade:'webui',
					clazz:'web1801',
					course:'es6',
					question:'杰普软件主讲老师课调',
					man:'苟奋',
					data:'2018-06-10'
				},{
					id:1002,
					grade:'webui',
					clazz:'web1801',
					course:'es6',
					question:'杰普软件主讲老师课调',
					man:'苟奋',
					data:'2018-06-10'
				}]
			}
		},
		methods:{
			//去添加年级数据
			toAddList(row){
				// //初始化
				this.resetForm();
				// this.$refs['listDialogForm'].resetFields();
				//1.弹出模态框
				this.listDialog.title = '添加年纪信息'
				this.listDialog.visible =true;

				//2.初始化或者重置模态框中的默认值
			
				 
				 
			},
			//去修改年级数据
    	 	toEditList(row){
    	 		this.listDialog.title = '修改年纪信息'
				this.listDialog.visible =true;

				this.listDialog.form = row;
    	 		console.log('edit',JSON.stringify(row));
    	 	},
    	 	//去删除年纪数据
    	 	toDeleteList(row){
    	 		console.log('delete',JSON.stringify(row));
    	 	},
    	 	//提交年纪表单
    	 	submitListForm(){
    	 		//0.数据校验
    	 		this.$refs['listDialogForm'].validate((valid)=>{
    	 			if(valid){
    	 			  //1.向后台发送数据
		    	 		let list = this.listDialog.form;
		    	 		console.log('submit',list);
		    	 		//2.当添加成功，提示用户，然后关闭模态框
		    	 		//3.当添加失败，提示用户，不关闭模态框
		    	 		/*this.$refs['listDialogForm'].resetFields();*/
		    	 		this.listDialog.visible = false;
	    	 			}
    	 		})	
    	 		

    	 	},
    	 	//初始化
    	 	resetForm(){
    	 		this.listDialog.form={
    	 				id:'',
						name:'',
						description:''
    	 		}
    	 	},
    	 	handleSelectionChange(val) {
        		this.multipleSelection = val;
    	 	},
    	 	handleListDialogClose(done){
    	 		this.$refs['listDialogForm'].resetFields();
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
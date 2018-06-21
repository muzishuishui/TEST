<template>
	<div class="monitor">
		<el-row class="topBtns">
			<el-col :span='12'>
				<el-input style="width: 220px"></el-input>
			</el-col>
			<el-col :span='12' class="content-right">

				<el-button @click='toAddMonitor'>添加</el-button>
				<el-button>批量删除</el-button>
			</el-col>
		</el-row>

		<el-row class="">
			<el-col :span='24'>
			  <el-table
			    size='mini'
			  	border
			    ref="multipleTable"
			    :data="getMonitorMonitor"
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
			      prop="clazz"
			      label="班级">
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
			      prop="data"
			      label="课调时间">
			    </el-table-column>
			    <el-table-column
			      align='center'
			      prop="courseId"
			      label="课调编号">
			    </el-table-column>
			    <el-table-column
			      align='center'
			      label="操作"
			      width='180'>
			     <template slot-scope='scope'> 
			     	<el-button type='text'>开启</el-button>
				     <el-button type='text' @click='toEditMonitor(scope.row)'>查看进度</el-button>
				     <el-button type='text' @click='toDeleteMonitor(scope.row)'>结束</el-button>
			     </template>
			    </el-table-column>
			  </el-table>
			</el-col>
		</el-row>
<!-- 模态框  添加 修改年级 -->
		
	</div>
</template>

<script>
	export default{
		data(){
			return{
				//今维护年纪模态框中相关数据
				monitorDialog:{
					visible:false,  //可见性
					title:'',		//标题
					form:{			//表单数据
						// id:'',
						// grade:'',
						// clazz:'',
						// course:'',
						// question:'',
						// man:'',
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
			getMonitorMonitor(){
				return [{
					id:1001,
					
					clazz:'web1801',
					course:'es6',
					question:'杰普软件主讲老师课调',
					man:'苟奋',
					data:'2018-06-10',
					courseId:''
				},{
					id:1002,
					
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
			toAddMonitor(row){
				// //初始化
				this.resetForm();
				// this.$refs['monitorDialogForm'].resetFields();
				//1.弹出模态框
				this.monitorDialog.title = '添加年纪信息'
				this.monitorDialog.visible =true;

				//2.初始化或者重置模态框中的默认值
			
				 
				 
			},
			//去修改年级数据
    	 	toEditMonitor(row){
    	 		this.monitorDialog.title = '修改年纪信息'
				this.monitorDialog.visible =true;

				this.monitorDialog.form = row;
    	 		console.log('edit',JSON.stringify(row));
    	 	},
    	 	//去删除年纪数据
    	 	toDeleteMonitor(row){
    	 		console.log('delete',JSON.stringify(row));
    	 	},
    	 	//提交年纪表单
    	 	submitMonitorForm(){
    	 		//0.数据校验
    	 		this.$refs['monitorDialogForm'].validate((valid)=>{
    	 			if(valid){
    	 			  //1.向后台发送数据
		    	 		let monitor = this.monitorDialog.form;
		    	 		console.log('submit',monitor);
		    	 		//2.当添加成功，提示用户，然后关闭模态框
		    	 		//3.当添加失败，提示用户，不关闭模态框
		    	 		/*this.$refs['monitorDialogForm'].resetFields();*/
		    	 		this.monitorDialog.visible = false;
	    	 			}
    	 		})	
    	 		

    	 	},
    	 	//初始化
    	 	resetForm(){
    	 		this.monitorDialog.form={
    	 				id:'',
						name:'',
						description:''
    	 		}
    	 	},
    	 	handleSelectionChange(val) {
        		this.multipleSelection = val;
    	 	},
    	 	handleMonitorDialogClose(done){
    	 		this.$refs['monitorDialogForm'].resetFields();
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
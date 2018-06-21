<template>
	<div class="allCourse">
		<el-row class="topBtns">
			<el-col :span='12'>
				<form class="form-inline">
				  <div class="form-group">
 				    <label for="grade" class="control-label">年级：</label>			
				    <select v-model="currentGrade" name="grade" id="grade" class="form-control" @change='gradeChange(currentGrade)'>
				    	<option  v-for="item in gradeList" v-bind:value="item.id">{{item.name}}</option>
				    </select>
				  </div>
				  <div class="form-group">
				    <label for="clazz" class="control-label">班级：</label>
				     <select v-model="currentClazz" name="clazz" id="clazz" class="form-control" >
				     		<option v-bind:value="item.id"  v-for="item in clazzList">{{item.name}}</option>
				     </select>
				  </div>
				  <div class="form-group">
				    <label for="course" class="control-label">学科：</label>
				    <select v-model="currentCourse" name="course" id="course" class="form-control" @change='courseChange(currentCourse)'>
				    		<option v-bind:value="item.id"  v-for="item in courseList">{{item.name}}</option>
				    </select>
				  </div>
				  <div class="form-group">
				    <label for="question" class="control-label">问卷：</label>
				    <select v-model="currentQuestion" name="question" id="question" class="form-control" @change='questionChange(currentQuestion)'>
				    		<option v-bind:value="item.id"  v-for="item in subjectList">{{item.name}}</option>
				    </select>
				  </div>
				  
				  <el-input style="width: 120px"></el-input>
				</form>
				
			</el-col>
			<el-col :span='12' class="content-right">

				<el-button @click='toAddAllCourse'>添加</el-button>
				<el-button>批量删除</el-button>
			</el-col>
		</el-row>

		<el-row class="">
			<el-col :span='24'>
			  <el-table
			    size='mini'
			  	border
			    ref="multipleTable"
			    :data="getAllCourseAllCourse"
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
			      prop="average"
			      label="平均分">
			    </el-table-column>
			    <el-table-column
			      align='center'
			      label="操作"
			      width='180'>
			     <template slot-scope='scope'> 
			     	<el-button type='text'>预览</el-button>
				     <el-button type='text' @click='toEditAllCourse(scope.row)'>下载</el-button>
				     <el-button type='text' @click='toDeleteAllCourse(scope.row)'>问卷分析</el-button>
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
				allCourseDialog:{
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
			getAllCourseAllCourse(){
				return [{
					id:1001,
					grade:'webui',
					
					clazz:'web1801',
					course:'es6',
					question:'杰普软件主讲老师课调',
					man:'苟奋',
					data:'2018-06-10',
					average:''
				},{
					id:1002,
					grade:'webui',
					
					clazz:'web1801',
					course:'es6',
					question:'杰普软件主讲老师课调',
					man:'苟奋',
					data:'2018-06-10',
					average:''

				}]
			}
		},
		methods:{
			//去添加年级数据
			toAddAllCourse(row){
				// //初始化
				this.resetForm();
				// this.$refs['allCourseDialogForm'].resetFields();
				//1.弹出模态框
				this.allCourseDialog.title = '添加年纪信息'
				this.allCourseDialog.visible =true;

				//2.初始化或者重置模态框中的默认值
			
				 
				 
			},
			//去修改年级数据
    	 	toEditAllCourse(row){
    	 		this.allCourseDialog.title = '修改年纪信息'
				this.allCourseDialog.visible =true;

				this.allCourseDialog.form = row;
    	 		console.log('edit',JSON.stringify(row));
    	 	},
    	 	//去删除年纪数据
    	 	toDeleteAllCourse(row){
    	 		console.log('delete',JSON.stringify(row));
    	 	},
    	 	//提交年纪表单
    	 	submitAllCourseForm(){
    	 		//0.数据校验
    	 		this.$refs['allCourseDialogForm'].validate((valid)=>{
    	 			if(valid){
    	 			  //1.向后台发送数据
		    	 		let allCourse = this.allCourseDialog.form;
		    	 		console.log('submit',allCourse);
		    	 		//2.当添加成功，提示用户，然后关闭模态框
		    	 		//3.当添加失败，提示用户，不关闭模态框
		    	 		/*this.$refs['allCourseDialogForm'].resetFields();*/
		    	 		this.allCourseDialog.visible = false;
	    	 			}
    	 		})	
    	 		

    	 	},
    	 	//初始化
    	 	resetForm(){
    	 		this.allCourseDialog.form={
    	 				id:'',
						name:'',
						description:''
    	 		}
    	 	},
    	 	handleSelectionChange(val) {
        		this.multipleSelection = val;
    	 	},
    	 	handleAllCourseDialogClose(done){
    	 		this.$refs['allCourseDialogForm'].resetFields();
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
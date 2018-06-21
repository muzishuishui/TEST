<template>
	<div class="course">
		<el-row class="topBtns">
			<el-col :span='6'>
				<el-select placeholder='Webui'></el-select>
			</el-col>
			<el-col :span='6'>
				<el-input></el-input>
			</el-col>
			<el-col :span='12' class="content-right">
				<el-button @click="toAddCourse">添加</el-button>
				<el-button>批量删除</el-button>
			</el-col>
		</el-row>
		<el-row>
			<el-col :span='24'>
				<el-table

			      :data="getCourseList"
			      border
			   	  style="width: 100%">
			   	<el-table-column
			   	  align='center'
			      type='selection'
			      label="日期"
			      width="55">
			    </el-table-column>
			    <el-table-column
			      prop="name"
			      label="课程名称"
			      width='100'
			       align='center'
			      >
			    </el-table-column>
			    <el-table-column
			      prop="cycle"
			      label="周期"
			      width="80"
			       align='center'
			      >
			    </el-table-column>
			    <el-table-column
			      prop="description"
			      label="课程简介"
			      align='center'>
			    </el-table-column>
			    <el-table-column
			      width='120'
			      label="适用年级"
			      align='center'>
			    </el-table-column>
			    <el-table-column
			      width='120'
			      label="操作"
			      align='center'>
			      <template slot-scope='scope'>
			      	
			      	<el-button type='text' @click='toEditCourse(scope.row)'><i class="fa fa-edit fa-2x"></i></el-button>
			      	<el-button type='text' @click='toDeleteCourse(scope.row)'><i class="fa fa-circle-o fa-2x"></i></el-button>

			      </template>
			      
			    </el-table-column>
			  </el-table>
			</el-col>
		</el-row>

		<el-dialog :title="courseDialog.title" :visible.sync="courseDialog.visible">
			{{courseDialog.form}}
		  <el-form 
		  :model="courseDialog.form"
		  ref='courseDialogForm'
		  :rules='courseDialog.rules'
		  >
		    <el-form-item label="课程名称" :label-width="formLabelWidth" prop='name'>
		      <el-input v-model="courseDialog.form.name" auto-complete="off"></el-input>
		    </el-form-item>
		    <el-form-item label="适用年级" :label-width="formLabelWidth">
		      <el-input auto-complete="off"></el-input>
		    </el-form-item>
		    <el-form-item label="课程周期" :label-width="formLabelWidth" prop='cycle'>
		      <el-select v-model="courseDialog.form.cycle" placeholder="10天">
		        <el-option label="区域一" value="shanghai"></el-option>
		        <el-option label="区域二" value="beijing"></el-option>
		      </el-select>
		    </el-form-item>
		    <el-form-item label="课程介绍" :label-width="formLabelWidth" prop='description'>
		      <el-input type='textarea' v-model='courseDialog.form.description'></el-input>
		    </el-form-item>
		  </el-form>
		  <div slot="footer" class="dialog-footer">
		    <el-button @click="courseDialog.visible = false">取 消</el-button>
		    <el-button type="primary" @click="submitCourseForm">确 定</el-button>
		  </div>
		</el-dialog>


	</div>
</template>

<script>
	export default{
		data(){
			return{
				courseDialog:{
					title:'',
					visible:false,
					form:{
						id:'',
						name:'',
						cycle:'',
						description:''
					},
					rules:{
						name:[{required:true,message:'请输入课程名称',trigger:'blur'}],
						description:[{required:true,message:'请输入课程简介',trigger:'blur'}],
						cycle:[{required:true,message:'请选择周期',trigger:'change'}]
					}
				},
				 formLabelWidth: '100px'
			}
		},
		computed:{
			getCourseList(){
				return [{
					id:'',
					name:'html5',
					cycle:'5',
					description:'超文本标记',

				},{
					id:'',
					name:'html5',
					cycle:'5',
					description:'超文本标记',
				}]
			}
		},
		methods:{
			//去添加课程信息
			toAddCourse(){
				//初始化
				this.resetForm();
				this.courseDialog.title = '添加课程信息';
				this.courseDialog.visible = true;
			},
			//去修改课程信息
			toEditCourse(row){
				//弹出模态框
				this.courseDialog.title = '修改课程信息';
				this.courseDialog.visible = true;
				//拿数据
				this.courseDialog.form = row;

			},
			//去删除课程信息
			toDeleteCourse(row){
				console.log('delete',JSON.stringify(row));
			},
			//初始化
			resetForm(){
				this.courseDialog.form={
						id:'',
						name:'',
						description:'',
						cycle:''
				}
			},

			//提交课程信息
			submitCourseForm(){
				//1.数据校验
				this.$refs['courseDialogForm'].validate((valid)=>{
					if(valid){
						//2.当添加成功，提示用户，然后关闭模态框
						this.courseDialog.visible = false;
					}
				})
			}
		}

	}
</script>
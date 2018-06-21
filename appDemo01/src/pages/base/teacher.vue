<template>
	<div class="teacher">
		<el-row class="topBtns">
			<el-col :span='6'>
				<el-select placeholder='Webui'></el-select>
			</el-col>
			<el-col :span='6'>
				<el-input></el-input>
			</el-col>
			<el-col :span='12' class="content-right">
				<el-button @click="toAddTeacher">添加</el-button>
				<el-button>批量删除</el-button>
			</el-col>
		</el-row>
		<el-row>
			<el-col :span='24'>
				<el-table

			      :data="getTeacherList"
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
			      label="教师姓名"
			      width='100'
			       align='center'
			      >
			    </el-table-column>
			    <el-table-column
			      prop="gender"
			      label="性别"
			      width="80"
			       align='center'
			      >
			    </el-table-column>
			    <el-table-column
			      prop="beginDate"
			      label="出生日期"
			      align='center'>
			    </el-table-column>
			    <el-table-column
			      width='120'
			      label="所属年级"
			      align='center'>
			    </el-table-column>
			    <el-table-column
			      prop="endDate"
			      label="入职日期"
			      align='center'>
			    </el-table-column>
			    <el-table-column
			      width='120'
			      label="操作"
			      align='center'>
			      <template slot-scope='scope'>
			      	
			      	<el-button type='text' @click='toEditTeacher(scope.row)'><i class="fa fa-edit fa-2x"></i></el-button>
			      	<el-button type='text' @click='toDeleteTeacher(scope.row)'><i class="fa fa-circle-o fa-2x"></i></el-button>

			      </template>
			      
			    </el-table-column>
			  </el-table>
			</el-col>
		</el-row>

		<el-dialog :title="teacherDialog.title" :visible.sync="teacherDialog.visible">
			{{teacherDialog.form}}
		  <el-form 
		  :model="teacherDialog.form"
		  ref='teacherDialogForm'
		  :rules='teacherDialog.rules'
		  >
		    <el-form-item label="教师姓名" :label-width="formLabelWidth" prop='name'>
		      <el-input v-model="teacherDialog.form.name" auto-complete="off"></el-input>
		    </el-form-item>
			<el-form-item label="性别" prop="gender" :label-width="formLabelWidth">
		     <el-radio-group v-model="teacherDialog.form.gender">
		      <el-radio label="男"></el-radio>
		      <el-radio label="女"></el-radio>
		     </el-radio-group>
		  	</el-form-item>
		  	
		  	<el-form-item prop="beginDate" label="出生日期" :label-width="formLabelWidth">
        		<el-date-picker type="date" placeholder="选择日期" v-model="teacherDialog.form.beginDate"></el-date-picker>
            </el-form-item>
		  	<el-form-item prop="endDate" label="入职日期" :label-width="formLabelWidth">
        		<el-date-picker type="date" placeholder="选择日期" v-model="teacherDialog.form.endDate"></el-date-picker>
            </el-form-item>
		    <el-form-item label="适用年级" :label-width="formLabelWidth">
		      <el-input auto-complete="off"></el-input>
		    </el-form-item>
		   
		  </el-form>
		  <div slot="footer" class="dialog-footer">
		    <el-button @click="teacherDialog.visible = false">取 消</el-button>
		    <el-button type="primary" @click="submitTeacherForm">确 定</el-button>
		  </div>
		</el-dialog>


	</div>
</template>

<script>
	export default{
		data(){
			return{
				teacherDialog:{
					title:'',
					visible:false,
					form:{
						id:'',
						name:'',
						gender:'',
						beginDate:'',
						endDate:'',
						
						
					},
					rules:{
						name:[{required:true,message:'请输入教师名称',trigger:'blur'}],
						gender:[{required: true, message: '请选择性别', trigger: 'change'}],
						beginDate:[{type: 'date', required: true, message: '请选择日期', trigger: 'change'}],
						endDate:[{type: 'date', required: true, message: '请选择日期', trigger: 'change'}]
					}
				},
				 formLabelWidth: '100px'
			}
		},
		computed:{
			getTeacherList(){
				return [{
					id:'',
					name:'html5',
					gender:'男',
					beginDate:'1997-04-18',
					endDate:'2018-07-01'

				},{
					id:'',
					name:'html5',
					gender:'男',
					beginDate:'1997-04-18',
					endDate:'2018-07-01'
				}]
			}
		},
		methods:{
			//去添加教师信息
			toAddTeacher(){
				//初始化
				this.resetForm();
				this.teacherDialog.title = '添加教师信息';
				this.teacherDialog.visible = true;
			},
			//去修改教师信息
			toEditTeacher(row){
				//弹出模态框
				this.teacherDialog.title = '修改教师信息';
				this.teacherDialog.visible = true;
				//拿数据
				this.teacherDialog.form = row;

			},
			//去删除教师信息
			toDeleteTeacher(row){
				console.log('delete',JSON.stringify(row));
			},
			//初始化
			resetForm(){
				this.teacherDialog.form={
						id:'',
						name:'',
						gender:'',
						beginDate:'',
						endDate:'',
				}
			},

			//提交教师信息
			submitTeacherForm(){
				//1.数据校验
				this.$refs['teacherDialogForm'].validate((valid)=>{
					if(valid){
						//2.当添加成功，提示用户，然后关闭模态框
						this.teacherDialog.visible = false;
					}
				})
			}
		}

	}
</script>
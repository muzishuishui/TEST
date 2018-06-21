<template>
	<div class="question">
		<el-row class="topBtns">
			<el-col :span='12'>
				<el-input style="width: 220px"></el-input>
			</el-col>
			<el-col :span='12' class="content-right">
				<el-button @click='toAddQuestion'>添加</el-button>
				<el-button>批量删除</el-button>
			</el-col>
		</el-row>

		<el-row class="">
			<el-col :span='24'>
			  <el-table
			    size='mini'
			  	border
			    ref="multipleTable"
			    :data="getQuestionList"
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
			      label="问卷名称">
			      
			    </el-table-column>
			    <el-table-column
			      align='center'
			      prop="beginDate"
			      label="创建时间">
			    </el-table-column>
			    <el-table-column
			      align='center'
			      label="操作"
			      width='180'>
			     <template slot-scope='scope'> 
			     	<el-button type='text'>预览</el-button>
				     <el-button type='text' @click='toEditQuestion(scope.row)'>修改</el-button>
				     <el-button type='text' @click='toDeleteQuestion(scope.row)'>删除</el-button>
			     </template>
			    </el-table-column>
			  </el-table>
			</el-col>
		</el-row>
<!-- 模态框  添加 修改题目 -->
		<el-dialog
		  :title="questionDialog.title"
		  :visible.sync="questionDialog.visible"
		  :before-close="handleQuestionDialogClose">
		  {{questionDialog.form}}
		  <el-table :data="questionDialog.table">
		    <el-table-column property="date" label="序号" width="80" align='center'></el-table-column>
		    <el-table-column property="name" label="label" width="80" align='center'></el-table-column>
		    <el-table-column property="address" label="选项" align='center'></el-table-column>
		    <el-table-column property="gg" label="分值" width="80" align='center'></el-table-column>
		    <el-table-column label="操作" width="80" align='center'>
		    	<template slot-scope='scope'>
		    		<el-button type='text' @click='toDeleteQuestion(scope.row)'>删除</el-button>
		    	</template>
		    </el-table-column>
		  </el-table>




		  <span slot="footer" class="dialog-footer">
		  
		    <el-button @click="questionDialog.visible = false">取 消</el-button>
		    <el-button type="primary" @click="submitQuestionForm">确 定</el-button>
		  </span>
		</el-dialog>

	</div>
</template>

<script>
	export default{
		data(){
			return{
				//今维护题目模态框中相关数据
				questionDialog:{
					visible:false,  //可见性
					title:'',		//标题
					form:{			//表单数据
						id:'',
						name:'',
						beginDate:''
					},
					/*rules:{  	//校验规则
						name:[{required:true,message:'请输入题目名称',trigger:'blur'}],
						beginDate:[{required:true,message:'请输入题目简介',trigger:'blur'}]
					}*/
					table:[{
						date:1,
						name:'A',
						address:'优秀',
						gg:5
					},{
						date:1,
						name:'A',
						address:'优秀',
						gg:4
					}]

				}


			}
		},
		computed:{
			getQuestionList(){
				return [{
					id:1001,
					name:'杰普软件主讲老师课调问卷',
					beginDate:'2018-06-09'
				},{
					id:1002,
					name:'杰普软件主讲老师课调问卷',
					beginDate:'2018-06-09'
				}]
			}
		},
		methods:{
			//去添加题目数据
			toAddQuestion(row){
				// //初始化
				this.resetForm();
				// this.$refs['questionDialogForm'].resetFields();
				//1.弹出模态框
				this.questionDialog.title = '添加题目信息'
				this.questionDialog.visible =true;

				//2.初始化或者重置模态框中的默认值
			
				 
				 
			},
			//去修改题目数据
    	 	toEditQuestion(row){
    	 		this.questionDialog.title = '修改题目信息'
				this.questionDialog.visible =true;

				this.questionDialog.form = row;
    	 		console.log('edit',JSON.stringify(row));
    	 	},
    	 	//去删除题目数据
    	 	toDeleteQuestion(row){
    	 		console.log('delete',JSON.stringify(row));
    	 	},
    	 	//提交题目表单
    	 	submitQuestionForm(){
    	 		//0.数据校验
    	 		/*this.$refs['questionDialogForm'].validate((valid)=>{
    	 			if(valid){}*/
    	 			  //1.向后台发送数据
		    	 		let question = this.questionDialog.form;
		    	 		console.log('submit',question);
		    	 		//2.当添加成功，提示用户，然后关闭模态框
		    	 		//3.当添加失败，提示用户，不关闭模态框
		    	 		/*this.$refs['questionDialogForm'].resetFields();*/
		    	 		this.questionDialog.visible = false;
	    	 			
    	 		
    	 		

    	 	},
    	 	//初始化
    	 	resetForm(){
    	 		this.questionDialog.form={
    	 				id:'',
						name:'',
						beginDate:''
    	 		}
    	 	},
    	 	handleSelectionChange(val) {
        		this.multipleSelection = val;
    	 	},
    	 	// handleQuestionDialogClose(done){
    	 	// 	this.$refs['questionDialogForm'].resetFields();
    	 	// 	done();
    	 	// }
		}
	}
</script>

<style scoped="scoped">
	.topBtns{
		margin-bottom: .5em;
	}
</style>
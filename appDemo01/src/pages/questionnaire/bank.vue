<template>
	<div class="bank">
		<el-row class="topBtns">
			<el-col :span='12'>
				<el-input style="width: 220px"></el-input>
			</el-col>
			<el-col :span='12' class="content-right">
				<el-button @click='toAddBank'>添加</el-button>
				<el-button>批量删除</el-button>
			</el-col>
		</el-row>

		<el-row class="">
			<el-col :span='24'>
			  <!-- <el-table
			    size='mini'
			  	border
			    ref="multipleTable"
			    :data="getBankList"
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
			  				     <el-button type='text' @click='toEditBank(scope.row)'>修改</el-button>
			  				     <el-button type='text' @click='toDeleteBank(scope.row)'>删除</el-button>
			     </template>
			    </el-table-column>
			  </el-table> -->
			


			</el-col>
		</el-row>
<!-- 模态框  添加 修改题目 -->
		<el-dialog
		  :title="bankDialog.title"
		  :visible.sync="bankDialog.visible"
		  :before-close="handleBankDialogClose">
		  {{bankDialog.form}}

		  <el-form 
		  :model="bankDialog.form"
		  ref='bankDialogForm'
		  :rules='bankDialog.rules'
		  >
		    <el-form-item label="课程名称" label-width="80px" prop='name'>
		      <el-input v-model="bankDialog.form.name" auto-complete="off"></el-input>
		    </el-form-item>
		   
		    <el-form-item label="题目类型" label-width="80px" prop='cycle'>
		      <el-select v-model="bankDialog.form.cycle" placeholder="">
		        <el-option label="单选" value="shanghai"></el-option>
		        <el-option label="多选" value="beijing"></el-option>
		      </el-select>
		    </el-form-item>
		    <el-form-item label="所属课程" label-width="80px" prop='cycle'>
		      <el-select v-model="bankDialog.form.cycle" placeholder="WebUI">
		        <el-option label="区域一" value="shanghai"></el-option>
		        <el-option label="区域二" value="beijing"></el-option>
		      </el-select>
		    </el-form-item>
		    
		  </el-form>
		  <el-table :data="bankDialog.table">
		    <el-table-column property="date" label="序号" width="80" align='center'></el-table-column>
		    <el-table-column property="name" label="label" width="80" align='center'></el-table-column>
		    <el-table-column property="address" label="选项" align='center'></el-table-column>
		    <el-table-column property="gg" label="分值" width="80" align='center'></el-table-column>
		    <el-table-column label="操作" width="80" align='center'>
		    	<template slot-scope='scope'>
		    		<el-button type='text' @click='toDeleteBank(scope.row)'>删除</el-button>
		    	</template>
		    </el-table-column>
		  </el-table>




		  <span slot="footer" class="dialog-footer">
		  
		    <el-button @click="bankDialog.visible = false">取 消</el-button>
		    <el-button type="primary" @click="submitBankForm">确 定</el-button>
		  </span>
		</el-dialog>

	</div>
</template>

<script>
	export default{
		data(){
			return{
				//今维护题目模态框中相关数据
				bankDialog:{
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
			getBankList(){
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
			toAddBank(row){
				// //初始化
				this.resetForm();
				// this.$refs['bankDialogForm'].resetFields();
				//1.弹出模态框
				this.bankDialog.title = '添加题目信息'
				this.bankDialog.visible =true;

				//2.初始化或者重置模态框中的默认值
			
				 
				 
			},
			//去修改题目数据
    	 	toEditBank(row){
    	 		this.bankDialog.title = '修改题目信息'
				this.bankDialog.visible =true;

				this.bankDialog.form = row;
    	 		console.log('edit',JSON.stringify(row));
    	 	},
    	 	//去删除题目数据
    	 	toDeleteBank(row){
    	 		console.log('delete',JSON.stringify(row));
    	 	},
    	 	//提交题目表单
    	 	submitBankForm(){
    	 		//0.数据校验
    	 		/*this.$refs['bankDialogForm'].validate((valid)=>{
    	 			if(valid){}*/
    	 			  //1.向后台发送数据
		    	 		let bank = this.bankDialog.form;
		    	 		console.log('submit',bank);
		    	 		//2.当添加成功，提示用户，然后关闭模态框
		    	 		//3.当添加失败，提示用户，不关闭模态框
		    	 		/*this.$refs['bankDialogForm'].resetFields();*/
		    	 		this.bankDialog.visible = false;
	    	 			
    	 		
    	 		

    	 	},
    	 	//初始化
    	 	resetForm(){
    	 		this.bankDialog.form={
    	 				id:'',
						name:'',
						beginDate:''
    	 		}
    	 	},
    	 	handleSelectionChange(val) {
        		this.multipleSelection = val;
    	 	},
    	 	// handleBankDialogClose(done){
    	 	// 	this.$refs['bankDialogForm'].resetFields();
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
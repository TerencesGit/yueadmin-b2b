<template>
	<div class="propertyManage">
		<!-- 新增行程 -->
		<div style="margin-bottom:20px;">
			<el-button type="primary" style="width:10%" @click="addStrokeMethod">新增行程</el-button>
			<!-- 新增行程start -->
			<el-dialog top="22%" title="新增行程" :visible.sync="addStroke">
			  <el-form ref="itinerary" :model="itinerary" :rules="rules" label-width="150px">
			  	  <el-form-item
				    label="行程名称:"
				    prop="title"
				  >
				    <el-input type="text" size="small" placeholder="15个汉字以内" v-model="itinerary.title"></el-input>
				  </el-form-item>
				  <el-form-item
				    label="商家原始名称:"
				    prop="name"
				  >
				    <el-input type="text" size="small" placeholder="请输入该行程原始名称" v-model="itinerary.name"></el-input>
				  </el-form-item>
				  <el-form-item
				    label="行程特色:"
				    prop="characteristic"
				  >
				    <el-input :autosize="{ minRows: 4}" placeholder="500字以内" type="textarea" v-model="itinerary.characteristic"></el-input>
				  </el-form-item>
			  </el-form>
			  <div slot="footer" style="display:flex;justify-content:center" class="dialog-footer">
			    <el-button @click="saveItinerary('itinerary')" style="width:20%;">保存</el-button>
			  </div>
			</el-dialog>
			<!-- 新增行程end -->
		</div>
		<!-- 渲染数据 -->
		<el-table v-loading="loading" element-loading-text="正常操作中,请稍后" :data="itineraryLists" border highlight-current-row style="width: 100%">
		    <el-table-column align="center" label="行程编号" width="100" prop="serialNumber">
		    </el-table-column>
		    <el-table-column align="center" label="行程标题" width="100" prop="title">
		    </el-table-column>
		    <el-table-column align="center" label="商家原始名称" width="200" prop="name">
		    </el-table-column>
		    <el-table-column align="center" label="行程特色" prop="characteristic">
		    </el-table-column>
		    <el-table-column align="center" label="对应班期" width="100" prop="schedule">
		    </el-table-column>
		    <el-table-column align="center" label="审核状态" width="100" prop="status">
		    </el-table-column>
		    <el-table-column align="center" label="操作" width="150">
		      <template scope="scope">
		        <el-button
		          size="small"
		          @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
		        <!-- 编辑start -->
		        <el-dialog top="22%" title="新增行程" :visible.sync="editStroke">
				  <el-form ref="itinerary" :model="itinerary" :rules="rules" label-width="150px">
				  	  <el-form-item
					    label="行程名称:"
					    prop="title"
					  >
					    <el-input type="text" size="small" placeholder="15个汉字以内" v-model="itinerary.title"></el-input>
					  </el-form-item>
					  <el-form-item
					    label="商家原始名称:"
					    prop="name"
					  >
					    <el-input type="text" size="small" placeholder="请输入该行程原始名称" v-model="itinerary.name"></el-input>
					  </el-form-item>
					  <el-form-item
					    label="行程特色:"
					    prop="characteristic"
					  >
					    <el-input :autosize="{ minRows: 4}" placeholder="500字以内" type="textarea" v-model="itinerary.characteristic"></el-input>
					  </el-form-item>
				  </el-form>
				  <div slot="footer" style="display:flex;justify-content:center" class="dialog-footer">
				    <el-button @click="editItinerary('itinerary')" style="width:20%;">修改</el-button>
				  </div>
				</el-dialog>
				<!-- 编辑end -->
		        <el-button
		          size="small"
		          type="danger"
		          @click="handleDelete(scope.$index, scope.row)">删除</el-button>
		      </template>
		    </el-table-column>
		</el-table>
		<!-- 保存 -->
		<div class="save">
			<el-button type="primary" style="width:10%">保存</el-button>
		</div>
	</div>
</template>

<script>
	export default {
		data(){
			return {
				addStroke:false,
				editStroke:false,
				loading:false,
				editIndex:'',
				itinerary:{
					serialNumber:'',
		        	title:'',
		        	name:'',
		        	characteristic:'',
		        	schedule:'',
		        	status:''
				},
				rules:{
					title:[
				      { required: true, message: '行程名称不能为空', trigger: 'blur'},
				      { max: 15, message: '15个汉字以内',trigger: 'blur'}
				    ],
					name:[
				      { required: true, message: '商家原始名称不能为空', trigger: 'blur'}
				    ],
					characteristic:[
				      { required: true, message: '行程特色不能为空', trigger: 'blur'}
				    ]
				},
				itineraryLists: [{
		          serialNumber:'1',
		          title:'普吉岛1',
		          name:'商家名称1',
		          characteristic:'行程特色1行程特色1行程特色1行程特色1行程特色1行程特色1行程特色1行程特色1行程特色1行程特色1行程特色1行程特色1',
		          schedule:'对应班期1',
		          status:0
		        },{
		          serialNumber:'2',
		          title:'普吉岛2',
		          name:'商家名称2',
		          characteristic:'行程特色2行程特色2行程特色2行程特色2行程特色2行程特色2行程特色2',
		          schedule:'对应班期2',
		          status:0
		        },{
		          serialNumber:'3',
		          title:'普吉岛3',
		          name:'商家名称3',
		          characteristic:'行程特色3行程特色3行程特色3行程特色3行程特色3行程特色3行程特色3行程特色3行程特色3行程特色3行程特色3行程特色3行程特色3行程特色3',
		          schedule:'对应班期3',
		          status:0
		        }]
		      }
			},
		methods:{
			handleEdit(index, row) {
		    	this.editStroke = true;
		    	this.editIndex = index;
		    	this.itinerary.title = this.itineraryLists[index].title;
		    	this.itinerary.name = this.itineraryLists[index].name;
		    	this.itinerary.characteristic = this.itineraryLists[index].characteristic;
		    },
		    handleDelete(index, row) {
		    	this.$confirm('确认要删除？', '提示', {
		          confirmButtonText: '确定',
		          cancelButtonText: '取消',
		          type: 'warning'
		        }).then(() => {
		          this.loading = true;
		          setTimeout(()=>{
		          	this.$message({
		            	type: 'success',
		            	message: '删除成功!'
		            });
		            this.itineraryLists.splice(index,1);
		            this.loading = false;
		          },1000)
		        }).catch(() => {
		          this.$message({
		            type: 'info',
		            message: '已取消删除'
		          });          
		        });
		    },
		    addStrokeMethod(){
		    	this.addStroke = true;
		    	for(let i in this.itinerary){
		    		this.itinerary[i] = '';
		    	}
		    },
		    saveItinerary(formName){
		    	this.$refs[formName].validate((valid) => {
		          if (valid) {
		            // this.itineraryLists.push(JSON.parse(JSON.stringify(this.itinerary)));
		            this.addStroke = false;
		            this.loading = true;
		            setTimeout(()=>{
		            	this.itineraryLists.push(Object.assign({},this.itinerary));
		            	this.loading = false;
		            },1000);
		          } else {
		            return false;
		          }
		        })
		    },
		    editItinerary(formName){
		    	this.$refs[formName].validate((valid) => {
		          if (valid) {
		          	this.editStroke = false;
		          	this.loading = true;
		            setTimeout(()=>{
		            	this.itineraryLists[this.editIndex].title = this.itinerary.title;
			            this.itineraryLists[this.editIndex].name = this.itinerary.name;
			            this.itineraryLists[this.editIndex].characteristic = this.itinerary.characteristic;
			            this.$message({
				          message: '恭喜你，删除成功',
				          type: 'success'
				        });
		            	this.loading = false;
		            },1000);
		          } else {
		            return false;
		          }
		        })
		    }
		},
		mounted () {
    	this.$store.dispatch('setStepActive', 8)
    }
	}
</script>

<style scoped>
	.save{
		width:100%;
		display: flex;
		justify-content: center;
		margin-top: 50px;
	}
</style>
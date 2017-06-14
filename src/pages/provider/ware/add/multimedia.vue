<template>
<section>
	<el-col :span="24" class="button-group">
		<el-button type="primary" @click="update">本地上传</el-button>
		<el-button type="primary"  @click="batchRemove" :disabled="this.sels.length===0">批量删除</el-button>
	</el-col>
	<!-- 表格 -->
	<el-table :data="media" border style="width: 100%" @selection-change="selsChange"> 
	    <el-table-column type="selection" width="50" align="center"></el-table-column>
	    <el-table-column label="图片缩略图" width="150" align="center" height="100px">
	    	<template scope="scope">
	    	<div class="images">
	    		<img :src="scope.row.url" alt="">
	    	</div>	    		
	    	</template>
	    </el-table-column>
	    <el-table-column prop="country" label="图片国家" width="120" align="center"></el-table-column>
	    <el-table-column prop="city" label="图片城市" width="120" align="center"></el-table-column>
	    <el-table-column prop="view" label="图片景点名称" width="120" align="center"></el-table-column>
	    <el-table-column prop="desc" label="图片描述" width="120" align="center"></el-table-column>
	    <el-table-column prop="copyright" label="版权信息" width="120" align="center">
	    	<template scope="scope">
	    		<div class="copy">有版权</div>
	        </template>
	    </el-table-column>
		<el-table-column label="操作">
	        <template scope="scope">
	        	<el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
	        	<el-button size="small" @click="handleDefault(scope.$index, scope.row)">设为默认</el-button>        	
	        </template>
    	</el-table-column>
	</el-table>
	<el-col :span="24" class="next">
		<el-button size="large" type="primary">下一步</el-button>
	</el-col>
	<!-- 本地上传弹窗 -->
	<el-dialog title="上传图片" :visible.sync="dialogFormVisible" size="small" class="media-dialog">
		<el-row type="flex" justify="center">
			<el-col :span="20">
				<p>还可以上传 {{this.num}}张，建议上传大小为900*504的jpg照片，单张不超过2M,最多10张。</p>
			</el-col>
		</el-row>
		<el-row type="flex" justify="center">
			<el-col :span="20">	
				<el-upload 
						class="media-upload"
			  		action="/imgUploadUrl"
			  		list-type="picture-card"
			  		:on-preview="handlePictureCardPreview"
			  		:on-remove="handleRemove"
			  		:before-upload="beforeAvatarUpload"
			  		:on-change="handleChange"
			  		:on-success="handleSuccess"
			  		:on-error="handleError"
			  		:multiple="true"
			  		:disabled="isUpload"
			  		:class="{'upload-button':isUpload}"
			  		>
			  		<i class="el-icon-plus"></i>
				</el-upload>
			</el-col>
		</el-row>
		<el-row type="flex" justify="center">
			<el-col :span="16">								
				<el-form :model="form" label-width="110px">
						<el-form-item label="图片国家：" width="100">
					      <el-input v-model="form.country"></el-input>
					    </el-form-item>
					    <el-form-item label="图片景区：" >
					      <el-input v-model="form.view"></el-input>
					    </el-form-item>
					    <el-form-item label="图片标签：" >
					      <el-input v-model="form.tag"></el-input>
					    </el-form-item>	    
				    	<el-form-item label="图片描述：">
					    	<el-input type="textarea" v-model="form.desc"></el-input>
					  	</el-form-item>
					  	<el-form-item label="图片授权协议：">
					    	<el-input type="textarea" v-model="form.copyright"></el-input>
					  	</el-form-item>
			  	</el-form>	
			</el-col>
		</el-row>	  			
	  	<div slot="footer" class="dialog-footer">
		    <el-button @click="handleCancel">取 消</el-button>
		    <el-button type="primary" @click="onsubmit" >确 定</el-button>
  		</div>  		
	</el-dialog>
	<!-- 放大图片弹窗 -->
	<el-dialog v-model="dialogVisible" size="tiny">
		<img width="100%" :src="dialogImageUrl" alt="">
	</el-dialog>
</section>
</template>
<script>
	export default{
		data () {
			return {
				dialogFormVisible: false,
        		dialogImageUrl: '',
        		dialogVisible: false,
        		isUpload: false,
				media: [{
					url: 'https://avatars0.githubusercontent.com/u/26806103?v=3&s=460',
        			country: '中国',
        			city: '北京',
        			view: '长城',
        			desc: '000',
        			copyright: '000',
        			id:0
				},
				{
					url: 'https://avatars0.githubusercontent.com/u/26806103?v=3&s=460',
        			country: '法国',
        			city: '巴黎',
        			view: '凯旋门',
        			desc: '111',
        			copyright: '111',
        			id:1
				},
				{
					url: 'https://avatars0.githubusercontent.com/u/26806103?v=3&s=460',
        			country: '泰国',
        			city: '曼谷',
        			view: '大皇宫',
        			desc: '222',
        			copyright: '222',
        			id:2
				},
				{
					url: 'https://avatars0.githubusercontent.com/u/26806103?v=3&s=460',
        			country: '日本',
        			city: '东京',
        			view: '富士山',
        			desc: '333',
        			copyright: '333',
        			id:3
				}],       		
        		form:{
        			country: '',
        			view: '',
        			tag: '',
        			desc: '',
        			copyright: '',       			
        			les: ''
        		},
        		sels: [],
        		list: [],
        		url: []    			
			}
		},
		methods: {			
			selsChange (sels) {
				this.sels = sels;
			},
			// 批量删除
			batchRemove () { 				
				this.$confirm('确认删除选中记录吗？', '提示', {
					type: 'warning'
				}).then(() => {
					//此处调用批量删除接口
					for(var i = 0;i < this.media.length;i++){
					    for(var j = 0;j < this.sels.length;j++){
					        if(this.media[i].id == this.sels[j].id){
					            this.media.splice(i,1);
					        }
					    }			    
					}
					this.$message({
						message: '删除成功',
						type: 'success'
						});
				}).catch(() => {
					this.$message({
            			type: 'info',
            			message: '已取消操作'
          			});   
				});
			},
			//设为默认
			handleDefault (index,row) {	
				//此处调用设为默认接口
				this.media.forEach((v,i,a)=>{
					if(v.id==row.id){
						this.media.splice(i,1);
						this.media.unshift(v)
					}
				})
			},
			//删除
			handleDelete (index,row) {
				this.$confirm('确认删除该记录吗?', '提示', {
					type: 'warning'
				}).then(() => {
					//此处调用删除接口
					this.media.forEach((v,i,a)=>{
						if(v.id==row.id){
							this.media.splice(i,1)
						}
					})
					this.$message({
						message: '删除成功',
						type: 'success'
					});
				}).catch(() => {
					this.$message({
						message: '已取消操作'
					})
				});
			},
			//点击本地上传清空弹窗内容
			update () {
				this.dialogFormVisible = true;
				this.form = {
					country: '',
			    	view: '',
			    	tag: '',
			    	desc: '',
			    	copyright: '',
			    	url: '',
			    	les: ''
				}
				this.url = [];
				this.list.length = 0;
				if(this.media.length == 10){
					this.isUpload = true;
				}
			},
			handlePictureCardPreview (file, fileList) {
				this.dialogImageUrl = file.url;
        this.dialogVisible = true;			        
    	},
    	handleChange (file, fileList) {
    		this.list = fileList;
    	},
    	handleSuccess (response,file,fileList) {
    		console.log(response)
    		this.form.les = fileList.length;	
    		this.url.push(file.url);			      		
    	},
    	handleError (err, file) {
    		console.log(err)
    	},
			handleRemove (file, fileList) {
                this.form.les = fileList.length;
        		this.url.forEach((v,i,a) => {
        			if(a[i] == file.url){
        				this.url.splice(i,1)
        			}
        		})
      		},	      	
	      	beforeAvatarUpload (file) {
		        // const isJPG = file.type === 'image/jpeg';
		        const isLt2M = file.size / 1024 / 1024 < 2;

		        // if (!isJPG) {
		        //   this.$message.error('上传头像图片只能是 JPG 格式!');
		        // }
		        if (!isLt2M) {
		           this.$message.error('上传头像图片大小不能超过 2MB!');
		        }
		        // return isJPG && 
		        return isLt2M;
		    },
		    //确定提交
		    onsubmit (form) { 
		    	if(this.form.les > this.num){
		    		this.$alert('本次只可上传'+this.num+'张', '提示', {
			        	confirmButtonText: '确定'
			        });
		    	}else{
		    		this.dialogFormVisible = false;
		    		//此处调用提交图片和表单接口
		    		//并重新调用获取信息接口
		    		for(let i=0;i<this.form.les;i++){
						this.media.push(Object.assign({},this.form));
		    		}
					this.list.length = 0;
		    	}		    	
		    },
		    //取消
		    handleCancel () {
		    	this.dialogFormVisible = false;
		    	this.list.length = 0;
		    }

		},
		computed:{
			num: function () {
				return 10 - this.media.length;
			}
		}
	}
</script>
<style scoped>
	.button-group{
		margin: 20px 0 50px;
	}
	.next{
		text-align: center;
		margin-top: 20px;
	}
	.copy{
		font-weight: bold;
		color: #13CE66;
	}
	.images{
		width: 90px;
		height: 60.4px;
		margin: 0 auto;
		padding: 5px 0;	
	}
	.images img{
		width: 100%;
		height: 100%;
	}
	
</style>
<template>
<section>
	<el-row :span="24" class="btns">
		<el-button type="primary" @click="upload">本地上传</el-button>
		<el-button type="primary" @click="batchRemove" :disabled="this.sels.length===0">批量删除</el-button>
	</el-row>
	<el-table :data="media" border style="width: 100%" @selection-change="selsChange"> 
    <el-table-column type="selection" width="50" align="center"></el-table-column>
    <el-table-column label="图片缩略图" width="150" align="center" height="100px">
    	<template scope="scope">
    		<img :src="scope.row.url" alt="" class="images">
    	</template>
    </el-table-column>
    <el-table-column prop="country" label="图片国家" width="120" align="center"></el-table-column>
    <el-table-column prop="city" label="图片城市" width="120" align="center"></el-table-column>
    <el-table-column prop="view" label="图片景点名称" align="center"></el-table-column>
    <el-table-column prop="desc" label="图片描述" width="120" align="center"></el-table-column>
    <el-table-column prop="copyright" label="版权信息" align="center">
    	<template scope="scope">
    		<div class="copy">有版权</div>
      </template>
    </el-table-column>
	  <el-table-column label="操作">
        <template scope="scope">
        	<!-- <div v-if="scope.row.img"> -->
        	<el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        	<el-button size="small" @click="handleDefault(scope.$index, scope.row)">设为默认</el-button>
        	<!-- </div> -->	        	
        </template>
  	</el-table-column>
	</el-table>
	<el-row :span="24" class="next">
		<el-button size="large" type="primary">下一步</el-button>
	</el-row>
	<div class="mediaDialog">
	<!-- 本地上传弹窗 -->
		<el-dialog title="上传图片" :visible.sync="dialogFormVisible">
			<p>共0张，还可以上传{{this.cnum}}张，建议上传大小为900*504的jpg照片，单张不超过2M,最多10张。</p>
				<el-upload class="mediaUpload"
			  		action="https://jsonplaceholder.typicode.com/posts/"
			  		list-type="picture-card"
			  		:on-preview="handlePictureCardPreview"
			  		:on-remove="handleRemove"
			  		:before-upload="beforeAvatarUpload"
			  		:on-change="handleChange"
			  		:on-success="handleSuccess"
			  		:multiple="true"
			  		:disabled="isupload"
			  		:class="{upbtn:isupload}"
			  		>
			  		<i class="el-icon-plus"></i>
				</el-upload>								
				<el-form :model="form" label-width="110px" ref="form">
					<div class="ipts">
						<el-form-item label="图片国家：">
					      <el-input v-model="form.country"></el-input>
					    </el-form-item>
					    <el-form-item label="图片景区：" >
					      <el-input v-model="form.view"></el-input>
					    </el-form-item>
					    <el-form-item label="图片标签：" >
					      <el-input v-model="form.tag"></el-input>
					    </el-form-item>
					</div>			    
				    	<el-form-item label="图片描述：">
					    	<el-input type="textarea" v-model="form.desc"></el-input>
					  	</el-form-item>
					  	<el-form-item label="图片授权协议：">
					    	<el-input type="textarea" v-model="form.copyright"></el-input>
					  	</el-form-item>
			  	</el-form>			
		  	<div slot="footer" class="dialog-footer">
			    <el-button @click="handleCancel">取 消</el-button>
			    <el-button type="primary" @click="onsubmit('form')" >确 定</el-button>
	  		</div>
		</el-dialog>
		<!-- 上传图片弹窗 -->
		<el-dialog v-model="dialogVisible" size="tiny">
			<img width="100%" :src="dialogImageUrl" alt="">
		</el-dialog>
	</div>
</section>
</template>
<script>
	import { uploadlist } from '@/api'
	export default{
		data () {
			return {
				media:[],
				dialogTableVisible: false,
        		dialogFormVisible: false,
        		dialogImageUrl: '',
        		dialogVisible: false,
        		form:{
        			country:'',
        			view:'',
        			tag:'',
        			desc:'',
        			copyright:'',
        			url:'',
        			les:''
        		},
        		sels:[],
        		flag:true,
        		list:[],
        		url:[],
        		data:[],
        		isupload:false     		
			}
		},
		methods:{			
			selsChange(sels){
				this.sels=sels;
			},
			batchRemove () { 				
				this.$confirm('确认删除选中记录吗？', '提示', {
					type: 'warning'
				}).then(() => {
					var arr=[];
					for(var i=0;i<this.media.length;i++){
					    for(var j=0;j<this.sels.length;j++){
					        if(this.media[i].url==this.sels[j].url){
					            arr.push(i);
					        }
					    }			    
					}
					console.log(arr)
					for(let i=arr.length-1;i>=0;i--){
						this.media.splice(arr[i],1);
					}
					this.$message({
						message: '删除成功',
						type: 'success'
					});

				}).catch(() => {

				});
			},
			handleDefault(index,row){				
				this.media.unshift(this.media[index]);
				this.media.splice(++index,1);
			},
			handleDelete(index,row){
				this.$confirm('确认删除该记录吗?', '提示', {
					type: 'warning'
				}).then(() => {
					this.media.splice(index,1);
					this.$message({
							message: '删除成功',
							type: 'success'
						});
				}).catch(() => {
					this.$message({
						message: '取消操作'
					})
				});
			},
			upload(){
				this.dialogFormVisible = true;
				this.form={
					country:'',
		    	view:'',
		    	tag:'',
		    	desc:'',
		    	copyright:'',
		    	url:'',
		    	les:''
				}
				this.data = [],
				this.url = [];
				if (this.media.length == 10) {
					this.isupload = true;
				}
			},
			handlePictureCardPreview(file, fileList) {
				this.dialogImageUrl = file.url;
        this.dialogVisible = true;		        
    	},
    	handleChange(file, fileList){
    		this.list=fileList;
    	},
    	handleSuccess (response, file, fileList) {
    		console.log(response)
    		console.log(file)
    		console.log(fileList)
    		this.form.les = fileList.length;	
    		this.url.push(file.url);			      		
    	},
			handleRemove(file, fileList) {
        this.form.les=fileList.length;
    		this.url.forEach((v,i,a)=>{
    			if(a[i]==file.url){
    				this.url.splice(i,1)
    			}
    		})
  		},	      	
    	beforeAvatarUpload(file) {
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
	    onsubmit(form){ 
	    	if(this.form.les>this.cnum){
	    		this.$alert('本次只可上传'+this.cnum+'张', '提示', {
		          confirmButtonText: '确定'
		        });
	    	}else{
	    		this.dialogFormVisible=false;
		    	let para = this.form;
		    	console.log(para)
		    	uploadlist(para).then((res) => {
			    	 var data = res.data.uploads;
			    	 data.forEach((v,i,a)=>{
			    	 	v.url=this.url[i];
			    	 	 //JSON.parse(JSON.stringify(v))
			    	 	 this.media.push(Object.assign({}, v));
			    	 });	    		
				});
				this.list.length=0;
	    	}		    	
	    },
	    handleCancel(){
	    	this.dialogFormVisible = false;
	    	this.list.length = 0;
	    }
		},
		computed:{
			'cnum': function () {
				return 10 - this.media.length;
			}
		},
		mounted () {
			this.$store.dispatch('setStepActive', 3)
		}
	}
</script>
<style scoped>
	.btns{
		margin: 20px 0 50px;
	}
	.next{
		text-align: center;
		margin-top: 20px;
	}
	.ipts .el-form-item{
	    display: inline-block;
	    width: 33%;
  	}
	.copy{
		font-weight: bold;
		color:#13CE66;
	}
	.images{
		width: 100px;
		height: 80px;
	}
	
</style>
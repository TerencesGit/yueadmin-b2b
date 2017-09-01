<template>
	<section>
	  <!--  工具栏  -->
		<el-row class="toolbar">
			<el-button type="primary" @click="uploadVisible = true">本地上传</el-button>
			<el-button type="danger"  @click="batchRemove" :disabled="this.sels.length===0">批量删除</el-button>
		</el-row>
		<!-- 图片列表 -->
		<el-table 
			border
			:data="mediaList"
			v-loading="loading"
			highlight-current-row
			style="width: 100%" 
			@selection-change="selsChange"> 
	    <el-table-column type="selection" width="55"></el-table-column>
	    <el-table-column type="index" width="60"></el-table-column>
	    <el-table-column label="图片缩略图" width="140">
	    	<template scope="scope">
		    	<img :src="scope.row.filePath" height="60px" class="cell-img" @click="viewImage(scope.row.filePath)">
	    	</template>
	    </el-table-column>
	    <el-table-column label="更新者" prop="createName" width="100"></el-table-column>
	    <el-table-column label="更新时间" prop="createTime" :formatter="formatCreateTime" sortable></el-table-column>
	    <!-- <el-table-column label="是否为主图" prop="isMainPic" width="120" :formatter="formatIsMainPic"></el-table-column> -->
	    <el-table-column label="是否显示" width="120">
	    	<template scope="scope">
	    		<el-switch
					  v-model="scope.row.status"
					  on-color="#13ce66"
					  off-color="#ff4949"
					  on-text="是"
					  off-text="否"
					  :on-value="1"
					  :off-value="0"
					  :disabled="scope.row.isMainPic === 1"
					  @change="handleStatus(scope.row)">
					</el-switch>
	    	</template>
	    </el-table-column>
		  <el-table-column label="操作" width="180">
	        <template scope="scope">
	        	<div v-if="scope.row.isMainPic === 0">
	        		<el-button size="small" type="primary" @click="handleSetMainImg(scope.row)">设为主图</el-button>
	        		<el-button size="small" type="danger" @click="handleSingleDelete(scope.row)">删除</el-button>
	        	</div>
	        	<div v-else>
		        	<el-button size="small" type="success" @click="return false">当前主图</el-button>
		        </div>
	        </template>
    	</el-table-column>
		</el-table>
		<el-row class="text-center m-t">
			<el-button size="large" type="primary" @click="handleNext">下一步</el-button>
		</el-row>
		<!-- 本地上传 -->
		<el-dialog title="本地上传" :visible.sync="uploadVisible" size="small">
			<el-row>
				<el-col :span="20" :class="{ 'text-danger' : mediaLength === 0 }">
					建议上传大小为1024*512图片，单张不超过2M，最多上传{{maxLength}}张，还可以上传{{mediaLength}}张。
				</el-col>
			</el-row>
			<el-row class="m-t">
				<el-col :span="20">	
					<el-upload
						name="fileName"
						:data="uploadData"
						ref="uploadMedia"
						class="multiple-uploader"
			  		action="https://jsonplaceholder.typicode.com/posts/"
			  		list-type="picture-card"
			  		accept="image/jpeg, image/png"
			  		:on-preview="handleImgPreview"
			  		:on-remove="handleRemove"
			  		:before-upload="beforeUpload"
			  		:on-success="handleSuccess"
			  		:on-error="handleError"
			  		:multiple="true"
			  		:disabled="mediaLength === 0">
			  		<i class="el-icon-plus"></i>
					</el-upload>
				</el-col>
			</el-row>
		  	<div slot="footer">
			    <el-button @click="uploadVisible = false">取 消</el-button>
			    <el-button type="primary" @click="onSubmit">确 定</el-button>
	  		</div>  		
		</el-dialog>
		<!-- 图片预览 -->
		<el-dialog v-model="previewVisible" size="tiny">
			<img width="100%" :src="previewImgUrl">
		</el-dialog>
	</section>
</template>
<script>
	import { readWareFileList, createWareFile, updatetWareFileState, updateWareFileIsMainPic, deleteWareFile } from '@/api'
	export default{
		data () {
			return {
				wareId: '',
				maxLength: 10,
    		previewImgUrl: '',
				uploadVisible: false,
    		previewVisible: false,
    		fileList: [],
				mediaList: [{
					fileId: 100001,
					isMainPic: 1,
					status: 1,
				},{
					fileId: 100002,
					isMainPic: 0,
					status: 0,
				}],
    		fileIdList: [],
    		sels: [],
    		uploadData: {
	        fileUrlType: 1
	      },
	      loading: false,
			}
		},
		methods: {
			formatIsMainPic (row, column) {
				return row.isMainPic === 1 ? '是' : '否'
			},
			formatCreateTime (row, column) {
				return this.$moment(row.createTime).format('YYYY-MM-DD HH:mm:ss')
			},
			// 获取图片列表
			getWareFileList () {
				this.loading = true;
				let params = {
					wareId: this.wareId
				}
				readWareFileList(params).then(res => {
					console.log(res)
					if (res.data.code === '0001') {
						this.mediaList = res.data.result.fileList;
					} else {
						this.$message.error(res.data.message)
					}
					this.loading = false;
				}).catch((error) => {
					this.loading = false;
					this.catchError(error.response)
				})
			},
			// 上传校验
      beforeUpload (file) {
        const isJPG = file.type === 'image/jpeg' || file.type === 'image/png';
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isJPG) {
          this.$message.error('图片只能是 JPG 或 PNG格式!');
        }
        if (!isLt2M) {
          this.$message.error('图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
	    },
    	// 上传成功处理
    	handleSuccess (res, file) {
    		this.fileList.push(file.url)
    		if (res.code === '0001') {
    			let resFile = res.result.file;
			    file.path = resFile.filePath;
	    		this.fileList.push(resFile)
    		} else {
    			this.$message.error(res.message)
    		}
    	},
    	// 上传失败处理
    	handleError (err, file) {
    		console.log(file)
    		this.$message.error('图片上传失败，请重试')
    	},
    	// 上传图片删除
			handleRemove (file) {
        if (!file) return;
        let fileList = this.fileList;
        let filePath = file.path || '';
        fileList = fileList.filter(file => file.filePath !== filePath)
        this.fileList = fileList
  		},
			// 图片预览
			handleImgPreview (file, fileList) {
				this.previewImgUrl = file.url;
        this.previewVisible = true;
    	},
 	    // 图片列表提交
	    onSubmit () {
	    	let mediaForm = {
	    		wareId: this.wareId,
	    		fileList: this.fileList
	    	}
	    	console.log(mediaForm)
	    	createWareFile(mediaForm).then(res => {
	    		if(res.data.code === '0001') {
	    			this.$message.success('上传成功')
	    			this.getWareFileList()
	    		} else {
	    			this.$message.error(res.data.message)
	    		}
	    		this.uploadVisible = false
	    		this.fileList = []
	    		this.$refs.uploadMedia.clearFiles()
	    	})
	    	.catch(error => {
	    		this.catchError(error.response)
	    		this.uploadVisible = false
	    		this.fileList = []
	    		this.$refs.uploadMedia.clearFiles()
	    	})
	    },
	    // 图片选中
			selsChange (sels) {
				this.sels = sels;
			},
			// 图片查看
			viewImage (filePath) {
				this.previewImgUrl = filePath;
        this.previewVisible = true;
			},
			// 是否显示
			handleStatus (row) {
				let data = {
					fileId: row.fileId
				}
				updatetWareFileState(data).then(res => {
					if (res.data.code === '0001') {
						this.$message.success(res.data.message)
					} else {
						row.status = row.status === 1 ? 0 : 1
						this.$message.error(res.data.message)
					}
				}).catch(error => {
					row.status = row.status === 1 ? 0 : 1
					this.catchError(error.response)
				})
			},
			// 单张图片删除
			handleSingleDelete (row) {
				let _fileIdList = [];
				_fileIdList[0] = { fileId: row.fileId }
				this.$confirm('确认删除该图片？', '提示', {type: 'warning'})
				.then(() => {
					let data = {
						fileIdList: _fileIdList
					}
					deleteWareFile(data).then(res => {
						if (res.data.code === '0001') {
							this.$message.success(res.data.message)
							this.getWareFileList()
						} else {
							this.$message.error(res.data.message)
						}
					}).catch(error => {
						this.catchError(error.response)
					})
				})
				.catch((err) => {
					console.log(err)
					this.$message('已取消操作')
				})
			},
			// 批量删除
			batchRemove () { 				
				this.$confirm('确认删除选中的图片吗？', '提示', {type: 'warning'})
				.then(() => {
					let fileIds = this.sels.map(sel => sel.fileId);
					let _fileIdList = [];
					fileIds.forEach((value, key) => {
						_fileIdList.push({ fileId: value })
					})
					let data = {
						fileIdList: _fileIdList
					}
					deleteWareFile(data).then(res => {
						if(res.data.code === '0001') {
							this.$message.success(res.data.message)
							this.getWareFileList()
						} else {
							this.$message.error(res.data.message)
						}
					}).catch((error) => {
						console.log(error)
						this.catchError(error.response)
					})
				})
				.catch((err) => {
					console.log(err)
					this.$message('已取消操作')
				})
			},
			// 设为主图
			handleSetMainImg (row) {
				if (row.status === 0) {
					this.$notify({
						type: 'warning',
						title: '提示',
						message: '请把该图片设为显示状态'
					})
					return false;
				}	
				let data = {
					wareId: this.wareId,
					fileId: row.fileId,
					isMainPic: 1,
				}	
				updateWareFileIsMainPic(data).then(res => {
					if(res.data.code === '0001') {
						this.$message.success(res.data.message)
						this.getWareFileList()
					} else {
						this.$message.error(res.data.message)
					}
				})
				.catch(error => {
					this.catchError(error.response)
				})
			},
			// 下一步
			handleNext () {
				this.$router.push(`charge?wareId=${this.wareId}`)
			}
		},
		computed:{
			mediaLength () {
				return  this.maxLength - this.mediaList.length - this.fileList.length;
			}
		},
		mounted () {
			this.$store.dispatch('setStepActive', 2)
			this.wareId = parseInt(this.$route.query.wareId);
			this.wareId && this.getWareFileList()
		}
	}
</script>

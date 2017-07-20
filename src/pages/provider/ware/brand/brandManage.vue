<template>
  <section>
    <!-- 搜索栏 -->
    <el-row class="toolbar">
      <el-form :inline="true" :model="filters" @submit.prevent="getBrandList">
        <el-form-item>
          <el-input v-model="filters.name" placeholder="品牌名称" icon="search"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="getBrandList">查询</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleAdd">新增</el-button>
        </el-form-item>
      </el-form>
    </el-row>
    <!-- 品牌列表 -->
    <el-table 
      border
      :data="brandList"
      v-loading="loading"
      highlight-current-row 
      @selection-change="selsChange">
      <!-- <el-table-column type="selection" width="55"></el-table-column> -->
      <el-table-column type="index" width="60"></el-table-column>
      <el-table-column prop="brandName" label="名称" sortable></el-table-column>
      <el-table-column prop="logoUrl" label="Logo" width="120">
        <template scope="scope">
          <img :src="scope.row.logoUrl" class="cell-img" height="50px" @click="viewImage(scope.row.logoUrl)">
        </template>
      </el-table-column>
      <el-table-column label="专题页">
        <template scope="scope">
          <span v-if="!scope.row.brandPage">未设置</span>
          <span v-else>{{scope.row.brandPage}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="updateBy" label="更新者" width="120"></el-table-column>
      <el-table-column prop="updateTime" label="更新时间" width="180" sortable></el-table-column>
      <el-table-column label="状态" width="100">
        <template scope="scope">
          <el-switch
            v-model="scope.row.status"
            on-color="#13ce66"
            off-color="#ff4949"
            :on-value="1"
            :off-value="0"
            on-text="启用"
            off-text="禁用"
            @change="handleChange(scope.row)">
          </el-switch>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="100">
        <template scope="scope">
          <el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页栏 -->
    <el-row class="toolbar">
     <!--  <el-button type="danger" @click="batchRemove" :disabled="this.sels.length===0">批量删除</el-button> -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="page"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        class="pull-right">
      </el-pagination>
    </el-row>
    <!-- 新增品牌 -->
    <el-dialog title="新增品牌" v-model="addFormVisible">
      <el-form :model="addForm" :rules="brandRules" ref="addForm" label-width="120px" style="padding: 30px">
        <el-form-item label="品牌名称" prop="brandName">
          <el-input v-model="addForm.brandName" placeholder="品牌名称"></el-input>
        </el-form-item>
        <el-form-item label="LOGO" prop="logoUrl">
          <el-upload
            class="uploader"
            name="fileName"
            :data="{fileUrlType: 2}"
            accept="image/jpeg, image/png"
            action="/b2b/file/upload"
            :show-file-list="false"
            :on-success="handleSuccess"
            :on-error="handleError"
            :before-upload="beforeUpload"
            :on-progress="handleProgress">
            <img v-if="addForm.logoUrl" :src="addForm.logoUrl" class="upload-image">
            <i v-else class="el-icon-plus" v-loading="uploading"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="品牌描述" prop="content">
          <el-input type="textarea" v-model="addForm.content" placeholder="品牌描述"></el-input>
        </el-form-item>
        <el-form-item label="品牌专题页" prop="brandPage">
          <el-input v-model="addForm.brandPage" placeholder="URL地址"></el-input>
        </el-form-item>
        <el-form-item label="状态">
          <el-switch v-model="addForm.status" on-text="启用" off-text="禁用"></el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click.native="addFormVisible = false">取 消</el-button>
        <el-button type="primary" @click.native="addSubmit">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 编辑品牌 -->
    <el-dialog title="编辑品牌" v-model="editFormVisible">
      <el-form :model="editForm" ref="editForm" :rules="brandRules" label-width="120px" style="padding: 30px" v-loading="editLoading">
        <el-form-item label="品牌名称" prop="brandName">
          <el-input v-model="editForm.brandName" placeholder="品牌名称"></el-input>
        </el-form-item>
        <el-form-item label="LOGO" prop="logoUrl">
          <el-upload
            class="uploader"
            name="fileName"
            :data="{fileUrlType: 2}"
            accept="image/jpeg, image/png"
            action="/uploadImgUrl"
            :show-file-list="false"
            :on-success="handleSuccess"
            :on-error="handleError"
            :on-progress="handleProgress"
            :before-upload="beforeUpload">
            <img v-if="editForm.logoUrl" :src="editForm.logoUrl" class="upload-image">
            <i v-else class="el-icon-plus" v-loading="uploading"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="品牌描述" prop="content">
          <el-input type="textarea" v-model="editForm.content" placeholder="品牌描述"></el-input>
        </el-form-item>
        <el-form-item label="品牌专题页" prop="brandPage">
          <el-input v-model="editForm.brandPage" placeholder="URL地址"></el-input>
        </el-form-item>
        <el-form-item label="状态">
          <el-switch v-model="editForm.status" :on-value="1" :off-value="0" on-text="启用" off-text="禁用"></el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click.native="editFormVisible = false">取 消</el-button>
        <el-button type="primary" @click.native="editSubmit" v-loading="editLoading">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 图片预览 -->
    <el-dialog v-model="previewVisible" size="tiny">
      <img width="100%" :src="previewImgUrl">
    </el-dialog>
  </section>
</template>
<script>
import { readBrandList, saveBrandInfo, updateBrandStatus } from '@/api'
export default {
  data() {
    return {
      previewImgUrl: '',
      previewVisible: false,
      brandList: [{
        brandId: 100,
        brandName: '商品品牌管理',
        logoUrl: 'https://avatars0.githubusercontent.com/u/26806103?v=3&s=460',
        brandPage: 'http://192.168.199.211:8080',
        status: 1
      }],
      page: 1,
      pageSize: 10,
      total: 0,
      listLoading: false,
      uploading: false,
      loading: false,
      sels: [],
      filters: {
        name: ''
      },
      addFormVisible: false,
      addUploading: false,
      addForm: {
        brandName: '',
        content: '',
        logoUrl: '',
        brandPage: '',
        status: true
      },
      editFormVisible: false,
      editLoading: false,
      editForm: {
        brandId: '',
        brandName: '',
        content: '',
        logoUrl: '',
        brandPage: '',
        status: false
      },
      brandRules: {
        brandName: [
          {required: true, message: '请输入品牌名称', trigger: 'blur'},
          {min: 3, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur'}
        ],
        content: [
          {required: true, message: '请输入品牌名称', trigger: 'blur'},
          {min: 2, message: '描述不少于 20 个字符', trigger: 'blur'}
        ],
        logoUrl: [
          {required: true, message: '请上传品牌LOGO', trigger: 'blur'}
        ]
      }
    }
  },
  methods: {
    // 品牌列表
    getBrandList () {
      this.loading = true
      let data = {
        brandName: this.filters.name,
        currPage: this.page,
        pageSize: this.pageSize,
      }
      readBrandList(data)
      .then(res => {
        console.log(res)
        if (res.data.code === '0001') {
          let result = res.data.result
          this.total = result.pageInfo.count
          this.brandList = result.brandInfo
        } else {
          this.$message.error(res.data.message)
        }
        this.loading = false
      })
      .catch(error => {
        this.loading = false;
        this.catchError(error.response)
      })
    },
    handleSizeChange (val) {
      this.pageSize = val
      this.getBrandList()
    },
    handleCurrentChange (val) {
      this.page = val
      this.getBrandList()
    },
    // 上传校验
    beforeUpload (file) {
      const isJPG = file.type === 'image/jpeg' || file.type === 'image/png';
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isJPG) {
        this.$message.error('品牌LOGO只能是 JPG 或 PNG 格式!');
      }
      if (!isLt2M) {
        this.$message.error('品牌LOGO大小不能超过 2MB!');
      }
      return isJPG && isLt2M;
    },
    // 上传中
    handleProgress (event, file) {
      this.uploading = true
    },
    // 上传成功
    handleSuccess (res, file) {
      console.log(res)
      this.uploading = false
      if (res.code === '0001') {
        this.uploading = false
        let resFile = res.result.file;
        file.path = resFile.filePath;
        this.addForm.logoUrl = resFile.filePath
      } else {
        this.$message.error(res.message)
      }
    },
    // 上传失败
    handleError (err, file) {
      console.log(err)
      this.uploading = false
      this.$message.error('上传失败')
      // this.addForm.logoUrl = URL.createObjectURL(file.raw)
    },
    // 显示编辑
    handleEdit (index, row) {
      this.editFormVisible = true
      this.editForm = Object.assign({}, row);
    },
    // 编辑提交
    editSubmit () {
      this.$refs.editForm.validate((valid) => {
        if (valid) {
          let data = Object.assign({}, this.editForm)
          saveBrandInfo(data).then((res) => {
            console.log(res)
            if (res.data.code === '0001') {
              this.$message.success('编辑成功')
              this.getBrandList()
            } else {
              this.$message.error(res.data.message)
            }
          }).catch(err => {
            console.log(err)
            this.catchError(err.response)
          })
          this.editFormVisible = false
        } else {
          console.log('err submit')
        }
      })
    },
    // 显示新增
    handleAdd () {
      this.addForm = {
        brandName: '',
        content: '',
        logoUrl: 'https://avatars0.githubusercontent.com/u/26806103?v=3&s=460',
        brandPage: '',
        status: true
      }
      this.addFormVisible = true
    },
    // 新增提交
    addSubmit () {
      this.$refs.addForm.validate((valid) => {
        if(valid) {
          this.addForm.status = this.addForm.status ? 1 : 0
          let data = Object.assign({}, this.addForm)
          saveBrandInfo(data).then(res => {
            console.log(res)
            if(res.data.code === '0001') {
              this.$message.success(res.data.message)
              this.getBrandList()
            }else {
              this.$message.error(res.data.message)
            }
          }).catch(err => {
            console.log(err)
            this.catchError(err.response)
          })
          this.addFormVisible = false
        } else {
          console.log('err submit')
        }
      })
    },
    // 状态设置
    handleChange (row) {
      updateBrandStatus({brandId: row.brandId}).then(res => {
        console.log(res)
        if (res.data.code === '0001') {
          this.$message.success(res.data.message)
        } else {
          this.$message.error(res.data.message)
        }
      }).catch(err => {
        console.log(err)
      })
    },
    selsChange (sels) {
      this.sels = sels
    },
    // 删除操作
    // handleDel (brandId) {
    //   console.log(brandId)
    //   this.$confirm('此操作将删除该品牌, 是否继续?', '提示', {
    //       type: 'warning',
    //       confirmButtonText: '确定',
    //       cancelButtonText: '取消',
    //   }).then(() => {
    //     brandDel({id: brandId}).then((res) => {
    //       if(res.data.code === '0001') {
    //         this.$message.success(res.data.message)
    //         this.getBrandList()
    //       } else {
    //         this.$message.error(res.data.message)
    //       }
    //     })
    //   }).catch(() => {
    //     this.$message.info('取消操作')
    //   })
    // },
    // // 批量删除
    // batchRemove () {
    //   let ids = this.sels.map(item => item.brandId).toString();
    //   this.$confirm('确认删除选中记录吗？', '提示', {
    //       type: 'warning'
    //     }).then(() => {
    //       this.listLoading = true;
    //       let para = { ids: ids }
    //       brandBatchDel(para).then((res) => {
    //         this.listLoading = false;
    //         this.$message({
    //           message: '删除成功',
    //           type: 'success'
    //         });
    //         this.getBrandList()
    //       });
    //     }).catch(() => {
    //       this.$message.info('取消操作')
    //     })
    // },
    // 图片查看
    viewImage (imgUrl) {
      this.previewImgUrl = imgUrl;
      this.previewVisible = true;
    }
  },
  mounted () {
    this.getBrandList()
  }
}
</script>

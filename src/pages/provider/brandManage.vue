<template>
  <section>
    <!-- 工具条 -->
    <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
      <el-form :inline="true" :model="filters" @submit.prevent="getBrands">
        <el-form-item>
          <el-input v-model="filters.name" placeholder="品牌名称" icon="search" @click.enter="null"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="getBrands">查询</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleAdd">新增</el-button>
        </el-form-item>
      </el-form>
    </el-col>
    <!-- 品牌列表 -->
    <el-table :data="brands" highlight-current-row v-loading="loading" style="width: 100%;" @selection-change="selsChange">
      <el-table-column type="selection" width="55">
      </el-table-column>
      <el-table-column type="index" width="60">
      </el-table-column>
      <el-table-column prop="brandName" label="名称" width="200" sortable>
      </el-table-column>
      <el-table-column prop="content" label="描述">
      </el-table-column>
      <el-table-column prop="brandPage" label="专题页" width="250">
      </el-table-column>
      <el-table-column prop="updateTime" label="更新时间" width="200" sortable>
      </el-table-column>
      <!-- <el-table-column prop="status" label="状态" width="120">
         <template scope="scope">
              <el-switch
                v-model="scope.row.status"
                on-color="#13ce66"
                off-color="#ff4949"
                on-text="启用"
                off-text="禁用"
                @change="handleChange(scope.$index, scope.row)"
                >
              </el-switch>
              <span>{{scope.row.status}}</span>
          </template>
      </el-table-column> -->
      <el-table-column label="操作" width="150" fixed="right">
        <template scope="scope">
          <el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button type="danger" size="small" @click="handleDel(scope.row.brandId)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-row class="m-t">
      <el-button type="danger" @click="batchRemove" :disabled="this.sels.length===0">批量删除</el-button>
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
      <el-form :model="addForm" :rules="brandRules" ref="addForm" label-width="120px" style="padding: 30px" v-loading="addLoading">
        <el-form-item label="品牌名称" prop="brandName">
          <el-input v-model="addForm.brandName" placeholder="品牌名称"></el-input>
        </el-form-item>
        <el-form-item label="LOGO" prop="logoUrl">
          <el-upload
            class="uploader"
            name="brandLogo"
            accept="image/jpeg, image/png"
            action="/uploadImgUrl"
            :show-file-list="false"
            :on-success="handleSuccess"
            :on-error="handleUploadError"
            :on-progress="uploadProgress"
            :before-upload="beforeUpload"
            :auto-upload="true">
            <img v-if="addForm.logoUrl" :src="addForm.logoUrl" class="logo">
            <i v-else class="el-icon-pl us uploader-icon" v-loading="uploading"></i>
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
            name="brandLogo"
            accept="image/jpeg, image/png"
            action="/uploadImgUrl"
            :show-file-list="false"
            :on-success="handleSuccess"
            :on-error="handleUploadError"
            :on-progress="uploadProgress"
            :before-upload="beforeUpload"
            :auto-upload="true">
            <img v-if="editForm.logoUrl" :src="editForm.logoUrl" class="logo">
            <i v-else class="el-icon-plus uploader-icon" v-loading="uploading"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="品牌描述" prop="content">
          <el-input type="textarea" v-model="editForm.content" placeholder="品牌描述"></el-input>
        </el-form-item>
        <el-form-item label="品牌专题页" prop="brandPage">
          <el-input v-model="editForm.brandPage" placeholder="URL地址"></el-input>
        </el-form-item>
        <el-form-item label="状态">
          <el-switch v-model="editForm.status" on-text="启用" off-text="禁用"></el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click.native="editFormVisible = false">取 消</el-button>
        <el-button type="primary" @click.native="editSubmit" v-loading="editLoading">确 定</el-button>
      </div>
    </el-dialog>
  </section>
</template>
<script>
import { getBrandList, brandEdit, brandAdd, brandDel, brandBatchDel } from '../../api'
export default {
  data() {
    return {
      brands: [],
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

      addFormVisible: false,
      addLoading: false,
      addUploading: false,
      addForm: {
        brandId: '',
        brandName: '',
        content: '',
        logoUrl: '',
        brandPage: '',
        status: true
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
    formatStatus (row, column) {
      return row.stauts === 1 ? ture : false
    },
    // 品牌列表
    getBrands () {
      this.loading = true
      let data = {
        brandName: this.filters.name,
        currPage: this.page,
        pageSize: this.pageSize,
      }
      getBrandList(data).then((res) => {
        console.log(res)
        if (res.data.code === '0001') {
          let result = res.data.result
          this.brands = result.brandInfo
          this.total = result.pageInfo.count
        } else {
          this.$message.error('获取失败')
        }
      }).then(() => {
        this.loading = false
      }).catch(() => {
        this.loading = false
      })
    },
    handleSizeChange (val) {
      this.pageSize = val
      this.getBrands()
    },
    handleCurrentChange (val) {
      this.page = val
      this.getBrands()
    },
    // 上传校验
    beforeUpload (file) {
      const isJPG = file.type === 'image/jpeg' || 'image/png';
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isJPG) {
        this.$message.error('品牌LOGO只能是 JPG 或 PNG 格式!');
      }
      if (!isLt2M) {
        this.$message.error('品牌LOGO大小不能超过 2MB!');
      }
      return isJPG && isLt2M;
    },
    uploadProgress () {
      this.uploading = true
    },
    // 上传成功
    handleSuccess (res, file) {
      this.uploading = false
      this.addForm.logoUrl = res.logoUrl
      // this.imageUrl = URL.createObjectURL(file.raw)
    },
    // 上传失败
    handleUploadError (err, file) {
      this.uploading = false
      console.log(err)
      this.addForm.logoUrl = URL.createObjectURL(file.raw)
    },
    // 显示编辑
    handleEdit (index, row) {
      this.editFormVisible = true
      console.log(row)
      this.editForm = Object.assign( {}, row);
      this.editForm.status = row.status === 1 ? true : false
    },
    // 编辑提交
    editSubmit () {
      this.$refs.editForm.validate((valid) => {
        if (valid) {
          let data = Object.assign({}, this.editForm)
          data.status = data.status ? 1 : 0
          console.log(data.status)
          brandEdit(data).then((res) => {
            console.log(res)
            if (res.data.code === '0001') {
              this.$message.success('编辑成功')
            } else {
              this.$message.error('编辑失败')
            }
          })
          this.editFormVisible = false
        }
      })
    },
    // 显示创建
    handleAdd () {
      this.addFormVisible = true
    },
    // 创建提交
    addSubmit () {
      this.$refs.addForm.validate((valid) => {
        if(valid) {
          this.addLoading = true
          this.addForm = Object.assign( {}, this.addForm)
          this.addForm.status = this.addForm.status ? 1 : 0
          console.log(this.addForm)
          brandAdd(this.addForm).then(res => {
            if(res.data.code === '0001') {
              this.$message.success(res.data.message)
              this.getBrands()
            }else {
              this.$message.error(res.data.message)
            }
          })
          this.addLoading = false
          this.addFormVisible = false
        }
      })
    },
    // 删除操作
    handleDel (brandId) {
      console.log(brandId)
      this.$confirm('此操作将删除该品牌, 是否继续?', '提示', {
          type: 'warning',
          confirmButtonText: '确定',
          cancelButtonText: '取消',
      }).then(() => {
        brandDel({id: brandId}).then((res) => {
          if(res.data.code === '0001') {
            this.$message.success(res.data.message)
            this.getBrands()
          } else {
            this.$message.error(res.data.message)
          }
        })
      }).catch(() => {
        this.$message.info('取消操作')
      })
    },
    selsChange (sels) {
      this.sels = sels
    },
    // 批量删除
    batchRemove () {
      let ids = this.sels.map(item => item.brandId).toString();
      this.$confirm('确认删除选中记录吗？', '提示', {
          type: 'warning'
        }).then(() => {
          this.listLoading = true;
          let para = { ids: ids }
          brandBatchDel(para).then((res) => {
            this.listLoading = false;
            this.$message({
              message: '删除成功',
              type: 'success'
            });
            this.getBrands()
          });
        }).catch(() => {
          this.$message.info('取消操作')
        })
    },
    handleBrandDetail (brandId) {
      this.$router.push({
        path: '/provider/brandDetail?id=' + brandId
      })
    }
  },
  mounted () {
    this.getBrands()
  }
}
</script>
<style scoped>
  .image {
    display: block;
    width: 100%;
    height: 225px;
    cursor: pointer;
  }
  .time {
    font-size: 13px;
    color: #999;
  }
  .bottom {
    margin-top: 13px;
    line-height: 12px;
  }
  .el-card {
    margin: 15px 0;
    transition: all .3s
  }
  .el-card:hover {
    transform: scaleX(1.03) scaleY(1.03);
  }
  .logo {
    display: block;
    width: 178px;
    height: 178px;
  }
</style>

<template>
  <section>
    <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
      <el-form :inline="true">
        <el-form-item>
          <el-input placeholder="品牌名称" icon="search"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary">查询</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary">新增</el-button>
        </el-form-item>
      </el-form>
    </el-col>
    <el-table :data="brandList" highlight-current-row v-loading="loading" style="width: 100%;">
      <el-table-column type="selection" width="55">
      </el-table-column>
      <el-table-column type="index" width="60">
      </el-table-column>
      <el-table-column prop="brandName" label="名称" width="120" sortable>
      </el-table-column>
      <el-table-column prop="content" label="描述" width="250">
      </el-table-column>
      <el-table-column prop="brandPage" label="专题页" width="220">
      </el-table-column>
      <el-table-column prop="updateTime" label="更新时间" width="120" sortable>
      </el-table-column>
      <el-table-column prop="status" label="状态" width="120" :formatter="formatStatus">
         <template scope="scope">
              <el-switch
                v-model="scope.row.status"
                on-color="#13ce66"
                off-color="#ff4949"
                on-text="启用"
                off-text="禁用"
                >
              </el-switch>
          </template>
      </el-table-column>
      <el-table-column label="操作" width="150" fixed="right">
        <template scope="scope">
          <el-button size="small">编辑</el-button>
          <el-button type="danger" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-row class="m-t">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="10"
        layout="total, sizes, prev, pager, next, jumper"
        :total="20"
        class="pull-right">
      </el-pagination>
    </el-row>
    <el-dialog :title="formTitle" v-model="dialogFormVisible">
      <el-form :model="brandForm" :rules="brandRules" ref="brandForm" label-width="120px" style="padding: 30px" v-loading="loading">
        <el-form-item label="品牌名称" prop="brandName">
          <el-input v-model="brandForm.brandName" placeholder="品牌名称"></el-input>
        </el-form-item>
        <el-form-item label="LOGO" prop="logoUrl">
          <el-upload
            class="uploader"
            name="brandLogo"
            accept="image/jpeg, image/png"
            action="/uploadImgUrl"
            :show-file-list="false"
            :on-success="handleSuccess"
            :on-progress="uploadProgress"
            :before-upload="beforeUpload"
            :auto-upload="true">
            <img v-if="brandForm.logoUrl" :src="brandForm.logoUrl" class="logo">
            <i v-else class="el-icon-plus uploader-icon" v-loading="uploading"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="品牌描述" prop="content">
          <el-input type="textarea" v-model="brandForm.content" placeholder="品牌描述"></el-input>
        </el-form-item>
        <el-form-item label="品牌专题页" prop="brandPage">
          <el-input v-model="brandForm.brandPage" placeholder="URL地址"></el-input>
        </el-form-item>
        <el-form-item label="状态">
          <el-switch v-model="brandForm.status" on-text="启用" off-text="禁用" on-value="1" off-value="0"></el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="handleCancel('brandForm')">取 消</el-button>
        <el-button type="primary" @click="submitForm('brandForm')">确 定</el-button>
      </div>
    </el-dialog>
  </section>
</template>
<script>
import { getBrandList } from '../../api'
export default {
  data() {
    return {
      currentPage: 1,
      pageSize: 20,
      dialogFormVisible: false,
      loading: false,
      uploading: false,
      brandList: [],
      formTitle: '',
      brandForm: {
        brandId: '',
        brandName: '',
        content: '',
        logoUrl: '',
        brandPage: '',
        status: '1'
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
    getList () {
      this.loading = true
      getBrandList().then(res => {
        console.log(res)
        this.brandList = res.data.brandList
      }).then(() => {
        this.loading = false
      }).catch(() => {
        this.loading = false
      })
    },
    handleSizeChange (val) {
      this.pageSize = val
      this.getList()
    },
    handleCurrentChange (val) {
      this.currentPage = val
      this.getList()
    },
    beforeBrandAdd () {
      this.formTitle = '添加品牌'
      this.brandForm = {
        brandId: '',
        brandName: '',
        content: '',
        logoUrl: '',
        brandPage: '',
        status: '1'
      }
      this.dialogFormVisible = true
    },
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
    handleSuccess (res, file) {
      this.uploading = false
      this.brandForm.logoUrl = res.logoUrl
      // this.imageUrl = URL.createObjectURL(file.raw)
    },
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if(valid) {
          this.loading = true
          brandSave(this.brandForm).then(res => {
            console.log(res.data)
            if(res.data.status === 1) {
              this.$message({
                type: 'success',
                message: res.data.message
              })
              this.getList()
            }else {
              this.$message({
                type: 'error',
                message: res.data.message
              })
            }
          })
          this.loading = false
          this.dialogFormVisible = false
        }
      })
    },
    handleCancel () {
      this.dialogFormVisible = false
      this.$message({
        type: 'info',
        message: '已取消操作'
      })
    },
    handleBrandEdit (brand) {
      this.formTitle = '品牌编辑'
      this.brandForm = brand
      this.dialogFormVisible = true
    },
    handleBrandDel (brandId) {
      this.$confirm('此操作将删除该品牌, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
      }).then(() => {
        brandDel({id: brandId}).then(res => {
          if(res.data.status === 1) {
            this.getList()
            this.$message({
              type: 'success',
              message: res.data.message
            })
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消操作'
        })
      })
    },
    handleBrandDetail (brandId) {
      this.$router.push({
        path: '/provider/brandDetail?id=' + brandId
      })
    }
  },
  mounted () {
    this.getList()
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

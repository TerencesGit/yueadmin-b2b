<template>
  <section>
    <div v-title :data-title="this.$route.name"></div>
    <el-row class="toolbar">
      <el-form :inline="true" :model="filter">
        <el-form-item label="">
          <el-input v-model="filter.code" placeholder="输入商品编号"></el-input>
        </el-form-item>
        <el-form-item label="">
          <el-input v-model="filter.name" placeholder="输入商品名称"></el-input>
        </el-form-item>
        <el-form-item label="">
          <el-button type="primary" @click="getWareList">搜索</el-button>
        </el-form-item>
      </el-form>
      <el-radio-group v-model="filter.status" @change="statusChange">
        <el-radio-button :label="3">全部</el-radio-button>
        <el-radio-button :label="0">未审核</el-radio-button>
        <el-radio-button :label="1">审核通过</el-radio-button>
        <el-radio-button :label="2">审核未通过</el-radio-button>
      </el-radio-group>
    </el-row>
    <el-table 
      border 
      :data="wareList" 
      v-loading="loading" 
      highlight-current-row
      style="width: 100%">
      <el-table-column type="index" width="60"></el-table-column>
      <el-table-column prop="wareId" label="商品编号" sortable width="200"></el-table-column>
      <el-table-column prop="wareName" label="商品名称"></el-table-column>
      <!-- <el-table-column prop="wareKind" label="商品类别" width="150"></el-table-column> -->
      <el-table-column prop="createTime" label="创建时间" sortable width="200"></el-table-column>
      <el-table-column label="操作" width="180">
        <template scope="scope">
          <el-button size="small" @click="handleEdit(scope.row.wareId)">编辑</el-button>
          <el-button size="small" @click="handleDetail(scope.row.wareId)">详情</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-row class="m-t">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currPage"
        :page-size="pageSize"
        :page-sizes="[10, 20, 30, 40]"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        class="pull-right">
      </el-pagination>
    </el-row>
  </section>
</template>
<script>
import { readWareList } from '@/api'
export default {
  data () {
    return {
      filter: {
        name: '',
        code: '',
        status: 3,
      },
      currPage: 1,
      pageSize: 20,
      total: 0,
      loading: false,
      wareList: [],
    }
  },
  methods: {
    // 商品列表
    getWareList () {
      this.loading = true
      let params = {
        currPage: this.currPage,
        pageSize: this.pageSize,
        wareName: this.filter.name,
        wareCode: this.filter.code,
        verifyStatus: this.filter.status
      }
      console.log(params)
      readWareList(params).then(res => {
        console.log(res)
        if (res.data.code === '0001') {
          this.total = res.data.result.pageInfo.count;
          this.wareList = res.data.result.wareList
        } else {
          this.$message.error(res.data.message)
        }
        this.loading = false
      })
      .catch(err => {
        console.log(err)
        this.loading = false
        this.catchError(err.response)
      })
    },
    handleSizeChange (val) {
      this.pageSize = val;
      this.getWareList()
    },
    handleCurrentChange (val) {
      this.currPage = val;
      this.getWareList()
    },
    statusChange (val) {
      this.getWareList()
    },
    // 编辑
    handleEdit (wareId) {
      this.$router.push({
        path: '/provider/ware/edit/base?wareId=' + wareId
      })
    },
    // 详情
    handleDetail (wareId) {
      this.$router.push({
        path: '/provider/ware/wareDetail?wareId=' + wareId
      })
    }
  },
  mounted () {
    this.getWareList()
  }
}
</script>

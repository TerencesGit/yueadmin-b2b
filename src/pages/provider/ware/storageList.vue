<template>
  <section>
    <div v-title :data-title="this.$route.name"></div>
    <el-row class="toolbar">
      <el-form :inline="true" :model="filter">
        <el-form-item label="商品编号">
          <el-input v-model="filter.code" placeholder="输入商品编号"></el-input>
        </el-form-item>
        <el-form-item label="商品名称">
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
      <el-table-column prop="wareKind" label="状态" width="150" :formatter="formatStatus"></el-table-column>
      </el-table-column>
      <el-table-column prop="createTime" label="创建时间" sortable width="200"></el-table-column>
      <el-table-column label="操作" width="120">
        <template scope="scope">
          <el-button
            :plain="true"
            size="small"
            type="primary"
            @click="handleStorageSet(scope.row.wareId)">库存管理</el-button>
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
        status: 3
      },
      currPage: 1,
      pageSize: 20,
      total: 0,
      loading: false,
      wareList: [],
    }
  },
  methods: {
    formatStatus (row) {

      return row.status === 0 ? '未审核' : row.status === 1 ? '已通过' : '未通过'
    },
    // 商品列表
    getWareList (n) {
      console.log(n)
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
      })
      .catch(err => {
        console.log(err)
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
      console.log(val)
      this.getWareList()
    },
    // 编辑
    handleStorageSet (wareId) {
      this.$router.push({
        path: '/provider/ware/storageSet?wareId=' + wareId
      })
    }
  },
  mounted () {
    this.getWareList()
  }
}
</script>

<template>
  <section>
    <div v-title :data-title="this.$route.name"></div>
    <!-- 搜索栏 -->
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
    </el-row>
    <!-- 商品列表 -->
    <el-table :data="wareList" v-loading="loading" border style="width: 100%">
      <el-table-column type="index" width="60"></el-table-column>
      <el-table-column prop="wareCode" label="商品编号" sortable width="170"></el-table-column>
      <el-table-column prop="wareName" label="商品名称"></el-table-column>
      <el-table-column prop="providerName" label="供应商" width="150"></el-table-column>
      <el-table-column prop="srcCityName" label="出发城市" width="120"></el-table-column>
      <el-table-column prop="dstCityName" label="目的城市" width="120"></el-table-column>
      </el-table-column>
      <el-table-column label="操作" width="200">
        <template scope="scope">
          <el-button size="small" @click="handlePriceSet(scope.row.wareId)">价格管理</el-button>
          <el-button size="small" @click="handleShowDetail(scope.row.wareId)">商品详情</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-row class="toolbar">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currPage"
        :page-size="pageSize"
        :page-sizes="[10, 20, 30, 40]"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
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
      let params = {
        currPage: this.currPage,
        pageSize: this.pageSize,
        wareName: this.filter.name,
        wareCode: this.filter.code,
        verifyStatus: 2
      }
      readWareList(params).then(res => {
        console.log(res)
        if (res.data.code === '0001') {
          let page = res.data.result.pageInfo;
          this.currPage = page.currPage;
          this.pageSize = page.pageSize;
          this.total = page.count;
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
      // this.getWareList()
    },
    // 价格管理
    handlePriceSet (wareId) {
      this.$router.push({
        path: '/admin/ware/priceSet?wareId=' + wareId
      })
    },
    // 商品详情
    handleShowDetail (wareId) {
      this.$router.push({
        path: '/admin/ware/detail?wareId=' + wareId
      })
    }
  },
  mounted () {
    this.getWareList()
  }
}
</script>

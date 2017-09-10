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
    </el-row>
    <el-table :data="wareList" v-loading="loading" border style="width: 100%">
      <el-table-column type="index" width="60"></el-table-column>
      <el-table-column prop="wareCode" label="商品编号" sortable width="200"></el-table-column>
      <el-table-column prop="wareName" label="商品名称"></el-table-column>
      <el-table-column prop="providerName" label="供应商" width="150"></el-table-column>
      <!-- <el-table-column prop="wareKind" label="商品类别" width="150"></el-table-column> -->
      </el-table-column>
      <el-table-column prop="srcCityName" label="出发城市" width="120"></el-table-column>
      <el-table-column label="操作" width="220">
        <template scope="scope">
          <el-button size="small" @click="handleSetPrice(scope.row.wareId)">设置价格</el-button>
          <el-button size="small" @click="handleShowDetail(scope.row.wareId)">商品详情</el-button>
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
      },
      currPage: 1,
      pageSize: 20,
      total: 0,
      loading: false,
      wareList: [{
        wareId: 100001,
        
      }],
    }
  },
  methods: {
    getWareList () {
      this.loading = true;
      let params = {
        currPage: this.currPage,
        pageSize: this.pageSize,
        wareName: this.filter.name,
        wareCode: this.filter.code,
        verifyStatus: 2,
      }
      // 商品列表
      readWareList(params).then(res => {
        this.loading = false;
        if (res.data.code === '0001') {
          this.total = res.data.result.pageInfo.count;
          this.wareList = res.data.result.wareList
        } else {
          this.$message.error(res.data.message)
        }
      })
      .catch(err => {
        this.loading = false;
        console.log(err)
        this.$catchError(err)
      })
    },
    handleSizeChange (val) {
      this.pageSize = val
      this.getWareList()
    },
    handleCurrentChange (val) {
      this.currPage = val
      this.getWareList()
    },
    // 设置价格
    handleSetPrice (wareId) {
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
  },
}
</script>

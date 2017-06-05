<template>
  <section>
    <div v-title :data-title="this.$route.name"></div>
    <el-row class="toolbar">
      <el-input
        placeholder="输入商品名称"
        icon="search"
        v-model="criteria"
        :on-icon-click="handleIconClick"
        style="width: 300px; float: left">
      </el-input>
      <el-button :plain="true" type="primary" class="pull-right" @click="addWare">添加商品</el-button>
    </el-row>
    <el-table :data="wares" v-loading="loading" style="width: 100%">
      <el-table-column type="index" width="60"></el-table-column>
      <el-table-column prop="wareCode" label="商品编号" sortable></el-table-column>
      <el-table-column prop="wareName" label="商品名称" width="200"></el-table-column>
      <el-table-column prop="wareKind" label="商品类别" width="150"></el-table-column>
      <el-table-column prop="verifyStatus" label="审核状态" width="120" :formatter="formatStatus" >
      </el-table-column>
      <el-table-column prop="createTime" label="创建时间" sortable width="150"></el-table-column>
      <el-table-column label="操作" width="120">
        <template scope="scope">
          <el-button
            :plain="true"
            size="small"
            type="primary"
            @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-row class="m-t">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[10, 20, 30, 40]"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        class="pull-right">
      </el-pagination>
    </el-row>
  </section>
</template>
<script>
import { getWareList } from '../../../../api'
export default {
  data () {
    return {
      criteria: '',
      currentPage: 1,
      pageSize: 20,
      total: 0,
      loading: false,
      wares: [],
      filteredWare: [
        {
          ware_code: '001',
          ware_name: '',
          provider_id: '',
          create_time: '',
          ware_kind: '',
          suggested_price: '',
          key_words: '',
          status: '',
          verify_status: ''
        }
      ]
    }
  },
  methods: {
    formatStatus (row, column) {
      return row.verifyStatus === 1 ? '审核通过' : row.verifyStatus === 0 ? '未审核' : row.verifyStatus === 2 ? '审核未通过' : '未知'
    },
    getWares () {
      this.loading = true
      let params = {
        page: this.currentPage,
        pageSize: this.pageSize
      }
      getWareList(params).then(res => {
        console.log(res)
        this.wares = res.data.wareList

      }).then(() => {
        this.loading = false
      }).catch((error) => {
        this.loading = false
      })
    },
    handleIconClick () {
      console.log(this.criteria)
    },
    addWare () {
      this.$router.push('/provider/addWare')
    },
    handleSizeChange (val) {
    },
    handleCurrentChange (val) {
      this.currentPage = val
    },
    handleEdit ($index, row) {
      this.$router.push({
        path: '/provider/ware/edit/basicInfo_photography?id=' + row.wareId
      })
    }
  },
  mounted () {
    this.getWares()
  },
  computed: {
    // filteredWare () {
    //   return this.wareList.filter(ware => ware.ware_name.indexOf(this.criteria) !== -1)
    // }
  }
}
</script>

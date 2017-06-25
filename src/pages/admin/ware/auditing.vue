<template>
  <section>
    <div v-title :data-title="this.$route.name"></div>
    <el-row class="toolbar">
			<el-form :inline="true" :model="filter">
				<el-form-item label="">
					<el-input v-model="filter.code" placeholder="商品编号"></el-input>
				</el-form-item>
				<el-form-item label="">
					<el-input v-model="filter.name" placeholder="商品名称"></el-input>
				</el-form-item>
				<el-form-item label="">
					<el-button type="primary" @click="getWares">搜索</el-button>
				</el-form-item>
			</el-form>
		</el-row>
    <el-table :data="wareList" v-loading="loading" border style="width: 100%">
      <el-table-column type="index" width="60"></el-table-column>
      <el-table-column prop="wareCode" label="商品编号" sortable width="200"></el-table-column>
      <el-table-column prop="wareName" label="商品名称" width="200"></el-table-column>
      <el-table-column prop="srcCityName" label="供应商" width="120"></el-table-column>
      <!-- <el-table-column prop="dstCityName" label="目的城市" width="120"></el-table-column> -->
      <!-- <el-table-column prop="verifyStatus" label="审核状态" width="100" :formatter="formatStatus" > -->
      </el-table-column>
      <el-table-column prop="createTime" label="提交时间" sortable></el-table-column>
      <el-table-column label="操作" width="120">
        <template scope="scope">
          <el-button
            :plain="true"
            size="small"
            type="primary"
            @click="handleAuditing(scope.$index, scope.row)">审核</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-row class="m-t">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currPage"
        :page-sizes="[10, 20, 30, 40]"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        class="pull-right">
      </el-pagination>
    </el-row>
  </section>
</template>
<script>
import { getWareList } from '@/api'
export default {
  data () {
    return {
    	filter: {
				name: '',
				code: '',
			},
      criteria: '',
      currPage: 1,
      pageSize: 20,
      total: 0,
      loading: false,
      wareList: [],
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
        page: this.currPage,
        pageSize: this.pageSize
      }
      getWareList(params).then(res => {
        console.log(res)
        if (res.data.code === '0001') {
          let page = res.data.result.pageInfo;
          this.total = page.count;
          this.currPage = page.currPage;
          this.wareList = res.data.result.wareList
        } else {
          tihs.$message.error(res.data.message)
        }
        this.loading = false
      }).catch((err) => {
        console.log(err)
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
      this.currPage = val
    },
    handleAuditing ($index, row) {
    	console.log(row.wareId)
      this.$router.push({
        path: '/admin/ware/detail?id=' + row.wareId
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

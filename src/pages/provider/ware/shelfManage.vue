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
    </el-row>
    <el-table 
	    border 
	    :data="wareList" 
	    v-loading="loading" 
	    highlight-current-row 
	    style="width: 100%">
      <el-table-column type="index" width="60"></el-table-column>
      <el-table-column prop="wareId" label="商品编号" sortable width="180"></el-table-column>
      <el-table-column prop="wareName" label="商品名称"></el-table-column>
      <el-table-column prop="createTime" label="创建时间" sortable width="180"></el-table-column>
      <el-table-column prop="upDownTime" label="上/下架时间" sortable width="180"></el-table-column>
      <el-table-column prop="status" label="状态" width="110" :formatter="formatStatus" >
      </el-table-column>
      <el-table-column label="操作" width="270">
        <template scope="scope">
          <el-button v-if="scope.row.status === 0" size="small" @click="handleShelf(scope.row)">上架</el-button>
          <el-button v-if="scope.row.status === 1" size="small" @click="handleShelf(scope.row)">下架</el-button>
          <el-button v-if="scope.row.status === -1" size="small" @click="showCause(scope.row)">下架原因</el-button>
          <el-button size="small" @click="handleServiceSet(scope.row.wareId)">附加服务</el-button>
          <el-button size="small" @click="handleActivitySet(scope.row.wareId)">推荐活动</el-button>
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
    <el-dialog title="下架原因" :visible.sync="causeVisible">
      <div class="dialog-content">
        {{ cause }}
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click.native="causeVisible = false">确 定</el-button>
      </div>
    </el-dialog>
  </section>
</template>
<script>
import { readWareList, updateWareInfoUpDownStatus } from '@/api'
export default {
  data () {
    return {
      filter: {
        name: '',
        code: '',
      },
      currPage: 1,
      pageSize: 10,
      total: 0,
      loading: false,
      wareList: [{
        wareId: 10001,
        wareName: '三亚旅拍',
        status: 1
      },
      {
        wareId: 10002,
        wareName: '三亚旅拍',
        status: 0
      },{
        wareId: 10003,
        wareName: '三亚旅拍',
        status: -1,
        cause: '暂无原因'
      }],
      causeVisible: false,
      cause: '',
    }
  },
  methods: {
    formatStatus (row) {
      return row.status === 1 ? '已上架' : row.status === 0 ? '已下架' : '平台已下架'
    },
    // 获取商品列表
    getWareList () {
      this.loading = true;
      let params = {
        currPage: this.currPage,
        pageSize: this.pageSize,
        wareName: this.filter.name,
        wareCode: this.filter.code,
        verifyStatus: 2,
      }
      readWareList(params).then(res => {
        this.loading = false;
        console.log(res)
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
    	this.pageSize = val;
    	this.getWareList()
    },
    handleCurrentChange (val) {
      this.currPage = val
      this.getWareList()
    },
    // 上下架操作
    handleShelf (row) {
    	let statusInfo = row.status === 1 ? '下架' : '上架';
      let upDownStatus = row.status === 1 ? 0 : 1;
    	this.$confirm('确定'+statusInfo+'该商品？', '提示', {type: 'warning'}).then(() => {
        let data = {
          wareId: row.wareId,
          upDownStatus: upDownStatus,
          wareType: 1
        }
        console.log(data)
        updateWareInfoUpDownStatus(data).then(res => {
	     	  console.log(res)
	     	  if(res.data.code === '0001') {
	     	  	this.$message.success(res.data.message)
	     	  	this.getWareList()
	     	  } else {
	     	  	this.$message.error(res.data.message)
	     	  }
	      }).catch(err => {
	      	console.log(err)
	      })
      }).catch(err => {
      	console.log(err)
        this.$message('取消操作')
      })
    },
    // 查看原因
    showCause (row) {
      this.cause = row.cause || '暂无原因'
      this.causeVisible = true
    },
    // 附加服务
    handleServiceSet (wareId) {
      this.$router.push(`/provider/ware/serviceShelfList?wareId=${wareId}`)
    },
    // 推荐活动
    handleActivitySet (wareId) {
      this.$router.push(`/provider/ware/activityShelfList?wareId=${wareId}`)
    },
  },
  mounted () {
    this.getWareList()
  },
}
</script>

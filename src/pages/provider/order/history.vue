<template>
  <section>
    <el-row class="toolbar">
    	<el-form :inline="true" :model="filter">
        <el-form-item label="">
          <el-input v-model="filter.orderCode" placeholder="输入订单号"></el-input>
        </el-form-item>
        <el-form-item label="">
          <el-input v-model="filter.wareName" placeholder="输入商品名称"></el-input>
        </el-form-item>
        <el-form-item label="出发日期：">
          <el-date-picker
            v-model="filter.startDate"
            type="date"
            :editable="false"
            format="yyyy-MM-dd"
            placeholder="选择日期"
            :picker-options="pickerOptions"
            @change="startDateChange">
          </el-date-picker>
        </el-form-item>
         <el-form-item label="至">
          <el-date-picker
            v-model="filter.endDate"
            type="date"
            :editable="false"
            placeholder="选择日期"
            :picker-options="pickerOptions"
            @change="endDateChange">
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="getOrderList">查询</el-button>
        </el-form-item>
      </el-form>
    </el-row>
    <el-table :data="orderList" border highlight-current-row v-loading="loading">
      <el-table-column prop="orderId" label="订单号"  width="100" ></el-table-column>
      <el-table-column prop="wareId" label="产品ID"  width="100" ></el-table-column>
      <el-table-column prop="wareName" label="产品名称"></el-table-column>
      <el-table-column prop="orderStatus" label="订单状态" width="100" :formatter="formatStatus"></el-table-column>
      <el-table-column prop="childCount" label="订单总人数"  width="120" ></el-table-column>
      <el-table-column prop="dateDepart" label="出发日期"  width="140" ></el-table-column>
      <el-table-column prop="adultPrice" label="成人价"  width="100" ></el-table-column>
      <el-table-column label="操作" width="160">
        <template scope="scope">
          <el-button type="primary" size="small">支付</el-button>
          <el-button size="small">查看</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-row class="toolbar">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="pageNo"
        :page-size="pageSize"
        :page-sizes="[10, 20, 30, 40]"
        layout="total, sizes, prev, next, pager, jumper"
        :total="total">
      </el-pagination>
    </el-row>
  </section>
</template>
<script>
  import { readOrderList } from '@/api'
  export default {
    data() {
      return {
        loading: false,
        filter: {
          orderCode: '',
          wareName: '',
          startDate: '',
          endDate: ''
        },
        pageNo: 1,
        pageSize: 10,
        total: 0,
        pickerOptions: {
          shortcuts: [{
            text: '今天',
            onClick(picker) {
              picker.$emit('pick', new Date());
            }
          }, {
            text: '昨天',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              picker.$emit('pick', date);
            }
          }, {
            text: '一周之前',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', date);
            }
          }, {
            text: '一周之后',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() + 3600 * 1000 * 24 * 7);
              picker.$emit('pick', date);
            }
          }]
        },
        orderList: [{
          orderId: '1001',
          wareId: '0001',
          wareName: '产品1',
          orderStatus: 1,
          orderTotal: 20,
          date: '2017-06-10',
          adultPrice: '12000'
        }]
      }
    },
    methods: {
      formatStatus (row) {
        return row.status === 2 ? '待确认' : '未知'
      },
      startDateChange (val) {
        this.filter.startDate = val;
      },
      endDateChange (val) {
        this.filter.endDate = val;
      },
      handleSizeChange (val) {
        this.pageSize = val;
        this.getOrderList()
      },
      handleCurrentChange (val) {
        this.pageNo = val;
        this.getOrderList()
      },
      // 订单列表
      getOrderList() {
        if (this.filter.startDate > this.filter.endDate) {
          this.$notify.error({
            title: '提示',
            message: '起始时间不得大于截止时间'
          })
          return false;
        }
        let params = {
          pageNo: this.pageNo,
          pageSize: this.pageSize,
          orderCode: this.filter.orderCode,
          wareName: this.filter.wareName,
          startDate: this.filter.startDate,
          endDate: this.filter.endDate,
          status: 2
        }
        console.log(params)
        this.loading = true
        readOrderList(params).then(res => {
          console.log(res)
          if(res.data.code === '0001') {
            this.orderList = res.data.result.orderList;
            this.total = res.data.result.pageInfo.count;
          } else {
            this.$message.error(res.data.message)
          }
          this.loading = false
        }).catch(err => {
          console.log(err)
          this.catchError(err.response)
          this.loading = false
        })
      },
    },
    mounted () {
      this.getOrderList()
    }
  }
</script>
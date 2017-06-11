<template>
  <section>
    <el-row class="toolbar">
    	<el-form :inline="true" :model="form">
        <el-form-item label="订单号：">
          <el-input v-model="form.user" placeholder="订单号"></el-input>
        </el-form-item>
        <el-form-item label="订单名称：">
          <el-input v-model="form.user" placeholder="订单名称"></el-input>
        </el-form-item>
        <el-form-item label="出发日期：">
          <el-date-picker
            v-model="value2"
            align="right"
            type="date"
            placeholder="选择日期"
            :picker-options="pickerOptions1">
          </el-date-picker>
        </el-form-item>
         <el-form-item label="至">
          <el-date-picker
            v-model="value2"
            align="right"
            type="date"
            placeholder="选择日期"
            :picker-options="pickerOptions1">
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">查询</el-button>
        </el-form-item>
      </el-form>
    </el-row>
    <el-table :data="order" border highlight-current-row>
      <el-table-column prop="orderId" label="订单号"></el-table-column>
      <el-table-column prop="wareId" label="产品ID"></el-table-column>
      <el-table-column prop="wareName" label="产品名称"></el-table-column>
      <el-table-column prop="orderStatus" label="订单状态"></el-table-column>
      <el-table-column prop="orderTotal" label="订单总人数"></el-table-column>
      <el-table-column prop="date" label="出发日期"></el-table-column>
      <el-table-column prop="adultPrice" label="成人底价"></el-table-column>
      <el-table-column label="操作" width="200">
        <template scope="scope">
          <el-button type="primary" size="small">确认</el-button>
          <el-button size="small">查看</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-row class="toolbar">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="10"
        layout="total, sizes, prev, next, pager, jumper"
        :total="50">
      </el-pagination>
    </el-row>
  </section>
</template>
<script>
  export default {
    data() {
      return {
        form: {
          user: '',
          region: ''
        },
        currentPage: 1,
        pickerOptions1: {
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
            text: '一周前',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', date);
            }
          }]
        },
        value1: '',
        value2: '',
        order: [{
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
      onSubmit() {
        console.log('submit!');
      },
      handleSizeChange () {

      },
      handleCurrentChange () {

      }
    }
  }
</script>
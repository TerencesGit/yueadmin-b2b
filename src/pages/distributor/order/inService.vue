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
            <el-radio-group v-model="filter.status" @change="statusChange">
                <el-radio-button :label="4">待发团</el-radio-button>
                <el-radio-button :label="5">已发团</el-radio-button>
                <el-radio-button :label="6">已回团</el-radio-button>
            </el-radio-group>
        </el-row>
		<el-table :data="orderList" border style="width: 100%" v-loading="loading">
    	    <el-table-column prop="orderCode" label="订单编号"  width="180" ></el-table-column>
            <el-table-column prop="wareId" label="产品编号"  width="100" ></el-table-column>
            <el-table-column prop="wareName" label="产品名称"></el-table-column>
            <el-table-column prop="status" label="订单状态" width="100" :formatter="formatStatus"></el-table-column>
            <el-table-column label="订单总人数"  width="120" >
          		<template scope="scope">
    		    	{{parseInt(scope.row.adultCount != "" ? scope.row.adultCount:0) + parseInt(scope.row.childCount != "" ? scope.row.childCount:0)}}
    		    </template>
            </el-table-column> 
	        <el-table-column prop="dateDepart" label="出发日期"  width="140" ></el-table-column>
            <el-table-column prop="adultPrice" label="成人底价"  width="100" ></el-table-column>
            <el-table-column label="操作" width="200">
                <template scope="scope">
                    <el-button size="small" @click="switchBill(scope.$index,scope.row)" v-if="scope.row.status==4">改单</el-button>
                    <el-button size="small" @click="refund(scope.$index,scope.row)" v-if="scope.row.status==4">退款</el-button>
                    <el-button size="small" @click="handleCheck(scope.$index, scope.row)">查看</el-button>
                </template>
            </el-table-column>
		</el-table>
    <!-- 改单弹窗 -->
        <el-dialog title="改单" :visible.sync="dialogVisible1" size="tiny">
            <el-form :model="changeForm" :rules="changeRules" ref="changeForm" label-width="10px">
                <el-form-item prop="changeInfo">
                    <el-input type="textarea" v-model="changeForm.changeInfo" placeholder="请输入改单原因" :rows="5"></el-input> 
                </el-form-item>
            </el-form>      
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="switchBillSubmit('changeForm')">提交</el-button>
                <el-button @click="dialogVisible1 = false">取 消</el-button>
            </div>
        </el-dialog>
    <!-- 退款弹窗 -->
        <el-dialog title="退款" :visible.sync="dialogVisible2" size="tiny">
            <el-form :model="refundForm" :rules="refundRules" ref="refundForm" label-width="10px">
                <el-form-item prop="cancelReason">      
                    <el-input type="textarea" v-model="refundForm.cancelReason" placeholder="请输入退款原因" :rows="5"></el-input> 
                </el-form-item>
            </el-form>      
        <div slot="footer" class="dialog-footer">
            <el-button type="primary" @click="refundSubmit('refundForm')">提交</el-button>
            <el-button @click="dialogVisible2 = false">取 消</el-button>
        </div>
        </el-dialog>
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
    import { readOrderList, switchBill, orderCancel } from '@/api'
    export default {
        data() {
            return {
                loading: false,
                dialogVisible1:false,
                dialogVisible2:false,
                id:'',
                changeForm:{
                    changeInfo:''
                },
                refundForm:{
                    cancelReason:''
                }, 
                changeRules:{
                    changeInfo:[
                        { required: true, message: '请输入改单原因', trigger: 'blur' }
                    ]
                },
                refundRules:{
                    cancelReason:[
                        { required: true, message: '请输入退款原因', trigger: 'blur' }
                    ]
                },  
                filter: {
                  orderCode: '',
                  wareName: '',
                  startDate: '',
                  endDate: '',
                  status: 4
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
                        text: '一周前',
                        onClick(picker) {
                          const date = new Date();
                          date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
                          picker.$emit('pick', date);
                        }
                    }, {
                        text: '一月前',
                        onClick(picker) {
                          const date = new Date();
                          date.setTime(date.getTime() - 3600 * 1000 * 24 * 30);
                          picker.$emit('pick', date);
                        }
                    }]
                },
                orderList: [{
                  orderId: '1001',
                  wareId: '0001',
                  wareName: '产品1',
                  status: 4,
                  orderTotal: 20,
                  date: '2017-06-10',
                  adultPrice: '12000',
                  adultCount: 1,
                  childCount:''
                }]
            }
        },
        methods: {
            formatStatus (row) {
      	        switch (row.status) {
              		case 0:
                    return '已取消'
                    break;
                  case 1:
                    return '下单成功'
                    break;
                  case 2:
                    return '待支付'
                    break;
                  case 4:
                    return '待发团'
                    break;
                  case 5:
                    return '已发团'
                    break;
                  case 6:
                    return '已回团'
                    break;
                  case 7:
                    return '结算中'
                    break;
                  case 8:
                    return '已结算'
                    break;
                  case 9:
                    return '已完成'
                    break;
                  case 10:
                    return '已退款'
                    break;
                  default:
                   return '未知'
                   break;
      	        }
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
            statusChange (val) {
    	        this.getOrderList()
    	    },
  	        handleCheck (index,row) {
        		this.$router.push({
        			path:'/distributor/order/orderDetail',
        			query: { orderId: row.orderId }
        		})
	        },
            switchBill(index,row){
                this.changeForm.changeInfo = "";
                this.dialogVisible1 = true;
                this.id = row.orderId;
            },
            refund(index,row){
                this.refundForm.cancelReason = "";
                this.dialogVisible2 = true;
                this.id = row.orderId;
            },
            switchBillSubmit(changeForm){     
                //提交改单接口        
                this.$refs[changeForm].validate((valid) => {
                    if (valid) {
                        var data = {
                          oldOrderId: this.id,
                          changeInfo: this.changeForm.changeInfo
                        }
                        console.log(data);
                        switchBill(data).then((res) => {
                            console.log(res)
                            if(res.data.code === '0001') {
                             this.$message({
                                message: '改单申请提交成功',
                                type: 'success'
                              });
                             this.getOrderList();
                            } else {
                              this.$message.error(res.data.message)
                            }              
                        }).catch((err)=>{
                            console.log(err);
                            this.$catchError(err)
                        });
                        this.dialogVisible1 = false;
                    }else {
                        console.log('error submit!!');
                        return false;
                    }
                });   
            },
            refundSubmit(refundForm){
                //提交退款接口
                this.$refs[refundForm].validate((valid) => {
                    if (valid) {
                        var data = {
                            orderId: this.id,
                            cancelReason: this.refundForm.cancelReason
                        }
                        console.log(data);
                        orderCancel(data).then((res) => {
                            console.log(res)
                            if(res.data.code === '0001') {
                                this.$message({
                                    message: '退款申请提交成功',
                                    type: 'success'
                                });
                                this.getOrderList();
                            } else {
                                this.$message.error(res.data.message)
                            }    
                        }).catch((err)=>{
                            console.log(err)
                            this.$catchError(err)
                        });
                        this.dialogVisible2 = false;
                    }else {
                        console.log('error submit!!');
                        return false;
                    }
                })
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
                    status: this.filter.status
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
                    this.$catchError(err)
                    this.loading = false
                })
            },
        },
        mounted () {
            this.getOrderList()
        }
    }
</script>

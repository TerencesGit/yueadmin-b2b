<template>
	<section>
    <el-row class="m-t m-b">
      <el-button type="success" @click="verifyPass">通过</el-button>
      <el-button type="warning" @click="verifyVisible = true">驳回</el-button>
    </el-row>
    <el-tabs type="border-card">
      <el-tab-pane>
        <span slot="label"><i class="el-icon-date"></i> 基本信息</span>
        <el-row>
          <el-col :span="8">
            <ul class="detail-list">
              <li>
                <label>商品名称：</label>
                <span>{{wareForm.wareName}}</span>
              </li>
              <li>
                <label>商品品牌：</label>
                <span>{{wareForm.brandId}}</span>
              </li> 
              <li>
                <label>商品缩略名：</label>
                <span>{{wareForm.briefName}}</span>
              </li>
              <li>
                <label>商品关键字：</label>
                <span>{{wareForm.keyWords}}</span>
              </li>
            </ul>
          </el-col>
          <el-col :span="8">
            <ul class="detail-list">
              <li>
                <label>出发城市：</label>
                <span>{{wareForm.srcCityName}}</span>
              </li>
              <li>
                <label>目的城市：</label>
                <span>{{wareForm.dstCityName}}</span>
              </li>
              <li>
                <label>起售时间：</label>
                <span>{{wareForm.openDate | DateTimeFormat}}</span>
              </li>
              <li>
                <label>停售时间：</label>
                <span>{{wareForm.closeDate | DateTimeFormat}}</span>
              </li>
            </ul>
          </el-col>
          <el-col :span="8">
            <ul class="detail-list label-control">
              <li>
                <label>行程天数：</label>
                <span>{{wareForm.tripDays}}天</span>
              </li>
              <li>
                <label>建议售价：</label>
                <span>{{wareForm.suggestedPrice | currency}}</span>
              </li>
              <li>
                <label>至少提前多少天购买：</label>
                <span>{{wareForm.sellPreDays}}天</span>
              </li>
              <li>
                <label>无订金订单占位时长：</label>
                <span>{{wareForm.nocashReserveMinute / 60}}小时</span>
              </li>
            </ul>
          </el-col>  
        </el-row>
        <el-row>
          <h3>推荐概述</h3>
          <div v-html="" style="margin: 15px">推荐概述</div>
        </el-row>
      </el-tab-pane>
      <el-tab-pane>
        <span slot="label"><i class="fa fa-cab"></i> 行程介绍</span>
        <ul class="trip-content">
          <li v-for="num in wareInfo.tripDays" :key="num">
            <el-card class="trip-day">
              <h4>第{{num}}天</h4>
              <ul class="trip-list">
                <li>
                  <table class="table">
                    <thead>
                      <th>行程时间</th>
                      <th>行程标题</th>
                      <th>行程类型</th>
                      <th>行程时长</th>
                      <th>行程明细</th>
                      <th>是否免费</th>
                    </thead>
                    <tbody>
                      <tr v-for="item in tripList" v-if="item.tripDayNum === num">
                        <td>{{item.programTime | TimeFormat}}</td>
                        <td>{{item.programTitle}}</td>
                        <td>{{item.programType}}</td>
                        <td>{{item.programIsFree}}</td>
                        <td>{{item.programDetail}}</td>
                        <td>{{item.programIsFree}}</td>
                      </tr>
                    </tbody>
                  </table>
                  <div class="trip-detail clearfix">
                    <!-- <p class="pull-left">
                      <span v-if="item.programType == 1"><i class="fa fa-plane"></i></span>
                      <span v-else-if="item.programType == 2"><i class="fa fa-car"></i></span>
                      <span v-else-if="item.programType == 10"><i class="fa fa-hotel"></i></span>
                      <span v-else-if="item.programType == 20"><i class="fa fa-binoculars"></i></span>
                      <span v-else-if="item.programType == 30"><i class="fa fa-cutlery"></i></span>
                      <span v-else-if="item.programType == 31"><i class="fa fa-cutlery"></i></span>
                      <span v-else-if="item.programType == 32"><i class="fa fa-coffee"></i></span>
                      <span v-else-if="item.programType == 33"><i class="fa fa-cutlery"></i></span>
                      <span v-else-if="item.programType == 34"><i class="fa fa-cutlery"></i></span>
                      <span v-else-if="item.programType == 40"><i class="fa fa-shopping-bag"></i></span>
                      <span v-else-if="item.programType == 50"><i class="fa fa-child"></i></span>
                      <span v-else-if="item.programType == 60"><i class="fa fa-bell"></i></span>
                      <span v-else>&nbsp;</span>
                      <span>{{item.programTime | TimeFormat}}</span>
                      <span>{{item.programTitle}}</span>
                      <span>{{item.programDetail}}</span>
                    </p> -->
                    <!-- <p class="pull-right">
                      <i class="fa fa-edit" @click="handleEdit(item)"></i>
                      <i class="fa fa-trash" @click="handleDelete(item)"></i>
                    </p> -->
                  </div>
                </li>
              </ul>
            </el-card>
          </li>
        </ul>
      </el-tab-pane>
      <el-tab-pane label="">
        <span slot="label"><i class="fa fa-image"></i> 多媒体</span>
        <el-table 
          border
          :data="mediaList" 
          highlight-current-row
          style="width: 100%"> 
          <el-table-column type="index" width="60"></el-table-column>
          <el-table-column label="图片缩略图" width="120">
            <template scope="scope">
              <img :src="scope.row.filePath" height="50px" class="cell-img" @click="viewImage(scope.row.filePath)">
            </template>
          </el-table-column>
          <el-table-column label="更新者" prop="createName" width="150"></el-table-column>
          <el-table-column label="更新时间" prop="createTime" :formatter="formatCreateTime" sortable></el-table-column>
          <el-table-column label="是否为主图" prop="isMainPic" width="120" :formatter="formatIsMainPic"></el-table-column>
          <el-table-column label="是否显示" width="120">
            <template scope="scope">
              <el-switch
                v-model="scope.row.status"
                on-color="#13ce66"
                off-color="#ff4949"
                on-text="是"
                off-text="否"
                :on-value="1"
                :off-value="0">
              </el-switch>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="费用/预定限制">
        <span slot="label"><i class="fa fa-money"></i> 费用/预定限制</span>
        定时任务补偿
      </el-tab-pane>
      <el-tab-pane label="价格库存">定时任务补偿</el-tab-pane>
      <el-tab-pane label="附加服务">定时任务补偿</el-tab-pane>
      <el-tab-pane label="推荐活动">定时任务补偿</el-tab-pane>
      <el-tab-pane label="多行程维护">定时任务补偿</el-tab-pane>
    </el-tabs>
    <el-dialog v-model="verifyVisible" title="驳回原因">
      <el-form :model="verifyForm" ref="verifyForm" :rules="rules">
        <el-form-item label="" prop="verifyInfo">
          <el-input v-model="verifyForm.verifyInfo" type="textarea" :rows="4" placeholder="填写驳回原因"></el-input>
        </el-form-item>
        <el-form-item label="" class="text-right">
          <el-button type="primary" @click="verifyFail">确定</el-button>
          <el-button @click="verifyVisible = false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <el-dialog v-model="previewVisible" size="tiny">
      <img width="100%" :src="previewImgUrl">
    </el-dialog>
	</section>
</template>
<script>
  import { readBrandList, saveWareInfo, readWareInfo, readTripDetailList, getWareFileList, verifyWareInfo } from '@/api'
	export default {
    data () {
      return {
        activeName: 'second',
        previewImgUrl: '',
        previewVisible: false,
      	wareBrands: [],
      	brandList: [],
        wareForm: {
          wareId: 0,
        	wareName: '巴厘岛蜜月旅拍婚纱摄影6天4晚游',
          keyWords: '巴厘岛,蜜月,旅拍',
          openDate: new Date(),
          closeDate:  new Date(),
          srcCityCode: '110000',
          dstCityCode: '310000',
          wareDesc: '巴厘岛蜜月旅拍婚纱摄影6天4晚游,巴厘岛蜜月旅拍婚纱摄影6天4晚游',
          briefName: '巴厘岛蜜月旅拍',
          brandId: 100001,
          tripDays: 3,
          sellPreDays: 7,
          nocashReserveMinute: 12,
          suggestedPrice: 8999,
          srcCityName: '请选择城市',
          dstCityName: '请选择城市',
        },
        wareInfo: {
          wareId: 100001,
          wareName: '泰国曼谷+普吉岛7日5晚半自助游直飞随心DIY+3晚海边酒店+双体游艇',
          tripDays: 5
        },
        tripList: [
          { 
            tripDayNum: 1, 
            programTime: new Date(),
            programTitle: '早餐',
            programType: 33,
            programDuration: 1,
            programIsFree: 1,
            programDetail: '普吉岛7日5晚半自助游直飞随心DIY普吉岛7日5晚半自助游直飞随心DIY普吉岛7日5晚半自助游直飞随心DIY'
          }, 
          {tripDayNum: 1, programType: 1, programTime: new Date(), programTitle: '旅行'},
        ],
        mediaList: [{
          fileId: 1,
          filePath: 'https://avatars0.githubusercontent.com/u/26806103?v=3&s=460',
          status: 1,
          isMainPic: 0,
          createTime: new Date(),
          createName: '上传者'
        },{
          fileId: 2,
          filePath: 'https://avatars0.githubusercontent.com/u/26806103?v=3&s=460',
          status: 1,
          isMainPic: 0,
          createName: '上传者',
          createTime: new Date(),
        }],
        verifyVisible: false,
        verifyForm: {
          wareId: '',
          verifyStatus: '',
          verifyInfo: '',
        },
        rules: {
          verifyInfo: [
            { required: true, message: '请填写驳回原因', trigger: 'blur' },
            { minlength: 10, message: '驳回原因不少于10个字符', trigger: 'blur' },
          ]
        }
      };
    },
    methods: {
    	updateData (content) {
    		this.wareForm.wareDesc = content
    	},
      handleClick(tab, event) {
        console.log(tab, event);
      },
      formatIsMainPic (row, column) {
        return row.isMainPic === 1 ? '是' : '否'
      },
      formatCreateTime (row, column) {
        return this.$moment(row.createTime).format('YYYY-MM-DD HH:mm:ss')
      },
      viewImage (filePath) {
        this.previewImgUrl = filePath;
        this.previewVisible = true;
      },
      // 获取商品详情
      getWareDetail (id) {
        readWareInfo({wareId: id}).then(res => {
          console.log(res)
          if(res.data.code === '0001') {
            let wareInfo = res.data.result.wareInfo
            wareInfo.openDate = new Date(wareInfo.openDate)
            wareInfo.closeDate = new Date(wareInfo.closeDate)
            this.wareForm = res.data.result.wareInfo
            console.log(this.wareForm)
          } else {
            this.$message.error(res.data.message)
          }
        }).catch(err => {
          console.log(err)
          this.catchError(err.response)
        })
        readTripDetailList({wareId: id}).then(res => {
          console.log(res)
          if( res.data.code === '0001') {
            this.tripList = res.data.result.tripDetailList
          } else {
            console.log(res.data.message)
          }
        }).catch(err => {
          console.log(err)
        })
        getWareFileList({wareId: id}).then(res => {
          console.log(res)
          if( res.data.code === '0001') {
            this.mediaList = res.data.result.fileList
            this.mediaList.forEach((media) => {
              media.filePath = 'http://192.168.199.211:8080' + media.filePath
            })
          } else {
            console.log(res.data.message)
          }
        }).catch(err => {
          console.log(err)
        })
      },
    	// 获取品牌列表
    	getWareBrandList () {
    		let brandList = [
    			{brandId: 100001, brandName: '商品品牌1'},
    			{brandId: 100002, brandName: '商品品牌2'},
    			{brandId: 100003, brandName: '商品品牌3'},
    			{brandId: 100004, brandName: '商品品牌4'}
    		]
    		readBrandList()
    		.then(res => {
    			if (res.data.code === '0001') {
    				this.wareBrands = res.data.result.brandInfo
    			} else {
    				this.$message.error(res.data.message)
    			}
    		})
    		.catch((err) => {
    			this.wareBrands = brandList
    			this.$message.error(this.GLOBAL.resError)
    		})
    	},
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      srcCityChange (code) {
      	this.wareForm.srcCityCode = code
      },
      dstCityChange (code) {
      	this.wareForm.dstCityCode = code
      },
      submitForm() {
        this.$refs.wareForm.validate((valid) => {
        	let form = Object.assign({}, this.wareForm)
          console.log(form)
          if (valid) {
          	let data = Object.assign({}, this.wareForm)
            console.log(data)
            data.openDate = this.$moment(data.openDate).format('YYYY-MM-DD HH:mm:ss')
            data.closeDate = this.$moment(data.closeDate).format('YYYY-MM-DD HH:mm:ss')
            data.nocashReserveMinute = data.nocashReserveMinute * 60
            saveWareInfo(JSON.stringify(data))
            .then(res => {
            	console.log(res)
            	if (res.data.code === '0001') {
                let wareId = res.data.result.wareId;
                console.log(wareId)
                this.$router.push({
                  path: 'tourItinerary?wareId=' + wareId
                })
            	} else {
            		this.$message.error(res.data.message)
            	}
            })
            .catch(err => {
            	console.log(err)
              this.catchError(err.response)
            })
          } else {
          	this.$message.error('表单输入有误')
            return false;
          }
        })
      },
      // 审核通过
      verifyPass () {
        this.$confirm('确定该商品通过审核', '提示', {type: 'warning'}).then(() => {
          let data = {
            wareId: this.verifyForm.wareId,
            verifyStatus: 1
          }
          console.log(data)
          verifyWareInfo(data).then(res => {
            console.log(res)
            if(res.data.code === '0001') {
              this.$message.success(res.data.message)
              this.$route.back()
            } else {
              this.$message.error('取消操作')
            }
          }).catch(err => {
            console.log(err)
          })
          this.$router.back()
        }).catch(() => {
          this.$message('取消操作')
        })
      },
      // 审核不通过
      verifyFail () {
        this.$refs.verifyForm.validate((valid) => {
          if(valid) {
            let data = {
              wareId: this.verifyForm.wareId,
              verifyStatus: 2,
              verifyInfo: this.verifyForm.verifyInfo
            }
            console.log(data)
            // verifyWareInfo(data).then(res => {
            //   console.log(res)
            // })
            this.verifyVisible = false
            this.$refs.verifyForm.resetFields()
          } else{
            console.log('error')
          }
        })
      }
    },
    mounted () {
    	this.getWareBrandList()
    	this.$store.dispatch('setStepActive', 1)
      let wareId = this.$route.query.id;
      this.verifyForm.wareId = wareId * 1
      wareId && this.getWareDetail(wareId)
    }
  }
</script>
<style scoped lang="scss">
  .el-card {
    margin: 15px;
  }
  .detail-list {
    margin-left: 15px;
    li {
      margin: 15px 0;
      label {
        display: inline-block;
        width: 100px
      }
    }
    &.label-control {
      label {
        width: 160px
      }
    }
  }
  .trip-list {
    margin-top: 15px
  }
  .table {
    border: 1px solid #dfe6ec;
  }
  .table th, .table td {
    height: 40px;
    padding: 5px 15px;
    font-size: 14px;
    text-align: left;
    border-right: 1px solid #dfe6ec;
  }
  .table th {
    background: #eef1f6;
    border-bottom: 1px solid #dfe6ec;
  }
  .table td {
    border-bottom: 1px solid #dfe6ec;
  }
</style>

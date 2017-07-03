<template>
	<section>
    <el-row class="toolbar">
      <el-button type="success" @click="verifyPass">设置价格</el-button>
      <el-button type="success" @click="verifyPass">通过</el-button>
      <el-button type="warning" @click="verifyVisible = true">驳回</el-button>
    </el-row>
    <el-tabs type="border-card">
      <el-tab-pane label="基本信息">
        <span slot="label"><i class="el-icon-date"></i> 基本信息</span>
        <el-row>
          <el-col :span="8">
            <ul class="detail-list">
              <li>
                <label>商品名称：</label>
                <span>{{wareInfo.wareName}}</span>
              </li>
              <li>
                <label>商品品牌：</label>
                <span>{{wareInfo.brandId}}</span>
              </li> 
              <li>
                <label>商品缩略名：</label>
                <span>{{wareInfo.briefName}}</span>
              </li>
              <li>
                <label>商品关键字：</label>
                <span>{{wareInfo.keyWords}}</span>
              </li>
            </ul>
          </el-col>
          <el-col :span="8">
            <ul class="detail-list">
              <li>
                <label>出发城市：</label>
                <span>{{wareInfo.srcCityName}}</span>
              </li>
              <li>
                <label>目的城市：</label>
                <span>{{wareInfo.dstCityName}}</span>
              </li>
              <li>
                <label>起售时间：</label>
                <span>{{wareInfo.openDate | DateTimeFormat}}</span>
              </li>
              <li>
                <label>停售时间：</label>
                <span>{{wareInfo.closeDate | DateTimeFormat}}</span>
              </li>
            </ul>
          </el-col>
          <el-col :span="8">
            <ul class="detail-list label-control">
              <li>
                <label>行程天数：</label>
                <span>{{wareInfo.tripDays}}天</span>
              </li>
              <li>
                <label>建议售价：</label>
                <span>{{wareInfo.suggestedPrice | currency}}</span>
              </li>
              <li>
                <label>至少提前多少天购买：</label>
                <span>{{wareInfo.sellPreDays}}天</span>
              </li>
              <li>
                <label>无订金订单占位时长：</label>
                <span>{{wareInfo.nocashReserveMinute / 60}}小时</span>
              </li>
            </ul>
          </el-col>  
        </el-row>
        <el-row>
          <h3>推荐概述</h3>
          <div v-html="" style="margin: 15px">{{wareInfo.wareDesc}}</div>
        </el-row>
      </el-tab-pane>
      <el-tab-pane label="行程介绍">
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
                      <th>行程时长（分钟）</th>
                      <th>行程明细</th>
                      <th>是否免费</th>
                    </thead>
                    <tbody>
                      <tr v-for="item in tripList" v-if="item.tripDayNum === num && item.id">
                        <td>{{item.programTime | TimeFormat}}</td>
                        <td>{{item.programTitle}}</td>
                        <td>{{item.programType}}</td>
                        <td>{{item.programDuration}}</td>
                        <td>{{item.programDetail}}</td>
                        <td>{{item.programIsFree === 0 ? '是' : '否'}}</td>
                      </tr>
                      <tr v-else>
                        <td colspan="6" style="text-align: center; padding: 15px">暂无内容</td>
                      </tr>
                    </tbody>
                  </table>
                </li>
              </ul>
            </el-card>
          </li>
        </ul>
      </el-tab-pane>
      <el-tab-pane label="多媒体">
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
          <el-table-column label="是否显示" prop="status" width="120" :formatter="formatStatus"></el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="费用/预定限制">
        <span slot="label"><i class="fa fa-money"></i> 费用/预定限制</span>
        费用/预定限制
      </el-tab-pane>
      <el-tab-pane label="价格库存">
        <full-calendar 
          :events="skuList" 
          first-day='0' 
          @changeMonth="changeMonth">
        </full-calendar>
      </el-tab-pane>
      <el-tab-pane label="附加服务">
        <el-table :data="serviceList" border highlight-current-row>
          <el-table-column type="index"></el-table-column>
          <el-table-column prop="wareCode" label="服务ID" width="180px"></el-table-column>
          <el-table-column prop="wareName" label="服务名称"></el-table-column>
          <el-table-column prop="wareDesc" label="服务描述"></el-table-column>
          <el-table-column prop="status" label="状态" width="100px"></el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="推荐活动">
        <el-table :data="activityList" border highlight-current-row>
          <el-table-column type="index"></el-table-column>
          <el-table-column prop="wareCode" label="活动ID" width="180px"></el-table-column>
          <el-table-column prop="wareName" label="活动名称"></el-table-column>
          <el-table-column prop="wareDesc" label="活动描述"></el-table-column>
          <el-table-column prop="status" label="状态" width="100px"></el-table-column>
        </el-table>
      </el-tab-pane>
    </el-tabs>
    <!-- 设置价格 -->
    <el-dialog v-model="setPriceVisible" title="设置五级价格">
      <el-form :model="setPriceForm" ref="setPriceForm" :rules="rules" label-width="240px" class="form-item-control">
        <el-form-item label="一级价格" prop="firstPrice" :rules="[
            { required: true, message: '请填写一级价格', trigger: 'blur' },
          ]">
          <el-input v-model="setPriceForm.firstPrice" placeholder="输入一级价格"></el-input>
        </el-form-item>
        <el-form-item label="二级价格" prop="secondPrice">
          <el-input v-model="setPriceForm.secondPrice" placeholder="输入二级价格"></el-input>
        </el-form-item>
        <el-form-item label="三级价格" prop="firstPrice">
          <el-input v-model="setPriceForm.firstPrice" placeholder="输入三级价格"></el-input>
        </el-form-item>
        <el-form-item label="四级价格" prop="fourthPrice">
          <el-input v-model="setPriceForm.firstPrice" placeholder="输入四级价格"></el-input>
        </el-form-item>
        <el-form-item label="五级价格" prop="fifthPrice">
          <el-input v-model="setPriceForm.firstPrice" placeholder="输入五级价格"></el-input>
        </el-form-item>
        <el-form-item label="" class="text-right">
          <el-button type="primary">确定</el-button>
          <el-button @click="setPriceVisible = false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <!-- 审核驳回 -->
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
    <!-- 图片预览 -->
    <el-dialog v-model="previewVisible" size="tiny">
      <img width="100%" :src="previewImgUrl">
    </el-dialog>
	</section>
</template>
<script>
  import { readWareInfo, readTripDetailList, readWareFileList, readSkuInfoList, readWareService, readWareActivity, verifyWareInfo } from '@/api'
	export default {
    data () {
      return {
        wareInfo: {},
        tripList: [],
        mediaList: [],
        skuList: [],
        fareInfo: {},
        serviceList: [],
        activityList: [],
        verifyForm: {
          wareId: '',
          verifyStatus: '',
          verifyInfo: '',
        },
        previewImgUrl: '',
        previewVisible: false,
        verifyVisible: false,
        rules: {
          verifyInfo: [
            { required: true, message: '请填写驳回原因', trigger: 'blur' },
            { minlength: 10, message: '驳回原因不少于10个字符', trigger: 'blur' },
          ],
          // firstPrice: [
          //   { required: true, message: '请填写一级价格', trigger: 'blur' },
          // ],
          secondPrice: [
            { required: true, message: '请填写二级价格', trigger: 'blur' },
          ],
        },
        setPriceVisible: false,
        setPriceForm: {
          firstPrice: '',
          secondPrice: '',
          thirdPrice: '',
          fourthPrice: '',
          fifthPrice: '',
        }
      };
    },
    methods: {
      handleClick(tab, event) {
        console.log(tab, event);
      },
      formatStatus (row) {
        return row.status === 1 ? '是' : '否'
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
            wareInfo.suggestedPrice = wareInfo.suggestedPrice / 100;
            this.wareInfo = wareInfo
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
        readWareFileList({wareId: id}).then(res => {
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
        readSkuInfoList({wareId: id}).then(res => {
          console.log(res)
          if(res.data.code === '0001') {
            this.skuList = res.data.result.skuList;
            this.skuList.forEach((data) => {
              data.start = data.skuDate
            })
          } else {
            this.$message.error(res.data.message)
          }
        }).catch(err => {
          console.log(err)
          this.catchError(err.response)
        })
        readWareService({parentId: id}).then(res => {
          console.log(res)
          if (res.data.code === '0001') {
            this.serviceList = res.data.result.wareServiceList;
          } else {
            this.$message.error(res.data.message)
          }
        }).catch(err => {
          console.log(err)
        })
        readWareActivity({parentId: id}).then(res => {
          console.log(res)
          if (res.data.code === '0001') {
            this.activityList = res.data.result.wareActivityList;
          } else {
            this.$message.error(res.data.message)
          }
        }).catch(err => {
          console.log(err)
        })
      },
      // 审核通过
      verifyPass () {
        this.setPriceVisible = true
        // this.$confirm('确定该商品通过审核', '提示', {type: 'warning'}).then(() => {
        //   let data = {
        //     wareId: this.verifyForm.wareId,
        //     verifyStatus: 1
        //   }
        //   console.log(data)
        //   verifyWareInfo(data).then(res => {
        //     console.log(res)
        //     if(res.data.code === '0001') {
        //       this.$message.success(res.data.message)
        //       this.$route.back()
        //     } else {
        //       this.$message.error('取消操作')
        //     }
        //   }).catch(err => {
        //     console.log(err)
        //   })
        //   this.$router.back()
        // }).catch(() => {
        //   this.$message('取消操作')
        // })
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
      },
      changeMonth (start, end, current) {
        // console.log(current.format())
      },
    },
    mounted () {
    	this.$store.dispatch('setStepActive', 1)
      let wareId = parseInt(this.$route.query.wareId);
      this.verifyForm.wareId = wareId;
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
</style>

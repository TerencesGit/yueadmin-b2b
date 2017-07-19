<template>
  <section>
    <!--  商品详情 -->
    <el-tabs type="border-card" class="m-t" @tab-click="handleClick" v-loading="loading">
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
                <span>{{wareInfo.brandName}}</span>
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
                <span>{{wareInfo.suggestedPrice | currency}}元</span>
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
          <div v-html="wareInfo.wareDesc" style="margin: 15px"></div>
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
                     <!--  <tr v-else>
                        <td colspan="6" style="text-align: center; padding: 15px">暂无内容</td>
                      </tr> -->
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
        <div class="pane-content">
          <el-card>
            <div slot="header" class="clearfix">
              <span class="title">商品介绍</span>
            </div>
            <div v-html="attributeInfo.introduce"></div>
          </el-card>
          <el-card>
            <div slot="header" class="clearfix">
              <span class="title">费用说明</span>
            </div>
            <div v-html="attributeInfo.charge"></div>
          </el-card>
          <el-card>
            <div slot="header" class="clearfix">
              <span class="title">使用说明</span>
            </div>
            <div v-html="attributeInfo.explains"></div>
          </el-card>
          <el-card>
            <div slot="header" class="clearfix">
              <span class="title">购买须知</span>
            </div>
            <div v-html="attributeInfo.notice"></div>
          </el-card>
        </div>
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
          <el-table-column label="详情" width="180px">
            <template scope="scope">
              <el-button type="primary" size="small" @click="showDetail(scope.row)">查看</el-button>
              <el-button type="primary" size="small" @click="showStorage(scope.row.wareId)">价格库存</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="推荐活动">
        <el-table :data="activityList" border highlight-current-row>
          <el-table-column type="index"></el-table-column>
          <el-table-column prop="wareCode" label="活动ID" width="180px"></el-table-column>
          <el-table-column prop="wareName" label="活动名称"></el-table-column>
          <el-table-column prop="wareDesc" label="活动描述"></el-table-column>
          <el-table-column label="详情" width="180px">
            <template scope="scope">
              <el-button type="primary" size="small" @click="showDetail(scope.row)">查看</el-button>
              <el-button type="primary" size="small" @click="showStorage(scope.row.wareId)">价格库存</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
    </el-tabs>
    <!-- 图片预览 -->
    <el-dialog :visible.sync="previewVisible" size="tiny">
      <img width="100%" :src="previewImgUrl">
    </el-dialog>
    <!-- 附属商品详情 -->
    <el-dialog :visible.sync="subInfoVisible" title="附加服务">
      <el-form :model="serviceInfo" label-width="120px">
          <el-row>
            <el-col :span="12">
              <el-form-item label="服务名称：">
                <span>{{serviceInfo.wareName}}</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="缩略名：">
                <span>{{serviceInfo.briefName}}</span>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="建议售价：">
                <span>{{serviceInfo.suggestedPrice}}</span>
              </el-form-item>
            </el-col> 
            <el-col :span="12">
              <el-form-item label="关键字：">
                <span>{{serviceInfo.keyWords}}</span>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-form-item label="服务描述：">
              <span>{{serviceInfo.wareDesc}}</span>
            </el-form-item>
          </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="subInfoVisible = false">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 附属商品sku查看 -->
    <el-dialog :visible.sync="storageVisible" size="large">
      <full-calendar 
        :events="subWareSkuList" 
        first-day='0'
        @changeMonth="changeMonth">
      </full-calendar>
    </el-dialog>
  </section>
</template>
<script>
  import { readWareInfo, readTripDetailList, readWareFileList, readAttribute, readSkuInfoList, readWareService, readWareActivity, verifyWareInfo} from '@/api'
  export default {
    data () {
      return {
        wareId: '',
        wareInfo: {},
        tripList: [],
        mediaList: [],
        skuList: [],
        attributeInfo: {},
        serviceList: [],
        serviceInfo: {},
        activityList: [],
        activityInfo: {},
        subWareSkuList: [],
        loading: false,
        previewImgUrl: '',
        previewVisible: false,
        storageVisible: false,
        subInfoVisible: false,
      };
    },
    methods: {
      formatStatus (row) {
        return row.status === 1 ? '是' : '否'
      },
      formatIsMainPic (row, column) {
        return row.isMainPic === 1 ? '是' : '否'
      },
      formatCreateTime (row, column) {
        return this.$moment(row.createTime).format('YYYY-MM-DD HH:mm:ss')
      },
      // 图片预览
      viewImage (filePath) {
        this.previewImgUrl = filePath;
        this.previewVisible = true;
      },
      // tab切换
      handleClick(tab, event) {
        this.loading = true
        if (tab.index == 0) {
          this.loading = false;
          return;
        }
        if (tab.index == 1) {
          // 行程介绍
          if (this.tripList.length !== 0) {
            this.loading = false;
          } else {
            readTripDetailList({wareId: this.wareId}).then(res => {
              console.log(res)
              if( res.data.code === '0001') {
                this.tripList = res.data.result.tripDetailList;
                this.tripList.forEach((trip) => {
                  switch (trip.programType) {
                    case 1:
                      trip.programType = '航班'
                      break;
                    case 2: 
                      trip.programType = '交通'
                      break;
                    case 10: 
                      trip.programType = '酒店'
                      break;
                    case 20: 
                      trip.programType = '景点'
                      break;
                    case 30: 
                      trip.programType = '早餐'
                      break;
                    case 31: 
                      trip.programType = '午餐'
                      break;
                    case 32: 
                      trip.programType = '下午茶'
                      break;
                    case 33: 
                      trip.programType = '晚餐'
                      break;
                    case 34: 
                      trip.programType = '宵夜'
                      break;
                    case 40: 
                      trip.programType = '购物'
                      break;
                    case 50: 
                      trip.programType = '自由活动'
                      break;
                    case 60: 
                      trip.programType = '主题活动'
                      break;
                    default:
                      trip.programType = '自定义'
                      break;
                  }
                })
              } else {
                console.log(res.data.message)
              }
              this.loading = false
            }).catch(err => {
              console.log(err)
              this.catchError(err.response)
              this.loading = false
            })
          }
        } else if (tab.index == 2) {
          // 多媒体
          if (this.mediaList.length !== 0) {
            this.loading = false;
          } else {
            readWareFileList({wareId: this.wareId}).then(res => {
              console.log(res)
              if( res.data.code === '0001') {
                this.mediaList = res.data.result.fileList
                this.mediaList.forEach((media) => {
                  media.filePath = 'http://192.168.199.211:8080' + media.filePath
                })
              } else {
                console.log(res.data.message)
              }
              this.loading = false
            }).catch(err => {
              console.log(err)
              this.catchError(err.response)
              this.loading = false
            })
          }
        } else if (tab.index == 3) {
          if (JSON.stringify(this.attributeInfo) !== "{}") {
            this.loading = false;
          } else {
            readAttribute({wareId: this.wareId}).then(res => {
              console.log(res)
              if (res.data.code === '0001') {
                this.attributeInfo = res.data.result.AttributeInfo
              } else {
                this.$message.error(res.data.message)
              }
            }).catch(err => {
              console.log(err)
            })
            this.loading = false;
          }
        } else if (tab.index == 4) {
          // 价格库存
          if (this.skuList.length !== 0) {
            this.loading = false;
          } else {
            readSkuInfoList({wareId: this.wareId}).then(res => {
              console.log(res)
              if(res.data.code === '0001') {
                this.skuList = res.data.result.skuList || [];
                this.skuList.forEach((data) => {
                  data.start = data.skuDate
                })
              } else {
                this.$message.error(res.data.message)
              }
              this.loading = false
            }).catch(err => {
              console.log(err)
              this.catchError(err.response)
              this.loading = false
            })
          }
        } else if (tab.index == 5) {
          // 附加服务
          if (this.serviceList.length !== 0) {
            this.loading = false;
          } else {
            readWareService({parentId: this.wareId}).then(res => {
              console.log(res)
              if (res.data.code === '0001') {
                this.serviceList = res.data.result.wareServiceList;
              } else {
                this.$message.error(res.data.message)
              }
              this.loading = false
            }).catch(err => {
              console.log(err)
              this.catchError(err.response)
              this.loading = false
            })
          }
        } else if (tab.index == 6) {
          // 推荐活动
          if (this.activityList.length !== 0) {
            this.loading = false;
          } else {
            readWareActivity({parentId: this.wareId}).then(res => {
              console.log(res)
              if (res.data.code === '0001') {
                this.activityList = res.data.result.wareActivityList;
              } else {
                this.$message.error(res.data.message)
              }
              this.loading = false
            }).catch(err => {
              console.log(err)
              this.catchError(err.response)
              this.loading = false
            }) 
          }
        } else {
          return false;
        }
      },
      // 获取商品信息
      getWareInfo () {
        this.loading = true;
        readWareInfo({wareId: this.wareId}).then(res => {
          console.log(res)
          if(res.data.code === '0001') {
            let wareInfo = res.data.result.wareInfo
            wareInfo.openDate = new Date(wareInfo.openDate)
            wareInfo.closeDate = new Date(wareInfo.closeDate)
            this.wareInfo = wareInfo
          } else {
            this.$message.error(res.data.message)
          }
          this.loading = false;
        }).catch(err => {
          this.loading = false;
          console.log(err)
          this.catchError(err.response)
        })
      },
      changeMonth (start, end, current) {
        // console.log(current.format())
      },
      // 附属商品详情查看
      showDetail (item) {
        this.serviceInfo = Object.assign({}, item)
        this.subInfoVisible = true
      },
      // 附属商品sku查看
      showStorage (wareId) {
        console.log(wareId)
        readSkuInfoList({wareId: wareId}).then(res => {
          console.log(res)
          if(res.data.code === '0001') {
            this.subWareSkuList = res.data.result.skuList || [];
            this.subWareSkuList.forEach((data) => {
              data.start = data.skuDate
            })
          } else {
            this.$message.error(res.data.message)
          }
        }).catch(err => {
          console.log(err)
          this.catchError(err.response)
        })
        this.storageVisible = true
        // this.$router.push({
        //   path: 'skuShow?wareId='+ wareId
        // })
      },
    },
    mounted () {
      this.wareId = parseInt(this.$route.query.wareId);
      this.wareId && this.getWareInfo()
    }
  }
</script>
<style scoped lang="scss">
  .el-card {
    margin: 15px;
    padding: 0
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

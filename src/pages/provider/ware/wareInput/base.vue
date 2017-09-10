<template>
  <section>
    <el-row>
      <el-col :span="20" :offset="2">
        <el-form :model="wareForm" :rules="rules" ref="wareForm" label-width="150px">
          <el-card class="input-width">
            <el-row>
              <el-col :span="12">
                <el-form-item label="行程天数" prop="tripDays" style="height: 36px">
                  <el-input-number v-model="wareForm.tripDays" :min="1" :max="30" style="width: 140px"></el-input-number>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="至少提前多少天购买" prop="sellPreDays" style="height: 36px">
                   <el-input-number v-model="wareForm.sellPreDays" :min="1" :max="45" style="width: 140px"></el-input-number>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="商品名称" prop="wareName">
                  <el-input v-model="wareForm.wareName" placeholder="商品名称"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="商品品牌" prop="brandId">
                  <el-select v-model="wareForm.brandId">
                    <el-option v-for="item in brandList" :label="item.brandName" :value="item.brandId" :key="item.brandId"></el-option>
                  </el-select> 
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="商品缩略名" prop="briefName">
                  <el-input v-model="wareForm.briefName" placeholder="商品缩略名"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="商品关键字" prop="keyWords">
                  <el-input v-model="wareForm.keyWords" placeholder="关键字以英文逗号分隔"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="起售时间" prop="openDate">
                  <el-date-picker
                    v-model="wareForm.openDate"
                    type="datetime"
                    placeholder="选择日期时间"
                    align="right"
                    :picker-options="pickerOptions">
                  </el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="停售时间" prop="closeDate">
                  <el-date-picker
                    v-model="wareForm.closeDate"
                    type="datetime"
                    placeholder="选择日期时间"
                    align="right"
                    :picker-options="pickerOptions">
                  </el-date-picker>
                </el-form-item>
              </el-col>
            </el-row> 
            <el-row>
              <el-col :span="12">
                <el-form-item label="出发城市" prop="srcCityCode">
                  <region-picker v-model="wareForm.srcCityCode" :cityName="wareForm.srcCityName" width="217" @change="srcCityChange"></region-picker>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="目的城市" prop="dstCityCode">
                  <region-picker v-model="wareForm.dstCityCode" :cityName="wareForm.dstCityName" width="217" @change="dstCityChange"></region-picker>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="建议售价" prop="suggestedPrice">
                  <el-input v-model.number="wareForm.suggestedPrice" placeholder="建议售价"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="无订金订单占位时长" prop="nocashReserveMinute">
                 <!--  <el-input v-model.number="wareForm.nocashReserveMinute" placeholder="单位：小时"></el-input> -->
                 <el-input-number v-model.number="wareForm.nocashReserveMinute" :min="0.5" :max="168" style="width: 140px"></el-input-number>
                </el-form-item>
              </el-col>
            </el-row>
            <el-form-item label="商品品类" prop="wareKind">
              <el-input v-model="wareKindName" placeholder="商品品类" @focus="wareKindVisible = true"></el-input>
            </el-form-item>
          </el-card>
          <el-card>
            <p class="m-b"><strong>推荐概述</strong><span style="margin-left: 15px; font-size: 14px">最多输入8000个字符</span></p>
            <el-form-item label="" label-width="0" prop="wareDesc">
              <vue-html5-editor :content="wareForm.wareDesc" :height="400" :z-index="1" @change="updateData"></vue-html5-editor>
            </el-form-item>
          </el-card>
          <el-form-item class="text-center">
            <el-button type="primary" @click="submitForm">保存</el-button>
            <back-button></back-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
    <el-dialog 
      title="商品品类" 
      :visible.sync="wareKindVisible">
      <el-tree
        :data="kindList"
        :props="defaultProps"
        node-key="id"
        ref="tree"
        accordion
        highlight-current
        @node-click="nodeClick"
        default-expand-all
        :expand-on-click-node="true">
      </el-tree>
      <div slot="footer">
        <el-button @click="wareKindVisible = false">取消</el-button>
        <el-button type="primary" @click="handleConfirm">确定</el-button>
      </div>
    </el-dialog>
  </section>
</template>
<script>
  import { readBrandList, readWareKind, saveWareInfo, readWareInfo } from '@/api'
  export default {
    data () {
      return {
        wareId: '',
        brandList: [],
        kindList: [{
          kindId: 10001,
          kindName: '一级 1',
          templetId: 10001,
          children: [{
            kindId: 20001,
            kindName: '二级 1-1',
            templetId: 10002,
            children: [{
              kindId: 30001,
              kindName: '三级 1-1-1',
              templetId: 10003,
            },
            {
              kindId: 30002,
              kindName: '三级 1-1-1',
              templetId: 10003,
            },
            {
              kindId: 30003,
              kindName: '三级 1-1-1',
              templetId: 10003,
            },
            {
              kindId: 30004,
              kindName: '三级 1-1-1',
              templetId: 10003,
            }]
          }]
        }],
        selectedKind: {},
        wareKindName: '',
        wareKindVisible: false,
        defaultProps: {
          children: 'children',
          label: 'kindName'
        },
        wareForm: {
          wareName: '',
          keyWords: '',
          openDate: '',
          closeDate:  '',
          srcCityCode: '',
          dstCityCode: '',
          wareDesc: '',
          briefName: '',
          brandId: '',
          tripDays: 1,
          sellPreDays: 7,
          nocashReserveMinute: 24,
          suggestedPrice: '',
          srcCityName: '请选择城市',
          dstCityName: '请选择城市',
          wareKind: ''
        },
        rules: {
          wareName: [
            {required: true, message: '请输入商品名称', trigger: 'blur'}
          ],
          wareKind: [
            {required: true, type: 'number', message: '请输入商品品类', trigger: 'change'}
          ],
          briefName: [
            {required: true, message: '请输入商品缩略名', trigger: 'blur'}
          ],
          keyWords: [
            {required: true, message: '请输入商品关键字', trigger: 'blur'}
          ],
          openDate: [
            { type: 'date', required: true, message: '请选择开售日期', trigger: 'change' }
          ],
          closeDate: [
            { type: 'date', required: true, message: '请选择停售时间', trigger: 'change' }
          ],
          srcCityCode: [
            {required: true, message: '请选择出发城市', trigger: 'change'}
          ],
          dstCityCode: [
            {required: true, message: '请选择目的城市', trigger: 'change'}
          ],
          brandId: [
            {type: 'number', required: true, message: '请选择商品品牌', trigger: 'change'}
          ],
          nocashReserveMinute: [
            {type: 'number', required: true, message: '请输入无订金订单占位时长', trigger: 'blur'}
          ],
          suggestedPrice: [
            {type: 'number', required: true, message: '请输入建议售价', trigger: 'blur'}
          ],
          tripDays: [
            {type: 'number', required: true, message: '请选择天数', trigger: 'change'}
          ],
          sellPreDays: [
            {type: 'number', required: true, message: '请选择天数', trigger: 'change'}
          ],
          wareDesc: [
            { required: true, message: '请填写推荐概述', trigger: 'blur'}
          ],
        },
        pickerOptions: {
          shortcuts: [{
            text: '今天',
            onClick(picker) {
              picker.$emit('pick', new Date());
            }
          }, {
            text: '明天',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() + 3600 * 1000 * 24);
              picker.$emit('pick', date);
            }
          }, {
            text: '一周后',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() + 3600 * 1000 * 24 * 7);
              picker.$emit('pick', date);
            }
          }, {
            text: '一月后',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() + 3600 * 1000 * 24 * 30);
              picker.$emit('pick', date);
            }
          }]
        },
      };
    },
    methods: {
      // 富文本编辑
      updateData (content) {
        this.wareForm.wareDesc = content
      },
      // 获取品牌列表
      getBrandList () {
        readBrandList({}).then(res => {
          console.log(res)
          if (res.data.code === '0001') {
            this.brandList = res.data.result.brandInfo
          } else {
            this.$message.error(res.data.message)
          }
       }).catch(err => {
          this.$catchError(err)
        })
      },
      // 获取品类列表
      // getWareKindList() {
      //   let params = {}
      //   readWareKind(params).then(res => {
      //     console.log(res)
      //     if (res.data.code === '0001') {
      //       this.$message.success(res.data.message)
      //       this.kindList = res.data.result.wareKindList;
      //     } else {
      //       this.$message.error(res.data.message)
      //     }
      //   }).catch(err => {
      //     console.log(err)
      //     this.$catchError(err)
      //   })
      // },
      nodeClick(data) {
        this.selectedKind = {
          kindId: data.kindId,
          kindName: data.kindName
        }
      },
      handleConfirm() {
        this.wareForm.wareKind = this.selectedKind.kindId
        this.wareKindName = this.selectedKind.kindName
        this.wareKindVisible = false
      },
      // 获取商品信息
      // getWareInfo () {
      //   readWareInfo({wareId: this.wareId}).then(res => {
      //     console.log(res)
      //     if(res.data.code === '0001') {
      //       let wareInfo = res.data.result.wareInfo
      //       wareInfo.openDate = new Date(wareInfo.openDate)
      //       wareInfo.closeDate = new Date(wareInfo.closeDate)
      //       wareInfo.srcCityCode = wareInfo.srcCityCode + ''
      //       wareInfo.dstCityCode = wareInfo.dstCityCode + ''
      //       wareInfo.nocashReserveMinute = wareInfo.nocashReserveMinute / 60
      //       this.wareForm = wareInfo
      //     } else {
      //       this.$message.error(res.data.message)
      //     }
      //   }).catch(err => {
      //     console.log(err)
      //     this.$catchError(err)
      //   })
      // },
      srcCityChange (code) {
        this.wareForm.srcCityCode = code
      },
      dstCityChange (code) {
        this.wareForm.dstCityCode = code
      },
      // 保存商品信息
      submitForm() {
        console.log(this.wareForm.wareId)
        this.$refs.wareForm.validate((valid) => {
          if (valid) {
            let data = Object.assign({}, this.wareForm)
            data.openDate = this.$moment(data.openDate).format('YYYY-MM-DD HH:mm:ss')
            data.closeDate = this.$moment(data.closeDate).format('YYYY-MM-DD HH:mm:ss')
            data.nocashReserveMinute = data.nocashReserveMinute * 60;
            console.log(data)
            saveWareInfo(data).then(res => {
              if (res.data.code === '0001') {
                let wareId = res.data.result.wareId;
                this.$message.success(res.data.message)
                this.$router.push(`trip?wareId=${wareId}`)
              } else {
                this.$message.error(res.data.message)
              }
            }).catch(err => {
              console.log(err)
              this.$catchError(err)
            })
          } else {
            this.$message.error('表单输入有误')
            return false;
          }
        })
      },
    },
    mounted () {
      this.$store.dispatch('setStepActive', 0)
      this.getBrandList()
    }
  }
</script>
<style scoped>
  .el-card {
    margin: 15px;
  }
  .el-card__body {
    padding: 30px;
  }
  .input-width .el-input {
    width: 217px;
  }
  .el-tree {
    max-height: 300px;
    overflow-y: auto;
  }
</style>

<template>
  <section>
    <div v-title :data-title="this.$route.name"></div>
    <el-row class="toolbar">
      <back-button></back-button>
    </el-row>
    <!-- sku列表 -->
    <full-calendar 
      :events="skuList" 
      first-day='0' 
      @changeMonth="changeMonth" 
      @dayClick="dayClick"
      @eventClick="dayClick">
    </full-calendar>
  </section>
</template>
<script>
  import { readSkuInfoList } from '@/api'
  export default {
    data () {
      return {
        wareId: '',
        skuList : [],
      }
    },
    methods: {
      // 获取sku列表
      getSkuList () {
        readSkuInfoList({wareId: this.wareId}).then(res => {
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
          this.$catchError(err)
        })
      },
      changeMonth (start, end, current) {
        // console.log(current.format())
      },
      dayClick (day) {
        // console.log(day)
      }
    },
    mounted () {
      this.wareId = parseInt(this.$route.query.wareId)
      this.wareId && this.getSkuList()
    }
  }
</script>
<style scoped>
  .input-width-control .el-input {
    width: 220px;
  }
</style>

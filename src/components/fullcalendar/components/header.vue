<template>
  <div class="full-calendar-header">
    <div class="header-left">
      <slot name="header-left">
      </slot>
    </div>
    <div class="header-center">
      <!-- <span class="prev-month" @click.stop="goPrev">{{leftArrow}}</span> -->
      <h3 class="title">{{title}}</h3>
      <!-- <span class="next-month" @click.stop="goNext">{{rightArrow}}</span> -->
    </div>
    <div class="header-right">
      <button class="prev-month" @click.stop="goPrev">&lt;</button>
      <button class="next-month" @click.stop="goNext">&gt;</button>
      <slot name="header-right">
      </slot>
    </div>
  </div>
</template>
<script type="text/babel">
  import dateFunc from './dateFunc'
  import moment from 'moment';

  export default {
    props : {
      currentMonth : {},
      titleFormat  : {},
      firstDay     : {},
      monthNames   : {},
      locale       : {},
    },
    data () {
      return {
        leftArrow  : '<',
        rightArrow : '>'
      }
    },
    computed: {
      title () {
        if (!this.currentMonth) return;
        return this.currentMonth.locale(this.locale).format('MMMM YYYY')
      }
    },
    methods : {
      goPrev () {
        var newMonth = moment(this.currentMonth).subtract(1, 'months').startOf('month');
        this.$emit('change', newMonth);
      },
      goNext () {
        var newMonth = moment(this.currentMonth).add(1, 'months').startOf('month');
        this.$emit('change', newMonth);
      }
    }
  }
</script>
<style lang="scss" scoped>
.full-calendar-header{
  display: flex;
  align-items: center;
  .header-left,.header-right{
    flex:1;
  }
  .header-right {
    text-align: right;
    button {
      padding: 2px 10px;
      cursor: pointer;
    }
    .prev-month {
      margin-right: -5px
    } 
  }
  .header-center{
    flex:3;
    text-align:center;
    .title{
      margin: 0 10px;
    }
  }
}
</style>

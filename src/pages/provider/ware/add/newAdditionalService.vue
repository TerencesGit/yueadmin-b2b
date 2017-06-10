<template>
	<table class="table table-bordered bg-white">
		<thead>
			<tr>
				<th colspan="2">新增附加服务</th>
			</tr>
		</thead>
		<tbody>
			<tr>
				<td>*服务名称</td>
				<td>
					<el-input placeholder="请输入服务名称"></el-input>
				</td>
			</tr>
			<tr>
				<td>服务介绍</td>
				<td><el-input type="textarea" row="5" placeholder="服务介绍"></el-input></td>
			</tr>
			<tr>
				<td>价格</td>
				<td>
					  <el-tabs v-model="activeName" @tab-click="handleClick">
					    <el-tab-pane label="按周" name="first">按周</el-tab-pane>
					    <el-tab-pane label="按日期" name="second">按日期</el-tab-pane>
					  </el-tabs>
					  <!-- <label for="">日期范围</label>
					  <el-date-picker
				      v-model="value6"
				      type="daterange"
				      placeholder="选择日期范围">
				    </el-date-picker>
				    <el-checkbox-group v-model="checkList">
					    <el-checkbox v-for="item in weeks" :label="item.name" :value="item.value"></el-checkbox>
					  </el-checkbox-group> -->
				</td>
			</tr>
		</tbody>
	</table>
</template>
<script>
  export default {
    data() {
      return {
        activeName: 'second',
        checkList: ['每周一', '每周三'],
        weeks: [
        	{name: '每周日', value: "0"},
        	{name: '每周一', value: "1"},
        	{name: '每周二', value: "2"},
        	{name: '每周三', value: "3"},
        	{name: '每周四', value: "4"},
        	{name: '每周五', value: "5"},
        	{name: '每周六', value: "6"},
        ],
        value6: '',
      };
    },
    methods: {
      handleClick(tab, event) {
        console.log(tab, event);
      }
    }
  };
</script>
<style scoped>
	.table th {
		text-align: left;
		
	}
	.table th,
	.table td {
		padding: 15px;
	}
</style>
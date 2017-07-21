<template>
	<div class="settlementStrategy">
		<!-- 新增策略 -->
		<el-row  class="toolbar">
				<el-button type="primary" @click="addStrategyDialog">新增</el-button>		
		</el-row>
		<!-- 新增弹窗 -->
		<el-dialog title="新增" :visible.sync="isAddShow">
			<el-row type="flex" justify="center">
			  	<el-col :span="18">
				  	<el-form :rules="addStrategyRules" label-width="146px" ref="addStrategy" :model="addStrategy">			  
			    		<el-form-item label="规则名:" prop="settleName">
			    		  <el-input placeholder="请输入规则名" size="small" v-model="addStrategy.settleName" auto-complete="off"></el-input>
			    		</el-form-item>
					    <el-form-item label="平台佣金率:" prop="commissionRate">
					      <el-input-number placeholder="请选择赔偿比例" v-model.number="addStrategy.commissionRate" size="small" :step="0.01" :min="0" :max="1"></el-input-number>
					    </el-form-item>
					    <el-form-item label="日期类型:" prop="firstSetttleDateType">
					        <el-radio-group v-model="addStrategy.firstSetttleDateType">
					          <el-radio :label="1">下单日期</el-radio>
					          <el-radio :label="2">返程结束日期</el-radio>
					        </el-radio-group>
					    </el-form-item>
			    		<el-form-item label="结算类型:" prop="firstDays">
					       <el-select @change="changeFirstDays" size="small" v-model="addStrategy.firstDays" placeholder="请选择">
					           <el-option label="半月结" :value="1">
					           </el-option>
					           <el-option label="月结" :value="2">
					           </el-option>
					           <el-option label="单笔订单结算" :value="3">
					           </el-option>
					        </el-select>
					    </el-form-item>
					    <div v-if="addStrategy.firstDays === 1">
			    		    <el-form-item label="上半月结算日期:">
			    	    	    <el-row>
			    	    	    	<el-col :span="11">
			    	    	    		<el-form-item label-width="0px" prop="firstTopHalfMonthStar">
			    	    	    		   <el-input size="small" placeholder="上半月起始日" v-model="addStrategy.firstTopHalfMonthStar" auto-complete="off"></el-input>
			    	    	    		</el-form-item>
			    	    	    	</el-col>
			    	    	    	<el-col :offset="2" :span="11">
			    	    	    		<el-form-item label-width="0px" prop="firstLowerHalfMonthEnd">
			    	    			       <el-input size="small" placeholder="上半月结束日" v-model="addStrategy.firstLowerHalfMonthEnd" auto-complete="off"></el-input>
			    	    			    </el-form-item>
			    	    	    	</el-col>
			    	    	    </el-row>
			    		    </el-form-item>
			    		    <el-form-item label="下半月结算日期:">
			    	    	    <el-row>
			    	    	    	<el-col :span="11">
			    	    	    		<el-form-item label-width="0px" prop="secondTopHalfMonthStar">
			    	    			       <el-input size="small" placeholder="下半月起始日" v-model="addStrategy.secondTopHalfMonthStar" auto-complete="off" :disabled="addStrategy.firstLowerHalfMonthEnd==31"></el-input>
			    	    			    </el-form-item>
			    	    	    	</el-col>
			    	    	    	<el-col :offset="2" :span="11">
			    	    	    		<el-form-item label-width="0px" prop="secondLowerHalfMonthEnd">
			    	    			       <el-input size="small" placeholder="下半月结束日" v-model="addStrategy.secondLowerHalfMonthEnd" auto-complete="off" :disabled="addStrategy.firstLowerHalfMonthEnd==31"></el-input>
			    	    			    </el-form-item>
			    	    	    	</el-col>
			    	    	    </el-row>
			    		    </el-form-item>
			    		    <el-form-item label="首次结算延后日:">
			    	    	    <el-row>
			    	    	    	<el-col :span="11">
			    	    	    		<el-form-item label-width="0px" prop="firstTopHalfMonthDelayDay">
			    	    	    		   <el-input size="small" placeholder="首次结算延后日" v-model="addStrategy.firstTopHalfMonthDelayDay" auto-complete="off"></el-input>
			    	    	    		</el-form-item>
			    	    	    	</el-col>
			    	    	    </el-row>
			    		    </el-form-item>
			    		    <el-form-item label="二次结算延后日:">
			    	    	    <el-row>
			    	    	    	<el-col :span="11">
			    	    	    		<el-form-item label-width="0px" prop="secondTopHalfMonthDelayDay">
			    	    	    		   <el-input size="small" placeholder="二次结算延后日" v-model="addStrategy.secondTopHalfMonthDelayDay" auto-complete="off"></el-input>
			    	    	    		</el-form-item>
			    	    	    	</el-col>
			    	    	    </el-row>
			    		    </el-form-item>
					    </div>
					    <div v-if="addStrategy.firstDays === 2">
			    		    <el-form-item label="结算日期:">
			    	    	    <el-row>
			    	    	    	<el-col :span="11">
			    	    	    		<el-form-item label-width="0px" prop="allMonthStar">
			    	    	    		   <el-input size="small" placeholder="起始日" v-model="addStrategy.allMonthStar" auto-complete="off"></el-input>
			    	    	    		</el-form-item>
			    	    	    	</el-col>
			    	    	    </el-row>
			    		    </el-form-item>
			    		    <el-form-item label="首次结算延后日:">
			    	    	    <el-row>
			    	    	    	<el-col :span="11">
			    	    	    		<el-form-item label-width="0px" prop="allFirstMonthdelayDay">
			    	    	    		   <el-input size="small" placeholder="首次结算延后日" v-model="addStrategy.allFirstMonthdelayDay" auto-complete="off"></el-input>
			    	    	    		</el-form-item>
			    	    	    	</el-col>
			    	    	    </el-row>
			    		    </el-form-item>
			    		    <el-form-item label="二次结算延后日:">
			    	    	    <el-row>
			    	    	    	<el-col :span="11">
			    	    	    		<el-form-item label-width="0px" prop="allSecondMonthdelayDay">
			    	    	    		   <el-input size="small" placeholder="二次结算延后日" v-model="addStrategy.allSecondMonthdelayDay" auto-complete="off"></el-input>
			    	    	    		</el-form-item>
			    	    	    	</el-col>
			    	    	    </el-row>
			    		    </el-form-item>
					    </div>
					    <div v-if="addStrategy.firstDays === 3">
			    		    <el-form-item label="首次结算延后日:">
			    	    	    <el-row>
			    	    	    	<el-col :span="11">
			    	    	    		<el-form-item label-width="0px" prop="firstDelayDay">
			    	    	    		   <el-input size="small" placeholder="首次结算延后日" v-model="addStrategy.firstDelayDay" auto-complete="off"></el-input>
			    	    	    		</el-form-item>
			    	    	    	</el-col>
			    	    	    </el-row>
			    		    </el-form-item>
			    		    <el-form-item label="二次结算延后日:">
			    	    	    <el-row>
			    	    	    	<el-col :span="11">
			    	    	    		<el-form-item label-width="0px" prop="secondDelayDay">
			    	    	    		   <el-input size="small" placeholder="二次结算延后日" v-model="addStrategy.secondDelayDay" auto-complete="off"></el-input>
			    	    	    		</el-form-item>
			    	    	    	</el-col>
			    	    	    </el-row>
			    		    </el-form-item>
					    </div>
			    		<el-form-item label="首次结算规则名称:" prop="firstSetttleDateName">
					       <el-input size="small" v-model="addStrategy.firstSetttleDateName" auto-complete="off"></el-input>
				          </el-date-picker>
					    </el-form-item>
					    <el-form-item label="首次结算比率:" prop="firstRate">
					      <el-input-number placeholder="请选择赔偿比例" v-model.number="addStrategy.firstRate" size="small" :step="0.01" :min="0" :max="1"></el-input-number>
					    </el-form-item>
			    		<el-form-item label="二次结算规则名称:" prop="secondSetttleDateName">
					       <el-input size="small" v-model="addStrategy.secondSetttleDateName" auto-complete="off"></el-input>
				          </el-date-picker>
					    </el-form-item>
					    <el-form-item label="二次结算比率:" prop="secondRate">
					      <el-input-number placeholder="请选择赔偿比例" v-model.number="addStrategy.secondRate" size="small" :step="0.01" :min="0" :max="1"></el-input-number>
					    </el-form-item>
			    		<el-form-item label="结算状态" prop="status">
					      <el-select size="small" v-model="addStrategy.status" placeholder="请选择状态">
					        <el-option label="启用" :value="1"></el-option>
					        <el-option label="禁用" :value="0"></el-option>
					      </el-select>
					    </el-form-item>
					    <el-form-item label="备注/描述:" prop="note">
					      <el-input type="textarea" :autosize="{ minRows: 4}" v-model="addStrategy.note" auto-complete="off"></el-input>
					    </el-form-item>
				  	</el-form>
			  	</el-col>
			</el-row>
		  	<div slot="footer">
		  	  <el-button type="primary" @click="saveAddStrategy('addStrategy')">保存</el-button>
		  	  <el-button @click="isAddShow = false">取消</el-button>
		  	</div>
		</el-dialog>
		<!-- 策略列表渲染 -->
		<el-table v-loading="loading" element-loading-text="操作中,请稍后O(∩_∩)O" :data="strategy" border style="width: 100%">
		    <el-table-column prop="settleId" label="结算规则ID"></el-table-column>
		    <el-table-column prop="settleName" label="规则名"></el-table-column>
		    <el-table-column prop="commissionRate" :formatter="commissionRateFilter" label="平台佣金费率"></el-table-column>
		    <el-table-column prop="firstDays" :formatter="firstDaysFilter" label="结算类型"></el-table-column>
		    <el-table-column prop="firstSetttleDateType" :formatter="setttleDateTypeFilter" label="日期类型"></el-table-column>
		    <el-table-column prop="status" :formatter="statusFilter" label="结算状态"></el-table-column>
		    <el-table-column prop="note" label="备注/描述"></el-table-column>
		    <el-table-column width="180" label="结算操作">
		    	<template scope="scope">
		    		<el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
		    		<el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
		    	</template>
		    </el-table-column>
		</el-table>     	
		<!-- 编辑弹窗 -->
		<el-dialog title="编辑" :visible.sync="isEditShow">
		  	<el-row type="flex" justify="center">
			  	<el-col :span="18">
				  	<el-form :rules="addStrategyRules" label-width="146px" ref="addStrategy" :model="addStrategy">			  
			    		<el-form-item label="规则名:" prop="settleName">
			    		  <el-input placeholder="请输入规则名" size="small" v-model="addStrategy.settleName" auto-complete="off"></el-input>
			    		</el-form-item>
					    <el-form-item label="平台佣金率:" prop="commissionRate">
					      <el-input-number placeholder="请选择赔偿比例" v-model.number="addStrategy.commissionRate" size="small" :step="0.01" :min="0" :max="1"></el-input-number>
					    </el-form-item>
					    <el-form-item label="日期类型:" prop="firstSetttleDateType">
					        <el-radio-group v-model="addStrategy.firstSetttleDateType">
					          <el-radio :label="1">下单日期</el-radio>
					          <el-radio :label="2">返程结束日期</el-radio>
					        </el-radio-group>
					    </el-form-item>
			    		<el-form-item label="结算类型:" prop="firstDays">
					       <el-select @change="changeFirstDays" size="small" v-model="addStrategy.firstDays" placeholder="请选择">
					           <el-option label="半月结" :value="1">
					           </el-option>
					           <el-option label="月结" :value="2">
					           </el-option>
					           <el-option label="单笔订单结算" :value="3">
					           </el-option>
					        </el-select>
					    </el-form-item>
					    <div v-if="addStrategy.firstDays === 1">
			    		    <el-form-item label="上半月结算日期:">
			    	    	    <el-row>
			    	    	    	<el-col :span="11">
			    	    	    		<el-form-item label-width="0px" prop="firstTopHalfMonthStar">
			    	    	    		   <el-input size="small" placeholder="上半月起始日" v-model="addStrategy.firstTopHalfMonthStar" auto-complete="off"></el-input>
			    	    	    		</el-form-item>
			    	    	    	</el-col>
			    	    	    	<el-col :offset="2" :span="11">
			    	    	    		<el-form-item label-width="0px" prop="firstLowerHalfMonthEnd">
			    	    			       <el-input size="small" placeholder="上半月结束日" v-model="addStrategy.firstLowerHalfMonthEnd" auto-complete="off"></el-input>
			    	    			    </el-form-item>
			    	    	    	</el-col>
			    	    	    </el-row>
			    		    </el-form-item>
			    		    <el-form-item label="下半月结算日期:">
			    	    	    <el-row>
			    	    	    	<el-col :span="11">
			    	    	    		<el-form-item label-width="0px" prop="secondTopHalfMonthStar">
			    	    			       <el-input size="small" placeholder="下半月起始日" v-model="addStrategy.secondTopHalfMonthStar" auto-complete="off" :disabled="addStrategy.firstLowerHalfMonthEnd==31"></el-input>
			    	    			    </el-form-item>
			    	    	    	</el-col>
			    	    	    	<el-col :offset="2" :span="11">
			    	    	    		<el-form-item label-width="0px" prop="secondLowerHalfMonthEnd">
			    	    			       <el-input size="small" placeholder="下半月结束日" v-model="addStrategy.secondLowerHalfMonthEnd" auto-complete="off" :disabled="addStrategy.firstLowerHalfMonthEnd==31"></el-input>
			    	    			    </el-form-item>
			    	    	    	</el-col>
			    	    	    </el-row>
			    		    </el-form-item>
			    		    <el-form-item label="首次结算延后日:">
			    	    	    <el-row>
			    	    	    	<el-col :span="11">
			    	    	    		<el-form-item label-width="0px" prop="firstTopHalfMonthDelayDay">
			    	    	    		   <el-input size="small" placeholder="首次结算延后日" v-model="addStrategy.firstTopHalfMonthDelayDay" auto-complete="off"></el-input>
			    	    	    		</el-form-item>
			    	    	    	</el-col>
			    	    	    </el-row>
			    		    </el-form-item>
			    		    <el-form-item label="二次结算延后日:">
			    	    	    <el-row>
			    	    	    	<el-col :span="11">
			    	    	    		<el-form-item label-width="0px" prop="secondTopHalfMonthDelayDay">
			    	    	    		   <el-input size="small" placeholder="二次结算延后日" v-model="addStrategy.secondTopHalfMonthDelayDay" auto-complete="off"></el-input>
			    	    	    		</el-form-item>
			    	    	    	</el-col>
			    	    	    </el-row>
			    		    </el-form-item>
					    </div>
					    <div v-if="addStrategy.firstDays === 2">
			    		    <el-form-item label="结算日期:">
			    	    	    <el-row>
			    	    	    	<el-col :span="11">
			    	    	    		<el-form-item label-width="0px" prop="allMonthStar">
			    	    	    		   <el-input size="small" placeholder="起始日" v-model="addStrategy.allMonthStar" auto-complete="off"></el-input>
			    	    	    		</el-form-item>
			    	    	    	</el-col>
			    	    	    </el-row>
			    		    </el-form-item>
			    		    <el-form-item label="首次结算延后日:">
			    	    	    <el-row>
			    	    	    	<el-col :span="11">
			    	    	    		<el-form-item label-width="0px" prop="allFirstMonthdelayDay">
			    	    	    		   <el-input size="small" placeholder="首次结算延后日" v-model="addStrategy.allFirstMonthdelayDay" auto-complete="off"></el-input>
			    	    	    		</el-form-item>
			    	    	    	</el-col>
			    	    	    </el-row>
			    		    </el-form-item>
			    		    <el-form-item label="二次结算延后日:">
			    	    	    <el-row>
			    	    	    	<el-col :span="11">
			    	    	    		<el-form-item label-width="0px" prop="allSecondMonthdelayDay">
			    	    	    		   <el-input size="small" placeholder="二次结算延后日" v-model="addStrategy.allSecondMonthdelayDay" auto-complete="off"></el-input>
			    	    	    		</el-form-item>
			    	    	    	</el-col>
			    	    	    </el-row>
			    		    </el-form-item>
					    </div>
					    <div v-if="addStrategy.firstDays === 3">
			    		    <el-form-item label="首次结算延后日:">
			    	    	    <el-row>
			    	    	    	<el-col :span="11">
			    	    	    		<el-form-item label-width="0px" prop="firstDelayDay">
			    	    	    		   <el-input size="small" placeholder="首次结算延后日" v-model="addStrategy.firstDelayDay" auto-complete="off"></el-input>
			    	    	    		</el-form-item>
			    	    	    	</el-col>
			    	    	    </el-row>
			    		    </el-form-item>
			    		    <el-form-item label="二次结算延后日:">
			    	    	    <el-row>
			    	    	    	<el-col :span="11">
			    	    	    		<el-form-item label-width="0px" prop="secondDelayDay">
			    	    	    		   <el-input size="small" placeholder="二次结算延后日" v-model="addStrategy.secondDelayDay" auto-complete="off"></el-input>
			    	    	    		</el-form-item>
			    	    	    	</el-col>
			    	    	    </el-row>
			    		    </el-form-item>
					    </div>
			    		<el-form-item label="首次结算规则名称:" prop="firstSetttleDateName">
					       <el-input size="small" v-model="addStrategy.firstSetttleDateName" auto-complete="off"></el-input>
				          </el-date-picker>
					    </el-form-item>
					    <el-form-item label="首次结算比率:" prop="firstRate">
					      <el-input-number placeholder="请选择赔偿比例" v-model.number="addStrategy.firstRate" size="small" :step="0.01" :min="0" :max="1"></el-input-number>
					    </el-form-item>
			    		<el-form-item label="二次结算规则名称:" prop="secondSetttleDateName">
					       <el-input size="small" v-model="addStrategy.secondSetttleDateName" auto-complete="off"></el-input>
				          </el-date-picker>
					    </el-form-item>
					    <el-form-item label="二次结算比率:" prop="secondRate">
					      <el-input-number placeholder="请选择赔偿比例" v-model.number="addStrategy.secondRate" size="small" :step="0.01" :min="0" :max="1"></el-input-number>
					    </el-form-item>
			    		<el-form-item label="结算状态" prop="status">
					      <el-select size="small" v-model="addStrategy.status" placeholder="请选择状态">
					        <el-option label="启用" :value="1"></el-option>
					        <el-option label="禁用" :value="0"></el-option>
					      </el-select>
					    </el-form-item>
					    <el-form-item label="备注/描述:" prop="note">
					      <el-input type="textarea" :autosize="{ minRows: 4}" v-model="addStrategy.note" auto-complete="off"></el-input>
					    </el-form-item>
				  	</el-form>
			  	</el-col>
			</el-row>
			<div slot="footer">
			    <el-button type="primary" @click="updatePageStrategy('addStrategy')">保存</el-button>
			    <el-button @click="isEditShow = false">取消</el-button>
			</div>
		</el-dialog>
		<el-row  class="toolbar">
			<el-pagination
			  @size-change="handleSizeChange"
		      @current-change="handleCurrentChange"
		      :current-page="pageInfo.currPage"
		      :page-sizes="[10,20,30,40]"
		      :page-size="pageInfo.pageSize"
		      layout="total, sizes, prev, pager, next, jumper"
		      :total="pageInfo.count">
		    </el-pagination>
		</el-row>
	</div>
</template>
<script>
	import axios from 'axios'
	import {updateStrategy, sysSettleInfoList, deleteStrategy, insertStrategy} from '@/api'
	export default{
		data(){
			var validateCommissionRate = (rule, value, callback)=>{
				if(value === ''){
					callback(new Error("请输入平台佣金率"))
				}else if(isNaN(value)){
					callback(new Error("请输入数字"))
				}else if(Number(value) <= 0 || Number(value) >= 1){
					callback(new Error("请输入0-1之间的小数"))
				}else{
					callback();
				}
			}
			var validateDate = (rule, value, callback)=>{
				if(value === ''){
					callback(new Error("请输入天数"))
				}else if(!Number.isInteger(Number(value))){
					callback(new Error("请输入整天数"))
				}else if(Number(value) > 31 || Number(value) <= 0){
					callback(new Error("日期不得大于31或小于0"))
				}else{
					callback();
				}
			}
			var validateDays = (rule, value, callback)=>{
				if(value === ''){
					callback(new Error("请输入天数"))
				}else if(!Number.isInteger(Number(value))){
					callback(new Error("请输入整天数"))
				}else if(Number(value) <= 0 ){
					callback(new Error("天数必须大于0"))
				}else{
					callback();
				}
			}
			var validateNum = (rule, value, callback)=>{
				if(value && Number.isInteger(value)){
					callback();
				}else{
					callback(new Error('请选择类型'));
				}
			}
			var validateFirstTopHalfMonthStar = (rule, value, callback)=>{
				if(value === '' && !Number.isInteger(Number(value))){
					callback(new Error("请输入整天数"))
				}else if(Number(value) <= 0 || Number(value) > 14){
					callback(new Error("上半月起始日在1-14号之间"))
				}else{
					this.$refs.addStrategy.validateField('firstLowerHalfMonthEnd');
					callback()			
				}
			}
			var validateFirstLowerHalfMonthEnd = (rule, value, callback)=>{
				if(value === '' && !Number.isInteger(Number(value))){
					callback(new Error("请输入整天数"))
				}else if(Number(value) <= 0 || Number(value) > 31){
					callback(new Error("上半月起始日在1-31号之间"))
				}else if(Number(value) <= Number(this.addStrategy.firstTopHalfMonthStar)){
					callback(new Error("必须大于起始日期"))					
				}else{
					this.$refs.addStrategy.validateField('secondTopHalfMonthStar');
					callback()
				}
			}
			var validateSecondTopHalfMonthStar = (rule, value, callback)=>{
				if(value === '' && !Number.isInteger(Number(value))){
					callback(new Error("请输入整天数"))
				}else if(this.addStrategy.firstLowerHalfMonthEnd == 31){
					this.addStrategy.secondTopHalfMonthStar = 0;
					this.addStrategy.secondLowerHalfMonthEnd = 0;
					callback();
				}else if(Number(value) <= 0 || Number(value) > 31){
					callback(new Error("上半月起始日在1-31号之间"))
				}else if(value <= Number(this.addStrategy.firstLowerHalfMonthEnd)){
					callback(new Error("必须大于上半月结束日期"))					
				}else{
					callback()
				}
			}
			var validateSecondLowerHalfMonthEnd = (rule, value, callback)=>{
				if(value === '' && !Number.isInteger(Number(value))){
					callback(new Error("请输入整天数"))
				}else if(this.addStrategy.firstLowerHalfMonthEnd == 31){
					this.addStrategy.secondTopHalfMonthStar = 0;
					this.addStrategy.secondLowerHalfMonthEnd = 0;
					callback();
				}else if(Number(value) <= 0 || Number(value) > 31){
					callback(new Error("上半月起始日在1-31号之间"))
				}else{
					callback()
				}
			}
			var validateFirstTopHalfMonthDelayDay = (rule, value, callback)=>{
				if(value === '' && !Number.isInteger(Number(value))){
					callback(new Error("请输入整天数"))
				}else if(this.addStrategy.secondTopHalfMonthDelayDay && Number(value) >= Number(this.addStrategy.secondTopHalfMonthDelayDay)){
					callback(new Error("首次结算延后天数不得大于二次结算延后天数"))
				}else if(this.addStrategy.firstSetttleDateType === 1 && value < 0){
					callback(new Error("不能小于0"));
				}else{
					callback();
				}
			}
			var validateSecondTopHalfMonthDelayDay = (rule, value, callback)=>{
				if(value === '' && !Number.isInteger(Number(value))){
					callback(new Error("请输入整天数"))
				}else if(this.addStrategy.firstTopHalfMonthDelayDay && Number(value) <= Number(this.addStrategy.firstTopHalfMonthDelayDay)){
					callback(new Error("二次结算延后天数不得小于首次结算延后天数"))
				}else if(this.addStrategy.firstSetttleDateType === 1 && value < 0){
					callback(new Error("不能小于0"));
				}else{
					callback();
				}
			}
			var validateAllFirstMonthdelayDay = (rule, value, callback)=>{
				if(value === '' && !Number.isInteger(Number(value))){
					callback(new Error("请输入整天数"))
				}else if(this.addStrategy.allSecondMonthdelayDay && Number(value) >= Number(this.addStrategy.allSecondMonthdelayDay)){
					callback(new Error("首次结算延后天数不得大于二次结算延后天数"))
				}else if(this.addStrategy.firstSetttleDateType === 1 && value < 0){
					callback(new Error("不能小于0"));
				}else{
					callback();
				}
			}
			var validateAllSecondMonthdelayDay = (rule, value, callback)=>{
				if(value === '' && !Number.isInteger(Number(value))){
					callback(new Error("请输入整天数"))
				}else if(this.addStrategy.allFirstMonthdelayDay && Number(value) <= Number(this.addStrategy.allFirstMonthdelayDay)){
					callback(new Error("二次结算延后天数不得小于首次结算延后天数"))
				}else if(this.addStrategy.firstSetttleDateType === 1 && value < 0){
					callback(new Error("不能小于0"));
				}else{
					callback();
				}
			}
			var validateFirstDelayDay = (rule, value, callback)=>{
				if(value === '' && !Number.isInteger(Number(value))){
					callback(new Error("请输入整天数"))
				}else if(this.addStrategy.secondDelayDay && Number(value) >= Number(this.addStrategy.secondDelayDay)){
					callback(new Error("首次结算延后天数不得大于二次结算延后天数"))
				}else if(this.addStrategy.firstSetttleDateType === 1 && value < 0){
					callback(new Error("不能小于0"));
				}else{
					callback();
				}
			}
			var validateSecondDelayDay = (rule, value, callback)=>{
				if(value === '' && !Number.isInteger(Number(value))){
					callback(new Error("请输入整天数"))
				}else if(this.addStrategy.firstDelayDay && Number(value) <= Number(this.addStrategy.firstDelayDay)){
					callback(new Error("二次结算延后天数不得小于首次结算延后天数"))
				}else if(this.addStrategy.firstSetttleDateType === 1 && value < 0){
					callback(new Error("不能小于0"));
				}else{
					callback();
				}
			}

			return{
				isAddShow:false,
				isEditShow:false,
				secondDaysDisabled:false,
				loading:false,
				pageInfo:{
					count:0,
					currPage:1,
					pageSize:20,
					currentPage:1
				},
				addStrategy: {
					settleName:'',
					commissionRate:'',
					firstSetttleDateType:'',
					firstSetttleDateName:'',
					firstDays:1,
					firstRate:'',
					secondSetttleDateType:'',
					secondSetttleDateName:'',
					secondDays:'',
					secondRate:'',
					status:'',
					note:'',
					firstTopHalfMonthStar:'',
					firstLowerHalfMonthEnd :'',   
					secondTopHalfMonthStar :'',     
					secondLowerHalfMonthEnd  :'',  
					firstTopHalfMonthDelayDay:'',
					firstLowerHalfMonthDelayDay:'',
					secondTopHalfMonthDelayDay:'',
					secondLowerHalfMonthDelayDay:'',
					allMonthStar:'',
					allFirstMonthdelayDay:'',
					allSecondMonthdelayDay:'',
					firstDelayDay:'',
					secondDelayDay:'',
				},
				addStrategyRules:{
					settleName:[
						{ required: true, message: '请输入规则名', trigger: 'blur' }
					],
					commissionRate:[
						{required: true, type: 'number', message:'请填写比率', trigger: 'blur' }
					],
					firstSetttleDateType:[
						{required: true, type: 'number', message:'请选择类型', trigger: 'change' }
					],
					firstSetttleDateName:[
						{ required: true, message: '请输入首次结算日期规则名称', trigger: 'blur' }
					],
					firstDays:[
						{ required: true, type: 'number', message:'请选择类型', trigger: 'change' }
					],
					firstRate:[
						{ required: true, type: 'number', message:'请填写比率', trigger: 'blur' }
					],
					secondSetttleDateName:[
						{ required: true, message: '请输入二次结算日期规则名称', trigger: 'blur' }
					],
					secondDays:[
						{ required: true, type: 'number', message:'请选择类型', trigger: 'change' }
					],
					status:[
						{ type: 'number', required: true, message:'请选择类型', trigger: 'change' }
					],
					note:[
						{ required: true, message: '请输入备注/描述', trigger: 'blur' }
					],
					firstTopHalfMonthStar:[
						{required: true, validator:validateFirstTopHalfMonthStar, trigger: 'blur,change' }
					],
					firstLowerHalfMonthEnd:[
						{required: true, validator:validateFirstLowerHalfMonthEnd, trigger: 'blur,change' }
					],
					secondTopHalfMonthStar:[
						{required: true, validator:validateSecondTopHalfMonthStar, trigger: 'blur,change' }
					],
					secondLowerHalfMonthEnd:[
						{required: true, validator:validateSecondLowerHalfMonthEnd, trigger: 'blur,change' }
					],
					firstTopHalfMonthDelayDay:[
						{required: true, validator:validateFirstTopHalfMonthDelayDay, trigger: 'blur' }
					],
					secondTopHalfMonthDelayDay:[
						{required: true, validator:validateSecondTopHalfMonthDelayDay, trigger: 'blur' }
					],
					allMonthStar:[
						{required: true, validator:validateDate, trigger: 'blur' }
					],
					allFirstMonthdelayDay:[
						{required: true, validator:validateAllFirstMonthdelayDay, trigger: 'blur' }
					],
					allSecondMonthdelayDay:[
						{required: true, validator:validateAllSecondMonthdelayDay, trigger: 'blur' }
					],
					firstDelayDay:[
						{required: true, validator:validateFirstDelayDay, trigger: 'blur' }
					],
					secondDelayDay:[
						{required: true, validator:validateSecondDelayDay, trigger: 'blur' }
					]
				},
				strategy:[]
			}
		},
		methods:{
			secondDaysChange(){
				if(this.addStrategy.secondDays === 0){
					this.secondDaysDisabled = true;
					this.addStrategy.secondRate = 0;
				}else{
					this.secondDaysDisabled = false
				}
			},
			secondDaysChange1(){
				if(this.editStrategy.secondDays === 0){
					this.secondDaysDisabled = true;
					this.editStrategy.secondRate = 0;
				}else{
					this.secondDaysDisabled = false
				}
			},
			formatTooltip(val){
				return `${val}%`;
			},
			handleSizeChange(val){
				this.loading = true;
				let params = {
					pageSize:val,
					currPage:this.pageInfo.currPage
				}
				sysSettleInfoList(params).then((res)=>{
					if(res.data.code === "0001"){
						let page = res.data.result.pageInfo;
						this.pageInfo.count = page.count;
						this.pageInfo.currPage = page.currPage;
						this.pageInfo.pageSize = page.pageSize;
						this.strategy = res.data.result.settleInfoList;
						this.loading = false;
					}else{
						this.$message('获取失败,请稍后再试');
						this.loading = false;
					}
				}).catch((error)=>{
					console.log(error);
					this.catchError(error.response)
					this.loading = false;
				})
			},
			changeFirstDays(){
				switch(this.addStrategy.firstDays){
					case 1:
						this.addStrategy.allMonthStar = '';
						this.addStrategy.allFirstMonthdelayDay = '';
						this.addStrategy.allSecondMonthdelayDay = '';
						this.addStrategy.firstDelayDay = '';
						this.addStrategy.secondDelayDay = '';
						break;
					case 2:
						this.addStrategy.firstTopHalfMonthStar = '';
						this.addStrategy.firstLowerHalfMonthEnd = '';
						this.addStrategy.secondTopHalfMonthStar = '';
						this.addStrategy.secondLowerHalfMonthEnd = '';
						this.addStrategy.firstTopHalfMonthDelayDay = '';
						this.addStrategy.secondTopHalfMonthDelayDay = '';
						this.addStrategy.firstDelayDay = '';
						this.addStrategy.secondDelayDay = '';
						break;
					case 3:
						this.addStrategy.firstTopHalfMonthStar = '';
						this.addStrategy.firstLowerHalfMonthEnd = '';
						this.addStrategy.secondTopHalfMonthStar = '';
						this.addStrategy.secondLowerHalfMonthEnd = '';
						this.addStrategy.firstTopHalfMonthDelayDay = '';
						this.addStrategy.secondTopHalfMonthDelayDay = '';
						this.addStrategy.allMonthStar = '';
						this.addStrategy.allFirstMonthdelayDay = '';
						this.addStrategy.allSecondMonthdelayDay = '';
						break;
					default:
						this.addStrategy.firstTopHalfMonthStar = '';
						this.addStrategy.firstLowerHalfMonthEnd = '';
						this.addStrategy.secondTopHalfMonthStar = '';
						this.addStrategy.secondLowerHalfMonthEnd = '';
						this.addStrategy.firstTopHalfMonthDelayDay = '';
						this.addStrategy.secondTopHalfMonthDelayDay = '';
						this.addStrategy.allMonthStar = '';
						this.addStrategy.allFirstMonthdelayDay = '';
						this.addStrategy.allSecondMonthdelayDay = '';
						this.addStrategy.firstDelayDay = '';
						this.addStrategy.secondDelayDay = '';
						break;
				}
			},
			handleCurrentChange(val){
				this.loading = true;
				let params = {
					currPage:val,
					pageSize:this.pageInfo.pageSize
				}
				sysSettleInfoList(params).then((res)=>{
					if(res.data.code === "0001"){
						let page = res.data.result.pageInfo;
						this.pageInfo.count = page.count;
						this.strategy = res.data.result.settleInfoList;
						this.loading = false;
					}else{
						this.$message('获取失败,请稍后再试');
						this.loading = false;
					}
				}).catch((error)=>{
					console.log(error);
					this.catchError(error.response)
					this.loading = false;
				})
			},
			handleEdit(index,details){
				this.isEditShow = true;
				console.log(details);
				this.addStrategy = Object.assign({},details);
			},
			updatePageStrategy(addStrategy){
				this.$refs[addStrategy].validate((valid) => {
		          if (valid) {
		          	let flag;
	          		flag = (this.addStrategy.commissionRate + this.addStrategy.firstRate + this.addStrategy.secondRate === 1)
		          	if(flag){
			          	let data = Object.assign({},(this.addStrategy));
	    				for(let i in data){
	    					data[i] += '';
	    				}
	    				updateStrategy(data).then(res=>{
	    					this.isEditShow = false;
	    					this.loading = true;
	    					if(res.data.code === '0001'){
	    						this.getList();
	    						this.pageInfo.currPage = 1;
	    						this.$message({
	    			    	        message: '修改成功',
	    			    	        type: 'success'
	    			    	    });
	    			    	    this.loading = false;
	    					}else{
	    						this.$message({
	    			    	        message: '修改失败,请稍后再试',
	    			    	        type: 'error'
	    			    	    });
	    			    	    this.loading = false;
	    					}
	    				})
	    				.catch(error=>{
	    					this.catchError(error.response)
	    		    	    this.loading = false;
	    				})
		          	}else{
		          		if(this.addStrategy.secondDays !== 0){
		          			this.$message({
		          				message:'平台佣金率，首次结算比率，二次结算比率，和必须为1！',
		          				type:'warning'
		          			});
		          		}else{
		          			this.$message({
		          				message:'平台佣金率，首次结算比率,和必须为1！',
		          				type:'warning'
		          			});
		          		}
		          	}
		          } else {
		            return false;
		          }
		        });
				
			},
			handleDelete(index,details){
				this.$confirm('是否删除该条规则', '提示', {
		          confirmButtonText: '确定',
		          cancelButtonText: '取消',
		          type: 'warning'
		        }).then(() => {
		          this.loading = true;
		          let data = {settleId: details.settleId}
		          deleteStrategy(data).then((res)=>{
		          	console.log(res);
		          	if(res.data.code === '0001'){
		          		this.getList(this.pageInfo.currPage,this.pageInfo.pageSize)
		          		this.$message({
		          		  type: 'success',
		          		  message: '删除成功!'
		          		});
		          		this.loading = false;
		          	}else{
		          		this.$message.error('删除失败,请稍后再试');
		          		this.loading = false;
		          	}
		          }).catch((error)=>{
		          	this.loading = false;
		          	this.catchError(error.response)
		          	console.log(error);
		          })
		        }).catch(() => {
		          this.$message({
		            type: 'info',
		            message: '已取消删除'
		          });          
		          this.loading = false;
		        });				
			},
			setttleDateTypeFilter(row){
				return row.firstSetttleDateType === 1 ? '下单日期' : '出团日期';
			},
			statusFilter(row){
				return row.status === 1 ? '启用' : '禁用';
			},
			firstDaysFilter(row){
				if(row.firstDays === 1){
					return '半月结';
				}else if(row.firstDays === 2){
					return '月结';
				}else if(row.firstDays === 3){
					return '单笔订单结算'
				}else{
					return ''
				}
			},
			commissionRateFilter(row){
				return row.commissionRate * 100 + '%';
			},
			getList(currPage = 1, pageSize = 20){
				this.loading = true;
				let params = {
					pageSize:pageSize,
					currPage:currPage
				}
				sysSettleInfoList(params).then((res)=>{
					console.log(res);
					if(res.data.code === "0001"){
						let page = res.data.result.pageInfo;
						this.pageInfo.count = page.count;
						this.pageInfo.currPage = page.currPage;
						this.pageInfo.pageSize = page.pageSize;
						this.strategy = res.data.result.settleInfoList;
						this.loading = false;
					}else{
						this.$message('获取失败,请稍后再试');
						this.loading = false;
					}
				}).catch((error)=>{
					console.log(error);
					this.catchError(error.response);
					this.loading = false;
				})
			},
			addStrategyDialog(){
				this.isAddShow = true;
				for(let i in this.addStrategy){
					this.addStrategy[i] = '';
				}
			},
			saveAddStrategy(addStrategy){
				this.$refs[addStrategy].validate((valid) => {
		          if (valid) {
		          	let flag;
	          		flag = (this.addStrategy.commissionRate + this.addStrategy.firstRate + this.addStrategy.secondRate === 1)
		          	if(flag){
		          		this.loading = true;
			          	this.isAddShow = false;
			          	this.addStrategy.secondSetttleDateType = this.addStrategy.firstSetttleDateType
			          	for(let i in this.addStrategy){
			          		this.addStrategy[i] += '';
			          	}
			          	let data = {
			          		settleName:this.addStrategy.settleName,
			          		commissionRate:this.addStrategy.commissionRate,
			          		firstSetttleDateType:this.addStrategy.firstSetttleDateType,
			          		firstSetttleDateName:this.addStrategy.firstSetttleDateName,
			          		firstDays:this.addStrategy.firstDays,
			          		firstRate:this.addStrategy.firstRate,
			          		secondSetttleDateType:this.addStrategy.secondSetttleDateType,
			          		secondSetttleDateName:this.addStrategy.secondSetttleDateName,
			          		secondDays:this.addStrategy.secondDays,
			          		secondRate:this.addStrategy.secondRate,
			          		status:this.addStrategy.status,
			          		note:this.addStrategy.note,
			          		firstTopHalfMonthStar:this.addStrategy.firstTopHalfMonthStar,
			          		firstLowerHalfMonthEnd :this.addStrategy.firstLowerHalfMonthEnd,   
			          		secondTopHalfMonthStar :this.addStrategy.secondTopHalfMonthStar,     
			          		secondLowerHalfMonthEnd  :this.addStrategy.secondLowerHalfMonthEnd,  
			          		firstTopHalfMonthDelayDay:this.addStrategy.firstTopHalfMonthDelayDay,
			          		firstLowerHalfMonthDelayDay:this.addStrategy.firstLowerHalfMonthDelayDay,
			          		secondTopHalfMonthDelayDay:this.addStrategy.secondTopHalfMonthDelayDay,
			          		secondLowerHalfMonthDelayDay:this.addStrategy.secondLowerHalfMonthDelayDay,
			          		allMonthStar:this.addStrategy.allMonthStar,
			          		allFirstMonthdelayDay:this.addStrategy.allFirstMonthdelayDay,
			          		allSecondMonthdelayDay:this.addStrategy.allSecondMonthdelayDay,
			          		firstDelayDay:this.addStrategy.firstDelayDay,
			          		secondDelayDay:this.addStrategy.secondDelayDay,
			          	}
			          	// console.log(data);
	            		insertStrategy(data).then(res => {
	            			if(res.data.code === '0001'){
	            				this.getList();
	            				this.pageInfo.currPage = 1;
	            				this.$message({
	            		          message: '新增成功',
	            		          type: 'success'
	            		        });
	            		        for(let i in this.addStrategy){
	            		        	this.addStrategy[i] = '';
	            		        }
	            		        this.firstSetttleDateType = 1;
	            		        this.secondSetttleDateType = this.firstSetttleDateType;
	            		        this.loading = false;
	            			}else{
	            				this.$message.error({
          	    	        message: res.data.message,
          	    	    });
	            	    	this.loading = false;
	            			}
	            		}).catch(error=>{
	            			this.catchError(error.response)
	                	    this.loading = false;
	            		})
		          	}else{
		          		if(this.addStrategy.secondDays !== 0){
		          			this.$message({
		          				message:'平台佣金率，首次结算比率，二次结算比率，和必须为1！',
		          				type:'warning'
		          			});
		          		}else{
		          			this.$message({
		          				message:'平台佣金率，首次结算比率,和必须为1！',
		          				type:'warning'
		          			});
		          		}
		          	}
		          } else {
		            return false;
		          }
		        });
			}
		},
		created (){
			this.getList(1,20);
		}
	}
</script>

<style scoped>
	.add{
		margin-bottom: 20px;
	}
	.settlement .el-col{
		margin-right:10px;
	}
	.toolbar{
		text-align: right;
	}
</style>
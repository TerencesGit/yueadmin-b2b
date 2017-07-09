<template>
	<section>
		<el-tabs type="border-card" class="m-t-lg">
			<el-tab-pane label="待发团">
				待发团
				<!-- <ToBeSworn></ToBeSworn> -->
			</el-tab-pane>
		    <el-tab-pane label="行程中">
		    行程中
		    	<!-- <Itinerary></Itinerary> -->
		    </el-tab-pane>
		    <el-tab-pane label="已回程">
		    已回程
		    	<!-- <HasBeenBack></HasBeenBack> -->
		    </el-tab-pane>
		</el-tabs>
	</section>
</template>
<script>
  export default {
    name: 'inService',
  }
</script>

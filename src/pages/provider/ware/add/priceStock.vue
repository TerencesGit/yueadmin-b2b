<template>
	<section>
		<full-calendar :events="fcEvents" first-day='0' 
      @changeMonth="changeMonth" 
      @dayClick="dayClick">
    </full-calendar>
	</section>
</template>
<script>
	let demoEvents = [
    {
      start: '2017-06-06',
      price: '18000.00',
      stock: '100'
    },
    {
      start: '2017-06-07',
      price: '18000.00',
      stock: '100'
    },
    {
      start: '2017-06-08',
      price: '18000.00',
      stock: '100'
    },
    {
      start: '2017-06-09',
      price: '18000.00',
      stock: '100'
    },
    {
      start: '2017-06-10',
      price: '18000.00',
      stock: '100'
    },
    {
      start: '2017-05-30',
      price: '18000',
      stock: '100'
    },
  ];
  export default {
  	data () {
  		return {
  			fcEvents : demoEvents
  		}
  	},
  	methods: {
  		changeMonth (start, end, current) {
	      console.log('changeMonth', start.format(), end.format(), current.format())
	    },
	    dayClick (day, event) {
	      console.log(event)
	    },
  	},
  	mounted () {
			this.$store.dispatch('setStepActive', 5)
		}
  }
</script>
<template>
	<view>
		血压统计图{{uid}}
	</view>
</template>

<script>
	export default {
		data() {
			return {
				uid:null
				
			}
		},
		methods: {
			
		},
		created() {
			
		},
		 mounted: function() {
			this.uid = this.$yroute.query.id
		}
	}
</script>

<style>

</style>

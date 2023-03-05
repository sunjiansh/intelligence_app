<template>
	<view v-html="content">
		
	</view>
</template>

<script>
	import{getHealthArticle} from "@/api/systemsetting.js"
	export default {
		data() {
			return {
				id:null,
				title:'',
				content:''
			}
		},
		mounted() {
			this.id = this.$yroute.query.id
			this.initData()
		},
		methods: {
			initData(){
				//this.dateStr = this.dateFormat("YYYY-mm-dd", this.dateObj)
				getHealthArticle(this.id).then(res => {
					if(res.data==null || res.data.length==0){
						uni.showToast({
						  title: '无数据',
						  icon: 'none',
						  duration: 2000,
						})
						return;
					}
					this.title = res.data.title
					this.content =res.data.content
				}).catch(err => {
					uni.showToast({
					  title: err.msg,
					  icon: 'none',
					  duration: 2000,
					})
					console.log(err);
				})
				
				uni.stopPullDownRefresh();
			},
			onPullDownRefresh() {
				this.initData()
			}
		}
	}
</script>

<style>

</style>

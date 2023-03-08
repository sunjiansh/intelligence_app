<template>
    <view>
       <view class="cu-bar bg-white solid-bottom">
			<view class="action">
				<text class="cuIcon-titles text-grey"></text> 心电图检测记录
			</view>
       </view>
	   
	   <view class="cu-list menu sm-border">
		   
		   <view class="cu-item" v-for="(item, index) in list" >
				<view class="content">
					<text class="cuIcon-btn text-green"></text>
					<text class="text-grey"> {{item.pushTime | dataFormat('YYYY-mm-dd HH:MM:SS')}}</text>
				</view>
				<view class="action">
					<button class="cu-btn round bg-green shadow" @click="downLoadFile(item.reportUrl)">
					<text class="cuIcon-down"></text>下载</button>
				</view>
			</view>
			
		</view>
	   
    </view>
</template>

<script>
	
	import{getEcgDataRecords} from "@/api/systemsetting.js"
	
    export default {
        data() {
            return {
				uid:null,
				list:[]
				
            };
        },
		filters: {
		    dataFormat: (date,fmt) => { // date表示要过滤的数据，fmt表示传入的参数
				let ret;
				date  = new Date(date)
				const opt = {
					"Y+": date.getFullYear().toString(),        // 年
					"m+": (date.getMonth() + 1).toString(),     // 月
					"d+": date.getDate().toString(),            // 日
					"H+": date.getHours().toString(),           // 时
					"M+": date.getMinutes().toString(),         // 分
					"S+": date.getSeconds().toString()          // 秒
					// 有其他格式化字符需求可以继续添加，必须转化成字符串
				};
				for (let k in opt) {
					ret = new RegExp("(" + k + ")").exec(fmt);
					if (ret) {
						fmt = fmt.replace(ret[1], (ret[1].length == 1) ? (opt[k]) : (opt[k].padStart(ret[1].length, "0")))
					};
				};
				return fmt;
		    }
		},
		mounted() {
			this.uid = this.$yroute.query.id
			this.getList()
		},
		methods:{
			getList(){
				getEcgDataRecords(this.uid).then(res => {
					if(res.data!=null){
						this.list = res.data
					}
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
			downLoadFile(url){
				console.error(url)
				uni.downloadFile({
					url: url,//下载地址接口返回
					success: (data) => {
						if (data.statusCode === 200) {
							//文件保存到本地
							uni.saveFile({
								tempFilePath: data.tempFilePath, //临时路径
								success: function(res) {
									uni.showToast({
										icon: 'none',
										mask: true,
										title: '文件已保存：' + res.savedFilePath, //保存路径
										duration: 3000,
									});
									setTimeout(() => {
										//打开文档查看
										uni.openDocument({
											filePath: res.savedFilePath,
											success: function(res) {
												 console.log('打开文档成功');
											}
										});
									}, 3000)
								}
							});
						}
					},
					fail: (err) => {
						console.log(err);
						uni.showToast({
							icon: 'none',
							mask: true,
							title: '失败请重新下载',
						});
					},
				});
			},
			onPullDownRefresh() {
				this.getList()
			}
		}
		
		
    }
</script>


<style lang="less">
@import '/components/colorui/icon.css';
@import '/components/colorui/main.css';
</style>
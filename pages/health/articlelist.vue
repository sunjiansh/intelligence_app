<template>
	
<view class="address-management" ref="container">
	  <view class="item" v-for="(item, index) in list" >
	    <view class="address">
	      <view class="consignee">
	        <text class="">{{ item.title }}</text>
	      </view>
	      <view v-html="item.content.slice(0, 50)">
	       
	      </view>
	    </view>
		
	    <view class="operation acea-row row-between-wrapper">
			
	      <view class="select-btn">
	        <view class="checkbox-wrapper">
	          {{item.createTime | dataFormat('YYYY-mm-dd HH:MM:SS')}}
	        </view>
	      </view>
		  
	      <view class="acea-row row-middle">
	        <view @click="openArticle(item.id)">
	          <text class="iconfont icon-bianji"></text>详情
	        </view>
	       <!-- <view @click="del(item.id)">
	          <text class="iconfont icon-shanchu"></text>删除
	        </view> -->
	      </view>
	    </view>
		
	  </view>
  
    <view style="height:100rpx;"></view>
  
 <!-- <view class="footer acea-row row-between-wrapper">
	<mt-button type="primary" size="large" @click.native="add">新增电子围栏</mt-button>
  </view> -->

</view>
	
</template>

<script>
	
	import { getUserInfo} from '@/api/user'
	import{getHealthArticlePage} from "@/api/systemsetting.js"
	//import { Toast,MessageBox } from 'mint-ui';

	
	export default {
		data() {
			return {
				allLoaded:true,
				start:0,
				pageSize:10,
				list:[]
			}
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
			this.queryList()
		},
		methods: {
			getUserInfo: function() {
			  let that = this
			  getUserInfo().then(res => {
				//alert(res.data.imei)
				//that.yphone = res.data.phone
			    //that.phone = that.yphone.replace(reg, '$1****$2')
			  })
			},
			queryList(){
				this.list = []
				getHealthArticlePage(this.start,this.pageSize).then(res => {
					//数据加载完成
					//this.$refs.loadmore.onTopLoaded()
					if(res!=null){
						for(let i=0;i<res.length;i++){
							let data = res[i]
							console.error(data)
						
						}
					}
					
					
					this.list = res.data
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
			loadTop() {
				this.queryList()
			 // this.$refs.loadmore.queryList();
			},
			openArticle(id){
				this.$yrouter.push({
				  path: "/pages/health/articledetail",
				  query: { id: id }
				});
			},
			onLoad: function (options) {
				// setTimeout(function () {
				// 	console.log('start pulldown');
				// }, 1000);
				//uni.startPullDownRefresh();
			},
			onPullDownRefresh() {
				this.queryList()
			}
		}
	}
</script>

<style scoped lang="less">
	.address-management.on {
	  background-color: #fff;
	  height: 100vh;
	}
</style>

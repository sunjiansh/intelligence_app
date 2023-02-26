<template>
	
<view class="address-management" ref="container">
	<mt-loadmore :top-method="loadTop"  ref="loadmore">
	  <view class="item" v-for="(item, index) in list" >
	    <view class="address">
	      <view class="consignee">
	        名称：
	        <text class="phone">{{ item.name }}</text>
	      </view>
	      <view>
	        IMEI：{{ item.imei }}
	      </view>
		  <view>
		    型号：{{ item.model }}
		  </view>
	    </view>
		
	    <view class="operation acea-row row-between-wrapper">
			
	      <view class="select-btn">
	        <!-- <view class="checkbox-wrapper">
	          <checkbox-group @change="">
	            <label class="well-check">
	              <checkbox :value="item.isDefault==1?'checked':''" :checked="item.isDefault||item.isDefault=='1' ? true : false"></checkbox>
	              <text class="default">设为默认</text>
	            </label>
	          </checkbox-group>
	        </view> -->
	      </view>
		  
	      <view class="acea-row row-middle">
	        <view @click="edit(item.id)">
	          <text class="iconfont icon-bianji"></text>设置
	        </view>
	       <!-- <view @click="del(item.id)">
	          <text class="iconfont icon-shanchu"></text>删除
	        </view> -->
	      </view>
	    </view>
		
	  </view>
  </mt-loadmore>
  
    <view style="height:100rpx;"></view>
  
 <!-- <view class="footer acea-row row-between-wrapper">
	<mt-button type="primary" size="large" @click.native="add">新增电子围栏</mt-button>
  </view> -->

</view>
	
</template>

<script>
	
	import { getUserInfo} from '@/api/user'
	import{getDWatchs} from "@/api/systemsetting.js"
	import { Toast,MessageBox } from 'mint-ui';

	
	export default {
		data() {
			return {
				allLoaded:true,
				list:[]
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
				getDWatchs().then(res => {
					//数据加载完成
					this.$refs.loadmore.onTopLoaded()
					this.list = res.data
				}).catch(err => {
					console.log(err);
				})
				uni.stopPullDownRefresh();
			},
			loadTop() {
				this.queryList()
			 // this.$refs.loadmore.queryList();
			},
			edit(id){
				this.$yrouter.push({
				  path: "/pages/systemsetting/watch/temperature",
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

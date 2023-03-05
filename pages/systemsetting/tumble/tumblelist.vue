<template>
	
<view class="address-management" ref="container">
	  <view class="item" v-for="(item, addressListIndex) in list" >
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
  
    <view style="height:100rpx;"></view>
  
 <!-- <view class="footer acea-row row-between-wrapper">
	<mt-button type="primary" size="large" @click.native="add">新增电子围栏</mt-button>
  </view> -->

</view>
	
</template>

<script>
	
	import { getUserInfo} from '@/api/user'
	import{getDTumbles,delDTumble} from "@/api/systemsetting.js"
	//import { Toast,MessageBox } from 'mint-ui';

	
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
				getDTumbles().then(res => {
					//数据加载完成
					//this.$refs.loadmore.onTopLoaded()
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
			add(){
				this.$yrouter.push({
				  path: "/pages/systemsetting/tumble/tumble"
				});
			},
			edit(id){
				this.$yrouter.push({
				  path: "/pages/systemsetting/tumble/tumble",
				  query: { id: id }
				});
			},
			del(id){
				
				uni.showModal({
				  title: "确定要删除?",
				  //content: "注意:请务必核对核销码的与客户正确性",
				  success(res) {
					if (res.confirm) {
						delDTumble([id]).then(res => {
							uni.showToast({
							  title: '删除成功',
							  icon: 'success',
							  duration: 2000,
							})
							this.queryList()
						}).catch(err => {
							console.log(err);
						})
					}
				  }
				});
				
				// MessageBox.confirm('确定要删除?').then(action => {
				//   delDTumble([id]).then(res => {
				// 	Toast({message: '删除成功',iconClass: 'icon icon-success'});
				//   	this.queryList()
				//   }).catch(err => {
				//   	console.log(err);
				//   })
				// });
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

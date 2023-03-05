<template>
	
	<view class="address-management">
		<view class="item">
			<view style="font-size: 20px;font-weight:bold">
				通常设置为   23:00 - 08:00
			</view>
			<br>
			<br>
			<view class="address">
				<view class="consignee">
					就寝时间：
					<!-- <text style="float: right;">{{form.sleepTimeStartStr}}</text> -->
					<picker style="float: right;" mode="time" :value="form.sleepTimeStartStr"  @change="setSleepTimeStartStr">
						<view class="uni-input">{{form.sleepTimeStartStr}}</view>
					</picker>
				</view>
			</view>
			<view class="operation acea-row row-between-wrapper">
				<view class="acea-row row-middle">
					
					<!-- <template>
					  <mt-datetime-picker
					    ref="sleepTimeStartPicker"
					    type="time"
					    v-model="form.sleepTimeStartStr">
					  </mt-datetime-picker>
					</template> -->
				</view>
				<view class="select-btn">
				</view>
				<view class="acea-row row-middle">
				 <!-- <view @click="openTimeStartPicker()">
				    <text class="iconfont icon-bianji"></text>设置时间
				  </view> -->
				</view>
			</view>
	    </view>
		
		<view class="item">
			<view class="address">
				<view class="consignee">
					起床时间：
					<!-- <text style="float: right;">{{form.sleepTimeEndStr}}</text> -->
					<picker style="float: right;" mode="time" :value="form.sleepTimeEndStr"  @change="setSleepTimeEndStr">
						<view class="uni-input">{{form.sleepTimeEndStr}}</view>
					</picker>
				</view>
			</view>
			<view class="operation acea-row row-between-wrapper">
				<view class="acea-row row-middle">
					
					<!-- <template>
					  <mt-datetime-picker
					    ref="sleepTimeEndPicker"
					    type="time"
					    v-model="form.sleepTimeEndStr">
					  </mt-datetime-picker>
					</template>
					 -->
				</view>
				<view class="select-btn">
				</view>
				<view class="acea-row row-middle">
				 <!-- <view @click="openTimeEndPicker()">
				    <text class="iconfont icon-bianji"></text>设置时间
				  </view> -->
				</view>
			</view>
		</view>
			
	    <view style="height:100rpx;"></view>
	  
		<view class="footer acea-row row-between-wrapper">
			<!-- <mt-button type="default" style="width:50%"  @click.native="goBack()" >取消</mt-button>
			<mt-button type="primary" @click.native="configSleep" style="width:50%">保存</mt-button> -->
			<tui-button height="100rpx" :size="26" type="warning" shape="circle" @click.native="configSleep">保存</tui-button>
		</view>
	
	</view>
	
	
</template>

<script>
	
	import { getUserInfo} from '@/api/user'
	import{configSleep,getDWatchById} from "@/api/systemsetting.js"
	//import { Toast,Range,DatetimePicker  } from 'mint-ui';

	
	export default {
		data() {
			return {
				form:{
					id:null,
					imei:null,
					sleepTimeStartStr:null,
					sleepTimeEndStr:null
				}
			}
		},
		mounted() {
			 let id = this.$yroute.query.id
			 if(id){
				 getDWatchById(id).then(res => {
					this.form = res.data
				}).catch(err => {
					uni.showToast({
					  title: err.msg,
					  icon: 'none',
					  duration: 2000,
					})
					console.log(err);
				})
			 }
					 
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
			openTimeStartPicker(){
				//this.$refs.sleepTimeStartPicker.open();
			},
			openTimeEndPicker(){
				//this.$refs.sleepTimeEndPicker.open();
			},
			setSleepTimeStartStr(e){
				this.form.sleepTimeStartStr = e.detail.value
			},
			setSleepTimeEndStr(e){
				this.form.sleepTimeEndStr = e.detail.value
			},
			configSleep(){
				//update
				if(this.form.sleepTimeStartStr == null ||  this.form.sleepTimeEndStr == null){
					uni.showToast({
					  title: '请正确配置睡眠监测时间',
					  icon: 'none',
					  duration: 2000,
					})
					return;
				}
				configSleep(this.form).then(res => {
					//Toast({message: '设置成功',iconClass: 'icon icon-success'});
					//this.$router.back()
					uni.showToast({
					  title: '设置成功',
					  icon: 'success',
					  duration: 2000,
					})
					setTimeout(() => this.$router.back(), 300);
				}).catch(err => {
					uni.showToast({
					  title: err.msg,
					  icon: 'none',
					  duration: 2000,
					})
					console.log(err);
				})
			},
			goBack(){
				setTimeout(() => this.$router.back(), 300);
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

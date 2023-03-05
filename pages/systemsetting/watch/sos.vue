<template>
	
	<view class="address-management">
		<view class="item">
			<view class="address">
				<view style="font-size: 20px;font-weight:bold">
					设备使用SOS功能时会依次拨打下列号码
				</view>
				<view>
					可设置三个号，当第一个未接通时，将会继续拨打第二个号码，以此类推
					<text style="float: right;"></text>
				</view>
			</view>
		</view>
		
		
		<view class="item">
			<view class="address">
				<view class="consignee">
					第一个号码：
					<text style="float: right;"></text>
				</view>
			</view>
			<view class="operation acea-row row-between-wrapper">
				<view class="acea-row row-middle">
					<!-- <mt-field placeholder="请输入手机号" type="tel" v-model="tel1"></mt-field> -->
					<input class="uni-input" name="input" type="number" v-model="tel1" placeholder="请输入手机号" />
				</view>
			</view>
	    </view>
		
		<view class="item">
			<view class="address">
				<view class="consignee">
					第二个号码：
					<text style="float: right;"></text>
				</view>
			</view>
			<view class="operation acea-row row-between-wrapper">
				<view class="acea-row row-middle">
					<!-- <mt-field placeholder="请输入手机号" type="tel" v-model="tel2"></mt-field> -->
					<input class="uni-input" name="input" type="number" v-model="tel2" placeholder="请输入手机号" />
				</view>
			</view>
		</view>
	
	  <view class="item">
	  	<view class="address">
	  		<view class="consignee">
	  			第三个号码：
	  			<text style="float: right;"></text>
	  		</view>
	  	</view>
	  	<view class="operation acea-row row-between-wrapper">
	  		<view class="acea-row row-middle">
	  			<!-- <mt-field placeholder="请输入手机号" type="tel" v-model="tel3"></mt-field> -->
				<input class="uni-input" name="input" type="number" v-model="tel3" placeholder="请输入手机号" />
	  		</view>
	  	</view>
	  </view>
	  
	  
	    <view style="height:100rpx;"></view>
	  
		<view class="footer acea-row row-between-wrapper">
			<!-- <mt-button type="default" style="width:50%"  @click.native="goBack()" >取消</mt-button>
			<mt-button type="primary" @click.native="configSOS" style="width:50%">保存</mt-button> -->
			<tui-button height="100rpx" :size="26" type="warning" shape="circle" @click.native="configSOS">保存</tui-button>
		</view>
	
	</view>
	
	
</template>

<script>
	
	import { getUserInfo} from '@/api/user'
	import{configSOS,getDWatchById} from "@/api/systemsetting.js"
	//import { Toast,Range } from 'mint-ui';

	
	export default {
		data() {
			return {
				form:{
					id:null,
					imei:null,
					sos:null
				},
				tel1:'',
				tel2:'',
				tel3:''
			}
		},
		mounted() {
			 let id = this.$yroute.query.id
			 if(id){
				 getDWatchById(id).then(res => {
					this.form = res.data
					if(this.form.sos != null){
						let telArr = this.form.sos.split(",")
						this.tel1 = telArr[0]
						this.tel2 = telArr[1]
						this.tel3 = telArr[2]
					}
					
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
			configSOS(){
				//update
				// if(this.form.calibrateDbp == null || this.form.calibrateSbp == null){
				// 	return
				// }
				this.form.sos = this.tel1+","+this.tel2+","+this.tel3
				
				configSOS(this.form).then(res => {
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

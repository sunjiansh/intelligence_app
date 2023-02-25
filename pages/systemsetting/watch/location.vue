<template>
	<view class="address-management">
		<view class="item">
			<view class="address">
				<view class="consignee">
				定位时间间隔：
					<text style="float: right;">{{form.location / 60}}分钟</text>
				</view>
				<view>
					<mt-range
					  v-model="form.location"
					  :min="300"
					  :max="6000"
					  :step="30"
					  :bar-height="5"
					  >
					</mt-range>
				</view>
			</view>
			<view class="operation acea-row row-between-wrapper">
				<view class="acea-row row-middle">
					可设置范围：{{300/60}} - {{6000/60}} 分钟
				</view>
			</view>
		</view>
		
	  
	    <view style="height:100rpx;"></view>
	  
		<view class="footer acea-row row-between-wrapper">
			<mt-button type="default" style="width:50%"  @click.native="goBack()" >取消</mt-button>
			<mt-button type="primary" @click.native="configLocation" style="width:50%">保存</mt-button>
		</view>
	
	</view>
</template>

<script>
	
	import { getUserInfo} from '@/api/user'
	import{configLocation,getDWatchById} from "@/api/systemsetting.js"
	import { Toast,Range } from 'mint-ui';

	
	export default {
		data() {
			return {
				form:{
					id:null,
					imei:null,
					location:null
				}
			}
		},
		mounted() {
			 let id = this.$yroute.query.id
			 if(id){
				 getDWatchById(id).then(res => {
					this.form = res.data
				}).catch(err => {
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
			configLocation(){
				//update
				configLocation(this.form).then(res => {
					Toast({message: '修改成功',iconClass: 'icon icon-success'});
					//this.$router.back()
					setTimeout(() => this.$router.back(), 300);
				}).catch(err => {
					let instance = Toast(err.msg);
					setTimeout(() => {
					  instance.close();
					}, 2000);
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

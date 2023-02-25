<template>
	<!-- <view>
		<view class="address-management" ref="container">
			<view class="address">
				<view class="consignee">
					<mt-field label="ID" v-if="false" v-model="form.id"></mt-field>
					<view style="text-align: center;">
						测量间隔{{form.bldstart / 60}}分钟
					</view>
					<mt-range
					  v-model="form.bldstart"
					  :min="300"
					  :max="6000"
					  :step="30"
					  :bar-height="5"
					  >
					</mt-range>
					可设置范围：{{300/60}} - {{6000/60}} 分钟
				</view>
			</view>
		</view>
			
		 <view style="height:100rpx;"></view>
		 
		<view class="footer acea-row row-between-wrapper">
			<mt-button type="default" style="width:50%"  @click.native="goBack()" >取消</mt-button>
			<mt-button type="primary" @click.native="save" style="width:50%">保存</mt-button>
		</view>
	</view> -->
	
	<view class="address-management">
		<view class="item">设置心率、血压、血氧上传频率
			<view class="address">
				<view class="consignee">
				测量间隔：
					<text style="float: right;">{{form.bldstart / 60}}分钟</text>
				</view>
				<view>
					<mt-range
					  v-model="form.bldstart"
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
		
		<view class="item">
			<view class="address">
				<view class="consignee">
				最高心率预警值：
					<text style="float: right;">{{form.hrHeight}}次/分</text>
				</view>
				<view>
					<mt-range
					  v-model="form.hrHeight"
					  :min="50"
					  :max="160"
					  :step="1"
					  :bar-height="5"
					  >
					</mt-range>
				</view>
			</view>
			<view class="operation acea-row row-between-wrapper">
				<view class="acea-row row-middle">
					可设置范围：50 - 160 次/分
				</view>
			</view>
		</view>
		
		<view class="item">
			<view class="address">
				<view class="consignee">
				最低心率预警值：
					<text style="float: right;">{{form.hrLow}}次/分</text>
				</view>
				<view>
					<mt-range
					  v-model="form.hrLow"
					  :min="50"
					  :max="160"
					  :step="1"
					  :bar-height="5"
					  >
					</mt-range>
				</view>
			</view>
			<view class="operation acea-row row-between-wrapper">
				<view class="acea-row row-middle">
					可设置范围：50 - 160 次/分
				</view>
			</view>
		</view>
		
	
	 <view class="item">
	  	<view class="address">
	  		<view class="consignee">
	  		高压预警值：
	  			<text style="float: right;">{{form.calibrateSbp}}mmHg</text>
	  		</view>
	  		<view>
	  			<mt-range
	  			  v-model="form.calibrateSbp"
	  			  :min="50"
	  			  :max="160"
	  			  :step="1"
	  			  :bar-height="5"
	  			  >
	  			</mt-range>
	  		</view>
	  	</view>
	  	<view class="operation acea-row row-between-wrapper">
	  		<view class="acea-row row-middle">
	  			可设置范围：50 - 160 mmHg
	  		</view>
	  	</view>
	  </view>
	  
	  <view class="item">
	  	<view class="address">
	  		<view class="consignee">
	  		低压预警值：
	  			<text style="float: right;">{{form.calibrateDbp}}mmHg</text>
	  		</view>
	  		<view>
	  			<mt-range
	  			  v-model="form.calibrateDbp"
	  			  :min="50"
	  			  :max="160"
	  			  :step="1"
	  			  :bar-height="5"
	  			  >
	  			</mt-range>
	  		</view>
	  	</view>
	  	<view class="operation acea-row row-between-wrapper">
	  		<view class="acea-row row-middle">
	  			可设置范围：50 - 160 mmHg
	  		</view>
	  	</view>
	  </view>
	  
	  
	    <view style="height:100rpx;"></view>
	  
		<view class="footer acea-row row-between-wrapper">
			<mt-button type="default" style="width:50%"  @click.native="goBack()" >取消</mt-button>
			<mt-button type="primary" @click.native="configHr" style="width:50%">保存</mt-button>
		</view>
	
	</view>
	
	
</template>

<script>
	
	import { getUserInfo} from '@/api/user'
	import{configHr,getDWatchById} from "@/api/systemsetting.js"
	import { Toast,Range } from 'mint-ui';

	
	export default {
		data() {
			return {
				form:{
					id:null,
					imei:null,
					bldstart:5,
					calibrateSbp:null,
					calibrateDbp:null,
					hrHeight:null,
					hrLow:null
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
			configHr(){
				//update
				// if(this.form.calibrateDbp == null || this.form.calibrateSbp == null){
				// 	return
				// }
				
				if(this.form.hrHeight <= this.form.hrLow){
					let instance = Toast("最高心率要大于最低心率");
					setTimeout(() => {
					  instance.close();
					}, 2000);
					return;
				}
				
				configHr(this.form).then(res => {
					Toast({message: '设置成功',iconClass: 'icon icon-success'});
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

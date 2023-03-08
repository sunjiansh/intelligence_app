<template>
	<view class="address-management">
		<view class="item">
			<view class="address">
				<view class="consignee">
				安装高度：
					<text style="float: right;">{{form.height}}厘米</text>
				</view>
				<view>
					<!-- <mt-range
					  v-model="form.height"
					  :min="200"
					  :max="300"
					  :step="5"
					  :bar-height="5"
					  >
					</mt-range> -->
					<slider :value="form.height" :min="200" :max="300" step="5"  @change="setHeight" />
				</view>
			</view>
			<view class="operation acea-row row-between-wrapper">
				<view class="acea-row row-middle">
					可设置范围：200-300 厘米
				</view>
			</view>
		</view>
		
	  
	    <view style="height:100rpx;"></view>
	  
		<view class="footer acea-row row-between-wrapper">
		<!-- 	<mt-button type="default" style="width:50%"  @click.native="goBack()" >取消</mt-button>
			<mt-button type="primary" @click.native="editDTumble" style="width:50%">保存</mt-button> -->
			<tui-button height="100rpx" :size="26" type="warning" shape="circle" @click.native="editDTumble">保存</tui-button>
		</view>
	
	</view>
</template>

<script>
	
	import { getUserInfo} from '@/api/user'
	import{editDTumble,getDTumbleById} from "@/api/systemsetting.js"
	//import { Toast,Range } from 'mint-ui';

	
	export default {
		data() {
			return {
				h:100,
				form:{
					id:null,
					imei:null,
					height:null
				}
			}
		},
		mounted() {
			 let id = this.$yroute.query.id
			 if(id){
				 getDTumbleById(id).then(res => {
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
			editDTumble(){
				//update
				editDTumble(this.form).then(res => {
					//Toast({message: '修改成功',iconClass: 'icon icon-success'});
					//this.$router.back()
					uni.showToast({
					  title: '修改成功',
					  icon: 'success',
					  duration: 2000,
					})
					this.goBack()
				}).catch(err => {
					uni.showToast({
					  title: err.msg,
					  icon: 'none',
					  duration: 2000,
					})
					console.log(err);
				})
			},
			setHeight(e){
				this.form.height = e.detail.value
			},
			goBack(){
				setTimeout(() => uni.navigateBack(), 300);
				//setTimeout(() => this.$router.back(), 300);
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

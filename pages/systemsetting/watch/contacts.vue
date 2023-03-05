<template>
	
	<view class="address-management">
		
		<view class="item" v-for="(item, index) in list" >
			<view class="address">
				<view class="uni-form-item uni-column consignee">
					<!-- <mt-field label="姓名" placeholder="请输入用户名" v-model="item.name"></mt-field> -->
					<input class="uni-input" name="input"  v-model="item.name" placeholder="请输入用户名" />
				</view>
				<view class="uni-form-item uni-column">
					<!-- <mt-field label="手机号" placeholder="请输入手机号" type="tel" v-model="item.phone"></mt-field> -->
					<input class="uni-input" name="input" type="number" v-model="item.phone" placeholder="请输入手机号" />
				</view>
			</view>
			<view class="operation acea-row row-between-wrapper">
				<view></view>
				<view class="acea-row row-middle">
					<view @click="delItem(item,index)">
					  <text class="iconfont icon-shanchu"></text>删除
					</view>
				</view>
			</view>
	    </view>
		<view>
			<!-- <mt-button type="primary" size="large" @click.native="addItem">新增联系人</mt-button> -->
			<tui-button height="100rpx" width="100rpx"  type="green" shape="circle" @click.native="addItem" style="font-size: 30px;">+</tui-button>
		</view>
	  
	    <view style="height:100rpx;"></view>
		<view class="footer acea-row row-between-wrapper">
			<!-- <mt-button type="default" style="width:50%"  @click.native="goBack()" >取消</mt-button>
			<mt-button type="primary" @click.native="configContacts" style="width:50%">保存</mt-button> -->
			<tui-button height="100rpx" :size="26" type="warning" shape="circle" @click.native="configContacts">保存</tui-button>
		</view>
	
	</view>
	
	
</template>

<script>
	
	import { getUserInfo} from '@/api/user'
	import{configContacts,getDWatchById} from "@/api/systemsetting.js"
	//import { Toast,Range } from 'mint-ui';

	
	export default {
		data() {
			return {
				form:{
					id:null,
					imei:null,
					whiteListStr:null
				},
				list:[{'name':'xxxx','phone':'1112255'}]
				
			}
		},
		mounted() {
			 let id = this.$yroute.query.id
			 if(id){
				 getDWatchById(id).then(res => {
					this.form = res.data
					if(this.form.whiteListStr != null){
						this.list = []
						let telArr = this.form.whiteListStr.split(",")
						for (let i = 0; i < telArr.length; i++) {
							let name = telArr[i].split("|")[0]
							let phone = telArr[i].split("|")[1]
							this.list.push({'name':name,'phone':phone})
						}
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
			addItem(){
				this.list.push({
					name: "",
					phone: ""
				  });
			},
			delItem(item, index){
				this.list.splice(index, 1);
			},
			configContacts(){
				let tempArr = []
				for(let i=0;i<this.list.length;i++){
					let contStr = this.list[i].name+"|"+this.list[i].phone
					tempArr.push(contStr)
				}
				//alert(tempArr.join((',')))
				this.form.whiteListStr = tempArr.join((','))
				configContacts(this.form).then(res => {
					//Toast({message: '设置成功',iconClass: 'icon icon-success'});
					uni.showToast({
					  title: '设置成功',
					  icon: 'success',
					  duration: 2000,
					})
					//this.$router.back()
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

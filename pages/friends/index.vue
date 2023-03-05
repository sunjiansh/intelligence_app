<template>
	<view class="address-management" ref="container">
			<view class="item" v-for="(item, index) in list" >
				<view class="address">
					<!-- <view class="consignee">
						<mt-field label="称呼" placeholder="" :disabled="true" v-model="item.label"></mt-field>
						
					</view>
					<view>
						<mt-field label="手机号" placeholder="" type="tel" v-model="item.phone" :disabled="true"></mt-field>
					</view> -->
					
					<view class="uni-form-item uni-column">
						<input class="uni-input" name="input" :disabled="true" v-model="item.label" placeholder="" />
					</view>
					<view class="uni-form-item uni-column">
						<input class="uni-input" name="input" :disabled="true" v-model="item.phone" placeholder="" />
					</view>
					
				</view>
				<view class="operation acea-row row-between-wrapper">
					<view></view>
					<view class="acea-row row-middle">
						<view @click="delItem(item.id)">
						  <text class="iconfont icon-shanchu"></text>删除
						</view>
					</view>
				</view>
			</view>
		<view style="height:100rpx;"></view>
		
		<tui-button height="100rpx" :size="26" type="warning" shape="circle" @click.native="addItem">
		    添加好友
		</tui-button>
		
		<!-- <view class="footer acea-row row-between-wrapper">
			 <mt-palette-button content="+"
			   direction="rt" class="pb" :radius="80" ref="target_1" mainButtonStyle="color:#fff;background-color:#26a2ff;" 
						 style="left:30px;bottom: 60px;" @click.native="addItem">
						  <div class="my-icon-button"></div>
			 </mt-palette-button>
		</view> -->
	
	</view>
</template>

<script>
	
	import { getUserInfo} from '@/api/user'
	import{getFriendList,deleteFriendById} from "@/api/systemsetting.js"
	//import { Toast,PaletteButton,MessageBox,Loadmore} from 'mint-ui';
	
	
	export default {
		data() {
			return {
				form:{
					id:null,
					label:null,
					mainUid:null,
					friendUid:null,
					phone:null
				},
				//list:[{'label':'xxxx','phone':'1112255'}]
				list:[]
			}
		},
		watch: {
		 
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
			addItem(){
				this.$yrouter.push({path: '/pages/friends/add'})
			},
			delItem(id){
				uni.showModal({
				  title: "确定要删除?",
				  //content: "注意:请务必核对核销码的与客户正确性",
				  success(res) {
					if (res.confirm) {
						deleteFriendById([id]).then(res => {
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
				//   deleteFriendById([id]).then(res => {
				// 	Toast({message: '删除成功',iconClass: 'icon icon-success'});
				//   	this.queryList()
				//   }).catch(err => {
				//   	console.log(err);
				//   })
				// });
			},
			queryList(){
				getFriendList().then(res => {
					//this.$refs.loadmore.onTopLoaded()
					this.list = res.data
				}).catch(err => {
					console.log(err);
				})
				uni.stopPullDownRefresh();
			},
			loadTop() {
				this.queryList()
			},
			goBack(){
				setTimeout(() => this.$router.back(), 300);
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
	
	.uni-form-item .title {
		padding: 20rpx 0;
		font-size: 18px;
	}
</style>

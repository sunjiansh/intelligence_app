<template>
	<view class="address-management" ref="container">
			<!-- <view class="item" v-for="(item, index) in list" >
				<view class="address">
					<view class="uni-form-item uni-column">
						<input class="uni-input" name="input" :disabled="true" v-model="item.label" placeholder="" />
					</view>
					<view class="uni-form-item uni-column">
						<input class="uni-input" name="input" :disabled="true" v-model="item.phone" placeholder="" />
						<text class="lg text-gray cuIcon-phone" style="float: right;width: 20rpx;height: 20rpx;"></text>
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
			</view> -->
			<view class="cu-bar bg-white solid-bottom margin-top">
				<view class="action">
					<text class="cuIcon-title text-orange "></text> 好友列表
				</view>
			</view>
			<view class="cu-list menu-avatar">
				<view class="cu-item" :class="modalName=='move-box-'+ index?'move-cur':''" v-for="(item,index) in list" :key="index"
				@touchstart="ListTouchStart" @touchmove="ListTouchMove" @touchend="ListTouchEnd" :data-target="'move-box-' + index">
					<view class="content">
						<view class="text-black">{{item.label}}</view>
						<view class="text-gray text-lg">
							<text class="cuIcon-phone text-grey  margin-right-sm">{{item.phone}}</text> 
						</view>
					</view>
					<view class="action">
						<!-- <view class="text-grey text-xs">22:20</view>
						<view class="cu-tag round bg-grey sm">5</view> -->
					</view>
					<view class="move">
						<view class="bg-green" @click="call(item.phone)">拨打</view>
						<view class="bg-red" @click="delItem(item.id)">删除</view>
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
				list:[],
				modalName: null,
				listTouchStart: 0,
				listTouchDirection: null,
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
				setTimeout(() => uni.navigateBack(), 300);
				//setTimeout(() => this.$router.back(), 300);
			},
			onLoad: function (options) {
				// setTimeout(function () {
				// 	console.log('start pulldown');
				// }, 1000);
				//uni.startPullDownRefresh();
			},
			onPullDownRefresh() {
				this.queryList()
			},
			// ListTouch触摸开始
			ListTouchStart(e) {
				this.listTouchStart = e.touches[0].pageX
			},
			// ListTouch计算方向
			ListTouchMove(e) {
				this.listTouchDirection = e.touches[0].pageX - this.listTouchStart > 0 ? 'right' : 'left'
			},
			// ListTouch计算滚动
			ListTouchEnd(e) {
				if (this.listTouchDirection == 'left') {
					this.modalName = e.currentTarget.dataset.target
				} else {
					this.modalName = null
				}
				this.listTouchDirection = null
			},
			call(phone){
				//let phone = '‭123456789‬'
				  uni.makePhoneCall({
					phoneNumber:phone,
					success:function(){
						console.log('拨打电话成功');
					},
					fail() {
						console.log('打电话失败了');
					}
				})
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
	
	@import '/components/colorui/icon.css';
	@import '/components/colorui/main.css';
</style>

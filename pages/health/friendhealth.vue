<template>
	<view>
			<view class="user">
				  <view class="header acea-row row-between-wrapper" style="background-color: green;">
					<view class="picTxt acea-row row-between-wrapper">
					  <view class="pictrue">
						<image :src="userInfo.avatar" />
					  </view>
					  <view class="text">
						<view class="acea-row row-middle">
						  <view class="name line1">{{ userInfo.realName }}</view>
						  <view class="member acea-row row-middle" v-if="userInfo.vip">
							<image :src="userInfo.vipIcon" />
							<text>{{ userInfo.vipName }}</text>
						  </view>
						</view>
						<view @click="" class="id" v-if="userInfo.phone">
						  <text>{{userInfo.phone}}</text>
						</view>
						<view >
						  <text>
							  {{healthInfo}}
						  </text>
						</view>
					  </view>
					</view>
				  </view>
			</view>
		
			<scroll-view scroll-y class="page">
				<!-- <image src="https://cdn.nlark.com/yuque/0/2019/png/280374/1552996358228-assets/web-upload/e256b4ce-d9a4-488b-8da2-032747213982.png"
				 mode="widthFix" class="response"></image> -->
				<view class="nav-list">
					<navigator hover-class="none"  @click="goPageByPath(item.url)"  class="nav-li" navigateTo :class="'bg-'+item.color"
					 :style="[{animation: 'show ' + ((index+1)*0.2+1) + 's 1'}]" v-for="(item,index) in elements" :key="index">
						<view class="nav-title">{{item.title}}</view>
						<view class="nav-name">{{item.name}}</view>
						<text :class="'cuIcon-' + item.cuIcon" style="font-size: 25rpx;">{{item.time}}</text>
					</navigator>
				</view>
				<view class="cu-tabbar-height"></view>
			</scroll-view>
		</view>
	
	
</template>

<script>
	import { mapState, mapGetters } from 'vuex'
	import { getUserInfoById} from '@/api/user'
	import{getRiskStateById,getAllHealthRecordData} from "@/api/systemsetting.js"
	
	export default {
		components: {
			
		},
		data() {
			return {
				userInfo:{},
				healthInfo:null,
				elements: [{
						title: '血压',
						name: '无数据',
						color: 'cyan',
						//cuIcon: 'newsfill',
						time:'-/-',
						url:'/pages/health/bloodpressurecurve',
					},
					{
						title: '心率',
						name: '无数据',
						color: 'blue',
						time:'-/-',
						//cuIcon: 'colorlens',
						url:'/pages/health/heartratecurve',
					},
					{
						title: '血糖',
						name: '无数据',
						color: 'purple',
						time:'-/-',
						//cuIcon: 'font',
						url:'/pages/health/bloodsugarcurve',
					},
					{
						title: '尿酸 ',
						name: '无数据',
						color: 'mauve',
						time:'-/-',
						//cuIcon: 'cuIcon',
						url:'/pages/health/uricacidcurve',
					},
					{
						title: '跌倒',
						name: '无数据',
						color: 'pink',
						time:'-/-',
						//cuIcon: 'btn',
						url:'/pages/health/falldowncurve',
					},
					{
						title: '血脂',
						name: '无数据',
						color: 'brown',
						time:'-/-',
						//cuIcon: 'tagfill',
						url:'/pages/health/xxxx',
					},
					{
						title: '血氧',
						name: '无数据',
						color: 'red',
						time:'-/-',
						//cuIcon: 'myfill',
						url:'/pages/health/bloodoxygeoncurve',
					},
					{
						title: '睡眠',
						name: '无数据',
						color: 'orange',
						time:'-/-',
						//cuIcon: 'icloading',
						url:'/pages/health/sleepcurve',
					},
					{
						title: '脉搏',
						name: '无数据',
						color: 'olive',
						time:'-/-',
						//cuIcon: 'copy',
						url:'/pages/health/pulseratecurve',
					},
					{
						title: '体温',
						name: '无数据',
						color: 'green',
						time:'-/-',
						//cuIcon: 'loading2',
						url:'/pages/health/temperaturecurve',
					},
					{
						title: '体重',
						name: '无数据',
						color: 'yellow',
						time:'-/-',
						//cuIcon: 'copy',
						url:'/pages/health/weightcurve',
					},
					{
						title: '心电图',
						name: '无数据',
						color: 'grey',
						time:'-/-',
						//cuIcon: 'loading2',
						url:'/pages/health/ecgcurve',
					}
				],
			}
		},
		//computed: mapGetters(['userInfo']),
		methods: {
			goPageByPath(path){
				let uid = this.userInfo.uid;
				if(path=='/pages/health/xxxx'){
					uni.showToast({
					  title: '敬請期待',
					  icon: 'none',
					  duration: 2000,
					})
					return
				}
				
				
				this.$yrouter.push({
				  path: path,
				  query:{id:uid}
				})
			},
			dateFormat(fmt, date) {
				//this.dateStr = this.dateFormat("YYYY-mm-dd", this.dateObj)
				let ret;
				const opt = {
					"Y+": date.getFullYear().toString(),        // 年
					"m+": (date.getMonth() + 1).toString(),     // 月
					"d+": date.getDate().toString(),            // 日
					"H+": date.getHours().toString(),           // 时
					"M+": date.getMinutes().toString(),         // 分
					"S+": date.getSeconds().toString()          // 秒
					// 有其他格式化字符需求可以继续添加，必须转化成字符串
				};
				for (let k in opt) {
					ret = new RegExp("(" + k + ")").exec(fmt);
					if (ret) {
						fmt = fmt.replace(ret[1], (ret[1].length == 1) ? (opt[k]) : (opt[k].padStart(ret[1].length, "0")))
					};
				};
				return fmt;
			},
			getDateTime(time) {
				if (time >= 60 && time <= 3600) {
					//time = parseInt(time / 60) + "分" + time % 60 + "秒";
					time = parseInt(time / 60) + "分";
				}else {
					if (time > 3600) {
						//time = parseInt(time / 3600) + "小时" + parseInt(((time % 3600) / 60)) + "分" + time % 60 + "秒";
						time = parseInt(time / 3600) + "小时" + parseInt(((time % 3600) / 60)) + "分";
					}else {
						//time = time + "秒";
					}
				}
				return time;
			},
			initData(){
				let uid = this.userInfo.uid
				getUserInfoById(uid).then(res => {
					if(res.data==null || res.data.length==0){
						return;
					}
					this.userInfo = res.data
					this.getAllHealthRecordData(uid)
					this.getRiskStateById(uid)
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
			getRiskStateById(uid){
				getRiskStateById(uid).then(res => {
					if(res.data==null || res.data.length==0){
						// uni.showToast({
						//   title: '无数据',
						//   icon: 'none',
						//   duration: 2000,
						// })
						return;
					}
					this.healthInfo = res.data.riskGrades.join(',')				
				}).catch(err => {
					uni.showToast({
					  title: err.msg,
					  icon: 'none',
					  duration: 2000,
					})
					console.log(err);
				})
			},
			getAllHealthRecordData(uid){
				getAllHealthRecordData(uid).then(res => {
					if(res.data==null || res.data.length==0){
						uni.showToast({
						  title: '无数据',
						  icon: 'none',
						  duration: 2000,
						})
						return;
					}
					
					this.setData(res.data)
					
				}).catch(err => {
					uni.showToast({
					  title: err.msg,
					  icon: 'none',
					  duration: 2000,
					})
					console.log(err);
				})
			},
			setData(data){
				console.error(data)
				//console.error(this.dateFormat("YYYY/mm/dd", new Date(data.BLOODPREASURE.pushTime)))
				
				if(data.BLOODPREASURE != null){
					this.elements[0].name = data.BLOODPREASURE.dbp+'/'+data.BLOODPREASURE.sbp+'mmHg'
					this.elements[0].time = data.BLOODPREASURE.hourMinutes 
				}
				if(data.HEARTRATE != null){
					this.elements[1].name = data.HEARTRATE.heartRate+'次/分钟'
					this.elements[1].time = data.HEARTRATE.hourMinutes
				}
				if(data.BLOODSUGAR != null){
					this.elements[2].name = data.BLOODSUGAR.bloodSugar+'mmol/L'
					this.elements[2].time = data.BLOODSUGAR.hourMinutes 
				}
				if(data.URICACID != null){
					this.elements[3].name = data.URICACID.uricAcid+'μmol/L'
					this.elements[3].time = data.URICACID.hourMinutes 
				}
				if(data.FALLDOWN != null){
					this.elements[4].name = 1+'次'
					this.elements[4].time = data.FALLDOWN.hourMinutes 
				}
				//血脂
				// if(data.BLOODSUGAR != null){
				// 	this.elements[5].name = data.BLOODPREASURE.dbp+'/'+data.BLOODPREASURE.sbp+'mmHg'
				// 	this.elements[5].time = data.BLOODPREASURE.hourMinutes 
				// }
				if(data.OXYGEN != null){
					this.elements[6].name = data.OXYGEN.oxygen+'%'
					this.elements[6].time = data.OXYGEN.hourMinutes 
				}
				if(data.SLEEPRECORD != null){
					let day = this.dateFormat("mm/dd", new Date(data.SLEEPRECORD.pushTime))
					let allSleepTimeStr = this.getDateTime(data.SLEEPRECORD.allSleepTime)
					this.elements[7].name = allSleepTimeStr
					//this.elements[7].time = data.SLEEPRECORD.sleepDate 
					this.elements[7].time = day 
				}
				if(data.PULSERATE != null){
					this.elements[8].name = data.PULSERATE.pulseRate+'次/分钟'
					this.elements[8].time = data.PULSERATE.hourMinutes 
				}
				if(data.TEMPERATURE != null){
					this.elements[9].name = data.TEMPERATURE.temperature+'℃'
					this.elements[9].time = data.TEMPERATURE.hourMinutes
				}
				if(data.WEIGHT != null){
					this.elements[10].name = data.WEIGHT.bodyWeight+'kg'
					this.elements[10].time = data.WEIGHT.hourMinutes 
				}
				if(data.ECG != null){
					this.elements[11].name = data.ECG.averageHeartRate+'次/分钟'
					this.elements[11].time = data.ECG.hourMinutes 
				}
			},
			onPullDownRefresh() {
				this.initData()
			}
		},
		mounted() {
			let uid = this.$yroute.query.id
			console.error(uid)
			this.userInfo.uid = uid
			//this.getUserInfoById(uid)
			this.initData()
		}
	}
</script>

<style lang="less">
	
	.user .header:after {
		background-color: green
	}
	
@import '/components/colorui/animation.css';
@import '/components/colorui/icon.css';
@import '/components/colorui/main.css';
</style>


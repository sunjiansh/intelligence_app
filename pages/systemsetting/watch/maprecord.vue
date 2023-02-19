<template>
	<view id="map" style="height: 100%;">

	</view>
</template>

<script>
	
	import {initMap} from "@/utils/TMap"
	export default {
		data() {
			return {
				TXMap:null,
				tMap:null
			}
		},
		methods: {
			
		},
		mounted() {
			initMap().then((TMap) => {
				this.TXMap = TMap;
				let center = new TMap.LatLng(30, 119)
				this.tMap = new TMap.Map("map", {
				  center: center, //设置地图中心点坐标
				  zoom: 12, //设置地图缩放级别
				  //viewMode: "2D",
				});
				//取消显示缩放控件、旋转控件、比例尺控件
				this.tMap.removeControl(TMap.constants.DEFAULT_CONTROL_ID.ZOOM)
				this.tMap.removeControl(TMap.constants.DEFAULT_CONTROL_ID.ROTATION)
				this.tMap.removeControl(TMap.constants.DEFAULT_CONTROL_ID.SCALE)
			  })
		}
	}
</script>

<style scoped>
		.map{
			height: 100%;
			
		}
</style>

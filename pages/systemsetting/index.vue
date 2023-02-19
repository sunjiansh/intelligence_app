<template>
	<view>
		<mt-button style="default" size="large" @click.native="goPageByPath('/pages/systemsetting/watch/temperature')">体温测量设置</mt-button>
		<mt-button style="default" size="large" @click.native="goPageByPath('/pages/systemsetting/watch/hartrate')">心率上传设置</mt-button>
		<mt-button style="default" size="large" @click.native="goPageByPath('/pages/systemsetting/watch/contacts')">通讯录设置</mt-button>
		<mt-button style="default" size="large" @click.native="goPageByPath('/pages/systemsetting/watch/sos')">SOS设置</mt-button>
		<mt-button style="default" size="large" @click.native="goPageByPath('/pages/systemsetting/watch/sleep')">睡眠设置</mt-button>
		
		<mt-button style="default" size="large" @click.native="goPageByPath('/pages/systemsetting/watch/maprecord')">查看足迹</mt-button>
		<mt-button style="default" size="large" @click.native="goPageByPath('/pages/systemsetting/watch/geographylist')">电子围栏</mt-button>
	
		<mt-button style="default" size="large" @click.native="goPageByPath('/pages/systemsetting/tumble/tumblelist')">跌倒报警器设置</mt-button>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			goPageByPath(path){
				
				this.$yrouter.push({
				  path: path,
				})
			},
		}
	}
</script>

<style>

</style>

<template>
	<view>
		<view>
			<mt-field label="ID" v-if="false" v-model="form.id"></mt-field>
			<mt-field label="安装高度(单位:200~300cm)" placeholder="请输入数字" type="number" v-model="form.height"></mt-field>
		</view>
		<view>
			<mt-button type="default" style="width:50%">取消</mt-button>
			<mt-button type="primary" @click.native="save" style="width:50%">保存</mt-button>
		</view>
	</view>
	
</template>

<script>
	
	import { getUserInfo} from '@/api/user'
	import{editDTumble,getDTumbleById} from "@/api/systemsetting.js"
	import { Toast } from 'mint-ui';

	
	export default {
		data() {
			return {
				form:{
					id:null,
					imde:null,
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
			save(){
				//update
				editDTumble(this.form).then(res => {
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
			}
			
		}
	}
</script>

<style>
	
	
</style>

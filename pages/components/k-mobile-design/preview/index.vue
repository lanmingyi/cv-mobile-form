<!--
 * @Description: 预览界面
 * @Author: 黄婷
 * @Date: 2021-05-20 18:13:04
 * @LastEditTime: 2021-06-03 15:51:25
 * @LastEditors: 黄婷
 * @FilePath: \vue-antd-admine:\wwwroot\Vue\MisBoot\misboot-cloud-vue\src\components\TopVUI\k-portal-design\preview\index.vue
-->
<template>
<!-- 	<a-modal
		:showTitle="false"
		v-model="visible"
		@confirm="handleCancel"
		@cancel="handleCancel"
		:showConfirmButton="false"
		width="500px"
		:contentStyle="modalStyle"
		:maskCloseAble="true"
	>
		<build-modal :value="jsonData" @submit="handleSubmit" ref="KFormBuild" id="printKFormBuild" />
	</a-modal> -->
	<a-modal
		v-model="visible"
		width="340px"
		:footer="null"
		:closable="false"
		:bodyStyle="modalStyle"
	>
		<build-modal :value="jsonData" :formConfig="formConfig" @submit="handleSubmit" ref="KFormBuild" id="printKFormBuild" />
	</a-modal>
</template>
<script>
import buildModal from '../build/index.vue';
export default {
	name: 'KFormPreview',
	data() {
		return {
			visible: false,
			jsonData: {},
			modalStyle: {
				height: '1150upx',
				width: '600upx',
				margin: '0 auto',
				background: 'white',
				overflow: 'auto'
			}
		};
	},
	props: { data: { type: Object }, formConfig: {type: Object} },
	components: { buildModal },
	methods: {
		handleSubmit(p) {
			p.then((res) => {
				this.$refs.jsonModel.jsonData = res;
				this.$refs.jsonModel.visible = true;
			}).catch((err) => {
				console.log(err, '获取数据失败');
			});
		},
		handleGetData() {
			this.$refs.KFormBuild.getData()
				.then((res) => {
					this.$refs.jsonModel.jsonData = res;
					this.$refs.jsonModel.visible = true;
				})
				.catch((err) => {
					console.log(err, '获取数据失败');
				});
		}
	},
};
</script>
<style lang="less" scoped="scoped">
.pre-modal {
	.ant-modal-body {
		background: #f0f2f5 !important;
	}
}

// /deep/ .u-mode-center-box{
// 	background: rgba(255,255,255,0) !important;
// }
// /deep/ .u-model{
// 	background: rgba(255,255,255,0) !important;
// }
// /deep/ .u-border-top:after{
// 	border-top-width: 0;
// }
// /deep/ .u-drawer__scroll-view{
// 	background-image: url(../../../../static/img/iphoneBg.png);
// 	background-size: 780rpx;
// 	background-repeat: no-repeat;
// 	background-position: center;
// 	display: flex;
// 	justify-content: center;
// 	align-items: center;
// 	padding: 70px;
// 	box-sizing: border-box;
// }
// /deep/ .u-form-item{
// 	width: 100%;
// }

/deep/ .ant-modal-content{
	background-image: url(../../../../static/img/iphoneBg.png);
	background-size: 780rpx;
	background-repeat: no-repeat;
	background-position: center;
	display: flex;
	justify-content: center;
	align-items: center;
	padding: 110rpx 0;
	box-sizing: border-box;
	background-color: rgba(255,255,255,0);
	box-shadow: none;
}

/deep/ .ant-modal-body{
	padding: 10rpx !important;
}
</style>

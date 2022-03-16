<!--
 * @Description: APP拖拽设计界面
 * @Author: 黄婷
 * @Date: 2021-07-08 16:36:05
 * @LastEditTime: 2021-07-09 13:43:28
 * @LastEditors: 黄婷
 * @FilePath: \misboot-cloud-vue\src\pages\system\sysAppBasics\design.vue
-->
<template>
	<a-drawer class="t-drf123" :visible="visible" :closable="false" width="100%">
		<a-spin :spinning="loading" :delay="delayTime">
			<div class="flex design-header">
				<div class="left-step">
					<a-steps v-model="currentIndex" @change="setDataSource" size="default">
						<a-step title="表单设计" />
						<a-step title="列表设计" />
					</a-steps>
				</div>
				<div class="right-btn">
					<a-button class="cu-btn-primary" :icon="currentIndex === 0 ? 'right' : 'left'"
						@click="changeCurrentIndex">{{
						currentIndex === 0 ? '下一步' : '上一步'
					}}</a-button>
					<a-button class="cu-btn-primary" :disabled="currentIndex === 0" icon="check"
						@click="handleSubmitData" :loading="loading">确定</a-button>
					<a-button class="cu-btn-success" icon="close" @click="
							() => {
								$emit('cancel');
								activeKey = '1'
								$refs.customForm.data.list = []
								$refs.listPage.data = []
								$refs.listPage.selectedRowKeys = []
								$refs.customForm.selectItem = {key : ''}
								$refs.customForm.options = {}
							}
						">取消</a-button>
				</div>
			</div>
			<!-- 		<iframe
				v-if="currentIndex === 0"
				:src="`http://192.168.1.252:8080?token=${getTokenByUtils()}`"
				frameborder="no"
				style="width: 100%;height: calc(100vh - 56px);"
				scrolling="auto"
			></iframe> -->
			<custom-form style="height: calc(100vh - 56px);" ref="customForm" v-show="currentIndex === 0" :basicsUuid="basicsUuid"></custom-form>
			<list-page v-show="currentIndex === 1" ref="listPage" :activeKey="activeKey" :dataSource="dataSource"
				:dataField="dataField" :dataSearch="dataSearch" @activeKeyChange="e => activeKey = e" @dataChange="configDataChange"></list-page>
		</a-spin>
	</a-drawer>
</template>

<script>
	import listPage from './listPage';
	import customForm from '../components/k-mobile-design/index.vue'
	export default {
		components: {
			listPage,
			customForm
		},
		props: {
			visible: {
				type: Boolean,
				required: true,
			},
			model: {
				type: Object,
				default: () => null,
			},
			basicsUuid: {
				type: String,
				default: () => ''
			}
		},
		data() {
			return {
				fullscreen: true,
				currentIndex: 0,
				dataSource: [],
				dataField: [],
				dataSearch: [],
				activeKey: '1',
				loading: false,
				delayTime: 500,
				formData: []
			};
		},
		methods: {
			handleSubmitData() {
				this.$refs.listPage.getListData();
				let data = {
					...this.$refs.listPage.getListData()
				}
				if(data.listData.length<1){
					return this.$message.info('请选择列表字段', 1.5)
				}
				// data.formData = JSON.parse(this.$refs.customForm.getListData())
				if(JSON.stringify(this.formData) === '[]'){
					data.formData = JSON.parse(this.$refs.customForm.getListData())
				}else{
					data.formData = this.formData
				}
				let appDetailUuid = this.$refs.customForm.getAppDetailUuid()
				let url = ''
				let param = {
					listData: JSON.stringify(data.listData),
					// formData: JSON.stringify(this.formData) === '[]'?JSON.stringify(data.formData):JSON.stringify(this.formData),
					formData: JSON.stringify(data.formData),
					searchData: JSON.stringify(data.searchData),
					basicsUuid: this.basicsUuid
				}
				if (appDetailUuid) {
					url = '/system/sysAppDetailed/update'
					param.uuid = appDetailUuid
				} else {
					url = '/system/sysAppDetailed/save'
				}
				this.loading = true;
				this.$http.post(url, param).then((res) => {
					if (res.data.statusCode !== 300) {
						this.$message.success(res.data.message ? res.data.message : '操作成功！', 1.5);
						this.$emit('cancel');
						this.activeKey = '1'
						this.$refs.customForm.data.list = []
						this.$refs.listPage.data = []
						this.$refs.listPage.selectedRowKeys = []
						this.$refs.customForm.selectItem = {key : ''}
						this.$refs.customForm.options = {}
					} else {
						this.$message.error(res.data.message ? res.data.message : '操作失败！', 1.5)
					}
					this.loading = false;
				});
			},
			changeCurrentIndex() {
				this.currentIndex = this.currentIndex === 0 ? 1 : 0;
				this.setDataSource(this.currentIndex)
			},
			setDataSource(e) {
				this.activeKey = '1'
				if (e === 1) {
					this.dataSource = []
					this.dataField = []
					this.dataSearch = []
					this.$refs.listPage.selectedRowKeys = []
					this.$refs.listPage.selectedRowKeysSearch = []
					let data = JSON.parse(this.$refs.customForm.getListData())
					
					let configData = this.$refs.customForm.getConfigurationData()
					for (let i = 0; i < data.length; i++) {
						if (!data[i].options.name) {
							this.currentIndex = 0
							this.$message.info('请选择' + data[i].options.label + '的字段名', 1.5)
							break
						}
						this.dataSource.push({
							filed: data[i].options.name,
							filedName: data[i].options.label,
							listSelect: data[i].listSelect,
							searchSelect: data[i].searchSelect
						})
					}
				}
			},
			configDataChange(data,text){
				if(text === 'list'){
					this.formData = JSON.parse(this.$refs.customForm.getListData())
					this.dataField = data
					this.formData.forEach(formDataItem => {
						formDataItem.listSelect = false
						this.dataField.forEach(dataFieldItem => {
							if(formDataItem.options.name === dataFieldItem.filed){
								formDataItem.listSelect = true
							}
						})
					})
					
					this.$refs.customForm.setListData(this.formData)
				}
				if(text === 'search'){
					this.formData = JSON.parse(this.$refs.customForm.getListData())
					this.dataSearch = data
					
					this.formData.forEach(formDataItem => {
						formDataItem.searchSelect = false
						this.dataSearch.forEach(dataSearchItem => {
							if(formDataItem.options.name === dataSearchItem.filed){
								formDataItem.searchSelect = true
							}
						})
					})
					
					this.$refs.customForm.setListData(this.formData)
				}
			}
		}
	};
</script>

<style lang="less" scoped>
	@basehight: 56px;

	.t-drf123 {
		.design-header {
			width: 100%;
			height: @basehight;
			line-height: @basehight;
			border-bottom: 1px solid #e8e8e8;
			.left-step {
				width: 70%;
				padding: 0 20%;

				.ant-steps {
					padding-top: 10px;
				}
			}
		}
	}

	/deep/ .ant-drawer-header,
	/deep/ .ant-drawer-body {
		padding: 0 !important;
	}
	
	.right-btn{
		width: 30%;
		display: flex;
		align-items: center;
		justify-content: flex-end;
		padding-right: 20px;
	}
</style>

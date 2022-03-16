<!--
 * @Description: 表单拖拽页设计/管理员界面
 * @Author: 黄婷
 * @Date: 2021-05-20 18:13:04
 * @LastEditTime: 2021-06-04 14:04:39
 * @LastEditors: 黄婷
 * @FilePath: \vue-antd-admine:\wwwroot\Vue\MisBoot\misboot-cloud-vue\src\components\TopVUI\k-portal-design\index.vue
-->
<template>
	<view :class="['form-designer-container-9136076486841527 index-container-1592076357139']">
		<!-- <k-header v-if="showHead" :title="title" /> -->
		<!-- 操作区域 start -->
		<operatingArea v-if="toolbarsTop" :showToolbarsText="showToolbarsText" :toolbars="toolbars"
			@handleSave="handleSave" @handlePreview="handlePreview" @handleReset="handleReset"
			@handleClose="handleClose">
			<template slot="left-action">
				<slot name="left-action"></slot>
			</template>
			<template slot="right-action">
				<slot name="right-action"></slot>
			</template>
		</operatingArea>
		<!-- 操作区域 end -->
		<view class="content" :class="{
					'show-head': showHead,
					'toolbars-top': toolbarsTop,
					'show-head-and-toolbars-top': toolbarsTop && showHead,
				}">
			<!-- 左侧控件区域 start -->
			<aside class="left">
				<!-- <aside-left
						:list="basicsArray"
						@generateKey="generateKey"
						@handleListPush="handleListPush"
						@start="handleStart"
					></aside-left> -->
				<a-collapse @change="collapseChange" :defaultActiveKey="collapseDefaultActiveKey">
					<!-- 基础控件 start -->
					<a-collapse-panel v-if="basicsArray.length > 0" header="基础控件" key="1">
						<collapseItem :list="basicsArray" @generateKey="generateKey" @handleListPush="handleListPush"
							@start="handleStart" />
					</a-collapse-panel>
					<!-- 基础控件 end -->
					<!-- 拓展控件 start -->
					<a-collapse-panel v-if="expandArray.length > 0" header="拓展控件" key="2">
						<collapseItem :list="expandArray" @generateKey="generateKey" @handleListPush="handleListPush"
							@start="handleStart" />
					</a-collapse-panel>
					<!-- 拓展控件 end -->
				</a-collapse>
			</aside>
			<!-- 左侧控件区域 end -->

			<!-- 中间面板区域 start -->
			<section>
				<!-- 头部按钮 start -->
				<operatingArea v-if="!toolbarsTop" :showToolbarsText="showToolbarsText" :toolbars="toolbars"
					@handleSave="handleSave" @handlePreview="handlePreview" @handleReset="handleReset"
					@handleClose="handleClose">
					<template slot="left-action">
						<slot name="left-action"></slot>
					</template>

					<template slot="right-action">
						<slot name="right-action"></slot>
					</template>
				</operatingArea>
				<!-- 头部按钮 end -->
				
				<!-- 操作区域 start -->
				<view class="phoneBox">
					<layout-panel :class="{ 'no-toolbars-top': !toolbarsTop }" :data="data" :selectItem="selectItem"
						:noModel="noModel" :hideModel="hideModel" :startType="startType" ref="KFCP"
						@handleSetSelectItem="handleSetSelectItem" @fetch-data="fetchData" :formConfig="formConfig" />
				</view>
				<previewModal :data="data" :formConfig="formConfig" ref="previewModal" />
				<!-- 操作区域 end -->
			</section>
			<!-- 中间面板区域 end -->

			<!-- 右侧控件属性区域 start -->
			<aside class="right">
				<layoutItemProperties class="form-item-properties show-properties" :selectItem="selectItem" :tabDefaultActiveKey="tabDefaultActiveKey"
					designer="admin" :basicsUuid="basicsUuid" :formData="data.list" :formConfig="formConfig" @activeKeyChange="e => tabDefaultActiveKey = e" />
			</aside>
			<!-- 右侧控件属性区域 end -->
		</view>
		<!-- <k-footer /> -->
		<u-toast ref="uToast" />
	</view>
</template>
<script>
	import {
		basicsList,
		expandList
	} from './config/formItemsConfig';
	import {
		asideLeft,
		layoutPanel,
		operatingArea,
		layoutItemProperties,
		collapseItem
	} from './component';
	import previewModal from './preview/index.vue';
	export default {
		name: 'KPortalDesign',
		props: {
			title: {
				type: String,
				default: '',
			},
			showHead: {
				type: Boolean,
				default: true,
			},
			toolbarsTop: {
				type: Boolean,
				default: false,
			},
			toolbars: {
				type: Array,
				default: () => ['save', 'preview', 'importJson', 'exportJson', 'exportCode', 'reset', 'close'],
			},
			showToolbarsText: {
				type: Boolean,
				default: false,
			},
			fields: {
				type: Array,
				default: () => [
					'textBox',
					'inputSelect',
					'textarea',
					'numberBox',
					'pwdBox',
					'checkbox',
					'radio',
					'switch',
					'rate',
					'datePicker',
					// 'upload',
					// 'area',
					// 'slider',
					// 'cascader',
					// 'text',
					// 'dept'
				],
			},
			hideModel: {
				// 隐藏数据字段
				type: Boolean,
				default: false,
			},
			tName: {
				type: String,
			},
			jsonData: {
				type: Object,
			},
			basicsUuid: {
				type: String
			}
		},
		components: {
			asideLeft,
			layoutPanel,
			operatingArea,
			layoutItemProperties,
			previewModal,
			collapseItem
		},
		data() {
			return {
				data: {
					list: [],
				},
				selectItem: {
					key: '',
				},
				formConfig: {
					labelWidth: 150,
					labelPosition: 'left',
					inputPosition: 'right'
				},
				startType: '',
				showPropertie: true,
				noModel: ['button', 'divider', 'card', 'grid', 'table', 'alert', 'text', 'html'],
				previewOptions: {
					width: 850,
				},
				appDetailUuid: '',
				configurationData: {},
				tabDefaultActiveKey: '1'
			};
		},
		computed: {
			basicsArray() {
				// 计算需要显示的基础字段
				return basicsList.filter((item) => this.fields.includes(item.type));
			},
			collapseDefaultActiveKey() {
				// 计算当前展开的控件列表
				let defaultActiveKey = window.localStorage.getItem('collapseDefaultActiveKey');
				if (defaultActiveKey) {
					return defaultActiveKey.split(',');
				} else {
					return ['1'];
				}
			},
			expandArray() {
				// 计算需要显示的基础字段
				return expandList.filter((item) => this.fields.includes(item.type));
			}
		},
		watch: {
			jsonData: {
				deep: true,
				immediate: true,
				handler(newVal, oldVal) {
					// if (JSON.stringify(newVal) == '{}') this.data = {
					// 	list: []
					// };
					// else this.data = newVal;
					this.data = {
						list: []
					};
				},
			}
		},
		created() {
			this.getDesignData()
			// this.$watch('basicsUuid', () => {
			// 	this.getDesignData()
			// });
		},
		methods: {
			handleDownload() {
				this.dialogVisible = true;
				this.showFileName = true;
				this.operationType = 'download';
			},
			generateKey(list, index) {
				// 生成key值
				const key = list[index].type + '_' + new Date().getTime();
				this.$set(list, index, {
					...list[index],
					key,
					model: key,
				});
				if (this.noModel.includes(list[index].type)) {
					// 删除不需要的model属性
					delete list[index].model;
				}
			},
			handleListPush(item) {
				// 双击控件按钮push到list
				// 生成key值
				// if (!this.selectItem.key) {
					// 在没有选择表单时，将数据push到this.data.list
					const key = item.type + '_' + new Date().getTime();
					item = {
						...item,
						key,
						model: key,
					};
					if (this.noModel.includes(item.type)) {
						// 删除不需要的model属性
						delete item.model;
					}
					const itemString = JSON.stringify(item);
					const record = JSON.parse(itemString);
					// 删除icon及compoent属性
					delete record.icon;
					delete record.component;
					this.data.list.push(record);
					this.handleSetSelectItem(record);
					return false;
				// }
				this.$refs.KFCP.handleCopy(false, item);
			},
			handlePreview() {
				// 打开预览模态框
				this.$refs.previewModal.jsonData = this.data;
				this.$refs.previewModal.previewWidth = this.previewOptions.width;
				this.$refs.previewModal.visible = true;
			},
			handleReset() {
				// 清空
				this.$confirm({
					title: '警告',
					content: '是否确认清空内容?',
					okText: '是',
					okType: 'danger',
					cancelText: '否',
					onOk: () => {
						this.data.list = [];
						this.handleSetSelectItem({ key: '' });
						this.$message.success('已清空');
					},
				});
			},
			handleSetSelectItem(record) {
				// 操作间隔不能低于100毫秒
				let newTime = new Date().getTime();
				if (newTime - this.updateTime < 100) {
					return false;
				}

				this.updateTime = newTime;

				// 设置selectItem的值
				this.selectItem = record;
				// 判断是否选中控件，如果选中则弹出属性面板，否则关闭属性面板
				// this.startType = record.type;
				if (record.key) {
					this.startType = record.type;
					this.showPropertie = true;
				} else {
					this.showPropertie = false;
				}
			},
			handleSetData(data) {
				// 用于父组件赋值
				try {
					if (typeof data !== 'object') {
						return false;
					} else {
						this.data = data;
						// 导入json数据后，需要清除已选择key
						this.handleSetSelectItem({
							key: ''
						});
					}
					return true;
				} catch (error) {
					console.error(error);
					return false;
				}
			},
			collapseChange(val) {
				// 点击collapse时，保存当前collapse状态
				window.localStorage.setItem('collapseDefaultActiveKey', val);
			},
			handleStart(type) {
				this.startType = type;
			},
			handleSave() {
				// 保存函数
				console.log(JSON.stringify(this.data.list))
				this.$emit('save', JSON.stringify(this.data.list));
				localStorage.setItem('formDesign', JSON.stringify(this.data));
			},
			handleClose() {
				this.$emit('close');
			},
			fetchData(selectItem) {
				this.selectItem = selectItem;
			},
			getListData(){
				return JSON.stringify(this.data.list)
			},
			getConfigurationData(){
				return this.configurationData
			},
			getDesignData(){
				let that = this
				that.appDetailUuid = ''
				that.$http.post('/system/sysAppDetailed/getDesignData', {uuid: that.basicsUuid}).then((res) => {
					if(res.statusCode !== 300 && res.data.uuid){
						that.data.list = JSON.parse(res.data.formData)
						// that.data.config = {
						// 	labelWidth: 90
						// }
						that.configurationData.listData = res.data.listData
						that.configurationData.searchData = res.data.searchData
						that.appDetailUuid = res.data.uuid
					}
				});
			},
			getAppDetailUuid(){
				return this.appDetailUuid
			},
			setListData(data){
				this.data.list = data
			}
		},
	};
</script>
<style lang="less">
	@import './index.less';
</style>

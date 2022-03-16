<!--
 * @Description: 
 * @Author: 黄婷
 * @Date: 2021-07-08 16:34:28
 * @LastEditTime: 2021-07-09 19:42:50
 * @LastEditors: 黄婷
 * @FilePath: \misboot-cloud-vue\src\pages\system\sysAppBasics\index.vue
-->
<template>
	<div class="container">
		<a-row :gutter="10" id="aRow">
			<a-col :md="8" :sm="24">
				<a-card :bordered="false">
					<div class="toolbar flex justify-between flex-wrap" style="width: 100%;">
						<div class="table-operator"></div>
					</div>
					<data-grid
						ref="masterList"
						type="master"
						:columns="masterColumns"
						:url="url"
						bordered
						:queryParam="masterQueryParam"
						:rowKey="(record) => record.uuid"
						showPagination="auto"
						@rowClick="
							(e) => {
								masterRowClick(e, { classificationCode: 'classificationCode' });
							}
						"
					>
					</data-grid>
				</a-card>
			</a-col>
			<a-col :md="16" :sm="24">
				<a-card :bordered="false">
					<div class="toolbar flex justify-between flex-wrap" style="width: 100%;">
						<div class="table-operator">
							<a-button class="cu-btn-success" icon="plus" @click="handleAdd('sub')">新增</a-button>
							<a-button class="cu-btn-primary" icon="edit" @click="handleEdit($refs.subList.rows, 'sub')">编辑</a-button>
							<a-button class="cu-btn-danger" icon="delete" @click="handleSub($refs.subList.selectedRowKeys, 'sub')">删除</a-button>
						</div>
						<div class="table-page-search-wrapper"></div>
					</div>
					<data-grid
						ref="subList"
						type="sub"
						:url="url"
						:columns="subColumns"
						bordered
						:queryParam="subQueryParam"
						:rowKey="(record) => record.uuid"
						showPagination="auto"
					>
						<span slot="action" slot-scope="{text, record}">
							<template>
								<a @click="handleDesign(record)">设计</a>
								<a-divider type="vertical" />
								<a @click="downloadCode(record)">下载代码</a>
								<a-divider type="vertical" />
								<a @click="previewCode(record)">预览代码</a>
								<a-divider type="vertical" />
								<a @click="ScanCode(record)">扫码预览</a>
							</template>
						</span>
					</data-grid>

					<sub-form ref="subModal" :visible="subVisible" :loading="subConfirmLoading" :model="subMdl"
						@cancel="handleCancel('sub')" @ok="handleOk('sub')" />
				</a-card>
			</a-col>
		</a-row>
		<design-modal ref="designModal" :visible="designVisible" :basicsUuid="basicsUuid" @cancel="handleCancelDesign">
		</design-modal>
		<preview-code ref="previewCode" :visible.sync="previewCodeVisible"></preview-code>
		<a-modal title="预览" :visible="qrVisible" :width="330" :footer="null" @cancel="e => qrVisible = false">
			<vue-qr :text="qrValue" :size="300" :correctLevel="3"></vue-qr>
			<div class="text-center text-xs padding-xs">使用app扫码预览</div>
		</a-modal>
		<code-form :visible="codeFormVisible" @cancel="handleCancelCodeForm" :basicsUuid="basicsUuid"></code-form>
	</div>
</template>

<script>
	import {
		masterTableMixin
	} from "@/common/mixins/masterTableMixin";

	import Vue from "vue";
	import { DataGrid } from "../components";
	import subForm from "./edit.vue";
	import previewCode from "./previewCode";
	import designModal from "./design";
	import vueQr from 'vue-qr'
	import codeForm from './codeForm'
	const masterColumns = [{
			title: "分类名",
			align: "center",
			dataIndex: "classificationName",
		},
		{
			title: "标识",
			align: "center",
			dataIndex: "classificationCode",
		}
	];
	const subColumns = [{
			title: "名称",
			dataIndex: "basicsName",
			width: 200
		},
		{
			title: "表名",
			dataIndex: "basicsTableName",
			width: 200
		},
		{
			title: "操作",
			dataIndex: "action",
			scopedSlots: {
				customRender: "action",
			},
		}
	];
	export default {
		name: "TableList",
		mixins: [masterTableMixin],
		components: {
			DataGrid,
			designModal,
			subForm,
			previewCode,
			vueQr,
			codeForm
		},
		data() {
			return {
				masterColumns,
				subColumns,
				// create model
				masterVisible: false,
				subVisible: false,
				qrVisible: false,
				masterConfirmLoading: false,
				subConfirmLoading: false,
				masterMdl: null,
				subMdl: null,
				// 高级搜索 展开/关闭
				advanced: false,
				// 查询参数
				masterQueryParam: {},
				subQueryParam: {},
				masterSelectedRows: [],
				subSelectedRows: [],
				masterRows: null,
				subRows: null,
				jsonData: {},
				url: {
					masterList: "/system/sysAppClassification/getPageSet",
					subList: "/system/sysAppBasics/getPageSet",
					subDelete: "/system/sysAppBasics/deleteBatch",
					subAdd: "/system/sysAppBasics/save",
					subUpdate: "/system/sysAppBasics/update",
				},
				visibleDesign: false,
				visiblePreview: false,
				templateUuid: "",
				designVisible: false,
				previewCodeVisible: false,
				qrValue: '',
				basicsUuid: '',
				codeFormVisible: false
			};
		},
		methods: {
			masterRowClick(record, index, param) {
				this.masterRows = record;
				this.masterMdl = record;
				this.subQueryParam = {
					classificationCode: record.classificationCode
				};
				this.subMdl = {
					classificationCode: record.classificationCode
				};
				this.$refs.subList.refresh();
			},
			downloadCode(val) {
				this.codeFormVisible = true
				this.basicsUuid = val.uuid
			},
			previewCode(val) {
				this.$http.post("/system/sysAppDetailed/getDetailBybasicsUuid", {
					basicsUuid: val.uuid,
				}).then((res) => {
					if (res.data.statusCode == 300) {
						return this.$message.info(res.data.message, 1.5)
					} else {
						this.previewCodeVisible = true;
						this.$refs.previewCode.onOpen(val.uuid);
					}
				});
			},
			ScanCode(val) {
				this.qrVisible = true
				this.qrValue = val.uuid
			},
			handleSave() {
				this.visibleDesign = false;
				this.$refs.subList.refresh();
			},
			handleDesign(e) {
				// let data = { token: getToken() };
				// // let urls = res.Token.wpsUrl.split('?')[0];
				// new submitForm('http://192.168.1.252:8080/#/', data).get();
				this.basicsUuid = e.uuid
				this.$refs.designModal.currentIndex = 0
				this.designVisible = true;
				document.getElementById('aRow').style.display = 'none'
				window.parent.postMessage({
					msg: 'open'
				}, '*')
				this.$nextTick(() => {
					this.$refs.designModal.$refs.customForm.getDesignData()
					this.$refs.designModal.$refs.customForm.tabDefaultActiveKey = '1'
				})
			},
			handleCancelDesign() {
				this.designVisible = false;
				document.getElementById('aRow').style.display = 'block'
				window.parent.postMessage({
					msg: 'close'
				}, '*')
			},
			handleCancelCodeForm() {
				this.codeFormVisible = false
			}
		},
	};
</script>

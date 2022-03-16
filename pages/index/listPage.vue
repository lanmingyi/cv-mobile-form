<!--
 * @Description: 
 * @Author: 黄婷
 * @Date: 2021-07-09 09:14:57
 * @LastEditTime: 2021-07-09 13:40:27
 * @LastEditors: 黄婷
 * @FilePath: \misboot-cloud-vue\src\pages\system\sysAppBasics\listPage.vue
-->
<template>
	<div class="padding">
		<a-row :gutter="24">
			<a-col :span="18">
				<a-divider orientation="left">
					列表配置
				</a-divider>
				<a-table :columns="columns" :data-source="dataField" :pagination="false" size="small"> </a-table>
				<a-divider orientation="left" class="margin-top">
					查询配置
				</a-divider>
				<a-table :columns="columns" :data-source="dataSearch" :pagination="false" size="small"> </a-table>
			</a-col>
			<a-col :span="6">
				<a-tabs :activeKey="activeKey" @change="e => $emit('activeKeyChange',e)">
					<a-tab-pane key="1" tab="列表字段">
						<a-table :columns="listField" :data-source="dataSource" :pagination="false"
							:rowSelection="rowSelection" size="small"></a-table>
					</a-tab-pane>
					<a-tab-pane key="2" tab="查询字段" force-render>
						<a-table :columns="searchField" :data-source="dataSource" :pagination="false"
							:rowSelection="rowSelectionSearch" size="small"></a-table>
					</a-tab-pane>
				</a-tabs>
			</a-col>
		</a-row>
	</div>
</template>

<script>
	const columns = [{
			dataIndex: 'filedName',
			title: '列名',
		},
		{
			title: '字段',
			dataIndex: 'filed',
		},
	];

	const listField = [{
		dataIndex: 'filedName',
		title: '列表字段',
	}];

	const searchField = [{
		dataIndex: 'filedName',
		title: '查询字段',
	}];
	export default {
		props: {
			dataSource: {
				type: Array,
				default: () => [],
			},
			dataField: {
				type: Array,
				default: () => []
			},
			dataSearch: {
				type: Array,
				default: () => []
			},
			activeKey: {
				type: String || Number,
			}
		},
		data() {
			return {
				columns,
				listField,
				searchField,
				// dataField: [],
				// dataSearch: [],
				// dataSource: [
				// 	{ filedName: '姓名', filed: 'name' },
				// 	{ filedName: '年龄', filed: 'age' },
				// 	{ filedName: '性别', filed: 'sex' },
				// ],
				selectedRowKeys: [],
				selectedRows: [],
				selectedRowKeysSearch: [],
				selectedRowsSearch: []
			};
		},
		computed: {
			rowSelection() {
				return {
					selectedRowKeys: this.selectedRowKeys,
					onChange: this.onSelectChange,
					// getCheckboxProps: record => ({
					// 	props: {
					// 		defaultChecked: JSON.stringify(this.dataField).indexOf(record.filed) > -1 ? true : false,
					// 		id: record.filed + ''
					// 	}
					// })
					
				};
			},
			rowSelectionSearch() {
				return {
					selectedRowKeys: this.selectedRowKeysSearch,
					onChange: this.onSelectChangeSearch,
				};
			},
		},
		watch: {
			dataSource: {
				deep: true,
				immediate: true,
				handler(newVal, oldVal) {
					// this.dataField.forEach((item, index) => {
					// 	let key = (this.dataSource || []).findIndex((profile) => profile.filed === item.filed)
					// 	this.selectedRowKeys.push(key)
					// 	if(key != -1){
					// 		item.filedName = this.dataSource[key].filedName
					// 	}
					// })
					
					// this.dataSearch.forEach(item => {
					// 	let key = (this.dataSource || []).findIndex((profile) => profile.filed === item.filed)
					// 	this.selectedRowKeysSearch.push(key)
					// 	if(key != -1){
					// 		item.filedName = this.dataSource[key].filedName
					// 	}
					// })
					this.dataSource.forEach((item,index) => {
						if(item.listSelect === true){
							this.selectedRowKeys.push(index)
							this.dataField.push({
								filed: item.filed,
								filedName: item.filedName
							})
						}
						if(item.searchSelect === true){
							this.selectedRowKeysSearch.push(index)
							this.dataSearch.push({
								filed: item.filed,
								filedName: item.filedName
							})
						}
					})
				},
			}
		},
		mounted() {
			// this.$watch('dataSource', () => {

			// });
		},
		methods: {
			onSelectChange(selectedRowKeys, selectedRows) {
				this.selectedRows = selectedRows;
				this.selectedRowKeys = selectedRowKeys;
				// this.dataField = this.selectedRows;
				this.$emit('dataChange', selectedRows, 'list')
			},
			onSelectChangeSearch(selectedRowKeys, selectedRows) {
				this.selectedRowsSearch = selectedRows;
				this.selectedRowKeysSearch = selectedRowKeys;
				// this.dataSearch = this.selectedRowsSearch;
				this.$emit('dataChange', selectedRows, 'search')
			},
			getListData() {
				return {
					listData: this.dataField,
					searchData: this.dataSearch
				};
			}
		},
	};
</script>

<style lang="scss" scoped></style>

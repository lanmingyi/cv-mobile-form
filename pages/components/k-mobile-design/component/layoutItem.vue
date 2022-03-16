<!--
 * @Description: 使用递归组件调用自己，生成布局结构及组件
 * @Author: 黄婷
 * @Date: 2021-05-20 18:13:04
 * @LastEditTime: 2021-06-03 15:36:13
 * @LastEditors: 黄婷
 * @FilePath: \vue-antd-admine:\wwwroot\Vue\MisBoot\misboot-cloud-vue\src\components\TopVUI\k-portal-design\component\layoutItem.vue
-->
<template>
	<view
		:class="{
			'layout-width': ['grid', 'table', 'card', 'divider', 'html'].includes(record.type),
		}"
	>
		<list-item
			:key="record.key"
			:selectItem.sync="selectItem"
			:record="record"
			:formConfig="formConfig"
			:hideModel="hideModel"
			@handleSelectItem="handleSelectItem"
			@handleCopy="$emit('handleCopy')"
			@handleDelete="$emit('handleDelete')"
			@handleShowRightMenu="$emit('handleShowRightMenu')"
		/>
	</view>
</template>
<script>
import draggable from 'vuedraggable';
import listItem from './listNode';
export default {
	name: 'layoutItem',
	props: {
		record: {
			type: Object,
			required: true,
		},
		selectItem: {
			type: Object,
			required: true,
		},
		startType: {
			type: String,
			required: true,
		},
		insertAllowedType: {
			type: Array,
			required: true,
		},
		hideModel: {
			type: Boolean,
			default: false,
		},
		formConfig: {
			type: Object,
			required: true
		}
	},
	computed: {
		insertAllowed() {
			return this.insertAllowedType.includes(this.startType);
		}
	},
	components: {
		draggable,
		listItem,
	},
	methods: {
		handleShowRightMenu(e, record, trIndex, tdIndex) {
			this.$emit('handleShowRightMenu', e, record, trIndex, tdIndex);
		},
		handleSelectItem(record) {
			this.$emit('handleSelectItem', record);
		},
		handleColAdd(e, list) {
			this.$emit('handleColAdd', e, list);
		}
	},
};
</script>

<!--
 * @Description: 将数据通过listItem组件解析，生成控件
 * @Author: 黄婷
 * @Date: 2021-05-20 18:13:04
 * @LastEditTime: 2021-05-21 13:59:55
 * @LastEditors: 黄婷
 * @FilePath: \misboot-cloud-topvui\src\components\TopVUI\k-portal-design\component\listNode.vue
-->
<template>
	<view
		class="drag-move-box"
		@click.stop="$emit('handleSelectItem', record)"
		:class="{ active: record.key === selectItem.key }"
	>
		<view class="form-item-box">
			<klistItem :record="record" :formConfig="formConfig" />
		</view>
		<view v-if="!hideModel" class="show-key-box" v-text="record.model" />
		<view
			class="copy"
			:class="record.key === selectItem.key ? 'active' : 'unactivated'"
			@click.stop="$emit('handleCopy')"
		>
			<a-icon type="copy" />
		</view>
		<view
			class="delete"
			:class="record.key === selectItem.key ? 'active' : 'unactivated'"
			@click.stop="$emit('handleDelete')"
		>
			<a-icon type="delete" />
		</view>
	</view>
</template>
<script>
import klistItem from './model/listItem';
export default {
	props: {
		record: {
			type: Object,
			required: true,
		},
		selectItem: {
			type: Object,
			default: () => {},
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
	components: {
		klistItem,
	},
};
</script>

<!--
 * @Description: 折叠组件
 * @Author: 黄婷
 * @Date: 2021-05-13
 * @LastEditors: 黄婷
 * @LastEditTime: 2021-05-21 14:04:17
 -->
<template>
	<draggable
		tag="ul"
		:value="list"
		v-bind="{
			group: { name: 'index-draggable', pull: 'clone', put: false },
			sort: false,
			animation: 180,
			ghostClass: 'moving',
		}"
		@start="handleStart($event, list)"
	>
		<li
			v-for="(val, index) in list"
			:key="index"
			@dragstart="$emit('generateKey', list, index)"
			@click="$emit('handleListPush', val)"
		>
			<span>
				<u-icon :icon="val.icon" class="card-title-icon" />
			</span>
			{{ val.label }}
		</li>
	</draggable>
</template>
<script>
import draggable from 'vuedraggable';
export default {
	name: 'collapseItem',
	props: ['list'],
	components: {
		draggable,
	},
	methods: {
		handleStart(e, list) {
			this.$emit('start', list[e.oldIndex].type);
		},
	},
};
</script>

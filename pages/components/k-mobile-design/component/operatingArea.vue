<!--
 * @Description: 头部操作按钮
 * @Author: 黄婷
 * @Date: 2021-05-20 18:13:04
 * @LastEditTime: 2021-05-21 13:58:08
 * @LastEditors: 黄婷
 * @FilePath: \misboot-cloud-topvui\src\components\TopVUI\k-portal-design\component\operatingArea.vue
-->
<template>
	<view class="operating-area">
		<!-- 头部操作按钮区域 start -->
		<!-- 操作左侧区域 start -->
		<view class="u-flex">
			<!-- <u-button icon="play-circle" type="link" @click="$emit('handleSave')">
				保存
			</u-button> -->
			<u-button icon="play-circle" type="link" @click="$emit('handlePreview')">
				预览
			</u-button>
			<u-button class="delete-btn" icon="trash" type="link" @click="$emit('handleReset')">
				清空
			</u-button>
			<!-- 按钮左侧插槽 start -->
			<slot name="left-action"></slot>
			<!-- 按钮左侧插槽 end -->
		</view>
		<!-- 操作左侧区域 end -->
		<!-- 操作右侧区域 start -->
		<view class="right-btn-box">
			<!-- 按钮右侧插槽 start -->
			<slot name="right-action"></slot>
			<!-- 按钮右侧插槽 end -->
			<u-toast title="关闭">
				<a v-if="toolbars.includes('close')" @click="$emit('handleClose')">
					<u-icon type="close" />
				</a>
			</u-toast>
		</view>
		<!-- 操作右侧区域 end -->
		<!-- 头部操作按钮区域 end -->
	</view>
	<!-- 操作区域 start -->
</template>
<script>
export default {
	props: {
		toolbars: {
			type: Array,
			default: () => ['save', 'preview', 'reset', 'close'],
		},
		showToolbarsText: {
			type: Boolean,
			default: false,
		},
	},
	methods: {
		handleDownload() {
			this.$emit('handleDownloads');
		},
	},
};
</script>
<style>
	uni-button{
		background-color: rgba(255,255,255,0);
		color: #1890ff;
	}
	uni-button:after {
		border: none !important;
	}
</style>
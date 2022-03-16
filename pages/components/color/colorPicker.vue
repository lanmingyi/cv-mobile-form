<!--
 * @Description: 颜色选择器
 * @Author: 黄婷
 * @Date: 2021-01-18 15:17:26
 * @LastEditTime: 2021-06-02 09:36:57
 * @LastEditors: 黄婷
 * @FilePath: \misboot-cloud-topvui\src\components\TopVUI\color\colorPicker.vue
-->
<template>
	<div class="abc">
		<div :class="['colorpicker', size]" :id="this.domId"></div>
	</div>
</template>

<script>
import Colorpicker from './index.js';
export default {
	name: 'colorPicker',
	props: {
		size: {
			type: String,
			default: 'large',
		},
		disabled: {
			type: Boolean,
			default: false,
		},
		value: {
			type: String,
		},
		record: {
			type: Object,
		},
		formatType: {
			type: String,
			default: 'hex',
		},
		showprecolor: {
			type: Boolean,
			default: false,
		},
		showhistorycolor: {
			type: Boolean,
			default: true,
		},
		showPalette: {
			type: Boolean,
			default: true,
		},
		autoConfirm: {
			type: Boolean,
			default: false,
		},
		canMove: {
			type: Boolean,
			default: true,
		},
	},
	data() {
		return {
			values: '',
			formatTypeValue: '',
			colorTypeOption: 'single',
			domId: 'dom-' + Math.ceil(Math.random() * 100),
		};
	},
	watch: {
		// value为编辑框输入的内容，这里我监听了一下值，当父组件调用得时候，如果给value赋值了，子组件将会显示父组件赋给的值
		// value: function(value) {
		// 	this.values = value ? value : '#000';
		// },
		value: {
			deep: true,
			immediate: true,
			handler(newVal, oldVal) {
				this.values = newVal ? newVal : '#000';
			},
		},
		record: {
			deep: true,
			immediate: true,
			handler(newVal, oldVal) {
				if (newVal || oldVal) this.values = this.record.options.defaultValue;
			},
		},
		formatType: function(value) {
			this.formatTypeValue = value;
		},
	},
	mounted() {
		this.initColor();
	},
	updated() {
		this.initColor();
	},
	methods: {
		initColor() {
			let that = this;
			var nopre = new XNColorPicker({
				color: that.values, //初始颜色
				selector: '#' + that.domId, //选择器容器
				showprecolor: this.showprecolor, //显示预制颜色
				prevcolors: null, //预制颜色，不设置则默认
				showhistorycolor: this.showhistorycolor, //显示历史
				historycolornum: 16, //历史条数
				format: that.formatType, //rgba hex hsla,初始颜色类型
				showPalette: this.showPalette, //显示色盘
				show: false, //初始化显示
				lang: 'cn', // cn 、en
				colorTypeOption: 'single,linear-gradient,radial-gradient', //颜色选择器可选类型，纯色，线性渐变，径向渐变
				canMove: this.canMove, //默认为true
				autoConfirm: this.autoConfirm, //改变颜色时自动确认
				onError: function(e) {},
				onCancel: function(color) {
					that.$emit('cancle');
				},
				onChange: function(color) {
					// console.log('change', color);
				},
				onConfirm: function(color) {
					const colorTypeOption = color.colorType;
					if (colorTypeOption === 'single') {
						that.values = color.color[that.formatType];
					} else if (colorTypeOption === 'linear-gradient') {
						that.values = color.color.str;
					} else {
						that.values = color.color.str;
					}
					that.$emit('change', that.values);
				},
			});
		},
	},
};
</script>

<style lang="less">
.medium {
	.fcolorpicker-curbox {
		width: 30px;
		height: 30px;
	}
}
.small {
	.fcolorpicker-curbox {
		width: 24px;
		height: 24px;
	}
}
.large {
	.fcolorpicker-curbox {
		width: 36px;
		height: 36px;
	}
}
</style>

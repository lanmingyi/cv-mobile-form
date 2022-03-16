<!--
 * @Description: 传入record数据，通过判断record.type，来渲染对应的组件
 * @Author: 黄婷
 * @Date: 2021-05-20 18:13:04
 * @LastEditTime: 2021-05-21 14:09:11
 * @LastEditors: 黄婷
 * @FilePath: \misboot-cloud-topvui\src\components\TopVUI\k-portal-design\component\model\listItem.vue
-->
<template>
	<view class="flex align-center">
		<view v-if="record.options.required" style="padding: 5rpx;color: red;">*</view>
		<u-form-item :label="record.options.label" :label-width="formConfig.inputPosition=='left'?'auto':formConfig.labelWidth"
			:label-position="formConfig.labelPosition" style="width: 100%;">
			<template v-if="record.type === 'textBox'">
				<uTextbox :record="record"></uTextbox>
			</template>
			<template v-if="record.type === 'inputSelect'">
				<uSelect :record="record"></uSelect>
			</template>
			<template v-if="record.type === 'textarea'">
				<uTextarea :record="record"></uTextarea>
			</template>
			<template v-if="record.type === 'numberBox'">
				<uNumberBox :record="record"></uNumberBox>
			</template>
			<template v-if="record.type === 'pwdBox'">
				<uPwdBox :record="record"></uPwdBox>
			</template>
			<template v-if="record.type === 'checkbox'">
				<uCheckbox :record="record"></uCheckbox>
			</template>
			<template v-if="record.type === 'radio'">
				<uRadio :record="record"></uRadio>
			</template>
			<template v-if="record.type === 'switch'">
				<uSwitch :record="record"></uSwitch>
			</template>
			<template v-if="record.type === 'rate'">
				<uRate :record="record"></uRate>
			</template>
			<template v-if="record.type === 'datePicker'">
				<uDatePicker :record="record"></uDatePicker>
			</template>
			<template v-if="record.type === 'upload'">
				<uUpload :record="record"></uUpload>
			</template>
			<template v-if="record.type === 'area'">
				<uArea :record="record"></uArea>
			</template>
			<template v-if="record.type === 'slider'">
				<uSlider :record="record"></uSlider>
			</template>
			<template v-if="record.type === 'cascader'">
				<uCascader :record="record"></uCascader>
			</template>
			<template v-if="record.type === 'text'">
				<uText :record="record"></uText>
			</template>
			<template v-if="record.type === 'dept'">
				<uDepartment :record="record"></uDepartment>
			</template>
		</u-form-item>
	</view>
</template>
<script>
// import moment from "moment";
import {
	uTextbox,
	uCheckbox,
	uRadio,
	uSwitch,
	uRate,
	uSelect,
	uTextarea,
	uNumberBox,
	uPwdBox,
	uDatePicker,
	uUpload,
	uArea,
	uSlider,
	uCascader,
	uText,
	uDepartment
} from '../model';
export default {
	name: 'klistItem',
	props: {
		// 表单数组
		record: {
			type: Object,
			required: true,
		},
		dynamicData: {
			type: Object,
			default: () => ({}),
		},
		formConfig: {
			type: Object,
			required: true
		}
	},
	components: {
		uTextbox,
		uCheckbox,
		uRadio,
		uSwitch,
		uRate,
		uSelect,
		uTextarea,
		uNumberBox,
		uPwdBox,
		uDatePicker,
		uUpload,
		uArea,
		uSlider,
		uCascader,
		uText,
		uDepartment
	},
	computed: {
		customList() {
			if (window.$customComponentList) {
				return window.$customComponentList.map((item) => item.type);
			} else {
				return [];
			}
		},
	},
	watch: {
		// record(val) {
		// 	console.log(val)
		// 	val.options.defaultValue = val.options.defaultValue ? val.options.defaultValue : '';
		// },
		record: {
			deep: true,
			immediate: true,
			handler(newVal, oldVal) {
				this.record = newVal
			}
		},
		'record.options.dynamic': {
			deep: true,
			immediate: true,
			handler(newVal, oldVal) {
				if(newVal==='static'){
					this.selectList = this.list
					this.record.options.options = this.record.options.staticList;
				} else if(newVal==='dynamic'){
					this.getDataList()
				} else {
					this.getDataListByCode()
				}
			}
		}
	},
	methods: {
		validationSubform() {
			// 验证动态表格
			if (!this.$refs.KBatch) return true;
			return this.$refs.KBatch.validationSubform();
		},
		handleChange(value, key) {
			this.record.options.defaultValue = value;
			// change事件
			this.$emit('change', value, key);
		},
		// 获取动态数据
		getDataList(){
			let that = this
			let url = that.record.options.url;
			that.$http.post(url, {}).then(res => {
				if(res.data.length > 0){
					let data = []
					res.data.forEach(val => {
						data.push({
							label: val.text,
							value: val.value
						})
					})
					that.record.options.codeList = data;
					that.record.options.options = data;
				}
			})
		},
		// 获取字典code数据
		getDataListByCode(){
			let that = this
			let url = '/system/dicSet/getDicItemByCode';
			that.$http.post(url, {code:that.record.options.dynamicKey}).then(res => {
				if(res.data.length > 0){
					let data = []
					res.data.forEach(val => {
						data.push({
							label: val.text,
							value: val.value
						})
					})
					that.record.options.codeList = data;
					that.record.options.options = data;
				}
			})
		}
	},
};
</script>
<style lang="less" scoped>
.slider-box {
	display: flex;
	> .slider {
		flex: 1;
		margin-right: 16px;
	}
	> .number {
		width: 70px;
	}
}
</style>

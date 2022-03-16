/* 
  @Description: 门户拖拽控件项
  @Author: 黄婷
  @Date: 2021-05-20 18:13:04
  @LastEditTime: 2021-05-21 13:56:18
  @LastEditors: 黄婷
  @FilePath: \misboot-cloud-topvui\src\components\TopVUI\k-portal-design\config\formItemsConfig.js
/ */

export const basicsList = [{
	type: 'textBox',
	label: '输入框',
	options: {
		type: 'text',
		label: '输入框',
		name: undefined,
		inputAlign: 'left',
		maxlength: '140',
		placeholder: '请输入',
		value: '',
		disabled: false,
		border: true,
		required: false
	},
	key: "",
	model: "",
}, {
	type: 'inputSelect',
	label: '下拉选择框',
	options: {
		type: 'select',
		label: '下拉选择框',
		name: undefined,
		inputAlign: 'left',
		maxlength: '140',
		placeholder: '请选择',
		disabled: false,
		border: true,
		required: false,
		value: undefined,
		text: '',
		dynamicKey: "",
		dynamic: 'dynamic',
		method: 'post',
		url: '/system/dicSet/getDicItemByCode?code=post',
		options: [
			// 下拉选择项配置
			{
				label: '选项1',
				value: '1'
			}, {
				label: '选项2',
				value: '2'
			}
		],
		staticList: [{
			label: '选项1',
			value: 1
		}, {
			label: '选项2',
			value: 2
		}],
		dynamicList: [],
		codeList: []
	},
	key: "",
	model: "",
}, {
	type: 'textarea',
	label: '多文本输入框',
	options: {
		type: 'textarea',
		label: '多文本输入框',
		name: undefined,
		inputAlign: 'left',
		maxlength: '500',
		placeholder: '请输入',
		value: '',
		disabled: false,
		border: true,
		required: false
	},
	key: "",
	model: "",
}, {
	type: 'numberBox',
	label: '数字输入框',
	options: {
		type: 'number',
		label: '数字输入框',
		name: undefined,
		inputAlign: 'left',
		maxlength: '140',
		placeholder: '请输入',
		value: '',
		disabled: false,
		border: true,
		required: false
	},
	key: "",
	model: "",
}, {
	type: 'pwdBox',
	label: '密码输入框',
	options: {
		type: 'password',
		label: '密码输入框',
		name: undefined,
		inputAlign: 'left',
		maxlength: '140',
		placeholder: '请输入',
		value: '',
		disabled: false,
		border: true,
		required: false
	},
	key: "",
	model: "",
}, {
	type: 'checkbox',
	label: '复选框',
	options: {
		type: 'checkbox',
		label: '复选框',
		name: undefined,
		size: '43',
		labelSize: '30',
		iconSize: '20',
		shape: 'square',
		wrap: false,
		dynamicKey: "",
		dynamic: 'dynamic',
		method: 'post',
		defaultValue: [],
		url: '/system/dicSet/getDicItemByCode?code=sex',
		options: [{
				label: '选项1',
				checked: false,
				disabled: false,
				value: '1'
			},
			{
				label: '选项2',
				checked: false,
				disabled: false,
				value: '2'
			}
		],
		staticList: [{
			label: '选项1',
			checked: false,
			disabled: false,
			value: 1
		}, {
			label: '选项2',
			checked: false,
			disabled: false,
			value: 2
		}],
		dynamicList: [],
		codeList: []
	},
	key: "",
	model: "",
}, {
	type: 'radio',
	label: '单选框',
	options: {
		type: 'radio',
		label: '单选框',
		name: undefined,
		size: '43',
		labelSize: '30',
		iconSize: '20',
		shape: 'circle',
		wrap: false,
		dynamicKey: "",
		dynamic: 'dynamic',
		method: 'post',
		defaultValue: "",
		defaultText: "",
		url: '/system/dicSet/getDicItemByCode?code=sex',
		options: [{
				label: '选项1',
				checked: false,
				disabled: false,
				value: '1'
			},
			{
				label: '选项2',
				checked: false,
				disabled: false,
				value: '2'
			}
		],
		staticList: [{
			label: '选项1',
			checked: false,
			disabled: false,
			value: 1
		}, {
			label: '选项2',
			checked: false,
			disabled: false,
			value: 2
		}],
		dynamicList: [],
		codeList: []
	},
	key: "",
	model: "",
}, {
	type: 'switch',
	label: '开关',
	options: {
		type: 'switch',
		label: '开关',
		name: undefined,
		activeColor: '#2979ff',
		inactiveColor: '#ffffff',
		checked: false
	},
	key: "",
	model: "",
}, {
	type: 'rate',
	label: '评分',
	options: {
		type: 'rate',
		label: '评分',
		name: undefined,
		value: 2,
		count: 6,
		size: 32,
		activeColor: '#FA3534',
		inactiveColor: '#b2b2b2',
		gutter: 10
	},
	key: "",
	model: "",
}, {
	type: 'datePicker',
	label: '日期选择器',
	options: {
		type: 'datePicker',
		label: '日期选择器',
		name: undefined,
		placeholder: '请选择',
		border: true,
		value: '2021-07-08',
		required: false,
		params: {
			year: true,
			month: true,
			day: true,
			hour: false,
			minute: false,
			second: false
		}
	},
	key: "",
	model: "",
}, {
	type: 'upload',
	label: '上传',
	options: {
		type: 'upload',
		label: '上传',
		name: undefined,
		uploadText: '选择图片',
		action: '/document/oss/multiUpload',
		maxSize: 1024,
		maxCount: 3,
		width: 200,
		height: 200,
		sourceValue: 0,
		sourceType: ['album', 'camera'],
		previewFullImage: true,
		showProgress: true,
		deletable: true,
		fileList: []
	},
	key: "",
	model: ""
}, {
	type: 'slider',
	label: '滑动选择器',
	options: {
		type: 'slider',
		label: '滑动选择器',
		name: undefined,
		value: 30,
		min: 0,
		max: 100,
		step: 1,
		blockWidth: 30,
		height: 6,
		inactiveColor: "#c0c4cc",
		activeColor: "#2979ff",
		blockColor: "#ffffff"
	},
	key: "",
	model: ""
}, {
	type: 'cascader',
	label: '级联选择器',
	options: {
		type: 'cascader',
		label: '级联选择器',
		name: undefined,
		url: '',
		text: '',
		border: true,
		method: 'post',
		dynamicKey: '',
		dynamic: 'static',
		placeholder: '请选择',
		value: [],
		list: [{
			value: 1,
			label: '选项1',
			title: '选项1',
			key: 1,
			scopedSlots: {
				title: "custom"
			},
			children: [{
				value: 2,
				label: '选项1-1',
				title: '选项1-1',
				key: 2,
				scopedSlots: {
					title: "custom"
				},
				children: [{
						value: 3,
						label: '选项1-1-1',
						title: '选项1-1-1',
						key: 3,
						scopedSlots: {
							title: "custom"
						}
					},
					{
						value: 4,
						label: '选项1-1-2',
						title: '选项1-1-2',
						key: 4,
						scopedSlots: {
							title: "custom"
						}
					}
				]
			}]
		}, {
			value: 8,
			label: '选项2',
			title: '选项2',
			key: 8,
			scopedSlots: {
				title: "custom"
			},
			children: [{
				value: 9,
				label: '选项2-1',
				title: '选项2-1',
				key: 9,
				scopedSlots: {
					title: "custom"
				},
				children: [{
					value: 10,
					label: '选项2-2',
					title: '选项2-2',
					key: 10,
					scopedSlots: {
						title: "custom"
					}
				}]
			}]
		}]
	},
	key: "",
	model: ""
}, {
	type: 'text',
	label: '文本',
	options: {
		type: 'textField',
		value: '文字',
		width: '100%',
		fontSize: 16,
		color: '#000000',
		bold: false,
		oblique: false,
		underline: false,
		lineThrough: false
	},
	key: "",
	model: ""
}];

export const expandList = [{
	type: 'area',
	label: '省市区',
	options: {
		type: 'area',
		label: '省市区',
		name: undefined,
		value: '',
		areaText: ["北京市", "市辖区", "东城"],
		areaCode: ["11", "1101", "110101"],
		border: true,
		placeholder: '请选择'
	},
	key: "",
	model: ""
}, {
	type: 'dept',
	label: '组织机构',
	options: {
		type: 'dept',
		label: '组织机构',
		border: true,
		placeholder: '请选择'
	},
	key: "",
	model: ""
}]
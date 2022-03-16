<!--
 * @Description: 控件属性设置组件,因为配置数据是引用关系，所以可以直接修改/管理员界面
 * @Author: 黄婷
 * @Date: 2021-05-20 18:13:04
 * @LastEditTime: 2021-06-04 14:34:40
 * @LastEditors: 黄婷
 * @FilePath: \vue-antd-admine:\wwwroot\Vue\MisBoot\misboot-cloud-vue\src\components\TopVUI\k-portal-design\component\layoutItemProperties.vue
-->
<template>
	<div class="properties-centent kk-checkbox">
		<!-- <div class="head-title" v-show="selectItem.key === ''">
			控件属性设置
		</div> -->
		<div class="properties-body">
			<a-tabs :activeKey="tabDefaultActiveKey" @change="e => $emit('activeKeyChange',e)" :tabBarGutter="100">
				<a-tab-pane key="1" tab="控件属性设置">
					<p class="hint-box" v-show="selectItem.key === ''">未选择控件</p>
					<a-form v-if="selectItem.key !== '' || (selectItem.key !== ''&&designer === 'admin')">
						<!-- 基本配置 -->
						<template v-if="!~['textField'].indexOf(options.type)">
							<a-form-item label="字段名">
								<a-select v-model="options.name" placeholder="请选择字段名" style="width: 100%" @change="fieldChange">
									<a-select-option v-for="item in columnNameArr" :key="item.columnName">
										{{item.columnNameColumnComment}}
									</a-select-option>
								</a-select>
							</a-form-item>
							<a-form-item label="标签">
								<a-input v-model="options.label" placeholder="标签" />
							</a-form-item>
						</template>
						<!-- text配置 -->
						<template v-if="~['text','textarea','number','password'].indexOf(options.type)">
							<a-form-item label="输入框文字对齐方式">
								<a-select v-model="options.inputAlign" style="width: 100%">
									<a-select-option v-for="item in inputAlign" :key="item.value">
										{{item.text}}
									</a-select-option>
								</a-select>
							</a-form-item>
							<a-form-item label="最大长度">
								<a-input-number v-model="options.maxlength" :min="0" :max="999" placeholder="最大长度" />
							</a-form-item>
							<a-form-item label="默认内容">
								<a-input-number v-model="options.value" placeholder="请输入默认内容" />
							</a-form-item>
						</template>
						<template
							v-if="~['text','textarea','number','password','select','area','cascader','dept'].indexOf(options.type)">
							<a-form-item label="占位内容">
								<a-input v-model="options.placeholder" placeholder="请输入占位内容" />
							</a-form-item>
						</template>
						<!-- checkbox、radio配置 -->
						<template v-if="~['checkbox','radio'].indexOf(options.type)">
							<a-form-item label="组件大小">
								<a-input-number v-model="options.size" :min="0" :max="100" placeholder="组件整体大小(rpx)" />
							</a-form-item>
							<a-form-item label="字体大小">
								<a-input-number v-model="options.labelSize" :min="0" :max="100"
									placeholder="label字体大小(rpx)" />
							</a-form-item>
							<a-form-item label="图标大小">
								<a-input-number v-model="options.iconSize" :min="0" :max="100"
									placeholder="图标大小(rpx)" />
							</a-form-item>
							<a-form-item label="自定义形状">
								<a-select v-model="options.shape" style="width: 100%">
									<a-select-option v-for="item in shapeArr" :key="item.value">
										{{item.text}}
									</a-select-option>
								</a-select>
							</a-form-item>
							<a-form-item label="操作属性">
								<kCheckbox v-model="options.wrap" label="是否换行" />
							</a-form-item>
						</template>
						<template v-if="(typeof options.options) !== 'undefined'">
							<a-form-item label="选项配置">
								<a-radio-group buttonStyle="solid" v-model="options.dynamic" @change="changeDataType"
									class="margin-bottom-xs">
									<a-radio-button value="dynamic"> 动态 </a-radio-button>
									<!-- <a-radio-button value="static"> 静态 </a-radio-button>
							<a-radio-button value="code"> 字典 </a-radio-button> -->
								</a-radio-group>
								<a-input-group compact v-show="options.dynamic === 'dynamic'" @blur="fetchData">
									<a-select v-model="options.method" @change="fetchData">
										<a-select-option value="post">post</a-select-option>
									</a-select>
									<a-input style="width: 72%;" v-model="options.url" :title="options.url"
										placeholder="请输入接口地址" allow-clear @blur="fetchData" />
								</a-input-group>
								<a-input v-show="options.dynamic === 'code'" v-model="options.dynamicKey"
									placeholder="参数名" @blur="changeDataType(options.dynamic, 0)"></a-input>
								<KChangeOption v-show="options.dynamic === 'static'" v-model="options.options"
									@delete="defaultValueDelete" />
							</a-form-item>
						</template>
						<a-form-item v-if="options.type === 'select'" label="默认值">
							<a-select :options="options.options" v-model="options.value" placeholder="请选择默认值"
								@change="(value,item) => {options.text = item.componentOptions.children[0].text}"
								style="width: 100%" />
						</a-form-item>
						<a-form-item v-if="selectItem.type === 'checkbox'" label="默认值">
							<a-checkbox-group :options="options.options" v-model="options.defaultValue"
								@change="checkboxChange" />
						</a-form-item>
						<a-form-item v-if="selectItem.type === 'radio'" label="默认值">
							<a-radio-group :options="options.options" v-model="options.defaultValue"
								@change="radioChange" />
						</a-form-item>
						<!-- switch配置 -->
						<template v-if="~['switch'].indexOf(options.type)">
							<a-form-item label="是否选中">
								<a-switch v-model="options.checked" />
							</a-form-item>
							<a-form-item label="打开时颜色">
								<div class="colorPickerBox">
									<colorPicker v-model="options.activeColor" label="" size="large" @change="
									(val) => {
										changeTextColor(val, 'activeColor');
									}
								"></colorPicker>
									<a-input v-model="options.activeColor" placeholder="请输入" readOnly
										class="margin-left-sm" />
								</div>
							</a-form-item>
							<a-form-item label="关闭时颜色">
								<div class="colorPickerBox">
									<colorPicker v-model="options.inactiveColor" label="" size="large" @change="
									(val) => {
										changeTextColor(val, 'inactiveColor');
									}
								"></colorPicker>
									<a-input v-model="options.inactiveColor" placeholder="请输入" readOnly
										class="margin-left-sm" />
								</div>
							</a-form-item>
						</template>
						<!-- rate配置 -->
						<template v-if="~['rate'].indexOf(options.type)">
							<a-form-item label="星星数量">
								<a-input-number v-model="options.count" :min="1" :max="10" placeholder="星星数量" />
							</a-form-item>
							<a-form-item label="星星间隔">
								<a-input-number v-model="options.gutter" :min="1" :max="100" placeholder="星星间隔" />
							</a-form-item>
							<a-form-item label="默认选中数">
								<a-rate v-model="options.value" />
							</a-form-item>
							<a-form-item label="选中颜色">
								<div class="colorPickerBox">
									<colorPicker v-model="options.activeColor" label="" size="large" @change="
									(val) => {
										changeTextColor(val, 'activeColor');
									}
								"></colorPicker>
									<a-input v-model="options.activeColor" placeholder="请输入" readOnly
										class="margin-left-sm" />
								</div>
							</a-form-item>
							<a-form-item label="未选中颜色">
								<div class="colorPickerBox">
									<colorPicker v-model="options.inactiveColor" label="" size="large" @change="
									(val) => {
										changeTextColor(val, 'inactiveColor');
									}
								"></colorPicker>
									<a-input v-model="options.inactiveColor" placeholder="请输入" readOnly
										class="margin-left-sm" />
								</div>
							</a-form-item>
						</template>
						<template v-if="~['datePicker'].indexOf(options.type)">
							<a-form-item label="占位内容">
								<a-input v-model="options.placeholder" placeholder="请输入占位内容" />
							</a-form-item>
							<a-form-item label="默认内容">
								<!-- <a-input v-model="options.value" placeholder="请输入默认内容" /> -->
								<a-date-picker :show-time="{ format: 'HH:mm' }" format="YYYY-MM-DD HH:mm" style="width: 100%;"
									v-model="datePickerValue" @change="(e,string) => {options.value = string}" />
							</a-form-item>
							<a-form-item label="时间格式">
								<kCheckbox v-model="options.params.year" label="年"
									@input="e => datePickerFormatChange(e,'year')" />
								<kCheckbox v-model="options.params.month" label="月"
									@input="e => datePickerFormatChange(e,'month')" />
								<kCheckbox v-model="options.params.day" label="日"
									@input="e => datePickerFormatChange(e,'day')" />
								<br />
								<kCheckbox v-model="options.params.hour" label="时"
									@input="e => datePickerFormatChange(e,'hour')" />
								<kCheckbox v-model="options.params.minute" label="分"
									@input="e => datePickerFormatChange(e,'minute')" />
								<kCheckbox v-model="options.params.second" label="秒"
									@input="e => datePickerFormatChange(e,'second')" />
							</a-form-item>
							<a-form-item label="其他属性">
								<kCheckbox v-model="options.border" label="显示边框" />
							</a-form-item>
						</template>
						<template v-if="~['upload'].indexOf(options.type)">
							<a-form-item label="上传框提示文字">
								<a-input v-model="options.uploadText" placeholder="上传框提示文字" />
							</a-form-item>
							<a-form-item label="上传地址">
								<a-input v-model="options.action" placeholder="服务器上传地址" />
							</a-form-item>
							<a-form-item label="限制大小(kb)">
								<a-input-number v-model="options.maxSize" :min="1" placeholder="文件的大小限制，单位(kb)" />
							</a-form-item>
							<a-form-item label="图片数量">
								<a-input-number v-model="options.maxCount" :min="1" :max="10" placeholder="可上传图片的数量" />
							</a-form-item>
							<a-form-item label="上传框宽度(rpx)">
								<a-input-number v-model="options.width" :min="0" placeholder="上传框宽度(rpx)" />
							</a-form-item>
							<a-form-item label="上传框高度(rpx)">
								<a-input-number v-model="options.height" :min="0" placeholder="上传框高度(rpx)" />
							</a-form-item>
							<a-form-item label="图片来源">
								<a-select v-model="options.sourceValue" style="width: 100%"
									@change="e => {options.sourceType = imgSource[e].type}">
									<a-select-option v-for="item in imgSource" :value="item.value">
										{{item.text}}
									</a-select-option>
								</a-select>
							</a-form-item>
							<a-form-item label="其他属性">
								<kCheckbox v-model="options.previewFullImage" label="是否可预览" />
								<kCheckbox v-model="options.showProgress" label="是否显示进度条" />
								<kCheckbox v-model="options.deletable" label="是否可手动删除" />
							</a-form-item>
						</template>
						<template v-if="~['area'].indexOf(options.type)">
							<a-form-item label="默认内容">
								<a-cascader style="width: 100%;" placeholder="请选择默认内容" :options="areaData" @change="areaChange" />
							</a-form-item>
						</template>
						<template v-if="~['slider'].indexOf(options.type)">
							<a-form-item label="最小值">
								<a-input-number v-model="options.min" :min="0" :max="100"
									placeholder="可选的最小值(0-100之间)" />
							</a-form-item>
							<a-form-item label="最大值">
								<a-input-number v-model="options.max" :min="0" :max="100"
									placeholder="可选的最大值(0-100之间)" />
							</a-form-item>
							<a-form-item label="步进值">
								<a-input-number v-model="options.step" :min="0" :max="100" placeholder="步进值" />
							</a-form-item>
							<a-form-item label="滑动按钮大小(rpx)">
								<a-input-number v-model="options.blockWidth" :min="0" placeholder="滑动按钮大小(rpx)" />
							</a-form-item>
							<a-form-item label="滑动条高度(rpx)">
								<a-input-number v-model="options.height" :min="0" placeholder="滑动条高度(rpx)" />
							</a-form-item>
							<a-form-item label="滑动条底部背景色">
								<div class="colorPickerBox">
									<colorPicker v-model="options.inactiveColor" label="" size="large" @change="
									(val) => {
										changeTextColor(val, 'inactiveColor');
									}
								"></colorPicker>
									<a-input v-model="options.inactiveColor" placeholder="请输入" readOnly
										class="margin-left-sm" />
								</div>
							</a-form-item>
							<a-form-item label="底部选择部分背景色">
								<div class="colorPickerBox">
									<colorPicker v-model="options.activeColor" label="" size="large" @change="
									(val) => {
										changeTextColor(val, 'activeColor');
									}
								"></colorPicker>
									<a-input v-model="options.activeColor" placeholder="请输入" readOnly
										class="margin-left-sm" />
								</div>
							</a-form-item>
							<a-form-item label="滑块背景颜色">
								<div class="colorPickerBox">
									<colorPicker v-model="options.blockColor" label="" size="large" @change="
									(val) => {
										changeTextColor(val, 'blockColor');
									}
								"></colorPicker>
									<a-input v-model="options.blockColor" placeholder="请输入" readOnly
										class="margin-left-sm" />
								</div>
							</a-form-item>
						</template>
						<template v-if="~['cascader'].indexOf(options.type)">
							<a-form-item label="选项配置">
								<a-radio-group buttonStyle="solid" v-model="options.dynamic" @change="changeDataType"
									class="margin-bottom-xs">
									<a-radio-button value="dynamic"> 动态 </a-radio-button>
									<a-radio-button value="static"> 静态 </a-radio-button>
									<a-radio-button value="code"> 字典 </a-radio-button>
								</a-radio-group>
								<a-input-group compact v-show="options.dynamic === 'dynamic'" @blur="fetchData">
									<a-select v-model="options.method" @change="fetchData">
										<a-select-option value="post">post</a-select-option>
									</a-select>
									<a-input style="width: 72%;" v-model="options.url" :title="options.url"
										placeholder="请输入接口地址" allow-clear @blur="fetchData" />
								</a-input-group>
								<a-input v-show="options.dynamic === 'code'" v-model="options.dynamicKey"
									placeholder="参数名" @blur="changeDataType(options.dynamic, 0)"></a-input>
								<KTree v-show="options.dynamic === 'static'" v-model="options.list" />
							</a-form-item>
						</template>
						<a-form-item v-if="options.type === 'cascader'" label="默认值">
							<a-cascader :options="options.list" @change="aCascaderChange" style="width: 100%;"
								placeholder="请选择" />
						</a-form-item>
						<template v-if="options.type === 'textField'">
							<a-form-item label="文本内容">
								<a-textarea v-model="options.value" placeholder="请输入文本内容" />
							</a-form-item>
							<a-form-item label="宽度">
								<a-input v-model="options.width" placeholder="请输入宽度" />
							</a-form-item>
							<a-form-item label="文字对齐方式">
								<a-radio-group buttonStyle="solid" v-model="options.textAlign" class="margin-bottom-xs">
									<a-radio-button value="left"> 靠左 </a-radio-button>
									<a-radio-button value="center"> 居中 </a-radio-button>
									<a-radio-button value="right"> 靠右 </a-radio-button>
								</a-radio-group>
							</a-form-item>
							<a-form-item label="字体大小">
								<a-input-number v-model="options.fontSize" placeholder="请输入" suffix="px" />
							</a-form-item>
							<a-form-item label="字体颜色">
								<div class="colorPickerBox">
									<colorPicker v-model="options.color" label="" size="large" @change="
									(val) => {
										changeTextColor(val, 'color');
									}
								"></colorPicker>
									<a-input v-model="options.color" placeholder="请输入" readOnly
										class="margin-left-sm" />
								</div>
							</a-form-item>
							<a-form-item label="其他样式">
								<kCheckbox v-model="options.bold" label="加粗" />
								<kCheckbox v-model="options.oblique" label="斜体" />
								<kCheckbox v-model="options.underline" @change="e => lineThroughCheck = e"
									:disabled="underlineCheck" label="下划线" />
								<kCheckbox v-model="options.lineThrough" @change="e => underlineCheck = e"
									:disabled="lineThroughCheck" label="删除线" />
								<kCheckbox v-model="options.required" label="显示必选标记 " />
							</a-form-item>
							<a-form-item>
								文本内容仅作展示
							</a-form-item>
						</template>
						<template v-if="options.type === 'dept'">
							<!-- <a-form-item label="默认内容">
								<tree-select
								  placeholder="所属机构"
								  :parameter="parameter"
								  :url="url"
								  :data="treeData"
								  idfield="id"
								  textfield="text"
								/>
							</a-form-item> -->
						</template>
						<a-form-item label="其他属性"
							v-if="~['text','textarea','number','password','select','area','cascader','dept'].indexOf(options.type)">
							<kCheckbox v-model="options.border" label="显示边框" />
						</a-form-item>
						<a-form-item label="校验"
							v-if="!~['switch','rate','checkbox','radio','upload','slider','textField'].indexOf(options.type)">
							<kCheckbox v-model="options.required" label="必填" />
						</a-form-item>
					</a-form>
				</a-tab-pane>
				<a-tab-pane key="2" tab="表单属性设置" force-render>
					<a-form-item label="标签宽度">
						<a-input-number v-model="formConfig.labelWidth" :min="90" :max="300" />
					</a-form-item>
					<a-form-item label="标签位置">
						<a-radio-group buttonStyle="solid" v-model="formConfig.labelPosition" class="margin-bottom-xs">
							<a-radio-button value="left"> 靠左 </a-radio-button>
							<a-radio-button value="top"> 靠上 </a-radio-button>
						</a-radio-group>
					</a-form-item>
					<a-form-item label="输入框对齐">
						<a-radio-group buttonStyle="solid" v-model="formConfig.inputPosition"
							@change="(e) => { formConfig.inputPosition = e.target.value }" class="margin-bottom-xs">
							<a-radio-button value="left"> 靠左 </a-radio-button>
							<a-radio-button value="right"> 靠右 </a-radio-button>
						</a-radio-group>
					</a-form-item>
				</a-tab-pane>
			</a-tabs>
		</div>
	</div>
</template>
<script>
	import KChangeOption from '../KChangeOption/index.vue';
	import KCheckbox from '../KCheckbox';
	import colorPicker from "../../color/colorPicker.vue"
	import KTree from "../../tree/index.vue"
	import TreeSelect from "../../treeSelect/index.vue";
	import moment from 'moment'
	import areaData from '@/utils/area.js'
	export default {
		name: 'formItemProperties',
		data() {
			return {
				areaData: areaData,
				moment: moment,
				options: {},
				columnNameArr: [],
				underlineCheck: false,
				lineThroughCheck: false,
				parameter: {
				  father: {
				    levelId: 1,
				  },
				  children: {},
				},
				url: {
				  fathersUrl: "/mdata/organization/getListByLevelId",
				  expandUrl: "/mdata/organization/getListByPid"
				},
				treeData: [],
				inputAlign: [{
					value: 'left',
					text: '靠左'
				}, {
					value: 'center',
					text: '居中'
				}, {
					value: 'right',
					text: '靠右'
				}],
				shapeArr: [{
					value: 'square',
					text: '方形'
				}, {
					value: 'circle',
					text: '圆形'
				}],
				imgSource: [{
					type: ["album", "camera"],
					text: '默认（相册和相机）',
					value: 0
				}, {
					type: ["album"],
					text: '相册',
					value: 1
				}, {
					type: ["camera"],
					text: '相机',
					value: 2
				}]
			};
		},
		watch: {
			selectItem: {
				deep: true,
				immediate: true,
				handler(newVal, oldVal) {
					this.options = newVal.options || {};
					this.getColumnName()
				},
			},
			options: {
				deep: true,
				handler(newVal, oldVal) {
					// console.log(newVal, 'options');
				},
			}
		},
		props: {
			selectItem: {
				type: Object,
				required: true,
			},
			hideModel: {
				type: Boolean,
				default: true,
			},
			designer: {
				type: String,
			},
			basicsUuid: {
				type: String,
				required: true
			},
			formData: {
				type: Array,
				default: () => []
			},
			formConfig: {
				type: Object,
				required: false
			},
			tabDefaultActiveKey: {
				type: String,
				required: true
			}
		},
		components: {
			KChangeOption,
			KCheckbox,
			colorPicker,
			KTree,
			TreeSelect
		},
		computed: {
			datePickerValue() {
				return moment(this.options.value).format('yyyy-MM-DD')
			}
		},
		methods: {
			areaChange(value, selectedOptions){
				let areaCode = []
				let areaText = []
				selectedOptions.forEach((item,index) => {
					areaCode.push(item.value.substring(0,(index+1)*2))
					areaText.push(item.label)
				})
				this.options.areaCode = areaCode
				this.options.areaText = areaText
				this.options.value = areaText.join("/")
			},
			defaultValueDelete(e) {
				if (this.options.type === 'checkbox') {
					this.options.defaultValue = this.options.defaultValue.filter((val, index) => val !== e.value)
				}
				if (this.options.type === 'radio' && this.options.defaultValue === e.value) {
					this.options.defaultText = ''
					this.options.defaultValue = ''
				}
				if (this.options.type === 'select' && this.options.value === e.value) {
					this.options.text = ''
					this.options.value = ''
				}
			},
			datePickerFormatChange(e, text) {
				// console.log(e,text)

			},
			aCascaderChange(value, option) {
				this.options.text = (option[0].label + '/' + option[1].label + '/' + option[2].label)
				this.options.value = value
			},
			checkboxChange(checkedValue) {
				let that = this
				that.options.defaultValue = checkedValue
				that.options.options.forEach((item, index) => {
					item.checked = true
					item.checked = false
				})

				that.options.options.forEach((item, index) => {
					if (checkedValue.includes(item.value)) {
						that.options.options[index].checked = true
					}
				})
			},
			radioChange(e) {
				let that = this
				that.options.defaultValue = e.target.value
				that.options.defaultText = e.target.value
				that.options.options.forEach((item, index) => {
					item.checked = true
					item.checked = false
				})
				that.options.options.forEach((item, index) => {
					if (e.target.value == item.value) {
						that.options.options[index].checked = true
						that.options.defaultText = item.name
					}
				})
			},
			country_change(e) {
				this.options.border = JSON.parse(e.new_v);
			},
			changeDataType(e, ty) {
				// this.fetchData();
				// let that = this;
				// let type = '';
				// if (ty === 0) {
				// 	type = e;
				// } else {
				// 	type = e.target.value;
				// }

				// if (type === 'static') {
				// 	that.selectItem.options.options = that.selectItem.options.staticList;
				// } else if (type === 'dynamic') {
				// 	that.fetchData();
				// } else {
				// 	// this.$emit('get-code-data', this.selectItem);
				// 	let url = this.$baseUrl + '/system/dicSet/getDicItemByCode';
				// 	that.$http.post(url, {code: that.options.dynamicKey}).then((res) => {
				// 		if(res.data.length > 0){
				// 			res.data.forEach((e) => {
				// 				e.label = e.text;
				// 			});
				// 			that.selectItem.options.codeList = res.data;
				// 			that.selectItem.options.options = res.data;
				// 		}
				// 	});
				// }
			},
			fetchData() {
				let that = this;
				if (that.options.method && that.options.url) {
					// this.$emit('fetch-data', this.selectItem);
					let url = that.selectItem.options.url;
					that.$http.post(url, {}).then((res) => {
						if (res.data.length > 0) {
							res.data.forEach((e) => {
								e.label = e.text;
							});
							that.selectItem.options.codeList = res.data;
							that.selectItem.options.options = res.data;
						}
					});
				}
			},
			handleChangeCol(e) {
				this.options.col.xs = this.options.col.sm = this.options.col.md = this.options.col.lg = this.options.col
					.xl = this.options.col.xxl = e;
			},
			changeIcon(val) {
				this.selectItem.options.iconFont = val;
			},
			changeTextColor(val, field) {
				this.selectItem.options[field] = val;
			},
			getColumnName() {
				this.$http.post('/system/sysAppBasics/getColumnName', {
					uuid: this.basicsUuid
				}).then((res) => {
					this.columnNameArr = res.data
				});
			},
			fieldChange(e) {
				let count = 0
				this.formData.find(item => {
					if (item.options.name === e) {
						count++
					}
				})
				if (count > 1) {
					this.options.name = ''
					this.$message.info('字段名已被选择', 1.5);
				}
			}
		},
	};
</script>
<style scoped="scoped" lang="less">
	.right .ant-form-item-control {
		line-height: 32px !important;
	}

	/deep/ .u-collapse-body {
		height: auto !important;
	}

	.ant-collapse {
		border: 0;
		border-radius: 0;
	}

	.colorPickerBox {
		width: 100%;
		display: flex;
		align-items: center;
	}

	.ant-input-number {
		width: 100%;
	}

	/deep/ .ant-radio-button-wrapper .ant-radio-button .ant-radio-button-input,
	.ant-radio-button-wrapper .ant-radio-inner input[type=checkbox],
	.ant-radio-button-wrapper input[type=radio] {
		width: 0;
		height: 0;
		opacity: 0;
		pointer-events: none;
	}

	/deep/ .ant-tabs-bar {
		margin: 0;
	}

	.ant-tabs-tabpane.ant-tabs-tabpane-active {
		padding: 16px;
	}
	
	/deep/.ant-tabs-nav.ant-tabs-nav-animated{
		width: 100%;
		div{
			display: flex;
			justify-content: space-between;
		}
		.ant-tabs-tab{
			flex: 1;
			justify-content: center;
		}
	}
</style>

<template>
	<t-modal
		title="编辑"
		:width="640"
		:visible="visible"
		:confirmLoading="loading"
		@ok="
			() => {
				$emit('ok');
			}
		"
		@cancel="
			() => {
				$emit('cancel');
			}
		"
	>
		<a-spin :spinning="loading">
			<a-form :form="form">
				<a-row :gutter="16">
					<a-col class="gutter-row" :span="24">
						<a-form-item label="选项名" :labelCol="labelCol" :wrapperCol="wrapperCol">
							<a-input
								placeholder="选项名"
								v-decorator="['title', validateRulesObj.title]"
							/>
						</a-form-item>
					</a-col>
					<a-col class="gutter-row" :span="24">
						<a-form-item label="选项值" :labelCol="labelCol" :wrapperCol="wrapperCol">
							<a-input
								placeholder="选项值"
								v-decorator="['key', validateRulesObj.key]"
							/>
						</a-form-item>
					</a-col>
				</a-row>
			</a-form>
		</a-spin>
	</t-modal>
</template>

<script>
import pick from 'lodash.pick';
import TModal from "../modal/TModal";
// 表单字段
const fields = ['title', 'key'];
export default {
	components: {
		TModal
	},
	props: {
		visible: {
			type: Boolean,
			required: true,
		},
		loading: {
			type: Boolean,
			default: () => false,
		},
		model: {
			type: Object,
			default: () => null,
		},
	},
	data() {
		return {
			labelCol: {
				xs: {
					span: 24,
				},
				sm: {
					span: 5,
				},
			},
			wrapperCol: {
				xs: {
					span: 24,
				},
				sm: {
					span: 16,
				},
			},
			form: this.$form.createForm(this),
			titleExists: false,
			keyExists: false,
			validateRulesObj: {
				title: {
					rules: [{
						required: true,
						validator: (rule, value, cbfn) => {
							if (!value) {
								cbfn('请输入选项名')
							} else if (this.titleExists) {
								cbfn('选项名已存在')
							}
							cbfn()
						}
					}]
				},
				key: {
					rules: [{
						required: true,
						validator: (rule, value, cbfn) => {
							if (!value) {
								cbfn('请输入选项值')
							} else if (this.keyExists) {
								cbfn('选项值已存在')
							}
							cbfn()
						}
					}]
				}
			}
			
		};
	},
	methods: {
		
		
	},
	created() {
		// 防止表单未注册
		fields.forEach((v) => this.form.getFieldDecorator(v));
		// 当 model 发生改变时，为表单设置值
		this.$watch('model', () => {
			this.model && this.form.setFieldsValue(pick(this.model, fields));
		});
	},
};
</script>
<style>
	.ant-select{
		width: 100%;
	}
</style>
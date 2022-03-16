<template>
	<t-modal
		title="新增/编辑"
		:width="640"
		:visible="visible"
		:switchFullscreen="true"
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
					<a-form-item class="hiddenItem">
						<!-- 主键隐藏 -->
						<a-input v-decorator="['uuid']" disabled type="hidden" />
					</a-form-item>
					<a-col class="gutter-row" :span="24">
						<a-form-item label="分类" :labelCol="labelCol" :wrapperCol="wrapperCol">
							<a-select
								v-decorator="[
									'classificationCode',
									{ rules: [{ required: true, message: '请选择分类' }] },
								]"
							>
								<a-select-option
									v-for="(item, index) in portalClassifyList"
									:key="index"
									:value="item.classificationCode"
									>{{ item.classificationName }}
								</a-select-option>
							</a-select>
						</a-form-item>
					</a-col>
					<a-col class="gutter-row" :span="24">
						<a-form-item label="名称" :labelCol="labelCol" :wrapperCol="wrapperCol">
							<a-input
								placeholder="名称"
								v-decorator="['basicsName', { rules: [{ required: true, message: '请输入名称' }] }]"
							/>
						</a-form-item>
					</a-col>
					<a-col class="gutter-row" :span="24">
						<a-form-item label="数据库" :labelCol="labelCol" :wrapperCol="wrapperCol">
							<a-select
								show-search
								placeholder="数据库"
								v-decorator="[
									'basicsTableSchema',
									{ rules: [{ required: true, message: '请选择数据库' }] },
								]"
								@change="getTableList"
							>
								<a-select-option
									v-for="(item, index) in dataBaseList"
									:value="item.database"
									:key="index"
								>
									{{ item.database }}
								</a-select-option>
							</a-select>
						</a-form-item>
					</a-col>
					<a-col class="gutter-row" :span="24">
						<a-form-item label="数据表" :labelCol="labelCol" :wrapperCol="wrapperCol">
							<a-select
								show-search
								placeholder="表名"
								v-decorator="[
									'basicsTableName',
									{ rules: [{ required: true, message: '请选择数据表' }] },
								]"
							>
								<a-select-option
									v-for="(item, index) in tableList"
									:value="item.tableName"
									:key="index"
								>
									{{ item.tableName }}
								</a-select-option>
							</a-select>
						</a-form-item>
					</a-col>
				</a-row>
			</a-form>
		</a-spin>
	</t-modal>
</template>

<script>
import pick from 'lodash.pick';
import TModal from "../components/modal/TModal";
// 表单字段
const fields = ['uuid', 'basicsName', 'basicsTableName', 'classificationCode', 'basicsTableSchema'];
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
			title: '',
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
			portalClassifyList: [],
			dataBaseList: [],
			tableList: [],
		};
	},
	methods: {
		add(m, data) {
			this.$nextTick(() => {
				this.form.setFieldsValue({
					classificationCode: m.classificationCode,
				});
			});
			this.getPortalClassifyList();
			this.getDataBase();
		},
		edit(m, data) {
			this.$nextTick(() => {
				this.form.setFieldsValue({
					classificationCode: m.classificationCode,
				});
			});
			this.getPortalClassifyList();
			this.getDataBase();
		},
		getPortalClassifyList() {
			this.$http.post('/system/sysAppClassification/getPageSet').then((res) => {
				this.portalClassifyList = res.data.rows;
			});
		},
		getDataBase() {
			this.$http.post('/system/sysGenTable/getAllDatabases').then((res) => {
				this.dataBaseList = res.data.rows;
			});
		},
		getTableList(value) {
			this.tableList = [];
			this.$http.post('/system/sysGenTable/getPageSetByDatabaseAll', {
				database: value,
			}).then((res) => {
				this.tableList = res.data;
			});
		},
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
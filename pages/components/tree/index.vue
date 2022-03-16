<template>
	<div>
		<a-tree :treeData="value" :blockNode="true">
			<div slot="custom" slot-scope="record" style="display: flex;justify-content: space-between;">
				<span class="node-title">{{ record.title }} </span>
				<div class="iconBox">
					<span class="icon-wrap" @click.stop="addNewNode(record)">
						<a-icon type="plus" />
					</span>
					<span class="icon-wrap" @click.stop="editNode(record)">
						<a-icon type="edit" />
					</span>
					<span class="icon-wrap" @click.stop="removeNode(record)">
						<a-icon type="delete" />
					</span>
				</div>
			</div>
		</a-tree>
		<KTreeEdit ref="KTreeEdit" :model="KTreeRows" :visible="KTreeEditVisible" @ok="KTreeConfirm" @cancel="e => KTreeEditVisible = false" />
	</div>
</template>
<script>
	import KTreeEdit from './edit.vue';
	export default {
		data() {
			return {
				expandedKeys: ['0-0-0', '0-0-1'],
				KTreeEditVisible: false,
				KTreeRows: {},
				options: {}
			};
		},
		components:{
			KTreeEdit
		},
		props: {
			value: {
				type: Array,
				default: () => [],
			}
		},
		methods: {
			onContextMenuClick(treeKey, menuKey) {
				console.log(`treeKey: ${treeKey}, menuKey: ${menuKey}`);
			},
			addNewNode(record) {
				console.log(record)
				console.log(record.children[record.children.length - 1])
				let count;
				if(record.children.length == 0){
					count = record.label + '-' + '1'
				}else{
					// count = record.label + '-' + Number(record.children.length + 1)
					let splitArr = record.children[record.children.length - 1].label.split("-")
					count = record.label + '-' + (Number(splitArr[splitArr.length - 1]) + 1)
				}
				const newChild = {
					title: count,
					key: count,
					label: count,
					value: count,
					scopedSlots: {
						title: 'custom'
					},
					children: []
				}
				if (!record.children) {
					this.$set(record, 'children', [])
				}
				record.children.push(newChild)
				this.$emit('input', this.value);
			},
			editNode(record) {
				console.log(record)
				this.KTreeEditVisible = true
				this.KTreeRows = {title: record.title, key: record.key}
				this.options = record
				// this.searchOption(record, this.treeData, 'edit')
			},
			removeNode(record){
				console.log(this.value)
				this.searchOption(record, this.value)
			},
			KTreeConfirm(){
				let form = this.$refs.KTreeEdit.form
				form.validateFields((errors, values) => {
					if(!errors){
						this.searchOption(this.options, this.value, 'edit', values)
						this.KTreeEditVisible = false
					}else{
						this.$refs.KTreeEdit.titleExists = false
						this.$refs.KTreeEdit.keyExists = false
					}
				})
				
			},
			searchOption(record, data, type = 'delect', formModel){
				for (let s = 0; s < data.length; s++) {
					if (data[s].key === record.key) {
						if (type === 'delect') {
							data.splice(s, 1)
						} else {
							this.$set(data, s, {
								title: formModel.title,
								key: formModel.key,
								label: formModel.title,
								value: formModel.key,
								scopedSlots: {
									title: "custom"
								},
								children: data[s].children
							})
						}
						break
					} else if (data[s].children && data[s].children.length > 0) {
						this.searchOption(record, data[s].children, type)
					} else {
						continue
					}
				}
			}
		},
	};
</script>
<style lang="less" scoped>
	.iconBox {
		span {
			margin: 0 5px;
		}
	}
</style>

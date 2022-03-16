<template>
	<view style="width: 100%;">
		<u-input type="select" v-model="record.options.text" :placeholder="record.options.placeholder"
			:border="record.options.border" :name="record.options.name" @click="visible = true" />
		<a-modal title="组织机构" :visible="visible" @ok="handleOk"
			@cancel="handleCancel" cancelText="取消" okText="确认">
			<mobile-tree ref="mobileTree" :trees="tree" @sendValue="confirm" :isCheck="true" :props="aprop">
					<view class="content-item" slot-scope="{ item }">
						<view class="word">{{item.name}}</view>
					</view>
			</mobile-tree>
		</a-modal>
	</view>
</template>

<script>
	import mobileTree from '../../../mobile-tree/tree.vue';
	export default {
		data() {
			return {
				visible: false,
				aprop: {
					label: 'name',
					children: 'children',
					multiple: false
				},
				// tree: [{
				// 	id: 1154545454554544,
				// 	memberCount: 66,
				// 	name: "副校长",
				// 	checked: false,
				// 	pid: "-1",
				// 	user: false,
				// 	children: [{
				// 			children: [],
				// 			id: 25666666652222000000,
				// 			name: "系主任",
				// 			checked: false,
				// 			pid: "1",
				// 			user: false
				// 		}
				// 	],
				// }]
				tree: []
			}
		},
		props: {
			record: {
				type: Object
			}
		},
		watch: {
			visible: {
				deep: true,
				immediate: true,
				handler(newVal, oldVal) {
					if(newVal == true){
						this.getTreeList(1)
					}
				}
			}
		},
		components: {
			mobileTree
		},
		methods: {
			handleOk(){
				if(!this.record.options.text){
					return this.$message.info('请选择组织机构！', 1.5);
				}
				this.visible = false
				this.$refs.mobileTree.backConfirm()
			},
			handleCancel(){
				this.visible = false
			},
			getTreeList(id){
				this.tree = []
				this.$http.post('/mdata/organization/getListByLevelId', {
						levelId: id
					}, {
						params: {}
					}).then(res => {
						let list = res.data
						list.forEach(val=>{
							let data = {
								children : [],
								id: val.id,
								uuid: val.uuid,
								pid: val.pid,
								levelId : val.levelId,
								state : val.state,
								name: val.text,
								user : false, //为true没有下一级,
								// user : val.state == 'closed' ? false : true, //为true没有下一级,
							}
							this.tree.push(data)
						})
						console.log("this.tree",this.tree)
						// uni.hideLoading()
					})
			},
			confirm(data){
				this.record.options.text = data[0].name
			}
		},
	};
</script>

<style lang="scss" scoped>
	/deep/.header{
		position: relative;
	}
	/deep/.btn{
		position: relative;
	}
	/deep/.checkbox{
		margin-right: 10px;
	}
</style>

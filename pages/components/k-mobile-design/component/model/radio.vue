<template>
	<u-radio-group v-if="reFresh" v-model="record.options.defaultText" :size="record.options.size"
		@change="radioGroupChange" :wrap="record.options.wrap">
		<u-radio @change="radioChange" v-for="(item, index) in record.options.options" :key="index"
			:name="item.name" :labelSize="record.options.labelSize" :iconSize="record.options.iconSize"
			:shape="record.options.shape" checked="true">
			{{item.name}}
		</u-radio>
	</u-radio-group>
</template>

<script>
	export default {
		data() {
			return {
				reFresh: true
			};
		},
		props: {
			record: {
				type: Object
			}
		},
		watch: {
			record: {
				deep: true,
				handler(newVal, oldVal) {
					
					if (newVal.options.options.length > 0) {
						newVal.options.options.forEach((item, index) => {
							item.name = item.label
						})
						this.reFresh = false
						this.$nextTick(() => {
							this.reFresh = true
						})
					}
				},
			}
		},
		created() {
			if (this.record.options.options.length > 0) {
				this.record.options.options.forEach(item => {
					item.name = item.label
				})
			}
		},
		methods: {
			// 选中某个单选框时，由radio时触发
			radioChange(e) {
				this.record.options.options.forEach(item => {
					if (item.label === e) {
						this.record.options.defaultValue = item.value
					}
				})
				this.$emit('change',e)
			},
			// 选中任一radio时，由radio-group触发
			radioGroupChange(e) {
				// console.log(e);
			}
		}
	};
</script>

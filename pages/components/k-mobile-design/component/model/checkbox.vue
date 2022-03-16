<template>
	<u-checkbox-group v-if="reFresh" :wrap="record.options.wrap">
		<u-checkbox :size="record.options.size" v-model="item.checked" :iconSize="record.options.iconSize"
			@change="checkboxChange" :labelSize="record.options.labelSize"
			v-for="(item, index) in record.options.options" :key="index" :name="item.name"
			:shape="record.options.shape">
			{{item.name}}
		</u-checkbox>
	</u-checkbox-group>
</template>

<script>
	export default {
		data() {
			return {
				reFresh: true,
				defaultValue: []
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
				immediate: true,
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
			checkboxChange(e) {
				this.record.options.options.forEach(item => {
					if (item.label === e.name) {
						if(this.defaultValue.indexOf(item.value) == -1){
							this.defaultValue.push(item.value)
						}else{
							var index = this.defaultValue.indexOf(item.value);
							this.defaultValue.splice(index, 1)
						}
						this.record.options.defaultValue = Array.from(new Set(this.defaultValue))
					}
				})
				this.$emit('change',e)
			}
		}
	};
</script>
<style>
</style>

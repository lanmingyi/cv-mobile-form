<template>
	<view style="width: 100%;">
		<u-select v-model="show" :list="record.options.options" @confirm="confirm"></u-select>
		<u-input type="select" v-model="record.options.text" :placeholder="record.options.placeholder"
			:inputAlign="record.options.inputAlign" :maxlength="record.options.maxlength" :border="record.options.border"
			:name="record.options.name" @click="show = true" />
	</view>
</template>

<script>
	export default {
		data() {
			return {
				show: false,
				index: 0
			}
		},
		props: {
			record: {
				type: Object
			}
		},
		methods: {
			confirm(e) {
				this.record.options.value = e[0].value
				this.record.options.text = e[0].label
				this.$emit('change',e)
			}
		}
	}
</script>

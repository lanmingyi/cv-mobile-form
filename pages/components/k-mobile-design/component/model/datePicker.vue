<template>
	<view style="width: 100%;">
		<u-picker v-model="show" mode="time" @confirm="confirm" :params="record.options.params"></u-picker>
		<u-input type="select" v-model="record.options.value" :placeholder="record.options.placeholder"
			:border="record.options.border" :name="record.options.name" @click="show = true" />
	</view>
</template>

<script>
	export default {
		data() {
			return {
				show: false
			}
		},
		props: {
			record: {
				type: Object
			}
		},
		methods: {
			confirm(e) {
				this.record.options.value = e.year + '-' + e.month + '-' + e.day
			}
		}
	}
</script>

<style>
</style>

<template>
	<view style="width: 100%;">
		<u-picker mode="region" v-model="show" :area-code='record.options.areaCode' @confirm="confirm"></u-picker>
		<u-input type="select" v-model="record.options.value" :placeholder="record.options.placeholder"
			:maxlength="record.options.maxlength" :border="record.options.border" :name="record.options.name"
			@click="show = true" />
	</view>
</template>

<script>
	export default {
		data() {
			return {
				show: false,
			};
		},
		props: {
			record: {
				type: Object
			}
		},
		methods: {
			confirm(e) {
				this.record.options.value = e.province.label + '/' + e.city.label + '/' + e.area.label
				this.record.options.areaCode = [e.province.value, e.city.value, e.area.value]
				this.record.options.areaText = [e.province.label, e.city.label, e.area.label]
				this.$emit('change', e)
			}
		}
	};
</script>

<style>
</style>

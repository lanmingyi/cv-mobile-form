<template>
	<view style="width: 100%;">
		<u-select v-model="show" mode="mutil-column-auto" :list="record.options.list" @confirm="confirm"></u-select>
		<u-input type="select" v-model="record.options.text" :placeholder="record.options.placeholder"
			:border="record.options.border" :name="record.options.name" @click="show = true" />
	</view>
</template>

<script>
	export default {
		data() {
			return {
				show: false,
			}
		},
		props: {
			record: {
				type: Object
			}
		},
		methods: {
			confirm(data) {
				this.record.options.text = (data[0].label + '/' + data[1].label + '/' + data[2].label)
				this.record.options.value = [data[0].value, data[1].value, data[2].value]
			}
		}
	}
</script>

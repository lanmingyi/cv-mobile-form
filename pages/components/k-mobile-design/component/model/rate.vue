<template>
	<u-rate v-model="record.options.value" :count="record.options.count" :active-color="record.options.activeColor"
		:inactive-color="record.options.inactiveColor" :gutter="record.options.gutter"></u-rate>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		props: {
			record: {
				type: Object
			}
		},
		methods: {

		}
	}
</script>

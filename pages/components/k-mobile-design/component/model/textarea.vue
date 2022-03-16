<template >
	<u-input type="textarea" :placeholder="record.options.placeholder" :inputAlign="record.options.inputAlign"
		v-model="record.options.value" :name="record.options.name" :maxlength="record.options.maxlength"
		:border="record.options.border" />
</template>

<script>
	export default {
		data() {
			return {
				
			};
		},
		props: {
			record: {
				type: Object
			}
		},
		methods: {

		}
	};
</script>

<style>
</style>

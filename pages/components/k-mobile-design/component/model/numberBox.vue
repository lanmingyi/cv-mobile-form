<template>
	<u-input type="number" :placeholder="record.options.placeholder" :border="record.options.border"
		:name="record.options.name" v-model="record.options.value" :maxlength="record.options.maxlength"
		:inputAlign="record.options.inputAlign" />
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

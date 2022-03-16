<template>
	<u-switch v-model="record.options.checked" :active-color="record.options.activeColor"
		:inactive-color="record.options.inactiveColor"></u-switch>
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
			// switch打开或者关闭时触发，值为true或者false
			// 即使不监听此事件，this.checked此时也会相应的变成true或者false
			change(status) {
				// console.log(status);
			}
		}
	};
</script>

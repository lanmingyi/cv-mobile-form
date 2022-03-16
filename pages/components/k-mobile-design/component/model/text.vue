<template>
	<view style="width: 100%;">
		<text v-html="record.options.value"
			:style="{textAlign: record.options.textAlign,
					width: record.options.width,
					display:'inline-block',
					fontSize: record.options.fontSize + 'px',
					color: record.options.color,
					fontWeight: record.options.bold?'bold':'normal',
					fontStyle: record.options.oblique?'oblique':'normal',
					textDecoration: record.options.underline?'underline':(record.options.lineThrough?'line-through':'none')
					}"></text>
	</view>
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
		created() {
			
		},
		methods: {
			
		}
	};
</script>

<style>
</style>

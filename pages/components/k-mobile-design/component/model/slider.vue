<template>
	<view class="wrap">
		<u-slider v-model="record.options.value" :min="record.options.min" :max="record.options.max"
			:step="record.options.step" :blockWidth="record.options.blockWidth" :height="record.options.height"
			:inactiveColor="record.options.inactiveColor" :activeColor="record.options.activeColor"
			:blockColor="record.options.blockColor"></u-slider>
	</view>
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

<style scoped lang="scss">
	.wrap {
		padding: 30rpx;
		width: 100%;
	}
</style>

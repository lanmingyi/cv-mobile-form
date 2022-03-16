<!--
 * @Description: 卡片列表
 * @Author: 黄婷
 * @Date: 2021-05-20 18:13:04
 * @LastEditTime: 2021-06-03 15:43:03
 * @LastEditors: 黄婷
 * @FilePath: \vue-antd-admine:\wwwroot\Vue\MisBoot\misboot-cloud-vue\src\components\TopVUI\k-portal-design\component\model\textList.vue
-->
<template>
	<u-input type="text" :placeholder="record.options.placeholder" :border="record.options.border" v-model="record.options.value" :name="record.options.name"
		:maxlength="record.options.maxlength" :inputAlign="record.options.inputAlign" />
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
<style lang="scss" scoped>

</style>

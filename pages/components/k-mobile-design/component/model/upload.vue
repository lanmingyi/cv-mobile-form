<template>
	<u-upload :name="record.options.name" :action="record.options.action" :file-list="record.options.fileList" :upload-text="record.options.uploadText"
		:max-size="record.options.maxSize * 1024" :max-count="record.options.maxCount" :width="record.options.width"
		:height="record.options.height" :source-type="record.options.sourceType" :deletable="record.options.deletable"
		:preview-full-image="record.options.previewFullImage" :show-progress="record.options.showProgress"></u-upload>
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

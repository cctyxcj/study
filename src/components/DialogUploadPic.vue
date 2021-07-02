<template>
  <el-dialog :visible="$attrs.visible" title="上传图片" :center="true" @update:visible="$emit('update:visible', $event)">
    <UploadPicCard ref="uploader" :limit="limit" :multiple="multiple" :files="$attrs.files" @update:files="$emit('update:file', $event)" />
    <template #footer>
      <Submit type="primary" :click="upload">确 定</Submit>
      <el-button @click="$emit('update:visible', false)">取 消</el-button>
    </template>
  </el-dialog>
</template>

<script>
import UploadPicCard from './UploadPicCard'
export default {
  name: 'DialogUploadPic',

  components: {
    UploadPicCard
  },

  props: {
    upload: Function,
    limit: {
      type: Number,
      default: 1
    },
    multiple: {
      type: Boolean,
      default: false
    }
  },

  methods: {
    async uploadFiles(api) {
      return await this.$refs.uploader.uploadFiles(api)
    }
  }
}
</script>

<style lang="scss" scoped></style>

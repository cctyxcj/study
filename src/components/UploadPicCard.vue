<template>
  <div>
    <el-upload ref="uploader" action="#" list-type="picture-card" :auto-upload="false" :file-list="fileList" :limit="limit" :multiple="multiple" :on-exceed="handleExceed" :on-change="handleChange">
      <i slot="default" class="el-icon-plus" />
      <div slot="file" slot-scope="{ file }">
        <img class="el-upload-list__item-thumbnail" :src="file.url" alt="">
        <span class="el-upload-list__item-actions">
          <span class="el-upload-list__item-preview" @click="handlePictureCardPreview(file)">
            <i class="el-icon-zoom-in" />
          </span>
          <span class="el-upload-list__item-delete" @click="handleRemove(file)">
            <i class="el-icon-delete" />
          </span>
        </span>
      </div>
    </el-upload>
    <el-dialog :visible.sync="dialogVisible" :append-to-body="true">
      <img width="100%" :src="dialogImageUrl" alt="">
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'UploadPicCard',

  props: {
    limit: {
      type: Number,
      default: 1
    },
    multiple: {
      type: Boolean,
      default: false
    },
    files: {
      type: String
    }
  },

  data() {
    return {
      fileList: [],
      dialogImageUrl: '',
      dialogVisible: false
    }
  },

  watch: {
    fileList() {
      const files = []
      for (const file of this.fileList) {
        if (file.raw) {
          files.push(URL.createObjectURL(file.raw))
        } else {
          files.push(file.url)
        }
      }
      this.$emit('update:files', files.join(','))
    }
  },

  created() {
    if (this.files) {
      const images = this.files.split(',')
      for (const image of images) {
        if (!image) continue

        this.fileList.push({ uid: Symbol(), url: image })
      }
    }
  },

  methods: {
    handleExceed(files) {
      if (this.limit === 1 && files.length === 1) {
        this.$set(this.fileList, 0, {
          uid: Symbol(),
          url: URL.createObjectURL(files[0]),
          raw: files[0]
        })
      }
    },

    handleRemove(file) {
      const index = this.fileList.findIndex((p) => p.uid === file.uid)
      this.fileList.splice(index, 1)
    },

    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },

    handleChange(e) {
      this.fileList.push(e)
    },

    has() {
      return this.fileList.length
    },

    async uploadFiles(api) {
      const files = []
      for (const file of this.fileList) {
        if (file.raw) {
          const formData = new FormData()
          formData.append('file', file.raw)
          const result = await api.uploadImage(formData)
          files.push(result.imgurl)
        } else {
          files.push(file.url)
        }
      }
      return files.join(',')
    }
  }
}
</script>

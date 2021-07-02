<template>
  <div class="editor-container" />
</template>

<script>
/*
 * wangEditor
 *
 * https://github.com/wangeditor-team/wangeditor
*/
import WangEditor from 'wangeditor'

export default {
  props: {
    value: {
      type: String,
      default: ''
    },
    config: {
      type: Object,
      default() {
        return {}
      }
    }
  },

  data() {
    return {
      editorInstance: null
    }
  },

  watch: {
    value: function(newVal) {
      if (this.editorInstance) {
        this.editorInstance.txt.html(this.value) // 重新设置编辑器内容
      }
    },

    config(newVal) {
      this.destroyEditor()
      this.init()
    }
  },

  mounted() {
    this.init()
  },

  beforeDestroy() {
    // 销毁编辑器
    this.destroyEditor()
  },

  methods: {
    init() {
      const editor = new WangEditor(this.$el)
      const M = Math.pow(1024, 2) // MB

      Object.assign(editor.config, {
        /*
         * 编辑器样式
        */
        height: 600,
        zIndex: 1,

        /*
         * 工具栏配置
        */
        menus: [
          'head', // 标题
          'bold', // 加粗
          'fontSize', // 字体大小
          'fontName', // 字体
          'italic', // 斜体
          'underline', // 下划线
          'strikeThrough', // 横线
          'indent', // 缩进
          'lineHeight', // 行高
          'foreColor', // 字体颜色
          'backColor', // 背景颜色
          'list', // 序列
          'justify', // 对齐
          'quote', // 引用
          'splitLine', // 分割线
          'emoticon', // 表情
          'link', // 链接
          'image', // 图片
          'video', // 视频
          'table', // 表格
          // 'code', // 代码
          'undo', // 撤销
          'redo' // 重做
        ],
        // colors: [
        //   '#000000',
        //   '#eeece0',
        //   '#1c487f',
        //   '#4d80bf'
        // ],
        showFullScreen: true,

        /*
         * 图片上传配置
        */
        // uploadImgServer: '',
        // uploadFileName: 'file',
        uploadImgMaxLength: 1,
        uploadImgMaxSize: 2 * M,
        customUploadImg: async(files, insertImage) => { // 自定义图片上传函数
        // files 是 input 中选中的文件列表
        // insertImage 是获取图片 url 后，插入到编辑器的方法

          const [file] = files
          const { type = '' } = file

          const passType = ['image/png', 'image/jpg', 'image/jpeg']

          if (!passType.includes(type)) {
            return this.$showError('仅支持JPG、PNG')
          }

          const formData = new FormData()
          formData.append('file', file)

          const res = await this.$api.common.uploadImage(formData)
          const { url } = res.data

          // 上传图片，返回结果，将图片插入到编辑器中
          insertImage(url)
        },
        linkImgCheck: imgSrc => { // 网络图片校验
        // 以下情况，请三选一

          // 1. 返回 true ，说明检查通过
          return true

          // // 2. 返回一个字符串，说明检查未通过，编辑器会阻止图片插入。会 alert 出错误信息（即返回的字符串）
          // return '图片 src 有 xxx 错误'

        // 3. 返回 undefined（即没有任何返回），说明检查未通过，编辑器会阻止图片插入。
        // 此处，你可以自定义提示错误信息，自由发挥
        },
        customAlert: err => { // 自定义alert弹窗
          this.$showError(err)
        },

        /*
         * 事件
        */
        onchange: newVal => {
          this.$emit('input', newVal)
        }
      }, this.config)

      editor.create()

      this.editorInstance = editor
    },

    destroyEditor() {
      if (this.editorInstance) {
        this.editorInstance.destroy()
        this.editorInstance = null
      }
    }
  }
}
</script>

<style lang="scss" scoped>
</style>

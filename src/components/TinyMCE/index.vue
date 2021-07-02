<template>
  <!-- <textarea id="editor" /> -->

  <editor
    ref="editor"
    v-model="content"
    :init="interalConfig"
  />
</template>
<script>
/*
 * tinymce
 *
 * https://www.tiny.cloud/docs/
*/
import Editor from '@tinymce/tinymce-vue'
import tinymce from 'tinymce/tinymce'

/* 主题 */
import 'tinymce/icons/default'
import 'tinymce/themes/silver'

/* 汉化 */
import zh_CN from './langs/zh_CN'

/* 插件 */
import 'tinymce/plugins/image' // 插入上传图片插件
// import 'tinymce/plugins/imagetools' // 图片编辑工具插件

import 'tinymce/plugins/media' // 插入视频插件

import 'tinymce/plugins/lists' // 列表插件
import 'tinymce/plugins/advlist' // 高级列表插件

import 'tinymce/plugins/wordcount' // 字数统计插件

import 'tinymce/plugins/fullscreen' // 全屏插件

import 'tinymce/plugins/link' // 超链接插件
import 'tinymce/plugins/autolink' // 自动链接插件

import 'tinymce/plugins/emoticons' // 表情插件
import 'tinymce/plugins/emoticons/js/emojis' // 引入emojis表情

import 'tinymce/plugins/hr' // 水平分割线插件

import 'tinymce/plugins/help' // 帮助插件

// import 'tinymce/plugins/preview' // 预览插件

export default {
  components: {
    Editor
  },

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
      // editorInstance: null,

      defaultConfig: {
        /* -------------------------------- 编辑器 --------------------------------------------*/

        // selector: '#editor',
        target: this.$el,

        /* -------------------------------- 语言 ---------------------------------------------*/

        language_url: zh_CN,
        language: 'zh_CN',

        /* -------------------------------- 样式 ---------------------------------------------*/

        height: 500,
        min_height: 200,
        branding: false, // 禁用右下角 "Powered by TinyMCE"

        /* ------------------------------- 插件 ---------------------------------------------*/

        plugins: 'lists advlist image media wordcount link autolink fullscreen emoticons hr help',

        /* ------------------------------- 插件配置 -----------------------------------------*/

        // 配置区块
        block_formats: 'Paragraph=p;Heading 1=h1;Heading 2=h2;Heading 3=h3;Heading 4=h4;Heading 5=h5;Heading 6=h6;',

        // 配置字体
        font_formats: 'Andale Mono=andale mono,times; Arial=arial,helvetica,sans-serif; Arial Black=arial black,avant garde; Book Antiqua=book antiqua,palatino; Comic Sans MS=comic sans ms,sans-serif; Courier New=courier new,courier; Georgia=georgia,palatino; Helvetica=helvetica; Impact=impact,chicago; Symbol=symbol; Tahoma=tahoma,arial,helvetica,sans-serif; Terminal=terminal,monaco; Times New Roman=times new roman,times; Trebuchet MS=trebuchet ms,geneva; Verdana=verdana,geneva; Webdings=webdings; Wingdings=wingdings,zapf dingbats',

        // 配置字体大小
        fontsize_formats: '12px 14px 16px 18px 24px 36px 48px',

        // 撤销次数，减少次数可以减少内存开销
        custom_undo_redo_levels: 10,

        // 隐藏图片说明
        image_description: false,
        // 自定义图片上传
        images_upload_handler: async(blobInfo, success, failure) => {
          const file = blobInfo.blob()
          const { type = '' } = file

          const passType = ['image/png', 'image/jpg', 'image/jpeg']

          if (!passType.includes(type)) {
            return failure('仅支持JPG、PNG')
          }

          const formData = new FormData()
          formData.append('file', file)

          try {
            const { data } = await this.$api.common.uploadImage(formData)
            const { url } = data

            // 上传成功，将图片插入到编辑器中
            success(url)
          } catch (error) {
            // 上传失败
            failure('上传失败')
          }
        },

        // 配置帮助的项目
        help_tabs: ['shortcuts', 'keyboardnav'],

        /* --------------------------------- 菜单栏 ---------------------------------------------*/

        menu: {
          file: { title: 'File', items: 'newdocument restoredraft | preview | print ' },
          edit: { title: 'Edit', items: 'undo redo | cut copy paste | selectall | searchreplace' },
          view: { title: 'View', items: 'code | visualaid visualchars visualblocks | spellchecker | preview fullscreen' },
          insert: { title: 'Insert', items: 'image link media template codesample inserttable | charmap emoticons hr | pagebreak nonbreaking anchor toc | insertdatetime' },
          format: { title: 'Format', items: 'bold italic underline strikethrough superscript subscript | formats blockformats fontformats fontsizes align lineheight | forecolor backcolor | removeformat' },
          tools: { title: 'Tools', items: 'spellchecker spellcheckerlanguage | code wordcount' }
        },
        menubar: true,

        /* --------------------------------- 工具栏 ---------------------------------------------*/

        toolbar: 'undo redo | formatselect | fontselect | fontsizeselect | bold italic underline strikethrough lineheight forecolor backcolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | subscript superscript | hr emoticons link image media | removeformat | fullscreen help',
        toolbar_mode: 'sliding',
        toolbar_sticky: true,

        /* --------------------------------- 内容区域 ---------------------------------------------*/

        /* --------------------------------- 状态栏 -----------------------------------------------*/

        statusbar: true,
        elementpath: false // 隐藏元素路径

        /* --------------------------------- 回调函数 ---------------------------------------------*/

        // 初始化实例结束后
        // init_instance_callback: (editor) => {
        //   editor.on('input change undo redo', () => {
        //     // 获得编辑结果
        //     this.content = editor.getContent()
        //   })
        // }
      }
    }
  },

  computed: {
    editorInstance() {
      return this.$refs.editor.editor
    },

    interalConfig() {
      return Object.assign(this.defaultConfig, this.config)
    },

    content: {
      get() {
        return this.value
      },

      set(newVal) {
        this.$emit('input', newVal)
      }
    }
  },

  beforeDestroy() {
    // if (this.editorInstance) {
    //   this.editorInstance.destroy()
    //   this.editorInstance = null
    // }
  },

  mounted() {
    // this.init()
  },

  methods: {
    async init() {
      const [editor] = await tinymce.init(this.interalConfig)

      this.editorInstance = editor
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~tinymce/skins/ui/oxide/skin.css';
</style>

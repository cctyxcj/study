<template>
  <div class="c" style="overflow:auto">
    <el-form ref="form" label-width="auto" label-position="right" :model="form">
      <el-form-item label="单词" prop="word">
        <el-input v-model="form.word" placeholder="ゆうめい" />
      </el-form-item>
      <el-form-item label="汉字" prop="chi">
        <el-input v-model="form.chi" placeholder="有名" />
      </el-form-item>
      <el-form-item label="译" prop="tra">
        <el-input v-model="form.tra" placeholder="有名" />
      </el-form-item>
      <el-form-item label="五十音" prop="fif">
        <el-input v-model="form.fif" placeholder="ruumei" />
      </el-form-item>
      <el-form-item label="类型" prop="type">
        <el-input v-model="form.type" placeholder="形容" />
      </el-form-item>
      <el-form-item label="例句" prop="sentences">
        <el-input v-model="form.sentences[0].exam" placeholder="有名なお店のお菓子" />
        <el-input v-model="form.sentences[0].tra" style="margin-top:10px" placeholder="名店的点心" />

        <el-form-item>
          <Submit type="primary" :click="doSubmit">提交</Submit>
          <el-button @click="thelog">打印</el-button>
          <el-button @click="clear">清空</el-button>
          <el-button @click="$router.back()">返回</el-button>
        </el-form-item>
      </el-form-item></el-form>
  </div>
</template>

<script>

export default {
  data() {
    return {
      form: {
        word: '',
        chi: '',
        tra: '',
        fif: '',
        type: '',
        sentences: [{
          exam: '',
          tra: ''
        }]
      },
      data: []
    }
  },

  mounted() {
    // this.data = this.$store.state.word.sentencetype
  },

  methods: {
    doSubmit() {
      this.data.push(this.form)
      this.form = {
        word: '',
        chi: '',
        tra: '',
        fif: '',
        type: '',
        sentences: [{
          exam: '',
          tra: ''
        }]
      }
    },
    thelog() {
      console.log(JSON.stringify(this.data))
    },
    clear() {
      this.data = []
    }
  }
}
</script>

<style lang="scss" scoped>
  .c {
    padding-left: 30px;
    padding-top: 30px;
  }
  button {
    margin-top: 20px;
  }
</style>

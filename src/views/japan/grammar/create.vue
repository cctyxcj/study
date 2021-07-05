<template>
  <div v-loading="loading" class="1" style="overflow:auto">
    <el-form ref="form" label-width="auto" label-position="right" :model="form" :rules="rules">
      <el-form-item label="语法结构" prop="grammar">
        <el-input v-model="form.grammar" />
      </el-form-item>

      <el-form-item label="注解" prop="annotation">
        <el-input v-model="form.annotation" />
      </el-form-item>
      <el-form-item label="类型" prop="type">
        <el-select v-model="form.type" placeholder="请选择类型">
          <el-option v-for="(item,index) in data" :key="index" :label="item.label" :value="item.label" />
        </el-select>
      </el-form-item>
      <el-form-item label="例句1" prop="sentences">
        <el-input v-model="form.sentences.sentence" />
        <el-input v-model="form.sentences.annotation" />

        <el-form-item>
          <Submit type="primary" :click="doSubmit">提交</Submit>
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
        type: '一般句',
        grammar: '...は...',
        annotation: '...は...',
        sentences: {
          sentence: 'あのひとはぼくのおにいさんです',
          annotation: '那个人是我的哥哥'
        }
      },
      data: null
    }
  },

  mounted() {
    this.data = this.$store.state.word.sentencetype
  },

  methods: {
    doSubmit() {
      console.log(1)
    }
  }
}
</script>

<style lang="scss" scoped></style>

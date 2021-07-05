<template>
  <div>
    <h3>词类:</h3>
    <el-tree :data="data" :props="defaultProps" :default-expand-all="true" />
    <h3>句类:</h3>
    <el-tree :data="data1" :props="defaultProps" :default-expand-all="true" />
    <h3>时态:</h3>
    <el-tree :data="data2" :props="defaultProps" :default-expand-all="true" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      data: null,
      data1: null,
      data2: null,
      defaultProps: {
        children: 'children',
        label: 'label'
      }
    }
  },
  mounted() {
    // console.log(this.$store.state)
    this.data = this.$store.state.word.wordtype
    this.data1 = this.$store.state.word.sentencetype
    this.data2 = this.$store.state.word.tense
  }
}
</script>

<template>
  <div class="">
    <template>
      <el-button v-to="{ name: 'japanGrammarCreate' }" type="primary">创建</el-button>
    </template>
    <data-table
      ref="dataTable"
      v-loading="loading"
      v-bind="{
        data: list
      }"
      :columns="columns"
    />
  </div>
</template>

<script>
// import DataFilter from './dataFilter';

export default {
  data() {
    const columns = [
      {
        type: 'expand',
        templates: [
          {
            jsx: ({ row }) => {
              return (
                <el-form label-width='auto' label-position='right'>
                  <el-row gutter={ 20 }>
                    <el-col span={ 24 }>
                      <el-form-item label='注解'>{ row.sentences[0].annotation }</el-form-item>
                      <el-form-item label='类型'>{ row.sentences[0].type }</el-form-item>
                    </el-col>
                  </el-row>
                </el-form>
              )
            }
          }
        ]
      },
      {
        prop: 'word',
        label: '单词'
      }
    ]
    const operationCol = {
      label: '操作',
      formatter: (row, column, cellValue, index) => {
        return (
          <el-button
            type='primary'
            onClick={ () => this.$router.push({ name: 'japanGrammarCreate', query: { id: row.id }}) }
          >编辑</el-button>
        )
      }
    }
    return {
      loading: false,
      columns: (() => columns.concat(operationCol))(),
      list: [
        {
          word: 'is',
          sentences: [{
            annotation: '是',
            type: 'v'
          }]
        }
      ]
    }
  },

  //   components: {
  //     DataFilter
  //   },

  mounted() {
  },

  methods: {
  }
}
</script>

<style lang="scss" scoped></style>

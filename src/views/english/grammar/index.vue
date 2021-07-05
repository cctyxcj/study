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
                      <el-form-item label='例句'>{ row.sentences.sentence }</el-form-item>
                      <el-form-item label='注解'>{ row.sentences.annotation }</el-form-item>
                    </el-col>
                  </el-row>
                </el-form>
              )
            }
          }
        ]
      },
      {
        prop: 'grammar',
        label: '语法结构'
      },
      {
        prop: 'annotation',
        label: '注解'
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
          grammar: '...は...',
          annotation: '...是...',
          sentences: {
            sentence: 'あのひとはぼくのおにいさんです',
            annotation: '那个人是我的哥哥'
          }
        },
        {
          grammar: '...は...',
          annotation: '...是...',
          sentences: {
            sentence: 'あのひとはぼくのおにいさんです',
            annotation: '那个人是我的哥哥'
          }
        },
        {
          grammar: '...は...',
          annotation: '...是...',
          sentences: {
            sentence: 'あのひとはぼくのおにいさんです',
            annotation: '那个人是我的哥哥'
          }
        },
        {
          grammar: '...は...',
          annotation: '...是...',
          sentences: {
            sentence: 'あのひとはぼくのおにいさんです',
            annotation: '那个人是我的哥哥'
          }
        },
        {
          grammar: '...は...',
          annotation: '...是...',
          sentences: {
            sentence: 'あのひとはぼくのおにいさんです',
            annotation: '那个人是我的哥哥'
          }
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

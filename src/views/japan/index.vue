<template>
  <div class="">
    <el-tabs v-model="activeName">
      <el-tab-pane label="名词" name="first">
        <data-table
          v-loading="loading"
          v-bind="{
            data: nlist
          }"
          :columns="columns"
        />
      </el-tab-pane>
      <el-tab-pane label="动词" name="fourth">
        <data-table
          v-loading="loading"
          v-bind="{
            data: vlist
          }"
          :columns="columnv"
        />
      </el-tab-pane>
      <el-tab-pane label="形容词" name="firth">
        <data-table
          v-loading="loading"
          v-bind="{
            data: adjlist
          }"
          :columns="columns"
        />
      </el-tab-pane>
      <el-tab-pane label="副词" name="sixth">
        <data-table
          v-loading="loading"
          v-bind="{
            data: advlist
          }"
          :columns="columns"
        />
      </el-tab-pane>
      <el-tab-pane label="声像词" name="serverth">拗长音</el-tab-pane>
    </el-tabs>
    
  </div>
</template>

<script>
// import DataFilter from './dataFilter';
var json = require('./data.json')
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
                  <el-row gutter={ 10 }>
                    <el-col span={ 12 }>
                      <el-form-item label='例句'>{ row.sentences[0].e }</el-form-item>
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
      },
      {
        prop:"annotation",
        label:"注解"
      },
      {
        prop:"type",
        label:"类型"
      }
    ]
    const columnv = [
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
      activeName:'first',
      loading: false,
      columns: (() => columns.concat(operationCol))(),
      columnv: (() => columnv.concat(operationCol))(),
      nlist: json.n,
      vlist: [
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

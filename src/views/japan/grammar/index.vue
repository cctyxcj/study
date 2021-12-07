<template>
  <div class="">
    <template>
      <el-button v-to="{ name: 'japanGrammarCreate' }" type="primary">创建</el-button>
    </template>
    <div class="search">
      <el-input
        v-model="fifsea"
        placeholder="五十音索引"
        prefix-icon="el-icon-search"
        clearable
      />
      <el-input
        v-model="typesea"
        placeholder="类型索引"
        prefix-icon="el-icon-search"
        clearable
      />
      <el-input
        v-model="trasea"
        placeholder="注释索引"
        prefix-icon="el-icon-search"
        clearable
      />
    </div>
    <data-table
      ref="dataTable"
      v-loading="loading"
      v-bind="{
        data: w
      }"
      :columns="columns"
    />
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
      },
      {
        prop: 'type',
        label: '类型'
      }
    ]
    // const operationCol = {
    //   label: '操作',
    //   formatter: (row, column, cellValue, index) => {
    //     return (
    //       <el-button
    //         type='primary'
    //         onClick={ () => this.$router.push({ name: 'japanGrammarCreate', query: { id: row.id }}) }
    //       >编辑</el-button>
    //     )
    //   }
    // }
    return {
      loading: false,
      columns: columns,
      list: json.list,
      fifsea: '',
      typesea: '',
      trasea: ''
    }
  },
  computed: {
    w() {
      return this.list.filter(item => (item.key.indexOf(this.fifsea) >= 0) && (item.type.indexOf(this.typesea) >= 0) && (item.annotation.indexOf(this.trasea) >= 0))
    }
  },

  mounted() {
  },

  methods: {
  }
}
</script>

<style lang="scss" scoped>
.el-input {
    width: 300px;
    margin-right: 50px;
    margin-bottom: 10px;
}
</style>

<template>
  <div class="">
    <template>
      <el-button v-to="{ name: 'japanCreate' }" type="primary">创建</el-button>
    </template>
    <div class="search">
      <el-input
        v-model="fifsea"
        placeholder="五十音索引"
        prefix-icon="el-icon-search"
        clearable
      />
      <el-radio v-model="radio" label="1">词首</el-radio>
      <el-radio v-model="radio" label="2">包含</el-radio>
      <el-input
        v-model="typesea"
        placeholder="类型索引"
        prefix-icon="el-icon-search"
        clearable
      />
      <el-input
        v-model="trasea"
        placeholder="注解索引"
        prefix-icon="el-icon-search"
        clearable
      />
      <el-radio v-model="radio1" label="1">词</el-radio>
      <el-radio v-model="radio1" label="2">句</el-radio>
      <span>{{ length }}</span>
    </div>

    <el-tabs v-model="activeName">
      <el-tab-pane label="名词" name="nlist">
        <data-table
          v-loading="loading"
          v-bind="{
            data: w
          }"
          :columns="c"
        />
      </el-tab-pane>
      <el-tab-pane label="动词" name="vlist">
        <data-table
          v-loading="loading"
          v-bind="{
            data: w
          }"
          :columns="c"
        />
      </el-tab-pane>
      <el-tab-pane label="形容词" name="adjlist">
        <data-table
          v-loading="loading"
          v-bind="{
            data: w
          }"
          :columns="c"
        />
      </el-tab-pane>
      <el-tab-pane label="副词" name="advlist">
        <data-table
          v-loading="loading"
          v-bind="{
            data: w
          }"
          :columns="c"
        />
      </el-tab-pane>
      <el-tab-pane label="助词" name="aulist"><data-table
        v-loading="loading"
        v-bind="{
          data: w
        }"
        :columns="columns"
      /></el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
// import DataFilter from './dataFilter';
var json = require('./data.json')
export default {
  data() {
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
      activeName: 'nlist',
      loading: false,
      columns: [
        {
          type: 'expand',
          templates: [
            {
              jsx: ({ row }) => {
                return (
                  <el-form label-width='auto' label-position='right'>
                    <el-row gutter={ 10 }>
                      <el-col span={ 12 }>
                        <el-form-item label='例句'>{ row.sentences[0].exam }</el-form-item>
                        <el-form-item label='译'>{ row.sentences[0].tra }</el-form-item>
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
          label: '词'
        },
        {
          prop: 'chi',
          label: '汉'
        },
        {
          prop: 'tra',
          label: '译'
        },
        {
          prop: 'fif',
          label: '五十音'
        },
        {
          prop: 'type',
          label: '类型'
        }
      ],
      columnj: [
        {
          prop: 'word',
          label: '词'
        },
        {
          prop: 'chi',
          label: '例句',
          type: 'default',
          templates: [
            {
              jsx: ({ row }) => {
                return row.sentences[0].exam
              }
            }
          ]
        },
        {
          prop: 'tra',
          label: '译',
          type: 'default',
          templates: [
            {
              jsx: ({ row }) => {
                return row.sentences[0].tra
              }
            }
          ]
        }
      ],
      nlist: json.n,
      adjlist: json.adj,
      vlist: json.v,
      fifsea: '',
      typesea: '',
      trasea: '',
      advlist: json.adv,
      aulist: json.au,
      radio: '1',
      radio1: '1'
    }
  },
  computed: {
    w() {
      var arr
      if (this.radio === '1') {
        arr = this[this.activeName].filter(item => (item.fif.indexOf(this.fifsea) === 0) && (item.type.indexOf(this.typesea) >= 0) && (item.tra.indexOf(this.trasea) >= 0))
      } else {
        arr = this[this.activeName].filter(item => (item.fif.indexOf(this.fifsea) >= 0) && (item.type.indexOf(this.typesea) >= 0) && (item.tra.indexOf(this.trasea) >= 0))
      }
      return arr.sort(this.compare('fif')).sort(this.compare('fif', 1))
    },
    c() {
      if (this.radio1 === '1') {
        return this.columns
      } else {
        return this.columnj
      }
    },
    length() {
      return this.w.length
    }
  },

  mounted() {
  },

  methods: {
    compare(property, a) {
      if (a === 1) {
        return function(a, b) {
          var value1 = a[property].charCodeAt()
          var value2 = b[property].charCodeAt()
          return value1 - value2
        }
      } else {
        return function(a, b) {
          var value1 = a[property].length
          var value2 = b[property].length
          return value1 - value2
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.el-input {
    width: 300px;
    margin-right: 30px;
}
</style>

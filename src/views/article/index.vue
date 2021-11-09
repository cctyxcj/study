<template>
  <div class="">
    <!-- <template>
      <el-button v-to="{ name: 'articleDetails' }" type="primary">创建</el-button>
    </template> -->
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
var json = require('./data.json')
export default {
  data() {
    const columns = [
      {
        prop: 'title',
        label: '题目'
      },
      {
        prop: 'author',
        label: '作者'
      },
      {
        prop: 'provenance',
        label: '来源'
      }
    ]
    const operationCol = {
      label: '操作',
      formatter: (row, column, cellValue, index) => {
        return (
          <el-button
            type='primary'
            onClick={ () => this.$router.push({ name: 'articleDetails', params: { id: row.id }}) }
          >查看</el-button>
        )
      }
    }
    return {
      loading: false,
      columns: (() => columns.concat(operationCol))(),
      list: json.txt
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

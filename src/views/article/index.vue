<template>
  <div class="">
    <template>
      <el-button v-to="{ name: 'articleDetails' }" type="primary">创建</el-button>
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
        prop: 'title',
        label: '题目'
      },
      {
        prop: 'author',
        label: '作者'
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
            onClick={ () => this.$router.push({ name: 'articleDetails', query: { id: row.id }}) }
          >查看</el-button>
        )
      }
    }
    return {
      loading: false,
      columns: (() => columns.concat(operationCol))(),
      list: [
        {
          title: '105°的热爱',
          author: '未知',
          provenance:'网红音乐'
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

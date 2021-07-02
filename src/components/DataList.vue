<template>
  <div v-loading="loading">
    <!-- 表头，公开刷新接口 -->
    <div v-if="$scopedSlots.default" class="actions">
      <slot :search="search" />
    </div>

    <!-- 列表，绑定 -->
    <div ref="view" class="scroll-view">
      <slot name="table" :data="list" />
    </div>

    <!-- 分页 -->
    <pagination :total="total" :current-page="currentPage" :page-size="pageSize" @current-change="currentChange" @size-change="sizeChange" @refresh="refresh" />
  </div>
</template>

<script>
export default {
  props: {
    getData: Function
  },

  data() {
    return {
      list: [],
      total: 0,
      currentPage: 1,
      pageSize: 10,
      loading: false
    }
  },

  methods: {
    async currentChange(page) {
      this.currentPage = page
      await this.refresh()
    },

    async sizeChange(size) {
      this.currentPage = 1
      this.pageSize = size
      await this.refresh()
    },

    search(form) {
      const query = {}

      for (const values of Object.entries(form)) {
        if (typeof values[1] === 'string') {
          const text = values[1].trim()
          if (text !== '') {
            query[values[0]] = text
          }
        } else {
          query[values[0]] = values[1]
        }
      }
      this._query = query
      this.refresh()
    },

    async refresh() {
      if (!this.getData) {
        throw new Error('getData')
      }

      // 通过回调获取数据
      let result

      this.loading = true
      try {
        result = await this.getData({
          ...this._query,
          pageIndex: this.currentPage,
          pageSize: this.pageSize
        })
      } finally {
        this.loading = false
      }

      if (result.data === null) {
        throw new Error('data is null')
      }

      const { records, current, total, size } = result.data

      this.list = records
      this.currentPage = current
      this.total = total
      this.pageSize = size
    }
  }
}
</script>

<style lang="scss" scoped>
.actions {
  padding: 20px;
  border-bottom: solid 1px #eee;
  margin: 0 -20px;
}

.scroll-view {
  flex: 1;
  height: 0;
  overflow: auto;
}
</style>

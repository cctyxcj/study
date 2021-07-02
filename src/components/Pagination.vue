<template>
  <el-pagination
    :current-page.sync="internalCurrentPage"
    v-bind="{
      layout: 'total, sizes, prev, pager, next, jumper, slot',
      pageSizes: paginationPageSizes,
      ...$attrs
    }"
    v-on="$listeners"
  >
    <button
      v-if="showRefresh"
      type="button"
      class="btn-refresh"
      :disabled="$attrs.disabled"
      @click="refresh"
    >
      <i class="el-icon-refresh-right" />
    </button>

    <slot />
  </el-pagination>
</template>

<script>
import paginationPageSizes from '@/common/paginationPageSizes'

export default {
  inheritAttrs: false,

  props: {
    currentPage: {
      type: Number,
      default: 1
    },

    showRefresh: {
      type: Boolean,
      default: true
    },

    refreshPage: {
      type: Boolean,
      default: true
    }
  },

  data() {
    return {
      paginationPageSizes,

      internalCurrentPage: 1
    }
  },

  watch: {
    currentPage: {
      handler(newVal) {
        this.internalCurrentPage = newVal
      },
      immediate: true
    },

    internalCurrentPage: function(newVal) {
      this.$emit('update:currentPage', newVal)
    }
  },

  methods: {
    refresh() {
      const fn = this.$listeners['current-change']

      if (!fn) return

      if (this.refreshPage) this.internalCurrentPage = 1

      fn(this.internalCurrentPage)
    }
  }
}
</script>

<style lang="scss" scoped>
.el-pagination {
  display: table;
  margin: 20px 0 0 auto;

  .el-pagination__total,
  .el-pagination__jump {
    color: #9497a2;
  }

  button {
    border-radius: 50%;
    border: 1px solid #5d6781;
    text-align: center;

    &:hover {
      color: #fff;
      background-color: #34b1fb;
      border-color: #34b1fb;
    }

    &:disabled {
      opacity: 0.4;
    }
  }

  .btn-prev,
  .btn-next {
    padding: 0;

    .el-icon {
      font-size: 14px;
    }
  }

  .btn-refresh {
    min-width: 28px;
    height: 28px;
    color: #8f929e;
    border-color: currentColor;
    padding: 0;
    margin: 0 0 0 8px;
    cursor: pointer;

    &:hover {
      color: #fff;
    }

    i {
      font-size: 16px;
    }
  }
}
</style>

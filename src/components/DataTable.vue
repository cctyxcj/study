<script>
export default {
  inheritAttrs: false,

  props: {
    columns: {
      type: Array,
      default() {
        return []
      }
    }
  },

  data() {
    return {}
  },

  computed: {
    internalAttrs() {
      return Object.assign(
        {
          height: '100%',
          stripe: true
        },
        this.$attrs
      )
    }
  },

  methods: {
    /*
     * 用于触发内部table的方法
     */
    triggerFn(name, ...params) {
      const fn = this.$refs.table[name]

      fn && fn(...params)
    }
  },

  render(h) {
    const columns = this.columns.map((col, index) => {
      const scopedSlots = {}
      const key =
        col.columnKey || `column_${col.prop || col.label || index}_${index}`
      const attrs = {
        align: 'center',
        ...col
      }

      if (Array.isArray(col.templates) && col.templates.length > 0) {
        for (const template of col.templates) {
          scopedSlots[template?.name || 'default'] = (scope) =>
            template.jsx(scope)
        }
      }

      return (
        <el-table-column key={key} {...{ attrs }} scopedSlots={scopedSlots} />
      )
    })

    return (
      <el-table
        ref='table'
        {...{
          attrs: this.internalAttrs,
          on: this.$listeners
        }}
      >
        {columns}
      </el-table>
    )
  }
}
</script>

<style lang="scss" scoped></style>

<template>
  <el-form inline>
    <el-form-item v-for="(f, fIdx) in filterOptions" :key="fIdx" :label="f.label">
      <!-- 输入框 -->
      <template v-if="f.type === 'input'">
        <el-input
          v-model="inputGroup[f.id]"
          v-bind="{
            clearable: true,
            ...f.props
          }"
          v-on="f.events"
          @input="inputChange(f.id, $event)"
          @clear="inputChange.flush(f.id, $event)"
          @keyup.enter.native="enterSearch"
        />
      </template>

      <!-- 下拉选择 -->
      <template v-if="f.type === 'select'">
        <el-select
          v-model="form[f.id]"
          :loading="typeof f.loading === 'function' ? f.loading() : f.loading"
          v-bind="{
            clearable: true,
            ...f.props
          }"
          v-on="f.events"
        >
          <el-option
            v-for="(o, oIdx) in typeof f.options === 'function'
              ? f.options()
              : f.options || []"
            :key="oIdx"
            :value="o.value"
            :label="o.label"
            v-bind="o.props"
          />
        </el-select>
      </template>

      <!-- 联级选择 -->
      <template v-if="f.type === 'cascader'">
        <el-cascader
          v-model="form[f.id]"
          :options="
            typeof f.options === 'function' ? f.options() : f.options || []
          "
          v-bind="{
            clearable: true,
            filterable: true,
            ...f.props,
            props: {
              expandTrigger: 'hover',
              ...(f.props ? f.props.props : {})
            }
          }"
          v-on="f.events"
        />
      </template>

      <!-- 时间 -->
      <template v-if="f.type === 'date'">
        <el-date-picker
          v-model="form[f.id]"
          type="date"
          format="yyyy-MM-dd"
          value-format="yyyy-MM-dd"
          v-bind="{
            clearable: true,
            ...f.props
          }"
          v-on="f.events"
        />
      </template>

      <!-- 时间区间 -->
      <template v-if="f.type === 'daterange'">
        <el-date-picker
          v-model="form[f.id]"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          format="yyyy-MM-dd"
          value-format="yyyy-MM-dd"
          v-bind="{
            clearable: true,
            ...f.props
          }"
          v-on="f.events"
        />
      </template>
    </el-form-item>

    <el-form-item>
      <el-button v-if="showSearchButton" type="primary" @click="search">{{
        searchButtonText
      }}</el-button>
      <el-button v-if="showResetButton" type="danger" @click="reset">{{
        resetButtonText
      }}</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import _ from 'lodash'

export default {
  props: {
    /*
     * 过滤信息
     */
    value: {
      type: Object,
      default() {
        return {}
      }
    },

    /*
     * 过滤配置项
     */
    filterOptions: {
      type: Array,
      default() {
        return []
      }
    },

    /*
     * 是否显示搜索按钮
     *
     * 不显示时：
     *  1、input输入框开启输入防抖（默认：500毫秒）
     */
    showSearchButton: {
      type: Boolean,
      default: true
    },

    /*
     * 搜索按钮文字
     */
    searchButtonText: {
      type: String,
      default: '搜索'
    },

    /*
     * 是否显示重置按钮
     */
    showResetButton: {
      type: Boolean,
      default: true
    },

    /*
     * 重置按钮文字
     */
    resetButtonText: {
      type: String,
      default: '重置'
    },

    /*
     * 输入框防抖时间
     */
    debounce: {
      type: Number,
      default: 500
    }
  },

  data() {
    return {
      inputGroup: {},

      form: {}
    }
  },

  watch: {
    form: {
      handler(newVal, oldVal) {
        this.$emit('input', newVal) // v-model

        if (Object.keys(oldVal).length > 0) {
          this.$emit('change', newVal)
        } else {
          this.$emit('init', newVal)
        }
      },
      deep: true
    }
  },

  created() {
    // 添加输入防抖
    if (!this.showSearchButton) {
      this.inputChange = _.debounce(this.inputChange, this.debounce)
    }
  },

  mounted() {
    this.init()
  },

  methods: {
    /*
     * 初始化表单
     */
    init() {
      return new Promise((resolve, reject) => {
        const { filterOptions = [] } = this
        const result = {}

        if (filterOptions.length > 0) {
          for (const option of filterOptions) {
            const { id, type, defaultValue = '' } = option

            if (id) {
              if (type === 'input') {
                this.$set(this.inputGroup, id, defaultValue)
              }

              result[id] = defaultValue
            }
          }
        }

        this.form = result

        resolve(result)
      })
    },

    /*
     * 输入框输入时
     */
    inputChange(key, value) {
      this.form[key] = value
    },

    /*
     * 搜索
     */
    search() {
      this.$emit('search', this.form)
    },

    /*
     * 输入框回车搜索
     */
    enterSearch() {
      if (this.showSearchButton) this.search()
    },

    /*
     * 重置
     */
    async reset() {
      await this.init()

      this.$emit('reset', this.form)
    }
  }
}
</script>

<style lang="scss" scoped>
.el-form {
  .el-form-item {
    margin-right: 30px;
  }
}
</style>

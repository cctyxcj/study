<template>
  <Button v-bind="$attrs" :loading="submiting" v-on="$listeners" @click.stop="doClick">
    <slot />
  </Button>
</template>

<script>
import { Button } from 'element-ui'

export default {

  components: {
    Button
  },
  inheritAttrs: false,
  props: {
    click: Function,
    clickArgs: {},
    text: String,
    lock: {
      type: Boolean,
      default: true
    }
  },

  data() {
    return {
      submiting: false
    }
  },

  methods: {
    async doClick() {
      this.submiting = true
      try {
        await this.click(this.clickArgs)
      } catch (error) {
        if (error.retMsg) {
          this.$showError(error.retMsg)
        } else {
          this.$showError(error)
        }
      }
      this.submiting = false
    }
  }
}
</script>

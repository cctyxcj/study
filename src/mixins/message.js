export default {
  data() {
    return {

    }
  },

  methods: {
    async fetchNotReadMessageAmount() {
      try {
        const res = await this.$api.message.fetchNotReadMessageAmount()

        this.$store.dispatch('message/setMessageAmount', res.data)
      } catch (error) {
        console.log(error)
      }
    },

    async messageClick(message) {
      const { id, type, orderId } = message
      const query = {
        id: orderId
      }
      const messageMap = new Map([
        [1, 'NormalOrderDetail'],
        [2, 'RefundOrderDetail']
      ])

      this.$router.push({
        name: messageMap.get(type),
        query
      })

      await this.$api.message.readMessage({ id })
      this.fetchNotReadMessageAmount()
    }
  }
}

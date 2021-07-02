import paginationPageSizes from '@/common/paginationPageSizes'

export default {
  data() {
    return {
      pagination: {
        currentPage: 1,
        pageSize: paginationPageSizes[0],
        total: 0
      }
    }
  }
}

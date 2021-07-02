import DataFilter from './DataFilter'
import DataTable from './DataTable'
import DataList from './DataList'
import Pagination from './Pagination'
import Submit from './Submit'
import UploadPicCard from './UploadPicCard'

const components = {
  DataFilter,
  DataTable,
  DataList,
  Pagination,
  UploadPicCard,
  Submit
}

export default {
  install(Vue) {
    Object.keys(components).forEach(key => {
      Vue.component(key, components[key])
    })
  }
}

// import store from '@/store'

/* 平铺所有权限 */
// function flatRoles(roles) {
//   let flatResult = []

//   flatResult = roles.reduce((total, value) => {
//     let result = total.concat(value.url)

//     if (value.list && value.list.length > 0) {
//       result = result.concat(flatRoles(value.list))
//     }

//     return result
//   }, [])

//   return flatResult
// }

/**
 * 判断是否含有权限
 *
 * @export Function
 * @param {*} [permission=[]]
 * @returns Boolean
 */
export function hasPermission(permission = []) {
  // const { userInfo = {}, roles = [] } = store.getters
  // let flag = false

  // /* 超管不用权限控制 */
  // // if (userInfo?.roleId === 1) return true

  // return true

  // /* 传入权限是否在用户权限里 */
  // if (Array.isArray(permission) && permission.length > 0) {
  //   flag = flatRoles(roles).some(role => permission.includes(role))
  // }

  // return flag
}

export default {
  hasPermission
}

import Vue from 'vue'

/**
 * 数字格式化（非四舍五入保留小数位）
 *
 * @param {Number} number 目标数字
 * @param {Number} [decimalPlaces=2] 保留多少位，默认两位
 * @returns Number
 */
export function numberFormatter(number, decimalPlaces = 2) {
  if (typeof number !== 'number') return number

  const numberStr = number.toString()
  const decimalIndex = numberStr.indexOf('.')

  if (decimalPlaces > 0 && decimalIndex > 0) {
    return parseFloat(numberStr.slice(0, decimalIndex + decimalPlaces + 1))
  } else {
    return parseInt(numberStr)
  }
}

/**
 * 计算两个日期之间相差的天数
 *
 * @param {Date} start 开始日期
 * @param {Date} end 结束日期
 * @returns Number
 */
export function getDifferenceDays(start, end) {
  const startDate = new Date(start)
  const endDate = new Date(end)
  const ONE_DAY_TIMESTAMP = 24 * 3600 * 1000
  let day = 0

  if (
    startDate.toString() !== 'Invalid Date' &&
    endDate.toString() !== 'Invalid Date'
  ) {
    const startDateTs = startDate.setHours(0, 0, 0, 0)
    const endDateTs = endDate.setHours(0, 0, 0, 0)

    if (endDateTs > startDateTs) {
      day = Math.ceil((endDateTs - startDateTs) / ONE_DAY_TIMESTAMP)
    }
  }

  return day
}

/**
 * 比较数组中日期大小
 *
 * @param {*} [arr=[]] 多个日期数组
 * @param {Boolean} [max=true] 是否返回最大的，否则返回最小的
 * @returns String
 */
export function comparisonDate(arr = [], max = true) {
  let result = ''

  if (arr.length > 0) {
    let temp = ''

    for (const date of arr) {
      const current = new Date(temp)
      const next = new Date(date)
      const current_isInvalidDate = current.toString() === 'Invalid Date'
      const next_isInvalidDate = next.toString() === 'Invalid Date'

      if (temp) {
        if (!current_isInvalidDate && !next_isInvalidDate) {
          const currentTimeStamp = next.getTime()
          const nextTimeStamp = next.getTime()

          if (max) {
            if (nextTimeStamp > currentTimeStamp) {
              temp = date
            }
          } else {
            if (nextTimeStamp < currentTimeStamp) {
              temp = date
            }
          }
        }
      } else if (!next_isInvalidDate) {
        temp = date
      }
    }

    result = temp
  }

  return result
}

/**
 * 数字补零
 *
 * @param {Number} [number=0]
 * @returns
 */
export function numberMakeZore(target = 0) {
  const targetNumber = +target

  if (isNaN(targetNumber) || targetNumber >= 10) return target

  return `0${targetNumber}`
}

/**
 * 判断是否是ie浏览器
 *
 * @returns Boolean
 */
export function isIE() {
  const { userAgent } = window.navigator

  if (userAgent.includes('Trident') || userAgent.includes('MSIE')) {
    return true
  }

  return false
}

/**
 * 防抖
 *
 * @param {Function} fn
 * @param {Number} wait
 * @param {Boolean} immediate
 * @returns Function
 */
export function debounce(fn, wait, immediate) {
  let timeout = null
  let timestamp = null
  let args = null
  let context = null
  let result = null

  const later = function() {
    // 据上一次触发时间间隔
    const last = Date.now() - timestamp

    // 上次被包装函数被调用时间间隔 last 小于设定时间间隔 wait
    if (last < wait && last > 0) {
      timeout = setTimeout(later, wait - last)
    } else {
      timeout = null

      // 如果设定为immediate === true，因为开始边界已经调用过了此处无需调用
      if (!immediate) {
        result = fn.apply(context, args)

        if (!timeout) context = args = null
      }
    }
  }

  return function(...args) {
    context = this
    timestamp = Date.now()

    // 如果延时不存在，重新设定延时
    if (!timeout) timeout = setTimeout(later, wait)

    if (immediate && !timeout) {
      result = fn.apply(context, args)

      context = args = null
    }

    return result
  }
}

/**
 * webpack自动化引入的文件转换成以文件名为key，以export default为value的对象
 *
 * @param {*} args
 * @return Array
 */
export function importModules(files) {
  const modules = files.keys().reduce((modules, modulePath) => {
    const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1')
    const value = files(modulePath)

    modules[moduleName] = value.default

    return modules
  }, {})

  return modules
}

/**
 * 上传图片到服务器
 *
 * @param {Array | String}
 * @return Promise
 */
async function upload(file) {
  const formData = new FormData()
  formData.append('file', file)

  const { data } = await Vue.prototype.$api.common.uploadImage(formData)
  const { url } = data

  return url
}
export async function uploadImages(files) {
  let result = null

  if (!files) return result

  if (Array.isArray(files)) {
    result = []

    for (const [index, file] of files.entries()) {
      if (file instanceof File) {
        result.push(await upload(file))
      } else {
        result.push(file)
      }

      console.log(`上传成功：${index + 1}/${files.length}`)
    }
  } else if (files && files instanceof File) {
    result = await upload(files)
  } else {
    result = files
  }

  return result
}

export default {
  numberFormatter,
  getDifferenceDays,
  comparisonDate,
  numberMakeZore,
  isIE,
  uploadImages,
  importModules,
  debounce
}

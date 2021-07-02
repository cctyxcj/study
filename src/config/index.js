/*
 * 因为vue.config.js里有需要用到的变量，所以一定要使用module.exports导出
*/

/* 页面标题 */
const PAGE_TITLE = '记录生活'

/* 请求域名 */
const REQUEST_BASE_URL = 'http://47.115.44.78:9001/gyy-busi' // 本地环境

/* upload url */
const UPLOAD_URL = `http://47.115.44.78:9000/auxiliary`

/* websocket域名 */
const WEBSOCKET_BASE_URL = 'ws://10.168.1.121:9092' // 本地环境

module.exports = {
  PAGE_TITLE,
  REQUEST_BASE_URL,
  UPLOAD_URL,
  WEBSOCKET_BASE_URL
}

/*
 * 消息
*/
export const messageType = new Map([
  [1, { type: '', message: '你有新的订单提醒，请及时处理' }],
  [2, { type: 'warning', message: '你有新的退款订单，请及时处理' }],
  [3, { type: 'warning', message: '你有新的租赁订单提醒，请及时处理' }]
])

/*
 * 管理员状态
*/
export const administratorStatus = new Map([
  [0, { type: 'danger', title: '禁用' }],
  [1, { type: 'success', title: '正常' }]
])

/*
 * 用户是否为代理商
*/
export const userIsAgent = new Map([
  [1, { type: 'success', title: '是' }],
  [0, { type: 'danger', title: '否' }]
])

/*
 * 用户状态
*/
export const userStatus = new Map([
  [0, { type: 'success', title: '正常' }],
  [1, { type: 'danger', title: '冻结' }]
])

/*
 * 商品类型
*/
export const goodsTypes = new Map([
  [0, { title: '普通商品' }],
  [1, { title: '租赁商品' }]
])

/*
 * 普通订单状态
*/
export const normalOrderStatus = new Map([
  [0, { type: '', title: '待付款' }],
  [1, { type: 'warning', title: '待发货' }],
  [2, { type: 'warning', title: '待收货' }],
  [3, { type: 'success', title: '已完成' }],
  [4, { type: 'info', title: '已关闭' }]
])

/*
 * 退款订单状态
*/
export const refundOrderStatus = new Map([
  [0, { type: '', title: '待处理' }],
  [1, { type: 'success', title: '退款成功' }],
  [2, { type: 'danger', title: '拒绝退款' }],
  [3, { type: 'info', title: '退款关闭' }]
])

/*
 * 退款原因
*/
export const refundReason = new Map([
  [0, { type: '', title: '不想买了' }],
  [1, { type: 'success', title: '信息填写错误，重新拍' }],
  [2, { type: 'danger', title: '其他原因' }]
])

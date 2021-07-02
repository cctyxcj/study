/**
 * 统一商品图轮播jsx
 *
 * @export
 * @param {Function} h  this.$createElement
 * @param {Array} images
 * @return {JSX}
 */
export function goodsImages(h, images) {
  return (
    <el-carousel trigger='click' height='150px'>
      {
        images.map((val, idx) => (
          <el-carousel-item key={ idx }>
            <el-image class='carousel-image' fit='cover' src={ val }></el-image>
          </el-carousel-item>
        ))
      }
    </el-carousel>
  )
}

<template>
  <div class="breadcrumb">
    <div class="breadcrumb-container">
      您当前的位置：
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <transition-group name="breadcrumb">
          <el-breadcrumb-item v-for="(item,index) in levelList" :key="item.path">
            <span
              v-if="item.redirect === 'noRedirect' || index === levelList.length - 1"
              class="no-redirect"
            >{{ item.meta.title }}</span>

            <a
              v-else
              @click.prevent="linkClick(item)"
            >{{ item.meta.title }}</a>
          </el-breadcrumb-item>
        </transition-group>
      </el-breadcrumb>
    </div>
  </div>
</template>

<script>
import * as pathToRegexp from 'path-to-regexp'

export default {
  name: 'Breadcrumb',

  data() {
    return {
      levelList: null
    }
  },

  watch: {
    $route(route) {
      // if you go to the redirect page, do not update the breadcrumbs
      if (route.path.startsWith('/redirect/')) {
        return
      }

      this.getBreadcrumb()
    }
  },

  created() {
    this.getBreadcrumb()
  },

  methods: {
    getBreadcrumb() {
      // only show routes with meta.title
      let matched = this.$route.matched.filter(item => item.meta?.title)
      const [{ name = '' }] = matched
      const isIndex = name && name.trim().toLocaleLowerCase() === 'Index'.toLocaleLowerCase()

      if (!isIndex) {
        matched = [{ path: '/', meta: { title: '首页' }}].concat(matched)
      }

      this.levelList = matched.filter(item => item.meta?.title && (item.meta.breadcrumb ?? true))
    },

    pathCompile(path) {
      // To solve this problem https://github.com/PanJiaChen/vue-element-admin/issues/561
      const { params } = this.$route
      const toPath = pathToRegexp.compile(path)

      return toPath(params)
    },

    linkClick(item) {
      const { redirect, path } = item

      this.$router.push(redirect || this.pathCompile(path))
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~@/styles/variables.scss";

.breadcrumb {
  position: fixed;
  top: $naviBarHeight;
  left: $sideBarWidth;
  right: 0;
  z-index: 1000;
  display: flex;
  align-items: center;
  height: 46px;
  background-color: #fff;
  padding: 0 26px;

  .breadcrumb-container {
    display: flex;
    align-items: center;
    font-size: 14px;
    color:  #A8B1C2;
    ::v-deep .el-breadcrumb {
      margin: 0 0 0 5px;
      .el-breadcrumb__inner {
        color: inherit !important;
        font-weight: bold !important;
        > a {
          color: inherit;
        }
      }

      .no-redirect {
        cursor: text;
      }
    }
  }
}
</style>

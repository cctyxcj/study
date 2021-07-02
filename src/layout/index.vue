<template>
  <div class="layout" :class="classes">
    <navbar />
    <sidebar class="sidebar-container" />
    <breadcrumb />
    <!-- <Customer /> -->
    <div class="main-container" :style="containerStyle">
      <app-main />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

import AppMain from './components/AppMain'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import Breadcrumb from './components/Breadcrumb'
// import Customer from '@/components/customer'

export default {
  name: 'Layout',

  components: {
    AppMain,
    Navbar,
    Sidebar,
    Breadcrumb
    // Customer
  },

  props: {
    hasPadding: {
      type: Boolean,
      default: true
    }
  },

  computed: {
    ...mapState({
      sidebar: state => state.app.sidebar
    }),

    classes() {
      return {
        hideSidebar: !this.sidebar.opened
      }
    },

    containerStyle() {
      if (this.hasPadding) {
        return {
          padding: '10px'
        }
      }

      return ''
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~@/styles/variables';

.layout {
  position: relative;
  width: 100%;
  height: 100%;
  padding: $naviBarHeight + $tagViewHeight 0 0 $sideBarWidth;
  .main-container {
    position: relative;
    width: 100%;
    height: 100%;
  }

  ::v-deep .sidebar-container {
    position: fixed;
    top: $naviBarHeight;
    bottom: 0;
    left: 0;
    width: $sideBarWidth;
    font-size: 0;
    z-index: 1001;
    background-color: $menuBg;
    transition: width 0.28s;
    box-shadow: 0 6px 20px 0 rgba(36, 28, 2, 0.06);
    overflow: hidden;
  }

  .breadcrumb {
    transition: left 0.28s;
  }
}

.hideSidebar {
  padding-left: $closeSideBarWidth;
  .sidebar-container {
    width: $closeSideBarWidth;
  }

  .breadcrumb {
    left: $closeSideBarWidth;
  }

  ::v-deep .submenu-title-noDropdown {
    position: relative;
    padding: 0 !important;

    .el-tooltip {
      text-align: center;
      padding: 0 !important;

      [class^="el-icon-"] {
        width: auto;
        margin: 0;
      }
    }
  }

  ::v-deep .el-submenu {
    overflow: hidden;
    & > .el-submenu__title {
      text-align: center;
      padding: 0 !important;

      [class^="el-icon-"] {
        width: auto;
        margin: 0;
      }

      .el-submenu__icon-arrow {
        display: none;
      }
    }
  }

  ::v-deep .el-menu--collapse {
    .el-submenu {
      & > .el-submenu__title {
        & > span {
          display: inline-block;
          height: 0;
          width: 0;
          overflow: hidden;
          visibility: hidden;
        }
      }
    }
  }
}
</style>


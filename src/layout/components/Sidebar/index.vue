<template>
  <el-scrollbar>
    <el-menu mode="vertical" unique-opened :background-color="variables.menuBg" :text-color="variables.menuText" :active-text-color="variables.menuActiveText" :default-active="activeMenu" :collapse="isCollapse" :collapse-transition="false">
      <template v-for="route in permission_routes">
        <sidebar-item :key="route.path" :item="route" :base-path="route.path" />
      </template>
    </el-menu>
  </el-scrollbar>
</template>

<script>
import { mapGetters } from 'vuex'

import SidebarItem from './components/SidebarItem'

import variables from '@/styles/variables.scss'

export default {
  name: 'Sidebar',

  components: {
    SidebarItem
  },

  data() {
    return {
      variables
    }
  },

  computed: {
    ...mapGetters(['permission_routes', 'sidebar']),

    activeMenu() {
      const { meta, path } = this.$route

      if (meta.activeMenu) {
        return meta.activeMenu
      }

      return path
    },

    isCollapse() {
      return !this.sidebar.opened
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~@/styles/variables';

.el-scrollbar {
  ::v-deep .el-scrollbar__wrap {
    overflow-x: hidden;
  }
}

::v-deep .el-menu {
  width: 100% !important;
  height: 100%;
  border: none;

  // reset element-ui css
  .horizontal-collapse-transition {
    transition: 0s width ease-in-out, 0s padding-left ease-in-out,
      0s padding-right ease-in-out;
  }

  [class^='el-icon-'] {
    width: 30px;
    margin: 0 10px 0 0;
  }

  // menu hover
  .submenu-title-noDropdown,
  .el-submenu__title {
    &:hover {
      background-color: $menuHover !important;
    }
  }

  .is-active {
    &,
    & > .el-submenu__title {
      background-color: $menuActiveBg !important;
      color: $menuActiveText !important;
    }
  }

  .nest-menu .el-submenu > .el-submenu__title,
  .el-submenu .el-menu-item {
    min-width: $sideBarWidth !important;
    background-color: $subMenuBg !important;

    &:hover {
      background-color: $subMenuHover !important;
    }
  }

  .el-submenu .is-active {
    color: $subMenuActiveText !important;
  }
}
</style>

<style lang="scss">
@import '~@/styles/variables';

// when menu collapsed
.el-menu--vertical {
  & > .el-menu {
    [class^='el-icon-'] {
      width: 30px;
      margin: 0 10px 0 0;
    }
  }

  .nest-menu .el-submenu > .el-submenu__title,
  .el-menu-item {
    &:hover {
      background-color: $menuHover !important;
    }
  }

  // the scroll bar appears when the subMenu is too long
  > .el-menu--popup {
    max-height: 100vh;
    overflow-y: auto;

    &::-webkit-scrollbar-track-piece {
      background: #d3dce6;
    }

    &::-webkit-scrollbar {
      width: 6px;
    }

    &::-webkit-scrollbar-thumb {
      background: #99a9bf;
      border-radius: 20px;
    }
  }
}
</style>

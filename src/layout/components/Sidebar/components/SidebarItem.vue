<template>
  <div v-if="!item.hidden">
    <router-link
      v-if="hasOneShowingChild(item.children, item) && !item.alwaysShow && (!onlyOneChild.children || onlyOneChild.noShowingChildren) && onlyOneChild.meta"
      :to="resolvePath(onlyOneChild.path)"
    >
      <el-menu-item
        :index="resolvePath(onlyOneChild.path)"
        :class="{ 'submenu-title-noDropdown': !isNest }"
      >
        <item
          :icon="onlyOneChild.meta.icon || item.meta.icon"
          :title="onlyOneChild.meta.title"
        />
      </el-menu-item>
    </router-link>

    <el-submenu
      v-else
      ref="subMenu"
      popper-append-to-body
      :index="resolvePath(item.path)"
    >
      <template slot="title">
        <item
          v-if="item.meta"
          :icon="item.meta && item.meta.icon"
          :title="item.meta.title"
        />
      </template>

      <sidebar-item
        v-for="child in item.children"
        :key="child.path"
        class="nest-menu"
        is-nest
        :item="child"
        :base-path="resolvePath(child.path)"
      />
    </el-submenu>
  </div>
</template>

<script>
import path from 'path'

import Item from './Item'

function isExternal(path) {
  return /^(https?:|mailto:|tel:)/.test(path)
}

export default {
  name: 'SidebarItem',

  components: {
    Item
  },

  props: {
    // route object
    item: {
      type: Object,
      required: true
    },

    isNest: {
      type: Boolean,
      default: false
    },

    basePath: {
      type: String,
      default: ''
    }
  },

  data() {
    return {
      onlyOneChild: null
    }
  },

  methods: {
    hasOneShowingChild(children = [], parent) {
      const showingChildren = children.filter(item => {
        if (item.hidden) {
          return false
        } else {
          // Temp set(will be used if only has one showing child)
          this.onlyOneChild = item

          return true
        }
      })

      // When there is only one child router, the child router is displayed by default
      if (showingChildren.length === 1) {
        return true
      }

      // Show parent if there are no child router to display
      if (showingChildren.length === 0) {
        this.onlyOneChild = {
          ...parent,
          path: '',
          noShowingChildren: true
        }

        return true
      }

      return false
    },

    resolvePath(routePath) {
      if (isExternal(routePath)) {
        return routePath
      }

      if (isExternal(this.basePath)) {
        return this.basePath
      }

      return path.resolve(this.basePath, routePath)
    }
  }
}
</script>

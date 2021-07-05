<template>
  <div class="navbar">
    <div class="page-title">
      <img class="logo pointer" src="@/assets/logo.png" @click="toggleSideBar">{{ PAGE_TITLE }}
    </div>
    <div v-if="Object.keys(userInfo).length > 0" class="right-menu">

      <el-dropdown class="avatar-container right-menu-item">
        <div class="avatar-wrapper pointer">
          <!-- <avatar :username="userInfo.name" :src="userInfo.avatar" :size="48" /> -->
          <div class="user-name">{{ userInfo.name }}</div>
          <i class="el-icon-caret-bottom" />
        </div>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item icon="el-icon-switch-button" @click.native="logout">退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

// import Avatar from 'vue-avatar'

import messageMixin from '@/mixins/message'

import { PAGE_TITLE } from '@/config'

// import { getToken } from '@/utils/token'

export default {
  name: 'Navbar',

  components: {
    // Avatar
  },

  mixins: [messageMixin],

  data() {
    return {
      PAGE_TITLE,

      wsInstance: null
    }
  },

  computed: {
    ...mapGetters([
      'userInfo',
      'messageAmount'
    ])
  },

  created() {
    // this.fetchNotReadMessageAmount()
  },

  beforeDestroy() {
    if (this.wsInstance) {
      this.wsInstance.close()
      this.wsInstance = null
    }
  },

  methods: {

    toggleSideBar() {
      this.$store.dispatch('app/toggleSideBar')
    },

    async logout() {
      await this.$store.dispatch('account/logout')

      this.$router.push('/login')
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~@/styles/variables';

.navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: $naviBarHeight;
  padding: 0 48px 0 58px;
  color: #fff;
  background-color: green;
  overflow: hidden;
  .page-title {
    display: flex;
    align-items: center;
    font-size: 20px;
    .logo {
      width: 42px;
      height: 42px;
      margin: 0 20px 0 0;
    }
  }
  .right-menu {
    display: flex;
    align-items: center;
    .right-menu-item {
      color: inherit;
      + .right-menu-item {
        margin: 0 0 0 30px;
      }
    }

    .user-message {
      display: flex;
      align-items: center;
      font-size: 14px;
      .el-icon-message-solid {
        font-size: 18px;
      }
      .el-badge {
        margin: 0 0 0 10px;
      }
    }

    .avatar-container {
      .avatar-wrapper {
        position: relative;
        display: flex;
        align-items: center;
        .user-avatar {
          flex-shrink: 0;
          width: 34px;
          height: 34px;
          border-radius: 50%;
          overflow: hidden;
        }
        .user-name {
          font-size: 16px;
          margin: 0 0 0 16px;
        }

        .el-icon-caret-bottom {
          font-size: 12px;
          margin: 0 0 0 16px;
        }
      }
    }
  }
}

.el-dropdown-menu {
  .el-dropdown-menu__item {
    display: flex;
    align-items: center;
    font-size: 15px;
    color: #333;
    line-height: 24px;
    padding: 15px 20px;
    margin: 0;
    ::v-deep i {
      font-size: 21px;
      margin: 0 15px 0 0;
    }
  }
}
</style>

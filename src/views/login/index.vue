<template>
  <div class="login-container">
    <div class="login-header">
      <img class="logo" src="@/assets/logo.png">{{ PAGE_TITLE }}
    </div>
    <div class="login-center">
      <div class="form-title">登录</div>
      <el-form ref="form" :model="form" :rules="rules" autocomplete="on">
        <el-form-item prop="username">
          <el-input
            ref="username"
            v-model.trim="form.username"
            placeholder="请输入用户账号"
          >
            <i slot="prefix" class="el-icon-user" />
          </el-input>
        </el-form-item>

        <el-form-item prop="password">
          <el-input
            ref="password"
            v-model.trim="form.password"
            type="password"
            placeholder="请输入密码"
            @keyup.enter.native="login"
          >
            <i slot="prefix" class="el-icon-lock" />
          </el-input>
        </el-form-item>

        <el-checkbox v-model="isRemember">记住密码</el-checkbox>

        <el-button
          class="btn-login"
          :loading="loading"
          type="primary"
          @click.native.prevent="login"
        >登录
        </el-button>
      </el-form>
    </div>
  </div>
</template>

<script>
import { PAGE_TITLE } from '@/config'

const LOCALSTORAGE_USERNAME_KEY = 'username'
const LOCALSTORAGE_PASSWORD_KEY = 'password'

export default {
  name: 'Login',

  data() {
    return {
      PAGE_TITLE,

      form: {
        username: 'admin',
        password: '123456'
      },

      rules: {
        username: [
          {
            required: true,
            message: '请输入用户账号',
            trigger: 'change'
          }
        ],
        password: [
          {
            required: true,
            min: 6,
            message: '请输入6位及以上的密码',
            trigger: 'change'
          }
        ]
      },

      isRemember: false,
      loading: false
    }
  },

  computed: {
    redirect() {
      const { redirect } = this.$route.query

      return redirect || '/'
    },

    otherQuery() {
      const { query } = this.$route
      let otherQuery = {}

      otherQuery = Object.keys(query).reduce((acc, cur) => {
        if (cur !== 'redirect') {
          acc[cur] = query[cur]
        }
        return acc
      }, {})

      return otherQuery
    }
  },

  mounted() {
    if (this.form.username === '') {
      this.$refs.username.focus()
    } else if (this.form.password === '') {
      this.$refs.password.focus()
    }
  },

  created() {
    this.getLocalStorageAccountInfo()
  },

  methods: {
    login() {
      this.$refs.form.validate(async valid => {
        if (valid) {
          this.loading = true
          await this.$store.dispatch('account/login', this.form)
          this.$router
            .replace({
              path: this.redirect,
              query: this.otherQuery
            })
            .catch(err => {
              err
            })
          // try {
          //   await this.$store.dispatch('account/login', this.form)

          //   this.isRemember ? this.saveLocalStorageAccountInfo() : this.removeLocalStorageAccountInfo()

          //   this.$router
          //     .replace({
          //       path: this.redirect,
          //       query: this.otherQuery
          //     })
          //     .catch(err => {
          //       err
          //     })
          // } catch (error) {
          //   this.$showError(error)
          // }

          this.loading = false
        }
      })
    },

    /*
     * 将账号密码存入localStorage
     */
    saveLocalStorageAccountInfo() {
      localStorage.setItem(LOCALSTORAGE_USERNAME_KEY, this.form.username)
      localStorage.setItem(LOCALSTORAGE_PASSWORD_KEY, this.form.password)
    },

    /*
     * 获取已存入localStorage的账号密码
     */
    getLocalStorageAccountInfo() {
      const username = localStorage.getItem(LOCALSTORAGE_USERNAME_KEY) || ''
      const password = localStorage.getItem(LOCALSTORAGE_PASSWORD_KEY) || ''

      if (username && password) {
        this.form.username = username
        this.form.password = password
        this.isRemember = true
      }
    },

    /*
     * 移除已存入localStorage的账号密码
     */
    removeLocalStorageAccountInfo() {
      localStorage.removeItem(LOCALSTORAGE_USERNAME_KEY)
      localStorage.removeItem(LOCALSTORAGE_PASSWORD_KEY)
    }
  }
}
</script>

<style lang="scss" scoped>
$headerHeight: 88px;
$backgroundColor: #fff;

.login-container {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100%;
  width: 100%;
  padding: $headerHeight 0 0;
  background: linear-gradient(80deg, green, #00d2ff);
  overflow: hidden;
  .login-header {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    z-index: 2;
    display: flex;
    align-items: center;
    width: 100%;
    height: $headerHeight;
    font-size: 20px;
    color: #333;
    padding: 0 0 0 85px;
    background-color: $backgroundColor;
    .logo {
      width: 49px;
      height: 49px;
      margin: 0 13px 0 0;
    }
  }
  .login-center {
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 900px;
    height: 439px;
    border-radius: 10px;
    background-color: $backgroundColor;
    background-image: url("~@/assets/login-bg.png");
    background-repeat: no-repeat;
    background-size: 495px 439px;
    background-position: center left;
    padding: 0 31px 0 460px;
    .form-title {
      font-size: 20px;
      color: #417ef7;
      text-align: center;
    }
    ::v-deep .el-form {
      width: 409px;
      margin: 31px 0 0;
      .el-input {
        input {
          height: 56px;
          line-height: 56px;
          padding-left: 58px;
        }
        .el-input__prefix {
          left: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 58px;
          .el-icon-user,
          .el-icon-lock {
            font-size: 22px;
          }
        }
      }
    }
    ::v-deep .el-checkbox {
      display: flex;
      align-items: center;
      .el-checkbox__inner {
        width: 20px;
        height: 20px;
        border-color: #c2c2c2;
        vertical-align: top;
        &::after {
          width: 5px;
          height: 11px;
          left: 6px;
          top: 1px;
        }
      }
      .el-checkbox__label {
        font-size: 16px;
        line-height: 20px;
        color: #666;
        font-weight: inherit;
        padding: 0 0 0 16px;
      }
    }
    .btn-login {
      width: 100%;
      height: 56px;
      font-size: 18px;
      border-radius: 6px;
      margin: 45px 0 0;
    }
  }
}
</style>

<template>
  <el-form :inline="true" class="search-form">
    <el-form-item label="账号：">
      <el-input v-model="form.account" :clearable="true" />
    </el-form-item>

    <el-form-item label="昵称：">
      <el-input v-model="form.username" :clearable="true" />
    </el-form-item>

    <el-form-item label="手机号码：">
      <el-input v-model="form.mobileid" :clearable="true" />
    </el-form-item>

    <el-form-item label="用户类型：">
      <el-select v-model="form.usertype">
        <el-option v-for="usertype in usertype_list" :key="usertype.id" :label="usertype.name" :value="usertype.id" />
      </el-select>
    </el-form-item>

    <el-form-item>
      <el-button @click="$emit('search', form)">搜索</el-button>
      <slot></slot>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  data() {
    return {
      usertype_list: [
        { id: '', name: '全部' },
        { id: 0, name: '普通用户' },
        { id: 1, name: '会员用户' },
        { id: 2, name: '游客' },
        { id: 3, name: '临时会员' }
      ],
      form: {
        account: '',
        username: '',
        mobileid: '',
        usertype: ''
      }
    };
  }
};
</script>
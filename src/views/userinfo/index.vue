<template>
  <data-list ref="list" class="page-container" :get-data="getData">
    <template #default="{ search }">
      <DataFilter @search="search">
        <el-button v-to="{ name: 'UserInfoCreate' }" type="primary">创建</el-button>
      </DataFilter>
    </template>
    <template #table="{ data }">
      <el-table :data="data">
        <el-table-column v-slot="{ row }" label="头像图片地址">
          <template v-if="row.imgurl">
            <el-image fit="cover" style="width:60px;height:60px;border-radius: 100%" :src="row.imgurl" :preview-src-list="[row.imgurl]" />
          </template>
          <template v-else>
            <div style="width:60px;height:60px;text-align:center;line-height:60px;border-radius: 100%;background:#eee;color: #999;">无头像</div>
          </template>
        </el-table-column>
        <el-table-column label="账号" prop="account" />
        <el-table-column label="用户名称" prop="username" />
        <el-table-column label="手机号码" prop="mobileid" />
        <el-table-column v-slot="{ row }" label="会员类型">
          <span>{{ usertypes[row.usertype] }}</span>
        </el-table-column>
        <el-table-column label="会员到期时间" prop="enddate" />
        <el-table-column v-slot="{ row }" label="账号状态">
          <span>{{ states[row.state] }}</span>
        </el-table-column>
        <el-table-column label="级别" prop="level" />
        <el-table-column label="累计交易金额" prop="aggamt" />
        <el-table-column v-slot="{ row }" label="新增时间">
          <span style="display: flex; text-align:center" v-html="formatTime(row.intime)"></span>
        </el-table-column>
        <el-table-column v-slot="{ row }" label="操作" width="320">
          <div class="options">
            <el-button @click="handleReset(row.account)" type="primary" size="small">重设密码</el-button>
            <el-button v-to="{ name: 'UserInfoCreate', query:{id:row.account} }" :disabled="row.usertype !== 3" type="primary" size="small">编辑</el-button>
            <el-button @click="handleSetState(row.account, 1, '停用')" :disabled="row.state === 1" type="primary" size="small">停用</el-button>
            <el-button @click="handleSetState(row.account, 0, '启用')" :disabled="row.state === 0" type="primary" size="small">启用</el-button>
          </div>
        </el-table-column>
      </el-table>
    </template>
  </data-list>
</template>

<script>
import DataFilter from './dataFilter';

export default {
  data() {
    return {
      usertypes: {
        0: '普通用户',
        1: '会员用户',
        2: '游客',
        3: '临时会员'
      },
      states: {
        0: '正常',
        1: '冻结'
      }
    };
  },

  components: {
    DataFilter
  },

  mounted() {
    this.refresh();
  },

  methods: {
    getData(query) {
      return this.$api.userinfo.fetch(query);
    },

    async refresh() {
      return this.$refs.list.refresh();
    },

    remove(id) {
      this.$showConfirm(async () => {
        await this.$api.userinfo.remove({ id });
        this.refresh();
      });
    },

    handleSetState(account, state, title) {
      this.$showConfirm(async () => {
        await this.$api.userinfo.update({ account, state });
        this.refresh();
      }, '确定要' + title + '该账号吗？');
    },

    handleReset(account) {
      this.$showConfirm(async () => {
        await this.$api.userinfo.updatePwd(account, '123456');
        this.refresh();

        this.$notify.success({
          title: 'Info',
          message: '已重设密码为123456',
          showClose: false
        });
      }, '确定要重设密码吗？');
    },

    formatTime(time) {
      return time.replace(' ', '<br/>');
    }
  }
};
</script>

<style lang="scss" scoped></style>

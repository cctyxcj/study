<template>
  <div class="page-container goods-create" style="overflow:auto" v-loading="loading">
    <el-form ref="form" label-width="auto" label-position="right" :model="form" :rules="rules">
      <el-form-item label="头像" prop="imgurl">
        <UploadPicCard v-if="!loading" ref="uploader" :files.sync="form.imgurl" />
      </el-form-item>

      <el-form-item label="账号" prop="account">
        <el-input v-model="form.account" />
      </el-form-item>

      <el-form-item label="昵称" prop="username">
        <el-input v-model="form.username" />
      </el-form-item>

      <el-form-item v-if="!id" label="密码" prop="password">
        <el-input v-model="form.password" type="password" />
      </el-form-item>

      <el-form-item label="手机号码" prop="mobileid">
        <el-input v-model="form.mobileid" />
      </el-form-item>

      <el-form-item label="职业" prop="professional">
        <el-input v-model="form.professional" />
      </el-form-item>

      <el-form-item label="公司名称" prop="companyname">
        <el-input v-model="form.companyname" />
      </el-form-item>

      <el-form-item label="区域" prop="area">
        <el-cascader v-if="!loading" v-model="areaValues" :props="area" />
      </el-form-item>

      <el-form-item label="详细地址" prop="address">
        <el-input v-model="form.address" />
      </el-form-item>

      <el-form-item label="会员类型" prop="usertype">
        <el-select v-model="form.usertype">
          <el-option v-for="usertype in usertypes" :key="usertype.value" :label="usertype.label" :value="usertype.value">
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="到期时间" prop="enddate">
        <el-date-picker v-model="form.enddate" type="date" placeholder="选择日期">
        </el-date-picker>
      </el-form-item>

      <el-form-item label="状态" prop="state">
        <el-select v-model="form.state">
          <el-option v-for="state in states" :key="state.value" :label="state.label" :value="state.value">
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item>
        <Submit type="primary" :click="doSubmit">提交</Submit>
        <el-button @click="$router.back()">返回</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import regexp from '@/regexp';

export default {
  data() {
    return {
      loading: false,
      doSubmit: null,
      id: null,

      usertypes: [
        // { value: 0, label: '普通用户' },
        // { value: 1, label: '会员用户' },
        // { value: 2, label: '游客' },
        { value: 3, label: '临时会员' }
      ],

      states: [
        { value: 0, label: '正常' },
        { value: 1, label: '停用' }
      ],

      area: {
        lazy: true,
        lazyLoad: async (node, resolve) => {
          const { level } = node;
          if (level === 0) {
            const fetchPro = (await this.$api.area.fetchPro()).data;
            const pros = fetchPro.map((item) => ({
              value: item.areacode,
              label: item.areaname,
              leaf: false
            }));

            resolve(pros);
          } else {
            const fetchSub = (
              await this.$api.area.fetchSub({ areacode: node.value })
            ).data;
            const subs = fetchSub.map((item) => ({
              value: item.areacode,
              label: item.areaname,
              leaf: level === 2
            }));

            resolve(subs);
          }
        }
      },

      form: {
        imgurl: '',
        account: '',
        username: '',
        password: '',
        mobileid: '',
        professional: '',
        companyname: '',
        address: '',
        usertype: 3,
        enddate: '',
        state: 0,
        procode: '',
        citycode: '',
        areacode: ''
      },
      rules: {
        account: [
          {
            required: true,
            message: '账号必填',
            trigger: 'change'
          },
          {
            message: '账号必需字符开始',
            pattern: /[a-zA-Z]\w+/
          }
        ],
        username: [{ required: true, message: '昵称必填', trigger: 'change' }],
        password: [
          {
            required: true,
            message: '密码必填',
            trigger: 'change'
          },
          {
            message: '密码长度为6-20位的字母和数字',
            trigger: 'change',
            pattern: /[a-zA-Z0-9]{6,20}/
          }
        ],
        mobileid: [
          { message: '手机号码不对', trigger: 'change', pattern: regexp.phone }
        ],
        area: [
          {
            required: true,
            validator: (rule, value, callback) => {
              if (this.form.areacode) {
                callback();
              } else {
                callback(rule.message);
              }
            },
            message: '区域必填',
            trigger: 'change'
          }
        ],
        enddate: [{ required: true, message: '到期时间', trigger: 'change' }]
      }
    };
  },

  computed: {
    areaValues: {
      get() {
        return [this.form.procode, this.form.citycode, this.form.areacode];
      },
      set(value) {
        this.form.procode = value[0];
        this.form.citycode = value[1];
        this.form.areacode = value[2];
      }
    }
  },

  async created() {
    this.loading = true;
    this.id = this.$route.query.id;

    if (this.id) {
      await this.loadRecord();
      this.rules.password.forEach((p) => {
        if (p.required) {
          p.required = false;
        }
      });
      this.doSubmit = this.updateRecord;
    } else {
      this.doSubmit = this.createRecord;
    }
    this.loading = false;
  },

  async loadRecord() {
    const result = await this.$api.userinfo.get(this.id);
    Object.assign(this.form, result.data);
  },

  methods: {
    async loadRecord() {
      const result = await this.$api.userinfo.get(this.id);
      delete result.data.token;
      Object.assign(this.form, result.data);
      this.form.password = '';
    },

    async createRecord() {
      const valid = await this.$refs.form.validate().catch((p) => false);
      if (!valid) return;

      const data = Object.assign({}, this.form);
      if (this.form.imgurl) {
        data.imgurl = await this.$refs.uploader.uploadFiles(this.$api.common);
      }

      await this.$api.userinfo.create(data);
      this.$router.back();
    },

    async updateRecord() {
      const valid = await this.$refs.form.validate().catch((p) => false);
      if (!valid) return;

      const data = {
        account: this.id,
        ...this.form
      };

      if (this.form.imgurl) {
        data.imgurl = await this.$refs.uploader.uploadFiles(this.$api.common);
      }

      delete data.password;

      await this.$api.userinfo.update(data);
      this.$router.back();
    }
  }
};
</script>
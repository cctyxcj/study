<template>
  <div class="c">
    <el-row style="height:100%">
      <el-col :span="15" class="words">
        <template v-if="status === 'check'">
          <div v-for="(item,index) in data.words" :key="index" class="word">
            <div class="w1">{{ item.w1 }}</div>
            <div class="w2">{{ item.w2 }}</div>
            <div class="w3">{{ item.w3 }}</div>
          </div>
        </template>
        <template v-if="status === 'edit'">
          <div class="append">
            <i class="el-icon-circle-plus-outline" @click="append" />
          </div>
          <div v-for="(item,index) in data.words" :key="index" class="word">
            <div>
              <input id="" type="text" :value="item.w1" name="">
            </div>
            <div>
              <input id="" type="text" :value="item.w2" name="">
            </div>
            <div>
              <input id="" type="text" :value="item.w3" name="">
            </div>
            <div class="delete">
              <i class="el-icon-remove-outline" @click="deleted(index)" />
            </div>
          </div>
          <div class="submit">
            <button>提交</button>
          </div>
        </template>
        <template v-if="status === 'write'">
          <div v-for="(item,index) in write" :key="index" class="word">
            <input v-for="(item1,index1) in item" :key="index1" v-model="writed[index][index1]" maxlength="1" class="input" :class="writed[index][index1] === write[index][index1] ? 'green':'red'" type="text">
          </div>
        </template>
      </el-col>
      <el-col :span="9" class="remarks">
        <el-radio-group v-model="status" fill="green" size="mini" style="margin-left: 10px;" @change="changestatus">
          <el-radio-button label="check">浏览</el-radio-button>
          <el-radio-button label="edit">编辑</el-radio-button>
          <el-radio-button label="write">默写</el-radio-button>
        </el-radio-group>
        <template v-if="status === 'check' || status === 'write'">
          <div class="title">
            {{ data.title }}
          </div>
          <div class="author">
            {{ data.author }}
          </div>
          <div class="author">
            {{ data.provenance }}
          </div>
          <div class="musicurl">
            <i class="el-icon-video-play" />
          </div>
          <div class="dataremarks" v-html="data.remarks" />
        </template>
        <template v-if="status === 'edit'">
          <div class="title">
            <input id="" type="text" :value="data.title" name="">
          </div>
          <div class="author">
            <input id="" type="text" :value="data.author" name="">
          </div>
          <div class="author">
            <input id="" type="text" :value="data.provenance" name="">
          </div>
          <div class="musicurl">
            <UploadPicCard />
          </div>
          <div class="dataremarks">
            <WangEditor :value="data.remarks" />
          </div>
        </template>
      </el-col>
    </el-row>
  </div>
</template>

<script>
// import DataFilter from './dataFilter';
import UploadPicCard from '@/components/UploadPicCard'
import WangEditor from '@/components/WangEditor'
var json = require('../data.json')
export default {

  components: {
    UploadPicCard,
    WangEditor
  },
  data() {
    return {
      loading: false,
      data: {},
      status: 'check',
      write: [],
      writed: []
    }
  },

  mounted() {
    console.log(this.$route.params)
    this.data = json.txt[this.$route.params.id - 1]
  },

  methods: {
    changestatus(e) {
      const that = this
      if (e === 'write') {
        if (this.write.length <= 0) {
          this.data.words.forEach(element => {
            that.write.push(element.w2.split(''))
            that.writed.push([])
          })
        }
        this.$nextTick(() => {
          document.getElementsByClassName('input')[0].select()
        })
      }
    },
    append() {
      this.data.words.push({ w1: '', w2: '', w3: '' })
      this.write = []
      this.writed = []
    },
    deleted(index) {
      this.data.words.splice(index, 1)
      this.write = []
      this.writed = []
    }
  }
}
</script>

<style lang="scss" scoped>
.c {
    height: 100%;
}
.words {
    border-right: 1px solid #ccc;
    height: 100%;
    overflow: auto;
}
.word {
    line-height: 30px;
    font-size: 16px;
    height: 100px;
    text-align: center;
    margin-top: 10px;
}
.w1 {
    color: red;
    font-size: 15px;
}
.w3 {
    color: #ccc;
    font-size: 14px;
}
.remarks {
    height: 100%;
}
.title {
    font-size: 18px;
    margin-top: 40px;
    text-align: center;
}
.author {
    font-size: 14px;
    color: #bbb;
    margin-top: 10px;
    text-align: center;
}
.dataremarks {
    margin-top: 10px;
    height: 500px;
    overflow: auto;
    padding: 10px;
    font-size: 14px;
}
.musicurl {
    text-align: center;
    font-size: 28px;
    margin-top: 24px;
}
.input {
    outline: none;
    width: 27px;
    padding: 4px;
    border: 1px solid #ccc;
    border-radius: 5px;
    margin-left: 10px;
}
.green {
    color: green;
}
.red {
    color: red
}
.submit {
    text-align: center;
    margin-top: 30px;
    button {
        background-color: green;
        color: #fff;
        border:none;
        border-radius: 5px;
        padding: 4px;
    }
}
</style>

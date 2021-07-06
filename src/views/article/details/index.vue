<template>
  <div class="c">
      <el-row style="height:100%">
  <el-col :span="15" class="words">
    <template v-if="status === 'check'">
      <div class="word" v-for="(item,index) in data.words" :key="index" >
          <div class="w1">{{ item.w1 }}</div>
          <div class="w2">{{ item.w2 }}</div>
          <div class="w3">{{ item.w3 }}</div>
      </div>
  </template>
      <template v-if="status === 'edit'">
          <div class="append">
              <i @click="append" class='el-icon-circle-plus-outline'></i>
          </div>
      <div class="word" v-for="(item,index) in data.words" :key="index" >
          <div>
              <input type="text" :value='item.w1' name="" id="">
          </div>
          <div>
              <input type="text" :value='item.w2' name="" id="">
          </div>
          <div>
              <input type="text" :value='item.w3' name="" id="">
          </div>
          <div class="delete">
              <i @click="deleted(index)" class='el-icon-remove-outline'></i>
          </div>
      </div>
      <div class="submit">
          <button>提交</button>
      </div>
  </template>
      <template v-if="status === 'write'">
      <div class="word" v-for="(item,index) in write" :key="index" >
          <input maxlength="1" class="input" :class="writed[index][index1] === write[index][index1] ? 'green':'red'" type="text" v-for="(item1,index1) in item" :key="index1" v-model="writed[index][index1]">
      </div>
  </template>
  </el-col>
  <el-col :span="9" class="remarks">
        <el-radio-group v-model="status" fill='green' size="mini" style="margin-left: 10px;" @change='changestatus'>
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
        <i class="el-icon-video-play"></i>
      </div>
      <div class="dataremarks" v-html="data.remarks">
      </div>
  </template>
  <template v-if="status === 'edit'">
      <div class="title">
          <input type="text" :value='data.title' name="" id="">
      </div>
      <div class="author">
          <input type="text" :value='data.author' name="" id="">
      </div>
      <div class="author">
          <input type="text" :value='data.provenance' name="" id="">
      </div>
      <div class="musicurl">
        <UploadPicCard />
      </div>
      <div class="dataremarks">
          <WangEditor :value='data.remarks' />
      </div>
  </template>
  </el-col>
</el-row>
  </div>
</template>

<script>
// import DataFilter from './dataFilter';
import UploadPicCard from '@/components/UploadPicCard';
import WangEditor from '@/components/WangEditor';

export default {
  data() {
    return {
      loading: false,
      data: {
          title: '静夜思',
          author: '李白',
          provenance:'【朝代】唐',
          musicurl:'',
          remarks:'⑴静夜思：静静的夜里， 产生的思绪 。⑵床：今传五种说法。一、指井台。已经有学者撰文考证过。中国教育家协会理事程实将考证结果写成论文发表在刊物上，还和好友创作了《意图》。二、指井栏。从考古发现来看，中国最早的水井是木结构水井。古代井栏有数米高，成方框形围住井口，防止人跌入井内，这方框形既像四堵墙，又像古代的床。因此古代井栏又叫银床，说明井和床有关系，其关系的发生则是由于两者在形状上的相似和功能上的类同。古代井栏专门有一个字来指称，即“韩”字。《说文》释“韩”为“井垣也”，即井墙之意。三、“床”即“窗”的通假字。本诗中的‘床’字，是争论和异议的焦点。我们可以做一下基本推理。本诗的写作背景是在一个明月夜，很可能是月圆前后，作者由看到月光，再看到明月，又引起思乡之情。既然作者抬头看到了明月，那么作者不可能身处室内，在室内随便一抬头，是看不到月亮的。因此我们断定，‘床’是室外的一件物什，至于具体是什么，很难考证。从意义上讲，‘床’可能与‘窗’通假，而且在窗户前面是可能看到月亮的。但是，参照宋代版本，‘举头望山月’，便可证实作者所言乃是室外的月亮。从时间上讲，宋代版本比明代版本在对作者原意的忠诚度上，更加可靠。四、取本义，即坐卧的器具，《诗经·小雅·斯干》有“载寐之牀”，《易·剥牀·王犊注》亦有“在下而安者也。”之说，讲得即是卧具。五、马未都等认为，床应解释为胡床。胡床，亦称“交床”、“交椅”、“绳床”。古时一种可以折叠的轻便坐具，马扎功能类似小板凳，但人所坐的面非木板，而是可卷折的布或类似物，两边腿可合起来。现代人常为古代文献中或诗词中的“胡床”或“床”所误。至迟在唐时，“床”仍然是“胡床”（即马扎，一种坐具）。⑶疑：好像。⑷举头：抬头。',
          words:[
              {
                  w1:'chuang qian ming yue guang',
                  w2:'床前明月光,',
                  w3:'明亮的月光洒在井上的栏杆上'
              },
              {
                  w1:'yi shi di shang shuang',
                  w2:'疑是地上霜。',
                  w3:'好像地上泛起了一层白霜'
              },
              {
                  w1:'ju tou wang ming yue',
                  w2:'举头望明月,',
                  w3:'我禁不住抬起头来，看那天窗外空中的一轮明月'
              },
              {
                  w1:'di tou si gu xiang',
                  w2:'低头思故乡。',
                  w3:'不由得低头沉思，想起远方的家乡'
              }
          ],
      },
          status:'check',
          write:[],
          writed:[]
    }
  },

    components: {
      UploadPicCard,
      WangEditor
    },

  mounted() {

  },

  methods: {
      changestatus(e){
          let that = this
          if(e == 'write'){
              if(this.write.length <= 0){
                  this.data.words.forEach(element => {
                      that.write.push(element.w2.split(""))
                      that.writed.push([])
                  });
              }
              this.$nextTick(()=>{
                  document.getElementsByClassName('input')[0].select()
              })
          }
      },
      append(){
          this.data.words.push({w1:'',w2:'',w3:''})
          this.write = []
          this.writed = []
      },
      deleted(index){
          this.data.words.splice(index,1)
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

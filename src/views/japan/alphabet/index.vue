<template>
  <div class="">
    <el-tabs v-model="activeName">
      <el-tab-pane label="清音" name="first">
        <h3>平/片假名</h3>
        <table>
          <thead>
            <th />
            <th>あ 段</th>
            <th>い 段</th>
            <th>う 段</th>
            <th>え 段</th>
            <th>お 段</th>
          </thead>
          <tbody>
            <tr>
              <td class="blue">あ 行</td>
              <td>あ ア<br>a</td>
              <td>い イ<br>i</td>
              <td>う ウ<br>u</td>
              <td>え エ<br>e</td>
              <td>お オ<br>o</td>
            </tr>
            <tr>
              <td class="blue">か 行 <br>k</td>
              <td>か カ<br>ka</td>
              <td>き キ<br>ki</td>
              <td>く ク<br>ku</td>
              <td>け ケ<br>ke</td>
              <td>こ コ<br>ko</td>
            </tr>
            <tr>
              <td class="blue">さ 行 <br>s</td>
              <td>さ サ<br>sa</td>
              <td>し シ<br>si</td>
              <td>す ス<br>su</td>
              <td>せ セ<br>se</td>
              <td>そ ソ<br>so</td>
            </tr>
            <tr>
              <td class="blue">た 行 <br>t</td>
              <td>た タ<br>ta</td>
              <td>ち チ<br>ti/chi</td>
              <td>つ ツ<br>tsu</td>
              <td>て テ<br>te</td>
              <td>と ト<br>to</td>
            </tr>
            <tr>
              <td class="blue">な 行 <br>n</td>
              <td>な ナ<br>na</td>
              <td>に ニ<br>ni</td>
              <td>ぬ ヌ<br>nu</td>
              <td>ね ネ<br>ne</td>
              <td>の ノ<br>no</td>
            </tr>
            <tr>
              <td class="blue">は 行 <br>h</td>
              <td>は ハ<br>ha</td>
              <td>ひ ヘ<br>hi</td>
              <td>ふ フ<br>hu</td>
              <td>へ ヘ<br>he</td>
              <td>ほ ホ<br>ho</td>
            </tr>
            <tr>
              <td class="blue">ま 行 <br>m</td>
              <td>ま マ<br>ma</td>
              <td>み ミ<br>mi</td>
              <td>む ム<br>mu</td>
              <td>め メ<br>me</td>
              <td>も モ<br>mo</td>
            </tr>
            <tr>
              <td class="blue">や 行 <br>y</td>
              <td>や ヤ<br>ya</td>
              <td />
              <td>ゆ ユ<br>yu</td>
              <td />
              <td>よ ヨ<br>yo</td>
            </tr>
            <tr>
              <td class="blue">ら 行 <br>r</td>
              <td>ら ラ<br>ra</td>
              <td>り リ<br>ri</td>
              <td>る ル<br>ru</td>
              <td>れ レ<br>re</td>
              <td>ろ ロ<br>ro</td>
            </tr>
            <tr>
              <td class="blue">わ 行 <br>w</td>
              <td>わ ワ<br>wa</td>
              <td />
              <td />
              <td />
              <td>を ヲ<br>wo</td>
            </tr>
          </tbody>
        </table>
      </el-tab-pane>
      <el-tab-pane label="浊音" name="second">
        <table>
          <thead>
            <th />
            <th>あ 段</th>
            <th>い 段</th>
            <th>う 段</th>
            <th>え 段</th>
            <th>お 段</th>
          </thead>
          <tbody>
            <tr>
              <td class="blue">が 行 <br>g</td>
              <td>が ガ<br>ga</td>
              <td>ぎ ギ<br>gi</td>
              <td>ぐ グ<br>gu</td>
              <td>げ ゲ<br>ge</td>
              <td>ご ゴ<br>go</td>
            </tr>
            <tr>
              <td class="blue">か 行 <br>z</td>
              <td>ざ ザ<br>za</td>
              <td>じ ジ<br>zi</td>
              <td>ず ズ<br>zu</td>
              <td>ぜ ゼ<br>ze</td>
              <td>ぞ ゾ<br>zo</td>
            </tr>
            <tr>
              <td class="blue">さ 行 <br>d</td>
              <td>だ ダ<br>da</td>
              <td>ぢ ヂ<br>dzi</td>
              <td>づ ヅ<br>dzu</td>
              <td>で デ<br>de</td>
              <td>ど ド<br>do</td>
            </tr>
            <tr>
              <td class="blue">た 行 <br>b</td>
              <td>ば バ<br>ba</td>
              <td>び ビ<br>bi</td>
              <td>ぶ ブ<br>bu</td>
              <td>べ ベ<br>be</td>
              <td>ぼ ボ<br>bo</td>
            </tr>
          </tbody>
        </table>
      </el-tab-pane>
      <el-tab-pane label="半浊音" name="ninety">
        <table>
          <thead>
            <th />
            <th>あ 段</th>
            <th>い 段</th>
            <th>う 段</th>
            <th>え 段</th>
            <th>お 段</th>
          </thead>
          <tbody>
            <tr>
              <td class="blue">ぱ 行 <br>p</td>
              <td>ぱ パ<br>pa</td>
              <td>ぴ ピ<br>pi</td>
              <td>ぷ プ<br>pu</td>
              <td>ぺ ペ<br>pe</td>
              <td>ぽ ポ<br>po</td>
            </tr>
          </tbody>
        </table></el-tab-pane>
      <el-tab-pane label="拨音" name="third">
        <table>
          <tbody>
            <tr>
              <td>ん ン<br>N</td>
            </tr>
          </tbody>
        </table></el-tab-pane>
      <el-tab-pane label="长音" name="fourth">长音</el-tab-pane>
      <el-tab-pane label="促音" name="firth">促音</el-tab-pane>
      <el-tab-pane label="拗音" name="sixth">拗音</el-tab-pane>
      <el-tab-pane label="拗长音" name="serverth">拗长音</el-tab-pane>
      <el-tab-pane label="声调" name="eighth">声调</el-tab-pane>
      <el-tab-pane label="动词" name="nine">
        <el-tabs v-model="an">
          <el-tab-pane label="基础形" name="a">
            <h3>1.成为动词的条件</h3>
            <p>日语动词词尾上的假名必须在う段上</p>
            <h3>2.动词的种类与分类方法</h3>
            <table>
              <thead>
                <th>5段动词</th>
                <th>1段动词</th>
                <th>不规则动词 する、くる</th>
              </thead>
              <tbody>
                <tr>
                  <td>1Group</td>
                  <td>2Group</td>
                  <td>3Group</td>
                </tr>
              </tbody>
            </table>
            <p>
              1段动词的辨别方法 ①词尾必须要以る结尾,构成[~る]的形式
              ②词尾的前一个假名必须在い段或者え段上
              *1段动词和不规则动词以外的就是5段动词
            </p>
            <h3>3.动词的连用形</h3>
            <p>5段动词连用形 将词尾う段上的假名变成相应的い段上的假名</p>
            <table>
              <tr>
                <td>かう</td>
                <td>かい</td>
                <td>买</td>
              </tr>
            </table>
            <p>1段动词连用形 把词尾る去掉</p>
            <table>
              <tr>
                <td>いる</td>
                <td>い</td>
                <td>在</td>
              </tr>
            </table>
            <p>不规则动词连用形</p>
            <table>
              <tr>
                <td>する</td>
                <td>し</td>
                <td>做</td>
              </tr>
              <tr>
                <td>くる</td>
                <td>き</td>
                <td>来</td>
              </tr>
            </table>
          </el-tab-pane>
          <el-tab-pane label="ます形" name="b">
            <h3>ます形含义</h3>
            表示动词的时态
            <table>
              <tr>
                <td>现在肯定</td>
                <td class="w200">Ⓥ连用形 + ます</td>
              </tr>
              <tr>
                <td>现在否定</td>
                <td class="w200">Ⓥ连用形 + ません</td>
              </tr>
              <tr>
                <td>过去肯定</td>
                <td class="w200">Ⓥ连用形 + ました</td>
              </tr>
              <tr>
                <td>过去否定</td>
                <td class="w200">Ⓥ连用形 + ませんでした</td>
              </tr>
            </table>
          </el-tab-pane>
          <el-tab-pane label="て形" name="c">
            <h3>て形含义</h3>
            <p>~之后  边上动作的相继发生 如:工作了,成功了</p>
            <p>~所以 边上前一个动作是后一个动作的原因 如:由于工作成功,所以很开心</p>
            <h4>不规则动词</h4>
            <table>
              <tr>
                <td>する</td>
                <td>して</td>
                <td>做</td>
              </tr>
              <tr>
                <td>くる</td>
                <td>きて</td>
                <td>来</td>
              </tr>
            </table>
            <h4>1段动词</h4>
            连用形+て
            <table>
              <tr>
                <td>たべる</td>
                <td>たべて</td>
                <td>吃</td>
              </tr>
              <tr>
                <td>みる</td>
                <td>みて</td>
                <td>看</td>
              </tr>
              <tr>
                <td>おきる</td>
                <td>おきて</td>
                <td>起来</td>
              </tr>
              <tr>
                <td>ねる</td>
                <td>ねて</td>
                <td>睡觉</td>
              </tr>
            </table>
            <h4>5段动词</h4>
            <h5>1.词尾是く</h5>
            词尾く变成い 再接 て
            <table>
              <tr>
                <td>かく</td>
                <td>かいて</td>
                <td>写</td>
              </tr>
              <tr>
                <td>きく</td>
                <td>きいて</td>
                <td>听</td>
              </tr>
              <tr>
                <td>あるく</td>
                <td>あるいて</td>
                <td>走</td>
              </tr>
            </table>
            <h5>2.词尾是ぐ</h5>
            词尾ぐ变成い 再接 で
            <table>
              <tr>
                <td>およぐ</td>
                <td>およいで</td>
                <td>游泳</td>
              </tr>
              <tr>
                <td>いそぐ</td>
                <td>いそいで</td>
                <td>赶紧</td>
              </tr>
              <tr>
                <td>さわぐ</td>
                <td>さわいで</td>
                <td>吵闹</td>
              </tr>
            </table>
            <h5>3.词尾是う、つ、る</h5>
            词尾う、つ、る变成っ 再接 て
            <table>
              <tr>
                <td>かう</td>
                <td>かって</td>
                <td>买</td>
              </tr>
              <tr>
                <td>かつ</td>
                <td>かって</td>
                <td>赢</td>
              </tr>
              <tr>
                <td>うる</td>
                <td>うって</td>
                <td>卖</td>
              </tr>
            </table>
            <h5>4.词尾是め、ぶ、む</h5>
            词尾め、ぶ、む变成ん 再接 で
            <table>
              <tr>
                <td>しめ</td>
                <td>しんで</td>
                <td>死</td>
              </tr>
              <tr>
                <td>よぶ</td>
                <td>よんで</td>
                <td>叫</td>
              </tr>
              <tr>
                <td>よむ</td>
                <td>よんで</td>
                <td>读</td>
              </tr>
            </table>
            <h5>5.词尾是す</h5>
            词尾す变成し 再接 て
            <table>
              <tr>
                <td>はなす</td>
                <td>はなして</td>
                <td>说</td>
              </tr>
              <tr>
                <td>わかす</td>
                <td>わかして</td>
                <td>烧开</td>
              </tr>
              <tr>
                <td>かす</td>
                <td>かして</td>
                <td>借给</td>
              </tr>
            </table>
            <h5>行く(いく)</h5>
            特殊变化
            <table>
              <tr>
                <td>いく</td>
                <td>いって</td>
                <td>去</td>
              </tr>
            </table>
          </el-tab-pane>
          <el-tab-pane label="た形" name="d">
            <h3>た形含义</h3>
            <p>表示"已经做过了~"</p>
            <p>与て形变化一致</p>
            <h4>不规则动词</h4>
            <table>
              <tr>
                <td>する</td>
                <td>した</td>
                <td>做了</td>
              </tr>
              <tr>
                <td>くる</td>
                <td>きた</td>
                <td>来了</td>
              </tr>
            </table>
            <h4>1段动词</h4>
            连用形+た
            <table>
              <tr>
                <td>たべる</td>
                <td>たべた</td>
                <td>吃了</td>
              </tr>
              <tr>
                <td>みる</td>
                <td>みた</td>
                <td>看了</td>
              </tr>
              <tr>
                <td>おきる</td>
                <td>おきた</td>
                <td>起来了</td>
              </tr>
              <tr>
                <td>ねる</td>
                <td>ねた</td>
                <td>睡觉了</td>
              </tr>
            </table>
            <h4>5段动词</h4>
            <h5>1.词尾是く</h5>
            词尾く变成い 再接 た
            <table>
              <tr>
                <td>かく</td>
                <td>かいた</td>
                <td>写了</td>
              </tr>
              <tr>
                <td>きく</td>
                <td>きいた</td>
                <td>听了</td>
              </tr>
              <tr>
                <td>あるく</td>
                <td>あるいた</td>
                <td>走了</td>
              </tr>
            </table>
            <h5>2.词尾是ぐ</h5>
            词尾ぐ变成い 再接 だ
            <table>
              <tr>
                <td>およぐ</td>
                <td>およいだ</td>
                <td>游过了</td>
              </tr>
              <tr>
                <td>いそぐ</td>
                <td>いそいだ</td>
                <td>赶紧</td>
              </tr>
              <tr>
                <td>さわぐ</td>
                <td>さわいだ</td>
                <td>闹过了</td>
              </tr>
            </table>
            <h5>3.词尾是う、つ、る</h5>
            词尾う、つ、る变成っ 再接 た
            <table>
              <tr>
                <td>かう</td>
                <td>かった</td>
                <td>买了</td>
              </tr>
              <tr>
                <td>かつ</td>
                <td>かった</td>
                <td>赢了</td>
              </tr>
              <tr>
                <td>うる</td>
                <td>うった</td>
                <td>卖了</td>
              </tr>
            </table>
            <h5>4.词尾是め、ぶ、む</h5>
            词尾め、ぶ、む变成ん 再接 だ
            <table>
              <tr>
                <td>しめ</td>
                <td>しんだ</td>
                <td>死了</td>
              </tr>
              <tr>
                <td>よぶ</td>
                <td>よんだ</td>
                <td>叫了</td>
              </tr>
              <tr>
                <td>よむ</td>
                <td>よんだ</td>
                <td>读了</td>
              </tr>
            </table>
            <h5>5.词尾是す</h5>
            词尾す变成し 再接 た
            <table>
              <tr>
                <td>はなす</td>
                <td>はなした</td>
                <td>说了</td>
              </tr>
              <tr>
                <td>わかす</td>
                <td>わかした</td>
                <td>烧开了</td>
              </tr>
              <tr>
                <td>かす</td>
                <td>かした</td>
                <td>借给了</td>
              </tr>
            </table>
            <h5>行く(いく)</h5>
            特殊变化
            <table>
              <tr>
                <td>いく</td>
                <td>いった</td>
                <td>去</td>
              </tr>
            </table></el-tab-pane>
          <el-tab-pane label="ない形" name="e">
            <h3>ない形含义</h3>
            <p>表示否定</p>
            <h4>不规则动词</h4>
            <table>
              <tr>
                <td>する</td>
                <td>しない</td>
                <td>不做</td>
              </tr>
              <tr>
                <td>くる</td>
                <td>こない</td>
                <td>不来</td>
              </tr>
            </table>
            <h4>1段动词</h4>
            连用形+ない
            <table>
              <tr>
                <td>たべる</td>
                <td>たべない</td>
                <td>不吃</td>
              </tr>
              <tr>
                <td>みる</td>
                <td>みない</td>
                <td>不看</td>
              </tr>
              <tr>
                <td>おきる</td>
                <td>おきない</td>
                <td>不起</td>
              </tr>
              <tr>
                <td>ねる</td>
                <td>ねない</td>
                <td>不睡</td>
              </tr>
            </table>
            <h4>5段动词</h4>
            词尾う段变成あ段 再接 ない
            <table>
              <tr>
                <td>かく</td>
                <td>かかない</td>
                <td>不写</td>
              </tr>
              <tr>
                <td>およぶ</td>
                <td>およがない</td>
                <td>不游</td>
              </tr>
              <tr>
                <td>うる</td>
                <td>うらない</td>
                <td>不卖</td>
              </tr>
            </table>
          </el-tab-pane>
          <el-tab-pane label="可能形" name="f">声调</el-tab-pane>
          <el-tab-pane label="命令形" name="g">声调</el-tab-pane>
          <el-tab-pane label="意志形" name="h">声调</el-tab-pane>
          <el-tab-pane label="被动形" name="i">声调</el-tab-pane>
          <el-tab-pane label="使役形" name="j">声调</el-tab-pane>
          <el-tab-pane label="ば形" name="k">声调</el-tab-pane>
          <el-tab-pane label="たら形" name="l">声调</el-tab-pane>
          <el-tab-pane label="と形" name="m">声调</el-tab-pane>
          <el-tab-pane label="なら形" name="n">声调</el-tab-pane>
        </el-tabs>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
// import DataFilter from './dataFilter';

export default {
  data() {
    return {
      activeName: 'first',
      an: 'a'
    }
  },

  mounted() {},

  methods: {}
}
</script>

<style lang="scss" scoped>
td:hover {
  background: greenyellow;
  color: blue;
}
td {
  font-weight: bold;
  width: 70px;
  text-align: center;
  height: 57px;
  font-size: 16px;
}
th {
  color: blue;
}
.blue {
  color: blue;
}
.w200 {
  width: 200px;
}
</style>

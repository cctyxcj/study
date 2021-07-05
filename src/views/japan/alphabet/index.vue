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
              <td class="blue">あ 行 </td>
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
    </el-tabs>
  </div>
</template>

<script>
// import DataFilter from './dataFilter';

export default {
  data() {
    return {
      activeName: 'first'
    }
  },

  mounted() {
  },

  methods: {
  }
}
</script>

<style lang="scss" scoped>
td:hover {
    background: greenyellow;
    color: blue;
}
td {
        font-weight: bold;
    width: 66px;
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
</style>

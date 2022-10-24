<script>
// import TimeBar from '../components/TimeBar.vue'
export default {
  // components: { TimeBar },
  data(){
    return{
      quizAnserOb:{},
      quizArr:[],
      copyArr:[],
      timebar:100,
      timerId:null,
      getready:3,
      isSeikai:false,
      isSeikai2:false,
      isResult:false,
      count:0,
      isVibe: [], //気持ち的には233個falseで並べておきたいやつ。どのIDでも発火できるぞこれ
    }
  },
  mounted(){  //カウントダウンして、ゲームスタート
    const timerId2 = setInterval(()=>{
        this.getready--
        }, 1000)
      setTimeout(()=>{
        clearInterval(timerId2)
        this.gameStart()
        this.nextQuiz()
      },3000)
  },
  methods:{
    gameStart(){
      this.timerId = setInterval(()=>{
        this.timebar = this.timebar - 1
        }, 100)
      setTimeout(()=>{
        clearInterval(this.timerId)
        this.isResult = true
        this.$store.commit('setPush',this.count)
      },10000)
      setTimeout(()=>{
        console.log('リザルト画面へ')
        this.$router.push('result')
      },10100)
    },

    nextQuiz(){
      this.quizArr = []
      this.copyArr = this.flagLists.concat()
      //copyArrからquizArrに４つオブジェクトを抜き取ってる。
      for(let i=0, len=this.copyArr.length ; i<4; i++,len--){
        const rand = Math.floor(Math.random()*len)
        this.quizArr.push(this.copyArr.splice(rand,1)[0])
      }
      // 0-3の乱数rを使って、１つを正解としてquizAnserObに代入
      const r = Math.floor(Math.random()*4)
      this.quizAnserOb = this.quizArr[r]
      
    },
    rockAnser(id){
        if(id === this.quizAnserOb.id){
          this.isSeikai = true  //まるを表示して、消して、次のクイズへ
          setTimeout(()=>{
            this.count++
            this.isSeikai = false
            this.nextQuiz()
          },500)
        }else{
          this.isSeikai2 = true  //ばつを表示して、消す
          this.isVibe[id] = true
          setTimeout(()=>{
            this.isSeikai2 = false
            this.isVibe[id] = false
          },500)
        }
      },
  },
  computed:{
    flagLists(){
      return this.$store.state.flagLists
    },
    // anserFlag(){
    //   return require("../../public/img" + this.quizAnserOb.name + ".svg")
    // }
  },
}
</script>

<template>
<div class="cont">
  <div class="getready" v-show="getready>0">
    {{getready}}
  </div>
  <div class="isSeikai" v-show="isSeikai">
    まる
  </div>
  <div class="isSeikai" v-show="isSeikai2">
    ばつ
  </div>
  <div class="isResult" v-show="isResult">
    {{count + "問正解"}}
  </div>
  <div class="main">
    <v-progress-linear
        color="teal"
        buffer-value="0"
        :value="timebar"
        stream
      ></v-progress-linear>
    <p>{{count + "問正解"}}</p>
    <div class="flag_wrap">
      <img :src="quizAnserOb.flag" alt="flag" class="flag">
      {{quizAnserOb.nameJ}}
    </div>
  <div class="choice_wrap">
    <ul class="choice">
      <li v-for="(q,index) in quizArr" :key="index" class="choice_list">
        
        <div class="my-2" @click="rockAnser(q.id)">
              <!-- ボタンにvibeクラスを付与。 -->
              <v-btn
                :class="{ vibe: isVibe[q.id] }"
                color="success"
                dark
              >
                {{q.nameJ}}
              </v-btn>
        </div>

      </li>
    </ul>
  </div>
    <!-- <FooterComp/> -->
  </div><!-- main -->

</div><!-- cont -->
</template>

<style scoped>


.vibe {
    display: inline-block;
    animation: hurueru .1s  infinite;
}

@keyframes hurueru {
    0% {transform: translate(0px, 0px) rotateZ(0deg)}
    25% {transform: translate(2px, 2px) rotateZ(1deg)}
    50% {transform: translate(0px, 2px) rotateZ(0deg)}
    75% {transform: translate(2px, 0px) rotateZ(-1deg)}
    100% {transform: translate(0px, 0px) rotateZ(0deg)}
}
.cont{
  position: relative;
}
.getready{
  position: absolute;
  top: 0;
  left:0;
  height: 100vh;
  width: 100vw;
  background-color: grey;
  text-align: center;
  vertical-align: middle;
  padding: 50%;
  color: white;
  font-size: 5rem;
  z-index: 1;
}
.isResult{
  position: absolute;
  top: 0;
  left:0;
  height: 100vh;
  width: 100vw;
  background-color: grey;
  text-align: center;
  vertical-align: middle;
  padding: 50%;
  color: white;
  font-size: 5rem;
  z-index: 1;
}
</style>
<script>
import ResultComp from '../components/ResultComp.vue'
import firebaseApp from "../plugins/firebaseConfig"
import { getFirestore, addDoc, collection, Timestamp, } from "firebase/firestore"

const db = getFirestore(firebaseApp)

export default {
  components: { ResultComp },
  data(){
    return{
      quizAnserOb:{},
      quizArr:[],
      copyArr:[],
      timebar:100,
      timerId:null,
      getready:3,//ゲーム開始前のカウントダウン用
      isSeikai:false,//まるを表示する用
      isSeikai2:false,//ばつを表示する用
      point:0,//正解数
      isVibe: [], //気持ち的には233個falseで並べておきたいやつ。どのIDでも発火できるぞこれ
      isConfig:false,//setArrの中身があるかないかを管理
      isResult:false,//ゲーム終了後、何問正解と表示するための管理用

      isResultComp:false,//ゲーム終了後、ResultCompを表示するための管理用
    }
  },
  mounted(){    //authの確認はこのページでは行わない
    console.log('mounted')
    if(this.lang === undefined){  //setArrが未設定ならホームへ戻らせます
      this.isConfig = true
    }else{
    const timerId2 = setInterval(()=>{  //カウントダウンして、ゲームスタート
        this.getready--
        }, 1000)
      setTimeout(()=>{
        clearInterval(timerId2)
        this.gameStart()
        this.nextQuiz()
      },3000)
    }
  },
  watch:{
    timebar:function(){
      if(this.timebar < 0){
        this.isResult = true  //ゲーム終了後、何問正解と表示する
        this.$store.commit('setPush',this.point)
        clearInterval(this.timerId)
        
        // setTimeout(()=>{
        // this.isResultComp = true  //ゲーム終了後、ResultCompを表示する
        // },2000)
      }
    }
  },
  methods:{
    gameStart(){  //時間で画面遷移しているが、Timebarがゼロになったら、というのも必要
      this.timerId = setInterval(()=>{
        this.timebar = this.timebar - 1
        }, 100)
      console.log(this.timerId)
      // setTimeout(()=>{
      //   clearInterval(timerId)
      //   this.$store.commit('setPush',this.point)
      //   this.isResult = true
      // },10000)
      // setTimeout(()=>{
      //   console.log('リザルト画面へ')
      //   // this.$router.push('result')
      //   this.isResultComp = true
      // },10100)
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
            this.point++
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
    backToHome(){
      this.$router.push('/')
    },
    showResultComp(){
      this.isResultComp = true  //ゲーム終了後、ResultCompを表示する
    },
    async showResultComp2(){
      // Add a new document with a generated id.
        const docRef = await addDoc(collection(db, "datas"), {
          // name: "Tokyo",
          // country: "Japan",
          lang:this.setArr[0],
          game:this.setArr[1],
          land:this.setArr[2],
          diff:this.setArr[3],
          point:this.setArr[4],
          date: Timestamp.fromDate(new Date()),
          uid:this.storeUid,
        });
        console.log("Document written with ID: ", docRef);
    },
  },
  computed:{
    flagLists(){
      return this.$store.state.flagLists
    },
    setArr(){
      return this.$store.state.setArr
    },
    lang(){
      return this.setArr[0]
    },
    storeUid(){
      return this.$store.state.uid
    },
    // anserFlag(){
    //   return require("../../public/img" + this.quizAnserOb.name + ".svg")
    // }
  },
}
</script>

<template>
<div class="cont">
  <div class="config_error" v-show="isConfig">
    <p style="color:red">ゲーム設定をしてください</p>
    <div class="my-2" @click="backToHome">
              <v-btn
                color="success"
                dark
              >
                ホームに戻る
              </v-btn>
            </div>
  </div>

  <div class="result_comp" v-if="isResultComp">
    <ResultComp/>
  </div>

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
    {{point + "問正解"}}
    <div class="my-2" @click="showResultComp()">
              <v-btn
                color="success"
                dark
              >
                OK
              </v-btn>
            </div>
    <div class="my-2" @click="showResultComp2()">
              <v-btn
                color="success"
                dark
              >
                set
              </v-btn>
            </div>
  </div>

  <div class="main">
    <v-progress-linear
        color="teal"
        buffer-value="0"
        :value="timebar"
        stream
      ></v-progress-linear>
    <p>{{point + "問正解"}}</p>
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
.cont{
  position: relative;
}
.getready{
  position: absolute;
  top: 0;
  left:0;
  height: 100vh;
  width: 100vw;
  background-color: rgba(128, 128, 128, 0.5);
  text-align: center;
  vertical-align: middle;
  padding: 50%;
  color: white;
  font-size: 5rem;
  z-index: 1;
}
.result_comp{
  position: absolute;
  top: 0;
  left:0;
  height: 100vh;
  width: 100vw;
  background-color: rgba(0, 128, 128, 0.5);
  text-align: center;
  /* vertical-align: middle; */
  padding-top: 50%;
  color: white;
  /* font-size: 5rem; */
  z-index: 2;
}
.config_error{
  position: absolute;
  top: 0;
  left:0;
  height: 100vh;
  width: 100vw;
  background-color: rgba(0, 128, 128, 0.5);
  text-align: center;
  /* vertical-align: middle; */
  padding-top: 50%;
  color: white;
  /* font-size: 5rem; */
  z-index: 3;
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
  font-size: 3rem;
  z-index: 1;
}
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
</style>
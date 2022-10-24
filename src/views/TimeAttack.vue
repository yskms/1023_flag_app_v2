<template>
<div class="cont">
  <div class="quiz">
    <div class="flag_wrap">
      <img :src="quizAnserOb.flag" alt="flag" :class="{quiz_flag : animFlag}">
      {{quizAnserOb.nameJ}}
    </div>
  <div class="choice_wrap">
    <ul class="choice">
      <li v-for="(q,index) in quizArr" :key="index" class="choice_list">
        <button @click="animToggle; rockAnser(q.id)" >{{q.nameJ}}</button>
      </li>
    </ul>
  </div>
    <!-- <button @click="animToggle">aa</button> -->
    <!-- <FooterComp/> -->
  </div>
</div>
</template>

<script>
// import FooterComp from '../components/FooterComp.vue'
export default {
  // components: { FooterComp },
  data(){
    return{
      quizAnserOb:{},
      quizArr:[],
      copyArr:[],
      animFlag:true,
    }
  },
  mounted(){
    this.nextQuiz()
  },
  methods:{
    nextQuiz(){
      // this.animFlag = false
      this.quizArr = []
      this.copyArr = this.flagLists.concat()
      //copyArrからquizArrに４つオブジェクトを抜き取ってる
      for(let i=0, len=this.copyArr.length ; i<4; i++,len--){
        const rand = Math.floor(Math.random()*len)
        this.quizArr.push(this.copyArr.splice(rand,1)[0])
      }
      // 0-3の乱数rを使って、１つを正解とする
      const r = Math.floor(Math.random()*4)
      this.quizAnserOb = this.quizArr[r]
      
      this.animFlag = true
      // this.anserFlag()
    },
    // anserFlag(){
    //     return require("../img" + this.quizAnserOb.name + ".svg")
    //   },
    rockAnser(id){
          // this.animFlag = false
          this.animToggle();
        if(id === this.quizAnserOb.id){
          // this.animFlag = false
          alert('seikai')
          // this.$router.push({
          //   name:'detail', params: {flagId:this.quizAnserOb.id}
          // })
        }else{
          // this.animFlag = false
          alert('matigai')
          // this.$router.push({
          //   name:'detail', params: {flagId:this.quizAnserOb.id}
          // })
        }
      },
    animToggle(){
      this.animFlag = false
    }
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
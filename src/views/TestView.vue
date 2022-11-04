<script>
  import AuthComp from '../components/AuthComp'

  export default {
    components:{AuthComp},
    data(){
      return{
        quizArr:[1,2,3,],
      }
    },
    methods:{
      quizArrRandom(){
        for(let j=(this.quizArr.length -1); 0<j; j--){
          const r = Math.floor(Math.random()*(j+1))
          const tmp = this.quizArr[j]
          this.quizArr[j] = this.quizArr[r]
          this.quizArr[r] = tmp
        }
        console.log(this.quizArr)
    },
    }
  }
</script>

<template>
<div>
  a
  <AuthComp/>
  <button @click="quizArrRandom()">aaa</button>
</div>
</template>
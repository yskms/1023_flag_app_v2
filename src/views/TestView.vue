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

      //1発正解をカウント
      test(){
        const Arr = [1,51,100]
        let noMissCountObjNow = {100:1, 101:2}
        // Object.assign(noMissCountObjNow,this.currentUserObj.noMissCountObj)// { 国ID : 正解数 }
        
        for(let i=0;i<Arr.length;i++){
        
        if(noMissCountObjNow[Arr[i]]){
          console.log('aru')
          noMissCountObjNow[Arr[i]] = noMissCountObjNow[Arr[i]]+1
          // console.log(parseInt(noMissCountObjNow['100'])+1)
          // parseInt(noMissCountObjNow['100']) +1
        }else{
          noMissCountObjNow[Arr[i]] = 1
        }

        }
        console.log(noMissCountObjNow)
      },
    }
  }
</script>

<template>
<div>
  a
  <AuthComp/>
  <button @click="test()">aaa</button>
</div>
</template>
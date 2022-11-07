<script>
  import AuthComp from '../components/AuthComp'

  export default {
    components:{AuthComp},
    data(){
      return{
        quizArr:[1,2,3,],
        openDiffArr:[1,2,1,1,1,1,1,],
        diffArr:[[],[],[],[],[],[],[]],
        diffArrAll:[['やさしい','Easy'],['標準','Normal'],['難しい','Hard'],['激ムズ','Very Hard'],],
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


      //openDiffArr:[1,2,1,1,1,1,1,]
      // diffArrAll:['やさしい','標準','難しい','激ムズ']
      // diffArr:[]

      test2(){
        // this.diffArr[0].push(this.diffArrAll[0])
        // this.diffArr[0].push(this.diffArrAll[1])

        // this.diffArr[1].push(this.diffArrAll[0])
        // this.diffArr[1].push(this.diffArrAll[1])
        // this.diffArr[1].push(this.diffArrAll[2])
        
        for(let j=0;j<7;j++){
          for(let k=0;k<=this.openDiffArr[j];k++){
            this.diffArr[j].push(this.diffArrAll[k])
          }
        }
        console.log(this.diffArr)
      }


    }
  }
</script>

<template>
<div>
  a
  <AuthComp/>
  <button @click="test2()">aaa</button>
</div>
</template>
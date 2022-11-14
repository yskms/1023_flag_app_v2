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

        shortText : "お寿司食べたい🍣",
        longText : "私が好きなお寿司のネタとして、サーモン、本マグロ、はまちが挙げられます。いずれにしても脂がのっていてとても気に入っています。そういえばお寿司屋さんといえば弊社から歩いても行けるところに、私がよく行くお店があるのですが、1000円以下から食べられる「回らないお寿司」でとてもおいしいです。私一人でも、同僚とのランチでも行きます。",
        textElem : document.getElementById("soto"),
        anim1:false
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
      },
      test3(){this.anim1=!this.anim1},

  selectShort() {
    this.textElem.innerText = this.shortText;
    this.resize();
  },
 
  selectLong() {
    const textElem = document.getElementById("soto")
    textElem.innerText = this.longText;
    this.resize();
  },
 
  resize(t) {
    console.log(t)
    const textElem = document.getElementById(t)
    /* 文字数が少なくなったときのため、フォントサイズを戻せるようにします。
    他にstyleの属性があればfont-sizeに関するところを除いてstyleに上書きしましょう。
    今回はないのでstyle属性ごと削除します。*/
    // this.textElem.removeAttribute('style');
    console.log(textElem)
    console.log(textElem.getBoundingClientRect().height , textElem.scrollHeight);
    for (
      let size = 30;
      textElem.getBoundingClientRect().height < textElem.scrollHeight && size > 10;
      size -= 1
      /* 文字がはみ出すサイズが存在していたので、1ずつ減らすのを3ずつ減らすという少し速いペースでフォントサイズを小さくしてみました。
      こちらには正解不正解はなく、場合によって調整して遊んでみてください。*/
    ) {
      textElem.style.fontSize = size + "px";
      // textElem.setAttribute("style", `font-size: ${size}px`); // こちらも可能
    }
  },
    }
  }
</script>

<template>
<div>
  <AuthComp/>
  <button @click="test3()">aaa</button>
  <body>
    <!-- <div :style="{animation:(this.anim1 ? 'centerToLeftAnim 1s':'')}"> -->
    <div :class="{anim_class:this.anim1}">
      text</div>
    <div class="button" @click="resize('a100')">短文</div>
    <!-- <div class="button" @click="selectLong()">長文</div> -->
    <!-- <div class="soto">{{longText}}</div> -->
    <div id="a100">
      <div>
        {{longText}}
      </div>
      <div>
        {{longText}}
      </div>
      <div>
        {{longText}}
      </div>
    </div>
  </body>
</div>
</template>

<style scoped>
.button {
    width: 100px;
    margin: 8px;
    padding: 8px;
    font-size: 24px;
    background-color: #ff8900;
  }
#a100 {
    width: 90%;
    height: 216px;
    font-size: 30px;
    border: 3px solid #ff8900;
    padding:8px;
}
.anim_class{
  animation: centerToLeftAnim 1s ;
  background-color: bisque;
}
@keyframes centerToLeftAnim {
  0% {transform: translateX(0) ;}
  /* 50% {transform: translateX(-10px) ;} */
  100% {transform: translateX(-500px) ;}
}
@keyframes centerToRightAnim {
  0% {transform: translateX(0) ;}
  /* 50% {transform: translateX(-10px) ;} */
  100% {transform: translateX(500px) ;}
}
</style>
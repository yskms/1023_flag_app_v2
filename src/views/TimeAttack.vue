<script>
import ResultComp from '../components/ResultComp.vue'
import firebaseApp from "../plugins/firebaseConfig"
import { getAuth, onAuthStateChanged} from "firebase/auth"
import { getFirestore, addDoc, collection, Timestamp, query, doc, getDoc, getDocs, limit, orderBy, setDoc} from "firebase/firestore"

const auth = getAuth(firebaseApp);
const db = getFirestore(firebaseApp)

export default {
  components: { ResultComp },
  data(){
    return{
      quizAnserOb:{},//正解を入れます
      quizArr:[],    //クイズの選択肢
      copyArr:[],
      quizAnserOb2:{},//読み込み遅い問題に対応するため、先読みしておいて、2つを交互に表示しています
      quizArr2:[],
      copyArr2:[],
      timebar:100, //0になったらゲーム終了
      timerId:null,//timebarのclearInterbal用
      getready:3,//ゲーム開始前のカウントダウン用
      isSeikai:false,//まるを表示する用
      isFuseikai:false,//ばつを表示する用
      score:0,//正解数
      isVibe: [], //気持ち的には233個falseで並べておきたいやつ。どのIDでも発火できるぞこれ
      isVibeTime:false,//タイムバー用のブルブル管理
      isConfig:false,//setArrの中身があるかないかを管理
      isResult:false,//ゲーム終了後、何問正解と表示するための管理用
      isResultBefore:false,//isResultの前処理。"終了"を表示

      isResultComp:false,//ゲーム終了後、ResultCompを表示するための管理用

      rankArr:[],//score降順で3つデータ取ったやつ
      rankArrUid:[],//上記のuidのみのもの。combineDataメソッドで使用する
      userArr:[],//mountedで使う。ログインしてたら全てのusersデータ取得
      currentUserObj:{},
      uid:'uid',  //ログインならガチUID,してないならブランクにする

      //['アジア','ヨーロッパ','南アメリカ','アフリカ','北アメリカ','オセアニア','全世界'] 7地域。
      continentArr:['Asia','Europe','South America','Africa','North America','Oceania','All',],
      limitedFlagListArr:[],//地域で絞ったflagLists

      // selectArr:[],//選択肢の配列。いらんかも？
      falseSelectArr:[],//正解の地域以外の地域の配列
      selectFlagListNoArr:[],//[正解、間違い、間違い]の地域Noの入った配列
      continentNoArr:[0,1,2,3,4,5,6,],//selectFlagListNoArr作成用
      incorrectAnserOption:[1,2,3,7,],//難しさと連動した、不正解選択肢の数
      //['やさしい','Easy'],['標準','Normal'],['難しい','Hard'],['激ムズ','Very Hard']
      isNoMiss:true,//1発正解の管理用
      noMissIdArr:[],//1発正解したidを追加していく

      // isFlagHide:false,
      isReverseQuiz:false,//trueでquizArr、falseで2を表示します。
      //               また、trueの時にはquizArr2を作成します。nextQuiz2()
    }
  },
  created(){
      console.log('created')//ここにメソッド入れてたら他のルーティング画面でも実行してしまう
  },
  mounted(){    //authの確認はこのページでは行わない->やっぱり行う！
    console.log('mounted')
    onAuthStateChanged(auth, (user) => {
        if (user) { //ログインしてたら
          this.uid = user.uid  //this.uidにガチUIDを入れる
          this.$store.commit('authTrue',user.uid)//storeにもガチUIDを入れる
          this.fetchUsers() //自分のデータをusersからゲット
        } else {
          console.log('ログインしてないよ')
          this.uid = ''
          this.$store.commit('authFalse')//storeのガチUIDを消す
        }
      });
    if(this.lang === undefined){  //setArrが未設定ならホームへ戻らせます
      this.isConfig = true
    }else{
      this.correctArrCreate()
      const timerId2 = setInterval(()=>{  //カウントダウンして、ゲームスタート
          this.getready--
          }, 1000)
        setTimeout(()=>{
          clearInterval(timerId2)
          this.gameStart()
        },3000)
      this.fetchRank() //score降順で3つデータ取る
      this.isReverseQuiz = true
      this.nextQuiz2()
    }
  },
  watch:{
    timebar:function(){
      if(this.timebar < 0){
        this.isResultBefore = true  //ゲーム終了後、終了と表示する
        this.$store.commit('setScore',this.score)
        clearInterval(this.timerId)
        setTimeout(()=>{
          this.isResult = true  //3秒後、何問正解と表示する
          this.isResultBefore = false
        },3000)
      }
    }
  },
  methods:{
    gameStart(){  //Timebarがゼロになったら、watchで画面遷移させます
      this.timerId = setInterval(()=>{
        this.timebar = this.timebar - 1
        }, 100)
      console.log(this.timerId)
    },

    //['アジア','Asia'],['ヨーロッパ','Europe'],['南アメリカ','South America'],['アフリカ','Africa'],['北アメリカ','North America'],['オセアニア','Oceania'],['全世界','All'],],
    correctArrCreate(){  //地域で絞ったflagListsを作るメソッド
      if(this.setArr[2]==6){//6は全世界
        this.limitedFlagListArr = this.flagLists.concat()
      }else{
        for(let i = 0; i<6; i++){
          if(this.setArr[2] == i){
            this.flagLists.forEach(e => {
              if(e.continent == this.continentArr[i]){
                this.limitedFlagListArr.push(e)
              }
            })//ここまで

            //ここからは不正解用に別地域のリストを作成
            this.selectFlagListNoArr.push(this.continentNoArr.splice(i,1)[0])//正解を抜いてプッシュ
            for(let j=0,len=5; j<2; j++,len--){
              const rand = Math.floor(Math.random()*len) +1 //1-5の乱数
              this.selectFlagListNoArr.push(this.continentNoArr.splice(rand,1)[0])//さらに2つ抜いてプッシュ
            }
            console.log(this.selectFlagListNoArr)//[正解、間違い、間違い]の地域番号配列が完成
            console.log(this.continentNoArr)//抜き取られた後のいらない地域番号配列
          }
        }
      }
      console.log(this.copyArr)
      this.selectArrCreate()
    },
    selectArrCreate(){
      //['やさしい','Easy'],['標準','Normal'],['難しい','Hard'],['激ムズ','Very Hard']
      if(this.setArr[3] == 0 || this.setArr[3] == 3){//やさしい、激ムズなら
        console.log('0:何もしない。')

      }else if(this.setArr[3] == 2){
        //難しいなら、selectFlagListNoArrの[正解、間違い、間違い]から間違いを2つを使って、falseSelectArrに国オブジェクトを追加
        for(let i=1;i<3;i++){
          this.flagLists.forEach(e => {
            if(e.continent == this.continentArr[ this.selectFlagListNoArr[i] ]){
              this.falseSelectArr.push(e)
            }
          })
        }
      }else if(this.setArr[3] == 1){
        //標準なら、selectFlagListNoArrの[正解、間違い、間違い]から間違いを1つを使って、falseSelectArrに国オブジェクトを追加
        this.flagLists.forEach(e => {
          if(e.continent == this.continentArr[ this.selectFlagListNoArr[1] ]){
            this.falseSelectArr.push(e)
          }
        })
      }
      this.nextQuiz1()
    },

    nextQuiz1(){
      this.quizArr = []//ここに２問〜４問を入れる
      this.copyArr = this.limitedFlagListArr.concat()//毎回copyArr新品にする

      //copyArrからquizArrに1つオブジェクトを抜き取って入れる、かつ正解としてquizAnserObに代入しておく
        const rand = Math.floor(Math.random()*this.copyArr.length)
        this.quizArr.push(this.copyArr.splice(rand,1)[0])
        this.quizAnserOb = this.quizArr[0]
      //１つ抜き取られたcopyArrと、falseSelectArrを合体させる
        Object.assign(this.copyArr, this.falseSelectArr)
        console.log(this.copyArr)
      
//['やさしい','Easy'],['標準','Normal'],['難しい','Hard'],['激ムズ','Very Hard']
//incorrectAnserOption:[1,2,3,7,]難しさと連動した、不正解選択肢の数
        for(let i=0;i<this.incorrectAnserOption.length;i++){
          if(this.setArr[3]==i){
            for(let j=0, len=this.copyArr.length; j<this.incorrectAnserOption[i]; j++,len--){
              const rand = Math.floor(Math.random()*len)
              this.quizArr.push(this.copyArr.splice(rand,1)[0])
            }
          }
        }
    //配列作ってfor文にしたのが上のやつ
        // if(this.setArr[3] == 1){//難しい：なら
        //   for(let i=0, len=this.copyArr.length ; i<3; i++,len--){//合体後のcopyArrから3つ抜き取る
        //     const rand = Math.floor(Math.random()*len)
        //     this.quizArr.push(this.copyArr.splice(rand,1)[0])
        //   }
        // }else if(this.setArr[3] == 2){//普通：なら
        //   for(let i=0, len=this.copyArr.length ; i<2; i++,len--){//合体後のcopyArrから2つ抜き取る
        //     const rand = Math.floor(Math.random()*len)
        //     this.quizArr.push(this.copyArr.splice(rand,1)[0])
        //   }
        // }else if(this.setArr[3] == 3){//やさしい：なら
        //   for(let i=0, len=this.copyArr.length ; i<1; i++,len--){//合体後のcopyArrから1つ抜き取る
        //     const rand = Math.floor(Math.random()*len)
        //     this.quizArr.push(this.copyArr.splice(rand,1)[0])
        //   }
        // }else if(this.setArr[3] == 0){//げき難しい：なら
        //   for(let i=0, len=this.copyArr.length ; i<7; i++,len--){//合体後のcopyArrから7つ抜き取る
        //     const rand = Math.floor(Math.random()*len)
        //     this.quizArr.push(this.copyArr.splice(rand,1)[0])
        //   }
        // }

        this.quizArrRandom()  //2~8問入っているquizArrをシャッフルするメソッド
    },
    nextQuiz2(){
      this.quizArr2 = []//ここに２問〜４問を入れる
      this.copyArr2 = this.limitedFlagListArr.concat()//毎回copyArr新品にする

      //copyArrからquizArrに1つオブジェクトを抜き取って入れる、かつ正解としてquizAnserObに代入しておく
        const rand = Math.floor(Math.random()*this.copyArr2.length)
        this.quizArr2.push(this.copyArr2.splice(rand,1)[0])
        this.quizAnserOb2 = this.quizArr2[0]
      //１つ抜き取られたcopyArrと、falseSelectArrを合体させる
        Object.assign(this.copyArr2, this.falseSelectArr)
        console.log(this.copyArr2)
      
//['やさしい','Easy'],['標準','Normal'],['難しい','Hard'],['激ムズ','Very Hard']
//incorrectAnserOption:[1,2,3,7,]難しさと連動した、不正解選択肢の数
        for(let i=0;i<this.incorrectAnserOption.length;i++){
          if(this.setArr[3]==i){
            for(let j=0, len=this.copyArr2.length; j<this.incorrectAnserOption[i]; j++,len--){
              const rand = Math.floor(Math.random()*len)
              this.quizArr2.push(this.copyArr2.splice(rand,1)[0])
            }
          }
        }
        this.quizArrRandom2()  //2~8問入っているquizArrをシャッフルするメソッド
    },
    quizArrRandom2(){  //2~8問入っているquizArrをシャッフルするメソッド
        for(let j=(this.quizArr2.length -1); 0<j; j--){
          const r = Math.floor(Math.random()*(j+1))
          const tmp = this.quizArr2[j]
          this.quizArr2[j] = this.quizArr2[r]
          this.quizArr2[r] = tmp
        }
        console.log(this.quizArr2)
        // this.isFlagHide = false
    },

    quizArrRandom(){  //2~8問入っているquizArrをシャッフルするメソッド
        for(let j=(this.quizArr.length -1); 0<j; j--){
          const r = Math.floor(Math.random()*(j+1))
          const tmp = this.quizArr[j]
          this.quizArr[j] = this.quizArr[r]
          this.quizArr[r] = tmp
        }
        console.log(this.quizArr)
        // this.isFlagHide = false
    },

    rockAnser(id){
      if(this.isReverseQuiz){
        if(id === this.quizAnserOb.id){
          this.isSeikai = true  //まるを表示して、消して、次のクイズへ
          this.score++
          if(this.isNoMiss){this.noMissIdArr.push(id)}
            // this.isFlagHide = true
          setTimeout(()=>{
            this.isSeikai = false
            this.isNoMiss = true
            this.isReverseQuiz ? this.nextQuiz1() : this.nextQuiz2()
            this.isReverseQuiz = !this.isReverseQuiz
            // setTimeout(()=>{this.isReverseQuiz ? this.autoResize(this.quizArr) : this.autoResize(this.quizArr2)
            // },500)
          },500)
        }else{
          this.isFuseikai = true  //ばつを表示して、消す
          this.isVibe[id] = true
          this.isVibeTime = true
          this.isNoMiss = false
          this.timebar =this.timebar -10
          setTimeout(()=>{
            this.isFuseikai = false
            this.isVibe[id] = false
            this.isVibeTime = false
          },500)
        }
      }else{
        if(id === this.quizAnserOb2.id){
          this.isSeikai = true  //まるを表示して、消して、次のクイズへ
          this.score++
          if(this.isNoMiss){this.noMissIdArr.push(id)}
            // this.isFlagHide = true
          setTimeout(()=>{
            this.isSeikai = false
            this.isNoMiss = true
            this.isReverseQuiz ? this.nextQuiz1() : this.nextQuiz2()
            this.isReverseQuiz = !this.isReverseQuiz
            // setTimeout(()=>{this.isReverseQuiz ? this.autoResize(this.quizArr) : this.autoResize(this.quizArr2)
            // },500)
          },500)
        }else{
          this.isFuseikai = true  //ばつを表示して、消す
          this.isVibe[id] = true
          this.isVibeTime = true
          this.isNoMiss = false
          this.timebar =this.timebar -10
          setTimeout(()=>{
            this.isFuseikai = false
            this.isVibe[id] = false
            this.isVibeTime = false
          },500)
        }
      }
      },


//うまく行かないので一旦廃止！！
      // autoResize(arr){
      //   for(let i=0;i<arr.length;i++){
      //       console.log(arr)
      //       console.log(arr[i].id)
      //       console.log(`a${arr[i].id}`)
      //       const textElem = document.getElementById(`a${arr[i].id}`)
      //       /* 文字数が少なくなったときのため、フォントサイズを戻せるようにします。
      //       他にstyleの属性があればfont-sizeに関するところを除いてstyleに上書きしましょう。
      //       今回はないのでstyle属性ごと削除します。*/
      //       // this.textElem.removeAttribute('style');
      //       console.log(textElem)
      //       console.log(textElem.getBoundingClientRect().width , textElem.scrollWidth);
      //       for (
      //         let size = 20;
      //         textElem.getBoundingClientRect().width < textElem.scrollWidth && size > 10;
      //         size -= 1
      //         /* 文字がはみ出すサイズが存在していたので、1ずつ減らすのを3ずつ減らすという少し速いペースでフォントサイズを小さくしてみました。
      //         こちらには正解不正解はなく、場合によって調整して遊んでみてください。*/
      //         ) {
      //         textElem.style.fontSize = size + "px";
      //         // textElem.setAttribute("style", `font-size: ${size}px`); // こちらも可能
      //       }
      //   }
      // },

    backToHome(){
      this.$router.push('/')
    },
    showResultComp(){//ゲーム終了後、ResultCompを表示する
      if(this.uid==''){           //未ログインなら
        this.isResultComp = true  //ResultCompを表示する
      }else{
        this.setFirestore() //ログイン時にはOKボタンでランキング登録させる
      }
    },
    async setFirestore(){//ログイン時にはOKボタンでランキング登録させる
      // Add a new document with a generated id.
        const docRef = await addDoc(collection(db, "ranks"), {
          // name: "Tokyo",
          // country: "Japan",
          lang:this.setArr[0],
          game:this.setArr[1],
          land:this.setArr[2],
          diff:this.setArr[3],
          score:this.score,
          date: Timestamp.fromDate(new Date()),
          uid:this.storeUid,
        });
        console.log("Document written with ID: ", docRef);
        this.updateFireUsers()
    },
    async updateFireUsers(){//firestoreをアップデートするメソッド。authコンポにも要設定
      //特定のプレイカウントで、地域を解放
      //['アジア','ヨーロッパ','南アメリカ','アフリカ','北アメリカ','オセアニア','全世界'] 7地域。
      //openContinentは数値一つ（0-4?）
      console.log('オープンこんち')
      let openContinentNow = this.currentUserObj.openContinent
      const requireCountArr =[0,0,0,5,10,15,30]//解放に必要なプレイ回数
      for(let k=3;k<7;k++){
        if(this.currentUserObj.playCount + 1 == requireCountArr[k]){
          console.log(`${this.continentArr[k]}が追加されました!`)
          openContinentNow = this.currentUserObj.openContinent +1
        }
      }
      //特定スコア以上で、難しさを解放
      //['アジア','ヨーロッパ','南アメリカ','アフリカ','北アメリカ','オセアニア','全世界'] 7地域。
      console.log('オープンdiff')
      let openDiffArrNow = this.currentUserObj.openDiffArr.concat()  //[1,1,1,1,1,1,1]がデフォ
      for(let j=1;j<3;j++){
        if(this.score>9 && this.setArr[3]==j){//score10以上、1:普通,2:ムズイなら
          for(let i=0;i<8;i++){
            if(this.setArr[2] == i){  //プレイした地域のopenDiffArrNowを加算
              openDiffArrNow[i] = j+1
              console.log('むずいモード追加とか！')
            }
          }
        }
      }


      //noMissIdArr:[12,134,51,1,],//1発正解したidを追加していく
      //noMissCountArr:[{id:21,count:3},{id:3,count:1}]みたいな配列
      //1発正解をカウント
      console.log('オープンnomiss')
      console.log(this.noMissIdArr)
      console.log(this.noMissIdArr.length)
      console.log(this.currentUserObj.noMissCountArr)
      console.log(JSON.parse(JSON.stringify(this.currentUserObj.noMissCountArr[0])))
      // console.log(this.currentUserObj.noMissCountArr[0].id)
      let noMissCountArrNow = this.currentUserObj.noMissCountArr.concat()
      // let noMissCountArrNow = []
      console.log(noMissCountArrNow)
      //ここまではok
        for(let l=0;l<this.noMissIdArr.length;l++){
          console.log(this.noMissIdArr[l])
          console.log(noMissCountArrNow)
          let cantFind = 0
          for(let m=0;m<noMissCountArrNow.length;m++){
            if(this.noMissIdArr[l]==noMissCountArrNow[m].id){
              console.log('見つけた')
              console.log(noMissCountArrNow[m])
              noMissCountArrNow[m].count ++
              console.log(noMissCountArrNow[m])
              break
            }else{
              cantFind++
            }
          }
          if(noMissCountArrNow.length == cantFind){
            console.log('なかったから追加')
            noMissCountArrNow.push({
                id:this.noMissIdArr[l],
                count:1,
            })
          }

          // console.log(noMissCountArrNow.some((e)=>{e.id==this.noMissIdArr[l]}))
          // console.log(noMissCountArrNow.every((e)=>{e.id==!this.noMissIdArr[l]}))

          // let noMissCountArrNow = this.currentUserObj.noMissCountArr.filter(e=>{
          //   if(e.id==!this.noMissIdArr[0] || e.id==!this.noMissIdArr[1] )
          // })
        }
        
        console.log(noMissCountArrNow)


      //     if(e.id==this.noMissIdArr[i]){
      //       console.log('aru')
      //       console.log(e.count)
      //       noMissCountArrNow.push({id:i, count:e.count +1})
      //       console.log(noMissCountArrNow)
      //     }else{
      //       noMissCountArrNow.push({id:i, count:1})
      //     }
      // })
      
      //   if(noMissCountObjNow[this.noMissIdArr[i]]){
      //     console.log('aru')
      //     noMissCountObjNow[this.noMissIdArr[i]] = noMissCountObjNow[this.noMissIdArr[i]]+1
      //   }else{
      //     noMissCountObjNow[this.noMissIdArr[i]] = 1
      //   }
      // }
      // console.log(noMissCountObjNow)


      //firestoreをアップデートするとこ
      //users内の既存のuidに対して、上書き保存します
      await setDoc(doc(db, "users", this.uid), 
      { playCount: this.currentUserObj.playCount + 1,
        openContinent: openContinentNow,
        openDiffArr: openDiffArrNow,
        noMissCountArr: noMissCountArrNow, 
        },
      { merge: true }
      );
      console.log('update playCount')
      this.isResultComp = true 
    },
    async fetchRank(){  //score降順で3つデータ取る
        const datasRef = collection(db, "ranks")
        //デフォルトでは、クエリは、ドキュメント ID の昇順でクエリを満たすすべてのドキュメントを取得します。
        const que = query(datasRef, orderBy("score","desc"), limit(3))
        // const q = await getDocs(que, s =>{
        //   s.forEach(element => {
        //     this.rankArr.push(element.docs.data())
        //   });
        // });
        const querySnapshot = await getDocs(que);
        querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          console.log(doc.id, " => ", doc.data());
          this.rankArr.push(doc.data())
          this.rankArrUid.push(doc.data().uid)
        });
        console.log(que)
        console.log(this.rankArr)
        this.fetchUsersAll()
    },
    async fetchUsers(){  //mountedで使う。ログインしてたらuidで自分のusersデータ取得
        const docRef = doc(db, "users", this.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          console.log("Document data:", docSnap.data());
          Object.assign(this.currentUserObj, docSnap.data())
          console.log(this.currentUserObj)
        } else {
          // doc.data() will be undefined in this case
          console.log("No such document!");
        }
    },
    async fetchUsersAll(){  //全てのusersデータ取得
        const querySnapshot = await getDocs(collection(db, "users"));
        querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          console.log(doc.id, " => ", doc.data());
          this.userArr.push(doc.data())
          console.log(this.userArr)
        });
        this.combineData()
    },
    combineData(){  //rankArrにユーザー情報を合体させる
      for(let i =0;i<this.rankArrUid.length;i++){
        console.log(this.rankArrUid[i])
        const userObj = this.userArr.find((e) => e.uid == this.rankArrUid[i])
        console.log(userObj)
        Object.assign(this.rankArr[i], userObj)
      }
      console.log(this.rankArr)
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
  <!-- 全画面表示 ------------------------------------------------------------------------->
  <!-- リセット --------------------------------------->
  <div class="config_error" v-show="isConfig">
    <p>ゲームがリセットされました</p>
    <div class="select_btn" @click="backToHome">
              <button>
                ホームに戻る
              </button>
            </div>
  </div>

  <!-- リザルトコンポーネント ---------------------------->
  <div class="result_comp" v-if="isResultComp">
    <ResultComp :rankArr2="rankArr" :currentUserObj="currentUserObj" :score="score" :noMissIdArr="noMissIdArr"/>
  </div>

  <!-- ゲーム開始前カウントダウン -->
  <div class="getready" v-show="getready>0">
    <p>{{getready}}</p>
  </div>

  <!-- まる表示 -->
  <div class="isSeikai" v-show="isSeikai">
    <svg xmlns="http://www.w3.org/2000/svg" width="400" height="400" fill="orangered" class="bi bi-circle" viewBox="0 0 16 16">
      <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
    </svg>
  </div>
  <!-- ばつ表示 -->
  <div class="isSeikai" v-show="isFuseikai">
    <svg xmlns="http://www.w3.org/2000/svg" width="440" height="440" fill="currentColor" class="bi bi-x-lg" viewBox="0 0 16 16">
      <path fill-rule="evenodd" d="M13.854 2.146a.5.5 0 0 1 0 .708l-11 11a.5.5 0 0 1-.708-.708l11-11a.5.5 0 0 1 .708 0Z"/>
      <path fill-rule="evenodd" d="M2.146 2.146a.5.5 0 0 0 0 .708l11 11a.5.5 0 0 0 .708-.708l-11-11a.5.5 0 0 0-.708 0Z"/>
    </svg>
  </div>

  <!-- ゲーム終了の表示（少し処理時間を稼ぐため） -->
  <div class="isResultBefore" v-show="isResultBefore">
    <div class="my-2">
              終了
            </div>
  </div>

  <!-- ゲーム終了の表示その２（ここでOKボタンを押すことでfirebase登録を走らせるようにした） -->
  <div class="isResult" v-show="isResult">
    <a>{{score + "問正解"}}</a>
    <div class="my-2" @click="showResultComp()">
              <v-btn
                color="success"
                dark
              >
                OK
              </v-btn>
            </div>
  </div>
  <!-- 全画面表示 ここまで------------------------------------------------------------------------->

  <div class="main">
    <div class="timebar_wrap">
        <v-progress-linear
            color="teal"
            buffer-value="0"
            :value="timebar"
            stream
            :class="{vibe:isVibeTime}"
          ></v-progress-linear>
        <p>{{score + "問正解"}}</p>
    </div>

    <div class="flag_wrap" v-show="isReverseQuiz">
      <!--  rel="preload" -->
      <!--  :class="{flag_hide:isFlagHide}"-->
      <img :src="quizAnserOb.flag" alt="flag" >
      <!-- {{quizAnserOb.nameJ}} -->
    </div>
    <div class="flag_wrap" v-show="!isReverseQuiz">
      <!--  rel="preload" -->
      <img :src="quizAnserOb2.flag" alt="flag">
      <!-- {{quizAnserOb2.nameJ}} -->
    </div>
  <div :class="{choice_wrap:setArr[3]==3}" v-show="isReverseQuiz" style="height:35%">
    <!-- <ul class="choice"> -->
      <div v-for="(q,index) in quizArr" :key="index" :class="{choice_vfor:setArr[3]==3}">
        
        <div class="select_btn" @click="rockAnser(q.id)" :id="`a${(q.id)}`" 
        :style="{fontSize:(setArr[3]==3 ? '15px' : ''), 
        height:(setArr[3]==3 ? '50px' : ''),
        margin:(setArr[3]==3 ? '8px auto 0 auto' : '') }">
              <!-- ボタンにvibeクラスを付与。 -->
              <button :class="{ vibe: isVibe[q.id] }">
                {{q.nameJ}}
              </button>
        </div>

      </div>
    <!-- </ul> -->
  </div>
  <div :class="{choice_wrap:setArr[3]==3}" v-show="!isReverseQuiz" style="height:35%">
    <!-- <ul class="choice"> -->
      <div v-for="(q,index) in quizArr2" :key="index" :class="{choice_vfor:setArr[3]==3}">
        
        <div class="select_btn" @click="rockAnser(q.id)" :id="`a${(q.id)}`"
        :style="{fontSize:(setArr[3]==3 ? '15px' : ''), 
        height:(setArr[3]==3 ? '50px' : ''),
        margin:(setArr[3]==3 ? '8px auto 0 auto' : '') }">
              <!-- ボタンにvibeクラスを付与。 -->
              
              <button :class="{ vibe: isVibe[q.id] }">
                {{q.nameJ}}
              </button>
        </div>

      </div>
    <!-- </ul> -->
  </div>
    <!-- <FooterComp/> -->
  </div><!-- main -->

</div><!-- cont -->
</template>

<style scoped>
.cont{
  position: relative;
  /* なんかこの上にv-applicationクラスがおるからwidthは％にしてます */
  width: 100%;
  height: 100%;
  background-color: #dad1b5;
  display: flex;
  align-items: center;
  justify-content: center;
}
.main{
  height: 80%;
  width: 100%;
  /* width: 820px; */
  /* max-width: 410px; */
  background-color: #F5ECCD;
  /* position: relative; */
  /* margin: 20% auto 20% auto; */
  /* margin: auto 0; */
}
.timebar_wrap{
  height: 10%;
  display: flex;
  justify-content: end;
  align-items: center;
  flex-direction: column;
}
.timebar_wrap p{
  margin: 5px;
}
.flag_wrap{
  height: 55%;
  text-align: center;
}
.flag_wrap img{
  /* max-width: 100%; */
  max-height: 100%;
}
.user_error{
  position: absolute;
  top: 45%;
}
.getready{
  position: absolute;
  /* top: 0; */
  /* left:0; */
  height: 100vh;
  width: 100vw;
  background-color: rgba(128, 128, 128, 1);
  /* text-align: center; */
  /* vertical-align: middle; */
  /* padding: 50%; */
  z-index: 1;
  /* display: flex; */
  /* position: relative; */
}
.getready p{
  /* justify-content: center; */
  /* text-align: center; */
  display: table;
  /* width: 100vw; */
  color: white;
  font-size: 5rem;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
}
.isSeikai{
  display: table;
  width: 100vw;
  text-align: center;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
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
  /* padding-top: 50%; */
  color: white;
  /* font-size: 5rem; */
  z-index: 2;
}
.config_error{
  position: absolute;
  height: 100vh;
  width: 100vw;
  background-color: grey;
  color: red;
  font-size: 1.6rem;
  z-index: 3;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.isResult{
  position: absolute;
  height: 100vh;
  width: 100vw;
  background-color: grey;
  color: white;
  font-size: 3rem;
  z-index: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.isResult a{
  color: white;
}
.isResultBefore{
  position: absolute;
  height: 100vh;
  width: 100vw;
  background-color: grey;
  color: white;
  font-size: 3rem;
  z-index: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
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
.flag_hide{
  opacity: -1;
  transition: 1s;
}

/* 親は .main */
/* height:  timebar_wrap 10%, flag_wrap 55%, choice_wrap 35% */
.choice_wrap{
  /* height: 35%; */
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
}
.choice_vfor{
  width: 50%;
}
.select_btn{
  /* margin: 4px auto; */
  margin: 10px auto;
  font-size: 18px;
  font-weight: bold;
  border-radius: 10px;
  padding: 10px 15px;
  background-color: green;
  color: white;
  width: 80%;
  text-align: center;
  white-space: nowrap;
  height: 50px;
}
</style>
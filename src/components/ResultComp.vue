<script>
  import AuthComp from '../components/AuthComp'
  import firebaseApp from "../plugins/firebaseConfig"
  import { getAuth, onAuthStateChanged} from "firebase/auth"
// createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut 
  // import { getFirestore,  } from "firebase/firestore"
// addDoc, Timestamp, serverTimestamp, onSnapshot,
  const auth = getAuth(firebaseApp);
  // const db = getFirestore(firebaseApp);

export default {
  components:{AuthComp},
  props:['rankArr2', 'currentUserObj', 'score', 'noMissIdArr'],
  data: () => ({
    isConfig:false,//setArrの中身があるかないかを管理
    dialog: false,//多分なくていいし、別で使いたい
    rankArr:[],//score降順で3つデータ取ったやつ、に今回の結果追加した配列
    rankIn:-1,//1,2,3位なら数字が入ります
    uid:'uid',  //ログインならガチUID,してないならブランクにする
    currentUserScore:{},
    isRankIn:false,
  }),

  created(){
      console.log('created')
      // this.rankArr = this.rankArr2.concat()//TimeAttackからもらった配列をコピー

      // onAuthStateChanged(auth, (user) => {
      //   if (user) { //ログインしてたら
      //     this.uid = user.uid  //this.uidにガチUIDを入れる
      //     this.$store.commit('authTrue',user.uid)//storeにもガチUIDを入れる
      //   } else {
      //     console.log('ログインしてないよ')
      //     this.uid = ''
      //     this.$store.commit('authFalse')//storeのガチUIDを消す
      //   }
      // });
  },
  mounted(){
    console.log('mounted')
    this.rankArr = this.rankArr2.concat()//TimeAttackからもらった配列をコピー

      onAuthStateChanged(auth, (user) => {
        if (user) { //ログインしてたら
          this.uid = user.uid  //this.uidにガチUIDを入れる
          this.$store.commit('authTrue',user.uid)//storeにもガチUIDを入れる
        } else {
          console.log('ログインしてないよ')
          this.uid = ''
          this.$store.commit('authFalse')//storeのガチUIDを消す
        }
      });

    if(this.lang === undefined){  //setArrが未設定ならホームへ戻らせます
    this.isConfig = true
    }else{
      // this.fetchData()//usersのデータを取得
      // this.fetchRank()//datasのデータを取得
      this.setCurrentUserScore()//自分の成績とユーザー情報をくっつける
      this.refreshRank()//rankArrに自分の成績を追加する
    }
  },
  computed:{
    setArr(){ //ゲームモードなどの設定
      return this.$store.state.setArr
    },
    lang(){
      return this.setArr[0]
    },
    storeUid(){
      return this.$store.state.uid
    },
    rankInPlus(){
      return this.rankIn+1
    }
  },
  watch:{
    storeUid:function(){
      if(this.storeUid !== ''){
        console.log('watch')
      onAuthStateChanged(auth, (user) => {
        if (user) { //ログインしてたら
          this.uid = user.uid  //this.uidにガチUIDを入れる
          this.$store.commit('authTrue',user.uid)//storeにもガチUIDを入れる
        } else {
          console.log('ログインしてないよ')
          this.uid = ''
          this.$store.commit('authFalse')//storeのガチUIDを消す
        }
      });
      }
    }
  },
  methods:{
      // async fetchRank(){
      //   const datasRef = collection(db, "ranks")
      //   const que = query(datasRef, orderBy("score","desc"), limit(3))//score降順で3つデータ取る
      //   const querySnapshot = await getDocs(que);
      //   querySnapshot.forEach((doc) => {
      //     // doc.data() is never undefined for query doc snapshots
      //     console.log(doc.id, " => ", doc.data());
      //     this.rankArr.push(doc.data())
      //   });
      //   console.log(que)
      //   console.log(this.rankArr)//score降順で3つデータ取ったやつ

      //   console.log(this.setArr[4])
      //   console.log(this.rankArr[0])
      //   console.log(this.rankArr[0].score)
      //   // if(this.rankArr[0].score < this.setArr[4] || this.rankArr[0].score == this.setArr[4]){
      //   //   console.log('0位')
      //   //   this.rankArr.splice(0,0,{score:this.setArr[4]})
      //   // }else if(this.rankArr[1].score < this.setArr[4] || this.rankArr[1].score == this.setArr[4]){
      //   //   console.log('1位')
      //   //   this.rankArr.splice(1,0,{score:this.setArr[4]})
      //   // }else if(this.rankArr[2].score < this.setArr[4] || this.rankArr[2].score == this.setArr[4]){
      //   //   console.log('2位')
      //   //   this.rankArr.splice(2,0,{score:this.setArr[4]})
      //   // }
        
      //   // for(let i=0;i<3;i++){
      //   //   if(this.rankArr[i].score < this.setArr[4] || this.rankArr[i].score == this.setArr[4]){
      //   //   console.log(i)
      //   //   this.rankArr.splice(i,0,{score:this.setArr[4]})
      //   //   this.rankIn=i+1
      //   //   break
      //   // }}

      // },
      setCurrentUserScore(){//自分の成績とユーザー情報をくっつける
        Object.assign(this.currentUserScore, this.currentUserObj)
        this.currentUserScore.lang = this.setArr[0]
        this.currentUserScore.game = this.setArr[1]
        this.currentUserScore.land = this.setArr[2]
        this.currentUserScore.diff = this.setArr[3]
        this.currentUserScore.score = this.score
        // this.currentUserScore.date = this.setArr[0]
        this.currentUserScore.uid = this.storeUid
        if(this.storeUid==''){
          console.log('you')
          this.currentUserScore.name = 'You !!'}
        console.log(this.currentUserScore)
        this.$store.commit('setCurrentUserScore',this.currentUserScore)
      },
      refreshRank(){//rankArrに自分の成績を追加する
        for(let i=0;i<3;i++){
          if(this.rankArr[i].score < this.score || this.rankArr[i].score == this.score){
          console.log(i)
          this.rankArr.splice(i,0,this.currentUserScore)
          this.rankIn=i
          this.isRankIn=true
          break
        }}
        console.log(this.rankArr)
      },
    //   async fetchData(){  //mountedで使う。ログインしてたらuidでデータ
    //     const docRef = doc(db, "users", this.uid);
    //     const docSnap = await getDoc(docRef);

    //     if (docSnap.exists()) {
    //       console.log("Document data:", docSnap.data());
    //     } else {
    //       // doc.data() will be undefined in this case
    //       console.log("No such document!");
    //     }
    // },
    backToHome(){
      this.$store.commit('delSetArr')
      this.$router.push('/')
    },
    goToRank(){
      this.$store.commit('delSetArr')
      this.$router.push('rank')
    },
  },
}
</script>

<template>
  <div class="result_cont">
    <!-- 全画面表示のもの------------------------------------------------------- -->

    <!-- TimeAttack.vueの方が発動するからここには不要でした -->
    <!-- <div class="config_error" v-show="isConfig">
    <p style="color:red">リセットされました</p>
    <p style="color:red">Lost Your Result..</p>
    <div class="my-2" @click="backToHome">
              <v-btn
                color="success"
                dark
              >
                ホームに戻る
              </v-btn>
            </div>
    </div> -->
    <!-- config_error -->
    
    <div class="rankIn confetti" v-show="isRankIn" @click="isRankIn=false"><!-- ３位以内の場合 -->
<span></span><span></span><span></span>  <span></span><span></span><span></span>  <span></span><span></span><span></span>  <span></span><span></span>
      <div class="rankIn_main">
        <div class="rankIn_main_msg">
          {{rankInPlus}} 位です！！
        </div>
        <ul class="rankIn_wrap">
          <li v-for="(r,index) in rankArr" :key="index" :class="{rankIn_color:(index==rankIn)}">
            <div class="user_icon">
              <div>
              <!-- <img src="#" alt=""> -->
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-person-circle" viewBox="0 0 16 16">
                <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
                <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"/>
              </svg>
              </div>
            </div>
            <div class="name_medal">
              <div>{{r.name}}</div>
              <div>oo</div>
            </div>
            <div>{{r.score + ' 問'}}</div>
          </li>
        </ul>
        <div class="rankIn_btn" @click="isRankIn=false">
              <button>
                次へ
              </button>
            </div>
      </div>
    </div>
    <!-------------------------------------------------------------- -->
    
    <div class="result_main">
      <div class="img_area">
        <img src="@/assets/hakase_hatsumei.png" alt="">
      </div><!-- img_area -->

      <div class="score_area">
        <div>
          <p>{{score + ' 問'}}</p>
        </div>
      </div>

      <div class="msg_area">
        <div class="msg_wrap" v-show="rankIn > -1"><!-- ３位以内の場合 -->
          <!-- 画面が描画された瞬間は、何も表示しない -->
          <p v-if="this.uid=='uid'"></p>
          <!-- ログインしていないなら、 -->
          <p v-else-if="this.uid==''">{{rankInPlus}} 位です！<br>ログインして記録を残そう！</p>
          <!-- ログインしているなら、 -->
          <p v-else>{{rankInPlus}} 位です！！</p>
        </div>
        <div class="msg_wrap" v-show="rankIn == -1"><!-- ３位以内じゃない場合 -->
          <!-- 画面が描画された瞬間は、何も表示しない -->
          <p v-if="this.uid=='uid'"></p>
          <!-- ログインしていないなら、 -->
          <p v-else-if="this.uid==''">ランクインまでもう少し！<br>ログインしたらいい事あるかも？</p>
          <!-- ログインしているなら、 -->
          <p v-else>ランクインまでもう少し！<br>もう一度挑戦してみよう！</p>
        </div>
      </div><!-- msg_area -->



      <div class="bottom_area">
        <!-- 画面が描画された瞬間は、ランキングボタン -->
          <div v-if="this.uid!==''">
            <div class="my-2" @click="goToRank()">
              <button class="select_btn">
                {{lang==0 ? "ランキングを見る" : "Ranking"}}
              </button>
            </div>
          </div>
          <!-- ログインしていないなら、ログインボタンにする -->
          <div v-else>
            <AuthComp :score="score" :noMissIdArr="noMissIdArr" />
          </div>
          <!-- ホームに戻るボタンは固定 -->
          <div class="my-2" @click="backToHome">
              <button class="select_btn">
                ホームに戻る
              </button>
            </div>
      </div>


    </div><!-- main -->
  </div><!-- cont -->
</template>

<style scoped>
.result_cont{
  position: relative;
  z-index: 2;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
}
/*-- 全画面表示のもの-------------------------------------------------------*/
.rankIn{
  position: absolute;
  height: 100vh;
  width: 100vw;
  background-color: rgba(128, 128, 128, 0.8);
  /* color: red; */
  /* font-size: 1.6rem; */
  z-index: 3;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
}
.rankIn_main{
  height: 50%;
  width: 70%;
  background-color: whitesmoke;
  color: rgb(100,100,100);
  display: flex;
  flex-direction: column;
  /* justify-content: center; */
  border-radius: 5px;
}
.rankIn_main_msg{
  display: flex;
  justify-content: center;
  align-items: center;
  height: 10%;
  font-weight: bold;
}
.rankIn_wrap{
  height: 80%;
  background-color: whitesmoke;
  padding: 0;
}
.rankIn_wrap li{
  /* height: 80%; */
  display: flex;
  padding: 5px 15px;
  margin: 10px;
  /* background-color: black; */
  color: rgb(100,100,100);
  border: 1px solid black;
  border-radius: 10px;
  justify-content: space-between;
  align-items: center;
}
.rankIn_color{
  /* border: 3px solid red; */
  background-color: #ffc107;
  animation: flash 0.6s;
}
@keyframes flash{
  0% {background-color: whitesmoke;}
  20% {background-color: #ffc107;}
  40% {background-color: whitesmoke;}
  60% {background-color: #ffc107;}
  80% {background-color: whitesmoke;}
  100% {background-color: #ffc107;}
}
.user_icon svg{
  vertical-align: middle;
}
.name_medal{
  display: flex;
}
.rankIn_btn{
  margin: 10px auto;
  margin-bottom: 20px auto;
  font-size: 18px;
  font-weight: bold;
  border-radius: 10px;
  padding: 10px 15px;
  background-color: green;
  color: white;
  width: 65%;
  text-align: center;
  white-space: nowrap;
  height: 10%;
}
/* ---------------------------------------------------------------------- */
.result_main{
  background-color: rgb(27, 67, 102);
  height: 80%;
  width: 100%;
  margin: auto 0;
}
.img_area{
  height: 30%;
}
.img_area img{
  height: 100%;
  /* このrelative必要か？？？ */
  position: relative;
  top: 20px;
}
.score_area{
  height: 25%;
}
.score_area div{
  height: 80%;
  width: 45%;
  background-color: white;
  border-radius: 5px;
  margin: 0 auto;
  display: flex;
}
.score_area p{
  margin: auto ;
  color: black;
  font-size: 2.5rem;
  font-weight: bold;
}
.msg_area{
  height: 15%;
}
.msg_wrap{
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.bottom_area{
  height: 30%;
}
.select_btn{
  /* margin: 4px auto; */
  margin-bottom: 20px auto;
  font-size: 18px;
  font-weight: bold;
  border-radius: 10px;
  padding: 10px 15px;
  background-color: green;
  color: white;
  width: 65%;
  text-align: center;
  white-space: nowrap;
  height: 50px;
}

/* ------------------------------------------------------------ */
/*紙吹雪のスタイル*/
.confetti {
  position: absolute;
  width: 100%;
  height: 100%;
}

.confetti span {
  position: absolute;
  top: -100%;/*アニメーション以外の紙吹雪を非表示*/
  left: 0;
}

/*アニメーションの記述*/
.confetti span:nth-child(2n + 1) {
  animation: confetti1 5s 0s linear infinite;
}

.confetti span:nth-child(2n + 2) {
  animation: confetti2 5s 0s linear infinite;
}

/*紙吹雪を回転させる記述*/
@keyframes confetti1 {
  0% {
    top: -10%;
    transform: translateX(0) rotateX(0) rotateY(0);
  }

  100% {
    top: 100%;
    transform: translateX(20px) rotateX(180deg) rotateY(360deg);
}
}

@keyframes confetti2 {
  0% {
    top: -10%;
    transform: translateX(0) rotateX(0) rotateY(0);
  }

  100% {
    top: 100%;
    transform: translateX(-20vw) rotateX(180deg) rotateY(360deg);
  }
}

/*紙吹雪の配置*/
.confetti span:nth-child(1) {
  left: 0%;
}

.confetti span:nth-child(2) {
  left: 10%;
}

.confetti span:nth-child(3) {
  left: 20%;
}

.confetti span:nth-child(4) {
  left: 30%;
}

.confetti span:nth-child(5) {
  left: 40%;
}

.confetti span:nth-child(6) {
  left: 50%;
}

.confetti span:nth-child(7) {
  left: 60%;
}

.confetti span:nth-child(8) {
  left: 70%;
}

.confetti span:nth-child(9) {
  left: 80%;
}

.confetti span:nth-child(10) {
  left: 90%;
}

.confetti span:nth-child(11) {
  left: 100%;
}

/*紙吹雪の大きさ*/
.confetti span:nth-child(3n + 1) {
  width: 3vw;
  height: 3vw;
}

.confetti span:nth-child(3n + 2) {
  width: 2vw;
  height: 2vw;
}

.confetti span:nth-child(3n + 3) {
  width: 1.5vw;
  height: 1.5w;
}

/*紙吹雪の色*/
.confetti span:nth-child(2n + 1) {
  background: red;
}

.confetti span:nth-child(2n + 2) {
  background: orange;
}

.confetti span:nth-child(2n + 3) {
  background: purple;
}

.confetti span:nth-child(2n + 4) {
  background: pink;
}

.confetti span:nth-child(2n + 5) {
  background: blue;
}

.confetti span:nth-child(2n + 6) {
  background: green;
}

.confetti span:nth-child(2n + 7) {
  background: yellow;
}

/*アニメーションの秒数*/
.confetti span:nth-child(2n + 1) {
  animation-duration: 5s;
}

.confetti span:nth-child(2n + 2) {
  animation-duration: 6s;
}

.confetti span:nth-child(2n + 3) {
  animation-duration: 10s;
}

.confetti span:nth-child(2n + 4) {
  animation-duration: 4s;
}

/*紙吹雪が降り始めるまでの時間*/
.confetti span:nth-child(2n + 1) {
  animation-delay: 0s;
}

.confetti span:nth-child(2n + 2) {
  animation-delay: 4s;
}

.confetti span:nth-child(2n + 3) {
  animation-delay: 6s;
}

.confetti span:nth-child(2n + 4) {
  animation-delay: 2s;
}

.confetti span:nth-child(2n + 5) {
  animation-delay: 6s;
}

.confetti span:nth-child(2n + 6) {
  animation-delay: 10s;
}

.confetti span:nth-child(2n + 7) {
  animation-delay: 2s;
}

.confetti span:nth-child(2n + 8) {
  animation-delay: 4s;
}

.confetti span:nth-child(2n + 9) {
  animation-delay: 11s;
}

.confetti span:nth-child(2n + 10) {
  animation-delay: 1s;
}

.confetti span:nth-child(2n + 11) {
  animation-delay: 5s;
}
</style>
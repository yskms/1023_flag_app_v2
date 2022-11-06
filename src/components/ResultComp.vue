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
      refreshRank(){//rankArrに自分の成績を追加する
        for(let i=0;i<3;i++){
          if(this.rankArr[i].score < this.score || this.rankArr[i].score == this.score){
          console.log(i)
          this.rankArr.splice(i,0,this.currentUserScore)
          this.rankIn=i
          break
        }}
        console.log(this.rankArr)
      },
      setCurrentUserScore(){//自分の成績とユーザー情報をくっつける
        this.currentUserScore = this.currentUserObj
        this.currentUserScore.lang = this.setArr[0]
        this.currentUserScore.game = this.setArr[1]
        this.currentUserScore.land = this.setArr[2]
        this.currentUserScore.diff = this.setArr[3]
        this.currentUserScore.score = this.score
        // this.currentUserScore.date = this.setArr[0]
        this.currentUserScore.uid = this.storeUid
        console.log(this.currentUserScore)
        this.$store.commit('setCurrentUserScore',this.currentUserScore)
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
  <div class="cont">
    <div class="config_error" v-show="isConfig">
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
    </div><!-- config_error -->
    
    <div class="main">
      <div class="upwrap">
        <p>新記録ーとか</p>
        <div>{{score + '問'}}</div>
      </div><!-- upwrap -->

      <div class="rank_msg">
        <div v-show="rankIn > -1"><!-- ３位以内の場合 -->
          <!-- 画面が描画された瞬間は、何も表示しない -->
          <p v-if="this.uid=='uid'"></p>
          <!-- ログインしていないなら、 -->
          <p v-else-if="this.uid==''">{{rankInPlus}} 位です！ログインして記録を残そう！</p>
          <!-- ログインしているなら、 -->
          <p v-else>{{rankInPlus}} 位です！！</p>
        </div>
      </div><!-- rank_msg -->

      <div class="rank_list">
          <v-card
          class="mx-auto"
          max-width="300"
          tile
          >
          <v-list disabled>
            <v-subheader>LANKING</v-subheader>
            <v-list-item-group
              color="primary"
            >
              <v-list-item
                v-for="(r,index) in rankArr" :key="index" :class="{red:(index==rankIn)}"
              >
                <v-list-item-icon>
                  <v-icon v-text="r.test"></v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title v-text="r.score"></v-list-item-title>
                </v-list-item-content>
              </v-list-item>

            </v-list-item-group>
          </v-list>
          </v-card>
      </div>

      <div class="bottom">
        <!-- 画面が描画された瞬間は、ランキングボタン -->
          <div v-if="this.uid!==''">
            <div class="my-2" @click="goToRank()">
              <v-btn
                color="success"
                dark
              >
                {{lang==0 ? "ランキングを見る" : "Ranking"}}
              </v-btn>
            </div>
          </div>
          <!-- ログインしていないなら、ログインボタンにする -->
          <div v-else>
            <AuthComp :score="score" :noMissIdArr="noMissIdArr" />
          </div>
          <!-- ホームに戻るボタンは固定 -->
          <div class="my-2" @click="backToHome">
              <v-btn
                color="success"
                dark
              >
                ホームに戻る
              </v-btn>
            </div>
      </div>


    </div><!-- main -->
  </div><!-- cont -->
</template>

<style scoped>
.cont{
  position: relative;
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
  z-index: 2;
}
</style>
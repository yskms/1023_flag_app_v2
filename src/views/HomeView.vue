<script>
  import firebaseApp from "../plugins/firebaseConfig"
  import { getAuth, onAuthStateChanged, signOut, } from "firebase/auth"
  import { getFirestore, doc, getDoc } from "firebase/firestore"
  import AuthComp from '../components/AuthComp'


  const auth = getAuth(firebaseApp)
  const db = getFirestore(firebaseApp)

  export default {
    components:{AuthComp},
    data(){
      return{
        lang:0,//即時切り替えは個別のdata必要っぽいので残す
        // game:0,
        // land:0,
        // diff:0,
        setArr:[0,0,0,0,],//ゲーム設定です。stateに送ります
        selectG:true,   //game 1
        selectL:false,  //land 2
        selectD:false,  //diffculty 3
        selectS:1,
        isSlide:true,

        uid:'uid',  //ログインならガチUID,してないならブランクにする
        userName:'',
        isUserName:false,

        continentArr:[
          ['アジア','Asia'],['ヨーロッパ','Europe'],['南アメリカ','South America'],],
        continentArrAll:[
          ['アジア','Asia'],['ヨーロッパ','Europe'],['南アメリカ','South America'],['アフリカ','Africa'],['北アメリカ','North America'],['オセアニア','Oceania'],['全世界','All'],],
        diffArr:[[['やさしい','Easy'],['標準','Normal']],[['やさしい','Easy'],['標準','Normal']],[['やさしい','Easy'],['標準','Normal']],[['やさしい','Easy'],['標準','Normal']],[['やさしい','Easy'],['標準','Normal']],[['やさしい','Easy'],['標準','Normal']],[['やさしい','Easy'],['標準','Normal']]],
        diffArrAll:[
          ['やさしい','Easy'],['標準','Normal'],['難しい','Hard'],['激ムズ','Very Hard'],],
        // currentUserObj:{},
        // openDiffArr:[1,1,1,1,1,1,1,],
        homeFlagLists:[],
        selectGameMove:'',
        selectLandMove:'',
        selectDiffMove:'',
      }
    },
    created(){
      this.homeFlagLists = this.flagLists.splice(Math.floor(Math.random()*233),5)
    },
    mounted(){
      onAuthStateChanged(auth, (user) => {
        if (user) {             //ログインしてたら
          console.log(user.uid)
          this.uid = user.uid  //this.uidにガチUIDを入れる
          this.$store.commit('authTrue',user.uid)//storeにもガチUIDを入れる
          this.fetchUsers()    //usersのデータを取得
        } else {
          console.log('ログインしてないよ')
          this.uid = ''
          this.$store.commit('authFalse')//storeのガチUIDを消す
        }
      });
    },
    methods:{
      async fetchUsers(){  //mountedで使う。ログインしてたらuidでusersデータ取得
        const docRef = doc(db, "users", this.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          console.log("Document data:", docSnap.data());
          // Object.assign(this.currentUserObj,docSnap.data())
          if(docSnap.data().name==undefined || docSnap.data().name==""){//ユーザー名なかったら登録させる
            this.isUserName = true
          }else{
          this.userName = docSnap.data().name
          }
      //解放済みの地域数を取得して、continentArrに追加してます
          for(let i=0;i<docSnap.data().openContinent; i++){
            this.continentArr.push(this.continentArrAll.splice(3,1)[0])
          }

      //openDiffArr:[3,2,1,1,1,1,1,]
          console.log(docSnap.data().openDiffArr)
          for(let j=0;j<7;j++){
            for(let k=2;k<=docSnap.data().openDiffArr[j];k++){
              this.diffArr[j].push(this.diffArrAll[k])
            }
          }
          console.log(this.diffArr)


        } else {
          // doc.data() will be undefined in this case
          console.log("No such document!");
        }
      },
      logout(){
        signOut(auth).then(() => {
          console.log("logout now")
          this.uid = ''
          this.$store.commit('authFalse')//storeのガチUIDを消す
          this.continentArr=[
          ['アジア','Asia'],['ヨーロッパ','Europe'],['南アメリカ','South America'],]
          this.diffArr=[[['やさしい','Easy'],['標準','Normal']],[['やさしい','Easy'],['標準','Normal']],[['やさしい','Easy'],['標準','Normal']],[['やさしい','Easy'],['標準','Normal']],[['やさしい','Easy'],['標準','Normal']],[['やさしい','Easy'],['標準','Normal']],[['やさしい','Easy'],['標準','Normal']]]
        
          // Sign-out successful.
        }).catch((error) => {
          console.log(error)
          // An error happened.
        });
      },
      select_game(n){ //ゲームモード選択
        this.isSlide = true
        this.setArr[1] = n
        this.selectS = 2
        // this.selectGameMove = 'centerToLeft'
        // this.selectLandMove = 'centerToLeft'
        // this.selectG = !this.selectG
        // this.selectL = !this.selectL
      },
      select_land(n){ //land選択
        this.isSlide = true
        this.setArr[2] = n
        this.selectS = 3
        // this.selectDiffMove = 'centerToLeft'
        // this.selectL = !this.selectL
        // this.selectD = !this.selectD
      },
      select_diff(n){ //difficulty選択、stateへ登録、ゲーム画面へ遷移
        this.setArr[3] = n
        this.isSlide = true
        // this.selectD = !this.selectD
        // console.log(this.setArr)
        this.$store.commit('setSetArr',this.setArr)
        this.$router.push('time')
      },
      select_back(){
        this.isSlide = false
        this.selectS--
      },
      langJ(){  //言語選択0が日本語、1が英語
        this.lang = 0
        this.setArr[0] = 0
      },
      langE(){
        this.lang = 1
        this.setArr[0] = 1
      },
      kesu(){
        if(this.$route.path !== '/'){
        console.log(this.$route.path)}
      },
      goToUser(){
        this.$router.push('user')
      },
      goToUseredit(){
        this.$router.push('useredit')
      },
      goToRank(){
        this.$router.push('rank')
      },
    },
    computed:{
    flagLists(){
      return this.$store.state.flagLists
    },
    // homeFlagLists(){
    //   return this.flagLists.splice(Math.floor(Math.random()*233),5)
    // },
    // isAuth(){
    //   return this.$store.state.isAuth
    // },
  },
  }
</script>

<template>
  <div class="home_cont">
      <div class="user_error" v-if=" isUserName && this.uid!=='' ">
        <p>ニックネームを登録してください</p>
        <div class="select_btn_user_error" @click="goToUseredit()">
              <button>
                ユーザー情報の編集
              </button>
        </div>
      </div>
    <div class="home_main">
    
      <div class="title">
        <div class="head">
          <!--  -->
            <!-- 画面が描画された瞬間は、何も表示しない -->
            <div class="haguruma" v-if="this.uid=='uid'">
              <div></div>
            </div>
            <!-- ログインしていないなら、何も表示しない -->
            <div class="haguruma" v-else-if="this.uid==''">
              <div></div>
            </div>
            <!-- ログインしているなら、歯車userボタンを表示 -->
            <div class="haguruma" v-else>
              <div class="haguruma1" @click="goToUser()">
                <img src="@/assets/house.png"  alt="icon">
              </div>
              <div class="haguruma2" @click="goToRank">
                <img src="@/assets/trophy.png"  alt="icon">
              </div>
            </div>
            <!--  -->
        </div>
        <div class="logo_wrap">
          <div class="kokki_wrap">
            <img class="kokki" :src="homeFlagLists[0].flag" alt="flag">
            <img class="kokki" :src="homeFlagLists[1].flag" alt="flag" style="animation-delay: 0.6s">
            <img class="kokki" :src="homeFlagLists[2].flag" alt="flag" style="animation-delay: 1.2s">
            <img class="kokki" :src="homeFlagLists[3].flag" alt="flag" style="animation-delay: 1.8s">
            <img class="kokki" :src="homeFlagLists[4].flag" alt="flag" style="animation-delay: 2.4s">
          </div>
          <div class="kokuban_wrap">
              <h1 class="dr">国旗ハカセ</h1>
              <!-- <img class="kokuban" src="../assets/blackboard.png" alt="title"> -->
              <div class="hakase_wrap">
                <img class="hakase" src="../assets/hakase_top.png" alt="hakase">
                <!-- <span class="hakase_migi">mig</span> -->
              </div>
          </div>
        </div>
      </div>

      
      <div class="select_wrap">
          <div class="lang_wrap">
            <div class="lang" @click="langJ" :style="{color:(this.lang==0 ? 'white':'grey')}">
                <button>
                  にほんご
                </button>
              </div>
            <div class="lang" @click="langE" :style="{color:(this.lang==1 ? 'white':'grey')}">
                <button>
                  English
                </button>
              </div>
          </div>

        <transition :name="isSlide?'slideA':'slideB'" mode="out-in">
        <div class="select_game" v-if="selectS==1" key="1" :class="selectGameMove">
          <div class="select_btn_wrap">
            <div class="select_btn" @click="select_game(0)">
              <button>
                {{lang==0 ? "タイムアタック" : "Time Challenge"}}
              </button>
            </div>
            <!-- いったんノーミスチャレンジは非表示--------------------------------- -->
            <!-- <div class="select_btn" @click="select_game(1)">
              <button>
                {{lang==0 ? "ノーミスチャレンジ" : "No Miss Challenge"}}
              </button>
            </div> -->
            <!-- いったんノーミスチャレンジは非表示--------------------------------- -->
            <!--  -->
            <!-- 画面が描画された瞬間は、何も表示しない -->
            <div  v-show="this.uid=='uid'">
              <div></div>
            </div>
            <!-- ログインしていないなら、ログインボタンを表示 -->
            <div class="select_btn_auth" v-show="this.uid==''">
              <AuthComp/>
            </div>
            <!-- ログインしているなら、ログアウトボタンを表示 -->
            <div class="select_btn_auth" v-show="this.uid!==''">
              <v-btn
                color="success"
                dark 
                @click="logout()"
              >
                {{lang==0 ? "ログアウト" : "Logout"}}
              </v-btn>
            </div>
            <!--  -->
          </div>
        </div>

        <div class="select_game" v-else-if="selectS==2" key="2" :class="selectLandMove">
          <div class="select_btn_wrap" >
                <div class="select_back" >
                <button @click="select_back()">
                  <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-caret-left-fill" viewBox="0 0 16 16">
                    <path d="m3.86 8.753 5.482 4.796c.646.566 1.658.106 1.658-.753V3.204a1 1 0 0 0-1.659-.753l-5.48 4.796a1 1 0 0 0 0 1.506z"/>
                  </svg>
                </button>
              </div>
          <!-- ['アジア','Asia'],['ヨーロッパ','Europe'],['南アメリカ','South America'],['アフリカ','Africa'],['北アメリカ','North America'],['オセアニア','Oceania'],['全世界','All'],], -->
          <!-- <div class="select_wrap"> -->
            <div class="select_vfor" v-for="(c,index) in continentArr" :key="index">
              <div class="select_btn" @click="select_land(index)">
              <button>
                <!-- {{lang==0 ? "全ての地域" : "All Continent"}} -->
                {{lang==0 ? c[0] : c[1] }}
              </button>
            </div>
            </div>
            <div class="select_btn" v-show="continentArr.length<4">
              <button>
                ?
              </button>
            </div>

          <!-- </div> -->
          </div>
        </div>

        <div class="select_game" v-else-if="selectS==3" key="3" :class="selectDiffMove">
          <div class="select_btn_wrap" >
                <div class="select_back" >
                <button @click="select_back()">
                  <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-caret-left-fill" viewBox="0 0 16 16">
                    <path d="m3.86 8.753 5.482 4.796c.646.566 1.658.106 1.658-.753V3.204a1 1 0 0 0-1.659-.753l-5.48 4.796a1 1 0 0 0 0 1.506z"/>
                  </svg>
                </button>
              </div>
            
            <!-- [0 激ムズ, 1 難しい, 2 普通, 3 やさしい, ] -->
            <div class="select_vfor" v-for="(d,index) in diffArr[setArr[2]]" :key="index">
              <div class="select_btn" @click="select_diff(index)">
              <button>
                <!-- {{lang==0 ? "全ての地域" : "All Continent"}} -->
                {{lang==0 ? d[0] : d[1] }}
              </button>
            </div>
            </div>
            <div class="select_btn" v-show="diffArr[setArr[2]].length<4">
              <button>
                ?
              </button>
            </div>

          <!-- </div> -->
          </div>



        </div></transition>

      </div>
    </div>
  </div>
</template>

<style scoped>
.home_cont{
  max-width: 375px;
  margin: 0 auto;
  /* なんかこの上にv-applicationクラスがおるからwidthは％にしてます */
  width: 100%;
  /* height: 80vh; */
  height: 100%;
  background-color: #dad1b5;
  /* margin: auto 0; */
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}
/*-- 全画面表示のもの-------------------------------------------------------------------------*/
.user_error{
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  /* font-size: 30rem; */
  z-index: 10;
  color: white;
  font-weight: bold;
  font-size: 1.5rem;
  background-color: rgba(128, 128, 128,0.8);
}
.select_btn_user_error{
  margin: 7px 0;
  font-size: 20px;
  font-weight: bold;
  border-radius: 10px;
  padding: 10px 15px;
  background-color: green;
  color: white;
  width: 64%;
  text-align: center;
}
/*-- 全画面表示のもの ここまで-------------------------------------------------------------------------*/
/*-- -------------------------------------------------------*/
.home_main{
  height: 80%;
  /* width: 820px; */
  /* max-width: 410px; */
  background-color: #F5ECCD;
  position: relative;
  /* margin: 20% auto 20% auto; */
  /* margin: auto 0; */
}
.title{
  height: 50%;
  width: 100%;
  display: flex;
  align-items: flex-end;
}
.head{
  height: 20%;
}
.haguruma{
  position: absolute;
  top: 15px;
  left: 10px;
  z-index: 2;
  width: 96%;
  display: flex;
  justify-content: space-between;
}
.haguruma img{
  width: 3em;
  height: 3em;
  object-fit: scale-down;
}
/*-- -------------------------------------------------------*/
.logo_wrap{
  /* margin: auto 0 0 0; */
  height: 100%;
  width: 100%;
  position: relative;
}
.kokuban_wrap{
  background-image: url("../assets/blackboard.png");
  background-size: contain;
  background-position: center center;
  height: 75%;
  display: flex;
  position: relative;
}
.dr{
  margin: auto ;
  text-align: center;
  color: white;
  /* font-size: 150px; */
  /* font-size: 60px; */
  font-size: 300%;
  white-space: nowrap;
}
.hakase_wrap{
  position: absolute;
  height: 100%;
  width: 100%;
  text-align: center;
  padding-top: 38%;
}
.hakase{
  /* height: 380px; */
  height: 190px;
  /* position: absolute;
  top: 60%;
  left: 50%;
  right: 50%;
  display: block; */
}
.kokki_wrap{
    transform:translate3d(0,0,0);
    z-index: 0;
    position: relative;
    bottom: -90%;
    width: 95%;
    margin: 0 auto;
    /* background-color: aqua; */
}
.kokki{
  /* height: 120px; */
  /* height: 60px; */
  width: 20%;
  /* display: inline-block; */
  /* z-index: -2; */
  animation: jumpAnimation 5s infinite;
}

@keyframes jumpAnimation {
  50% {transform: translateY(0) ;}
  53% {transform: translateY(-10px) ;}
  55% {transform: translateY(0) ;}
}


.select_wrap{
  height: 50%;
  z-index: 4;
}
.lang_wrap{
  display: flex;
  justify-content: space-around;
  height: 20%;
  margin-top: 20px;
}
.lang{
  z-index: 5;
  /* height: 55px; */
  height: 30px;
  margin: auto 0;
  /* font-size: 40px; */
  font-size: 20px;
  font-weight: bold;
  border-radius: 20px;
  background-color: #ff8600;
  color: white;
  width: 30%;
  text-align: center;
}
.langOn{
  opacity: 0.5;
}
/* .centerToLeft{
  animation: centerToLeftAnim 0.7s; */
  /* position: absolute;
  top: 0;
  left: 0; */
/* } */
@keyframes centerToLeftAnim {
  0% {transform: translateX(0) ;}
  /* 20% {transform: translateX(-350px) ;} */
  100% {transform: translateX(-350px) ;}
}
@keyframes rightToCenterAnim {
  0% {transform: translateX(350px) ;}
  /* 20% {transform: translateX(0) ;} */
  100% {transform: translateX(0) ;}
}
@keyframes leftToCenterAnim {
  0% {transform: translateX(-350px) ;}
  /* 20% {transform: translateX(0) ;} */
  100% {transform: translateX(0) ;}
}
@keyframes centerToRightAnim {
  0% {transform: translateX(0) ;}
  /* 20% {transform: translateX(350px) ;} */
  100% {transform: translateX(350px) ;}
}
/* はじめ ----------------*/
.slideA-enter {
  opacity: 0;
}
.slideA-enter-active {
  transition: opacity 0.5s;
}
.slideA-enter-to {
  opacity: 1;
  animation: rightToCenterAnim 0.5s;
}
.slideA-leave {
  opacity: 1;
}
.slideA-leave-active {
  transition: opacity 0.5s;
}
.slideA-leave-to {
  opacity: 0;
  animation: centerToLeftAnim 0.5s;
}
/* はじめ ----------------*/
.slideB-enter {
  opacity: 0;
}
.slideB-enter-active {
  transition: opacity 0.5s;
}
.slideB-enter-to {
  opacity: 1;
  animation: leftToCenterAnim 0.5s;
}
.slideB-leave {
  opacity: 1;
}
.slideB-leave-active {
  transition: opacity 0.5s;
}
.slideB-leave-to {
  opacity: 0;
  animation: centerToRightAnim 0.5s;
}
.select_game{
  height: 75%;
  position: relative;
  overflow: hidden;
}
/*-- -------------------------------------------------------*/
/*-- -------------------------------------------------------*/
.select_btn_wrap{
  display: flex;
  /* position: relative; */
  flex-direction: column;
  justify-content: start;
  align-items: center;
  /* height: 100%; */
  height: 220px;
  width: 80%;
  margin: 0 auto;
  scroll-snap-type: y mandatory;
  /* border: 1px solid; */
  overflow: auto;
}
.select_back{
  position: absolute;
  top: 28%;
  left: 8%;
}
.select_vfor{
  width: 100%;
}
.select_btn{
  margin: 7px auto;
  font-size: 20px;
  font-weight: bold;
  border-radius: 10px;
  padding: 10px 15px;
  background-color: green;
  color: white;
  width: 80%;
  text-align: center;
}
.select_btn_auth{
  margin: 7px 0;
  font-size: 20px;
  font-weight: bold;
  border-radius: 10px;
  padding: 10px 15px;
  /* background-color: green; */
  color: white;
  width: 80%;
  text-align: center;
}
</style>
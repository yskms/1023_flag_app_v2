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
        selectG:true,   //game
        selectL:false,  //land
        selectD:false,  //diffculty
        uid:'uid',  //ログインならガチUID,してないならブランクにする
        userName:'',
        isUserName:false,

        continentArr:[
          ['アジア','Asia'],['ヨーロッパ','Europe'],['南アメリカ','South America'],],
        continentArrAll:[
          ['アジア','Asia'],['ヨーロッパ','Europe'],['南アメリカ','South America'],['アフリカ','Africa'],['北アメリカ','North America'],['オセアニア','Oceania'],['全世界','All'],],
        diffArr:[
          ['やさしい','Easy'],['標準','Normal'],['難しい','Hard'],['激ムズ','Very Hard'],],
      }
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
          if(docSnap.data().name==undefined){//ユーザー名なかったら登録させる
            this.isUserName = true
          }else{
          this.userName = docSnap.data().name
          }
      //解放済みの地域数を取得して、continentArrに追加してます
          for(let i=0;i<docSnap.data().openContinent; i++){
            this.continentArr.push(this.continentArrAll.splice(3,1)[0])
          }

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
          // Sign-out successful.
        }).catch((error) => {
          console.log(error)
          // An error happened.
        });
      },
      select_game(n){ //ゲームモード選択
        this.setArr[1] = n
        this.selectG = !this.selectG
        this.selectL = !this.selectL
      },
      select_land(n){ //land選択
        this.setArr[2] = n
        this.selectL = !this.selectL
        this.selectD = !this.selectD
      },
      select_diff(n){ //difficulty選択、stateへ登録、ゲーム画面へ遷移
        this.setArr[3] = n
        // this.selectD = !this.selectD
        // console.log(this.setArr)
        this.$store.commit('setSetArr',this.setArr)
        this.$router.push('time')
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
      }
    },
    computed:{
    flagLists(){
      return this.$store.state.flagLists
    },
    // isAuth(){
    //   return this.$store.state.isAuth
    // },
  },
  }
</script>

<template>
  <div class="cont">
    <div class="main">
      <div class="user_error" v-if=" isUserName && this.uid!=='' ">
        ニックネームを登録しなよ！
      </div>

      <div class="title">
        <div class="head">
          <!--  -->
            <!-- 画面が描画された瞬間は、何も表示しない -->
            <div class="my-2" v-if="this.uid=='uid'">
              <div></div>
            </div>
            <!-- ログインしていないなら、何も表示しない -->
            <div class="my-2" v-else-if="this.uid==''">
              <div></div>
            </div>
            <!-- ログインしているなら、歯車userボタンを表示 -->
            <div class="my-2" v-else>
              <svg @click="goToUser()" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-gear-fill" viewBox="0 0 16 16">
                <path d="M9.405 1.05c-.413-1.4-2.397-1.4-2.81 0l-.1.34a1.464 1.464 0 0 1-2.105.872l-.31-.17c-1.283-.698-2.686.705-1.987 1.987l.169.311c.446.82.023 1.841-.872 2.105l-.34.1c-1.4.413-1.4 2.397 0 2.81l.34.1a1.464 1.464 0 0 1 .872 2.105l-.17.31c-.698 1.283.705 2.686 1.987 1.987l.311-.169a1.464 1.464 0 0 1 2.105.872l.1.34c.413 1.4 2.397 1.4 2.81 0l.1-.34a1.464 1.464 0 0 1 2.105-.872l.31.17c1.283.698 2.686-.705 1.987-1.987l-.169-.311a1.464 1.464 0 0 1 .872-2.105l.34-.1c1.4-.413 1.4-2.397 0-2.81l-.34-.1a1.464 1.464 0 0 1-.872-2.105l.17-.31c.698-1.283-.705-2.686-1.987-1.987l-.311.169a1.464 1.464 0 0 1-2.105-.872l-.1-.34zM8 10.93a2.929 2.929 0 1 1 0-5.86 2.929 2.929 0 0 1 0 5.858z"/>
              </svg>
            </div>
            <!--  -->
        </div>
        <div class="logo_wrap">
          <h1>国旗博士</h1>
          <img src="../assets/blackboard.png" alt="title">
        </div>
      </div>

      
      <div class="select_wrap">
          <div class="lang">
            <div class="my-2" @click="langJ">
                <v-btn
                  x-small
                  color="warning"
                  dark
                >
                  日本語
                </v-btn>
              </div>
            <div class="my-2" @click="langE">
                <v-btn
                  x-small
                  color="warning"
                  dark
                >
                  English
                </v-btn>
              </div>
          </div>

        <div class="select_game" v-show="selectG">
          <div class="my-2" >
                <v-btn
                  x-small
                  color="warning"
                  dark
                  @click="kesu"
                >
                  消す
                </v-btn>
              </div>
          <div class="select_wrap">
          <div class="my-2" @click="select_game(0)">
              <v-btn
                color="success"
                dark
              >
                {{lang==0 ? "タイムアタック" : "Time Challenge"}}
              </v-btn>
            </div>
            <div class="my-2" @click="select_game(1)">
              <v-btn
                color="success"
                dark
              >
                {{lang==0 ? "ノーミスチャレンジ" : "No Miss Challenge"}}
              </v-btn>
            </div>
            <!--  -->
            <!-- 画面が描画された瞬間は、何も表示しない -->
            <div class="my-2" v-if="this.uid=='uid'">
              <div></div>
            </div>
            <!-- ログインしていないなら、ログインボタンを表示 -->
            <div class="my-2" v-else-if="this.uid==''">
              <AuthComp/>
            </div>
            <!-- ログインしているなら、ログアウトボタンを表示 -->
            <div class="my-2" v-else @click="logout()">
              <v-btn
                color="success"
                dark
              >
                {{lang==0 ? "ログアウト" : "Logout"}}
              </v-btn>
            </div>
            <!--  -->
          </div>
        </div>

        <div class="select_game" v-show="selectL">
          <div class="my-2" @click="select_game(0)" >
                <v-btn
                  x-small
                  color="warning"
                  dark
                >
                  戻る
                </v-btn>
              </div>
          <!-- ['アジア','Asia'],['ヨーロッパ','Europe'],['南アメリカ','South America'],['アフリカ','Africa'],['北アメリカ','North America'],['オセアニア','Oceania'],['全世界','All'],], -->
          <div class="select_wrap">
            <div class="select_vfor" v-for="(c,index) in continentArr" :key="index">
              <div class="my-2" @click="select_land(index)">
              <v-btn
                color="success"
                dark
              >
                <!-- {{lang==0 ? "全ての地域" : "All Continent"}} -->
                {{lang==0 ? c[0] : c[1] }}
              </v-btn>
            </div>
            </div>

          </div>
        </div>

        <div class="select_game" v-show="selectD">
          <div class="my-2" @click="select_land(0)" >
                <v-btn
                  x-small
                  color="warning"
                  dark
                >
                  戻る
                </v-btn>
              </div>
          

      <!-- [0 激ムズ, 1 難しい, 2 普通, 3 やさしい, ] -->
          <div class="select_wrap">
            <div class="select_vfor" v-for="(d,index) in diffArr" :key="index">
              <div class="my-2" @click="select_diff(index)">
              <v-btn
                color="success"
                dark
              >
                <!-- {{lang==0 ? "全ての地域" : "All Continent"}} -->
                {{lang==0 ? d[0] : d[1] }}
              </v-btn>
            </div>
            </div>

          
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<style scoped>
/* .cont{
  height: 100vh;
  background-color: aquamarine;
}
.main{
  width: 500px;
  background-color: aliceblue;
}
.title{
  height: 50%;
  width: 100%;
}
.logo_wrap{
  width: 100%;
  position: relative;
}
.logo_wrap h1{
  position: absolute;
  top:50%;
  display: block;
  margin-left: auto;
  margin-right: auto;
}
.logo_wrap img{
  width: 100%;
} */
</style>
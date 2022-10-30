<script>
  import firebaseApp from "../plugins/firebaseConfig"
  import { getAuth, onAuthStateChanged, signOut, } from "firebase/auth"
  import { getFirestore, doc, getDoc } from "firebase/firestore"


  const auth = getAuth(firebaseApp)
  const db = getFirestore(firebaseApp)

  export default {
    data(){
      return{
        lang:0,//即時切り替えは個別のdata必要っぽいので残す
        // game:0,
        // land:0,
        // diff:0,
        uid:'uid',  //ログインならガチUID,してないならブランクにする
      }
    },
    created(){
      onAuthStateChanged(auth, (user) => {
        if (user) {             //ログインしてたら
          console.log(user.uid)
          this.uid = user.uid  //this.uidにガチUIDを入れる

          this.fetchData()    //usersのデータを取得
        } else {
          console.log('ログインしてないよ')
          this.uid = ''
        }
      });
    },
    methods:{
      async fetchData(){  //mountedで使う。ログインしてたらuidでusersデータ取得
        const docRef = doc(db, "users", this.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          console.log("Document data:", docSnap.data());
        } else {
          // doc.data() will be undefined in this case
          console.log("No such document!");
        }
      },
    backToHome(){
      this.$router.push('/')
    },
      logout(){
        signOut(auth).then(() => {
          console.log("logout now")
          this.uid = ''
          // Sign-out successful.
        }).catch((error) => {
          console.log(error)
          // An error happened.
        });
      },
      kesu(){
        if(this.$route.path !== '/'){
        console.log(this.$route.path)}
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
      <div class="head">
        <p>←</p>
        <h2>ユーザー情報</h2>
        <p>鉛筆</p>
      </div>
      <div class="user_info">
        <div class="icon">
          <p>icon</p>
          <p>画像</p>
        </div>
        <div class="nick">
          <p>ニックネーム</p>
          <p>ニックネーム</p>
        </div>
        <div class="medal">
          <p>タイムアタック</p>
          <div class="medal_time">
            <a href="#">a</a>
          </div>
          <div class="medal_nomiss">
            <p>ノーミスチャレンジ</p>
            <a href="#">b</a>
          </div>
          <div class="medal_rank">
            <p>ランキング</p>
            <a href="#">c</a>
          </div>
        </div>
        <div class="recent">
          <div class="recent_list">aaa</div>
        </div>
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
    </div><!-- main -->
  </div><!-- cont -->
</template>


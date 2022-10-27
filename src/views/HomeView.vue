<script>
  import firebaseApp from "../plugins/firebaseConfig"
  import { getAuth, onAuthStateChanged,} from "firebase/auth"
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
        uid:'',
      }
    },
    mounted(){
      onAuthStateChanged(auth, (user) => {
        if (user) {
          const uid = user.uid;
          console.log(uid)
          this.uid = uid
          this.$store.commit('authTrue',uid)  //ログインしてたらuidをstoreに登録

          this.fetchData()
          // const docRef = doc(db, "cities", "SF")
          // const docSnap = await getDoc(docRef)

          // if (docSnap.exists()) {
          //   console.log("Document data:", docSnap.data())
          // } else {
          //   // doc.data() will be undefined in this case
          //   console.log("No such document!")
          // }


        } else {
          console.log('ログインしてないよ')
        }
      });
    },
    methods:{
      async fetchData(){  //mountedで使う。ログインしてたらuidでデータ
        const docRef = doc(db, "users", this.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          console.log("Document data:", docSnap.data());
        } else {
          // doc.data() will be undefined in this case
          console.log("No such document!");
        }
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
        this.$store.commit('setChange',this.setArr)
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
      }
    },
    computed:{
    flagLists(){
      return this.$store.state.flagLists
    },
    isAuth(){
      return this.$store.state.isAuth
    },
  },
  }
</script>

<template>
  <div class="cont">
    <div class="main">
      <div class="title">
        <h1>国旗博士</h1>
        <a href="#">なんか画像</a>
        {{lang}}
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
            <div class="my-2">
              <AuthComp v-show="this.uid==''"/>
            </div>
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
          
          <div class="select_wrap">
          <div class="my-2" @click="select_land(0)">
              <v-btn
                color="success"
                dark
              >
                {{lang==0 ? "全ての地域" : "All Continent"}}
              </v-btn>
            </div>
            <div class="my-2" @click="select_land(1)">
              <v-btn
                color="success"
                dark
              >
                {{lang==0 ? "アジア" : "Asia"}}
              </v-btn>
            </div>
            <div class="my-2">
              <v-btn
                color="success"
                dark
              >
                {{lang==0 ? "ヨーロッパ" : "Europe"}}
              </v-btn>
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
          
          <div class="select_wrap">
          <div class="my-2" @click="select_diff(0)">
              <v-btn
                color="success"
                dark
              >
                {{lang==0 ? "難しい" : "Hard"}}
              </v-btn>
            </div>
            <div class="my-2" @click="select_diff(1)">
              <v-btn
                color="success"
                dark
              >
                {{lang==0 ? "標準" : "Normal"}}
              </v-btn>
            </div>
            <div class="my-2">
              <v-btn
                color="success"
                dark
              >
                {{lang==0 ? "やさしい" : "Easy"}}
              </v-btn>
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>


<script>
  import AuthComp from '../components/AuthComp'
  import firebaseApp from "../plugins/firebaseConfig"
  // import { getAuth, } from "firebase/auth"
// createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut 
  import { getFirestore, doc, getDoc 
            } from 'firebase/firestore'
// addDoc, Timestamp, serverTimestamp,collection, query, onSnapshot, orderBy,
  // const auth = getAuth(firebaseApp);
  const db = getFirestore(firebaseApp);

export default {
  components:{AuthComp},
  data: () => ({
    email: 'ex@gmail.com',
    test:'testdata',
    show1: false,
    password: 'Password',
    rules: {
      required: value => !!value || 'Required.',
      min: v => v.length >= 8 || 'Min 8 characters',
      counter: value => value.length <= 20 || 'Max 20 characters',
      email: value => {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          return pattern.test(value) || 'Invalid e-mail.'},  
      },
    isConfig:false,//setArrの中身があるかないかを管理
    toggleForm:true,//true:レジスターorログイン:false

    unsubscribe:null,
    byouga:[],
    dialog: false,
    }),
  mounted(){  
    if(this.lang === undefined){  //setArrが未設定ならホームへ戻らせます
    this.isConfig = true
    }else{
      this.fetchData()
      //ここリアルタイムじゃなくていいかも？？？
      // const q = query(collection(db, "datas"), orderBy("test"));
      // this.unsubscribe = onSnapshot(q, (snapshot) => {
      //   snapshot.docChanges().forEach((change) => {
      //     if (change.type === "added") {
      //         console.log("added: ", change.doc.data());
      //         this.byouga.push(change.doc.data())
      //     }
      //     if (change.type === "modified") {
      //         console.log("Modified: ", change.doc.data());
      //     }
      //     if (change.type === "removed") {
      //         console.log("Removed: ", change.doc.data());
      //     }
      //   });
      // });
    }
  },
  // beforeDestroy() { //onSnapshot使用時のテンプレです
  //   this.unsubscribe()
  // },
  computed:{
    setArr(){ //ゲームモードなどの設定
      return this.$store.state.setArr
    },
    lang(){
      return this.setArr[0]
    },
    uid(){
      return this.$store.state.uid
    },
  },
  methods:{
    backToHome(){
      this.$router.push('/')
    },
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
        <div>{{setArr[4] + '問'}}</div>
      </div><!-- upwrap -->
      <div class="under">
        <p>２位です！とか</p>

    <AuthComp v-show="this.uid==''"/>

<br><br><br>
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
          v-for="b in byouga" :key="b.index"
        >
          <v-list-item-icon>
            <v-icon v-text="b.test"></v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title v-text="b.game"></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </v-card>


      </div><!-- under -->
    </div><!-- main -->
  </div><!-- cont -->
</template>

<style scoped>
.cont{
  position: relative;
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
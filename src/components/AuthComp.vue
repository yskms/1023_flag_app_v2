
<script>
  import firebaseApp from "../plugins/firebaseConfig"
  import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut,} from "firebase/auth"
  import { getFirestore, doc, setDoc, Timestamp, addDoc, collection, getDoc, } from "firebase/firestore"

  const auth = getAuth(firebaseApp);
  const db = getFirestore(firebaseApp)
  
  export default {
    
  name: 'AuthComp',
  props:['score', 'noMissIdArr', ],

  data: () => ({
    name:'ニックネーム',
    // email: 'ex@gmail.com',
    email:'',
    age:'',
    iconNo:0,
    iconURL:'',
    test:'testdata',
    show1: false,
    // password: 'Password',
    password:'',
    rules: {
      required: value => !!value || 'Required.',
      min: v => v.length >= 8 || 'Min 8 characters',
      counter: value => value.length <= 20 || 'Max 20 characters',
      email: value => {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          return pattern.test(value) || 'Invalid e-mail.'},  
      },
    isConfig:false,//setArrの中身があるかないかを管理
    toggleForm:false,//true:レジスターorログイン:false
    errorCodeNo:0,//authのエラーコードを入れる
    isSuccess:false,//login成功したらtrue
    dialog: false,//ダイアログの表示、非表示
    uid:'',
    currentUserObj:{},
    continentArr:['Asia','Europe','South America','Africa','North America','Oceania','All',],

    }),
  methods:{
    backToHome(){
      this.$router.push('/')
    },
    register(){
        createUserWithEmailAndPassword(auth, this.email, this.password)
          .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            console.log(user)
            this.uid = user.uid
            this.$store.commit('authTrue',user.uid)//storeにもガチUIDを入れる
            this.isSuccess = true  //loginを表示して、
            this.setFireUsers()   //firestoreにユーザー登録、
            setTimeout(()=>{      //3秒後に表示を消して
              this.isSuccess = false
              if(this.$route.path == '/time'){  //TimeAttack画面の時はfirestoreにランキング登録、ダイアログ閉じる
                this.setFireRanks()
                // this.dialog = false
              }else{
                // this.$router.push('/')
                this.dialog = false     //home画面の時はダイアログを閉じるだけ
              }
            },3000)
            // ...
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode, errorMessage)
            if(errorCode === 'auth/email-already-in-use'){
              this.errorCodeNo = 10
            }else if(errorCode === 'auth/wrong-password'){
              this.errorCodeNo = 20
            }else{this.errorCodeNo = 30}
            // ..
          });
          console.log('done')
    },
    async setFireUsers(){ //firestoreのusersにデータ登録する
      await setDoc(doc(db, "users", this.uid), {
        uid: this.uid,
        name: this.name,
        // email: this.email,メールはここに保持しなくてもいいかな
        age: this.age,
        iconNo: this.iconNo,
        iconURL: this.iconURL,
        date: Timestamp.fromDate(new Date()),
        medal:[],
        historyArr:[],
        playCount:1,
        openContinent:0,//地域解放数
        openDiffArr:[1,1,1,1,1,1,1],//難しさ解放はレジスター以降からでOKとします
        noMissCountArr:[],
      });
    },
    async setFireRanks(){ //firestoreのdatasにデータ登録する
      // Add a new document with a generated id.
        const docRef = await addDoc(collection(db, "ranks"), {
          // name: "Tokyo",
          // country: "Japan",
          lang:this.currentUserScore.lang,
          game:this.currentUserScore.game,
          land:this.currentUserScore.land,
          diff:this.currentUserScore.diff,
          score:this.currentUserScore.score,
          date: Timestamp.fromDate(new Date()),
          uid:this.uid,
        });
        console.log("Document written with ID: ", docRef);
        this.dialog = false
    },


    async fetchUsers(){  //loginで使う。ログインしてたらuidで自分のusersデータ取得
        const docRef = doc(db, "users", this.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          console.log("Document data:", docSnap.data());
          Object.assign(this.currentUserObj, docSnap.data())
          this.updateFireUsers()
        } else {
          // doc.data() will be undefined in this case
          console.log("No such document!");
        }
    },
    async updateFireUsers(){//firestoreをアップデートするメソッド。authコンポにも要設定
      //特定のプレイカウントで、地域を解放
      //['アジア','ヨーロッパ','南アメリカ','アフリカ','北アメリカ','オセアニア','全世界'] 7地域。
      //openContinentは数値一つ（0-4?）
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
      let noMissCountArrNow = this.currentUserObj.noMissCountArr.concat()
      console.log(noMissCountArrNow)


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
        }
        console.log(noMissCountArrNow)


      //historyArrを読み込んで追記する。上限きてたら最初のやつを消す
      let historyArrNow = this.currentUserObj.historyArr.concat()
      historyArrNow.push({
          lang:this.currentUserScore.lang,
          game:this.currentUserScore.game,
          land:this.currentUserScore.land,
          diff:this.currentUserScore.diff,
          score:this.currentUserScore.score,
          date: Timestamp.fromDate(new Date()),
      })
      console.log(historyArrNow)
      if(historyArrNow.length>10){//上限きてたら先頭を1つ消す
        historyArrNow.shift()
      }
      console.log(historyArrNow)


      //firestoreをアップデートするとこ
      await setDoc(doc(db, "users", this.uid), 
      { playCount: this.currentUserObj.playCount + 1,
        openContinent: openContinentNow,
        openDiffArr: openDiffArrNow,
        noMissCountArr: noMissCountArrNow,
        historyArr: historyArrNow,
        },
      { merge: true }
      );
      console.log('update playCount')
      this.setFireRanks()
    },


    login(){
        signInWithEmailAndPassword(auth, this.email, this.password)
          .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            console.log(user)
            this.uid = user.uid
            this.$store.commit('authTrue',user.uid)//storeにもガチUIDを入れる
            this.isSuccess = true  //loginを表示して、消して、homeへ
            console.log(this.isSuccess)
            setTimeout(()=>{
              this.isSuccess = false
              if(this.$route.path == '/time'){
                console.log('fetchUsersやるよ!')
                this.fetchUsers()
                // this.setFireRanks()
                // this.dialog = false
              }else{
                console.log('logoinしたよ')
                // this.$router.push('/')
                this.dialog = false
              }
              // this.$router.push('/')
          },3000)
            // ...
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode)
            console.log(errorMessage)
            if(errorCode === 'auth/user-not-found'){
              this.errorCodeNo = 1
            }else if(errorCode === 'auth/wrong-password'){
              this.errorCodeNo = 2
            }else{this.errorCodeNo = 3}
          });
    },
    logout(){
        console.log('logout sasete')
        signOut(auth).then(() => {
          console.log("logout now")
          this.$store.commit('authFalse')//storeのガチUIDを消す
          // Sign-out successful.
        }).catch((error) => {
          console.log(error)
          // An error happened.
        });
    },
  },
  computed:{
    currentUserScore(){
      return this.$store.state.currentUserScore
    },
    setArr(){
      return this.$store.state.setArr
    },
    // storeUid(){
    //   return this.$store.state.uid
    // },
  }
    
  }
</script>

<template>
<div class="auth_cont">
  

  <v-row justify="center">
    <v-dialog
      lazy-validation
      v-model="dialog"
      max-width="600px"
    >
    <!-- 全画面表示のやつ---------------------------------------------------------------- -->
    <div class="loginSuccess" v-show="isSuccess">
      <p>{{lang==0 ? "ログイン成功" : "Login Successful"}}</p>
    </div><!-- loginSuccess -->
    <!-- 全画面表示のやつ ここまで---------------------------------------------------------------- -->

    <!-- persistentってどういう機能なんやろか -->
      <template v-slot:activator="{ on, attrs }">
        <v-col cols="12">
        <v-btn
          color="success"
          dark
          v-bind="attrs"
          v-on="on"
          persistent
        >
        {{lang==0 ? "ログインしよう！" : "Let's Login"}}
        </v-btn></v-col>
        <!-- <button class="select_btn">loguinsiyo</button> -->
      </template>

      <!-- register ------------------------------------------------------------------>
      <v-card v-show="toggleForm">
        <!-- <v-row> -->
        <v-card-title>
          <span class="text-h5">{{lang==0 ? "アカウント登録" : "Create Account"}}</span>
        </v-card-title>
        <!-- </v-row> -->

        <v-card-text>
          <v-container>
            <v-row>
              <v-col
                cols="12"
                sm="6"
                md="4"
              >
                <!-- <div class="my-2">
                  <v-btn
                    color="success"
                    dark
                  >
                    Google
                  </v-btn>
                </div>
                <div class="my-2">
                  <v-btn
                    color="success"
                    dark
                  >
                    Apple
                  </v-btn>
                </div> -->
              </v-col>
            </v-row>
          </v-container>

          <div style="text-align:center; color:red">
            <p v-show="errorCodeNo===10">このメールアドレスはすでに使われています</p>
            <p v-show="errorCodeNo===20">パスワードが間違っています</p>
            <p v-show="errorCodeNo===30">ログインエラー</p>
          </div>

          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field
                  v-model="name"
                  label="Nickname*"
                  required
                  :rules="[rules.required]"
                ></v-text-field>
              </v-col>
              
              <v-col cols="12">
                <v-text-field
                  label="Email*"
                  required
                  v-model="email"
                  :rules="[rules.required, rules.email]"
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  label="Password*"
                  type="password"
                  required
                  v-model="password"
                  :rules="[rules.required, rules.min]"
                ></v-text-field>
              </v-col>

              <v-col
                cols="12"
                sm="6"
              >
                <v-select
                  :items="['0-7','8-17','18-29','30-54','54+', '無回答']"
                  label="Age*"
                  required
                  v-model="age"
                  :rules="[rules.required]"
                ></v-select>
              </v-col>
            </v-row>
          </v-container>
          <small>*indicates required field</small>

          <v-container>
            <v-row>
              <v-col
                cols="12"
                sm="6"
                md="4"
              >
                <div class="my-2">
                  <v-btn
                  :disabled="!dialog"
                    color="success"
                    dark
                    @click="register()"
                  >
                    REGISTER
                  </v-btn>
                </div>
                <div class="my-2">
                  <v-btn
            color="blue darken-1"
            text
            @click="toggleForm=!toggleForm"
          >
            
            {{lang==0 ? "すでにアカウントをお持ちの方" : "Already have an account?"}}
          </v-btn>
                </div>
              </v-col>
            </v-row>
          </v-container>

        </v-card-text>
      </v-card>

      <!-- login ------------------------------------------------------------------>
      <v-card v-show="!toggleForm">
        <!-- カードのタイトル --------------------->
        <v-card-title>
          <span class="text-h5">{{lang==0 ? "ログイン" : "Login"}}</span>
        </v-card-title>

        <!-- カードの中身 ------------------------->
        <v-card-text>
          <!-- コンテナ：Googleとアップルのリンク -->
          <v-container>
            <v-row>
              <v-col
                cols="12"
                sm="6"
                md="4"
              >
                <!-- <div class="my-2">
                  <v-btn
                    color="success"
                    dark
                  >
                    Google
                  </v-btn>
                </div>
                <div class="my-2">
                  <v-btn
                    color="success"
                    dark
                  >
                    Apple
                  </v-btn>
                </div> -->
              </v-col>
            </v-row>
          </v-container>

          <div style="text-align:center; color:red">
            <p v-show="errorCodeNo===1">存在しないユーザーです</p>
            <p v-show="errorCodeNo===2">パスワードが間違っています</p>
            <p v-show="errorCodeNo===3">ログインエラー</p>
          </div>
          
          <!-- コンテナ：メールとパスワードの欄 -->
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field
                  label="Email*"
                  required
                  v-model="email"
                  :rules="[rules.required, rules.email]"
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  label="Password*"
                  type="password"
                  required
                  v-model="password"
                  :rules="[rules.required, rules.min]"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-container>

          <small>*indicates required field</small>

          <!-- コンテナ：ログインボタンとregister切り替えの欄 -->
          <v-container>
            <v-row>
              <v-col
                cols="12"
                sm="6"
                md="4"
              >
                <div class="my-2">
                  <v-btn
                    color="success"
                    dark
                    @click="login()"
                  >
                    LOGIN
                  </v-btn>
                </div>
                <div class="my-2">
                  <v-btn
            color="blue darken-1"
            text
            @click="toggleForm = !toggleForm"
          >
            {{lang==0 ? "ユーザー登録はこちら" : "Register here"}}
          </v-btn>
                </div>
              </v-col>
            </v-row>
          </v-container>

        </v-card-text>
      </v-card>
    </v-dialog>
  </v-row>
</div>  
</template>

<style scoped>
.auth_cont{
  /* position: relative; */
}
.loginSuccess{
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
  z-index: 200;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
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
</style>
<script>
  import firebaseApp from "../plugins/firebaseConfig"
  import { getAuth, onAuthStateChanged, signOut, signInWithEmailAndPassword, updatePassword, deleteUser, } from "firebase/auth"
  import { getFirestore, doc, getDoc, getDocs, collection, query, where, deleteDoc, } from "firebase/firestore"


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
        isPassEdit:false,//pass編集画面
        isDelEdit:false,//del画面
        email:'',
        password:'Password',
        newPassword:'Password',
        delDatasArr:[],//ランキング用のデータベースに残っている記録のIDをdelDatasArrにプッシュ
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
          this.$router.push('/')
        }
      });
    },
    methods:{
      async fetchUsers(){  //mountedで使う。ログインしてたらuidでusersデータ取得
        const docRef = doc(db, "users", this.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          console.log("Document data:", docSnap.data());
          this.email = docSnap.data().email
        } else {
          // doc.data() will be undefined in this case
          console.log("No such document!");
        }
      },
      backToUser(){
        this.$router.push('/user')
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
      changePass(){ //再度サインインさせてから、変更メソッドを走らせます
        signInWithEmailAndPassword(auth, this.email, this.password)
          .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            console.log(user)
            this.setPass()  //パスワードを変更するメソッド
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
      setPass(){  //changePassで使用。パスワードを変更するメソッド
        const user = auth.currentUser;
        updatePassword(user, this.newPassword).then(() => {
          // Update successful.
          console.log('update success')
        }).catch((error) => {
          // An error ocurred
          console.log(error)
        });
      },
      delUser(){ //再度サインインさせてから、削除メソッドを走らせます
        signInWithEmailAndPassword(auth, this.email, this.password)
          .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            console.log(user)
            this.delFireAll()  //削除メソッド
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
      //削除メソッド------------------------------------------------
      delFireAll(){
        this.getFireStoreDatas()
      },
      async getFireStoreDatas(){  //ランキング用のデータベースに残っている記録のIDをdelDatasArrにプッシュ
        const q = query(collection(db, "ranks"), where("uid", "==", this.uid));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          console.log(doc.id, " => ", doc.data())
          this.delDatasArr.push(doc.id)
        })
        console.log('all data')
        this.delFireStoreDatas()  //firestoreからdatasのデータを削除
      },
      async delFireStoreDatas(){  //firestoreからdatasのデータを削除
        for(let i=0;i<this.delDatasArr.length;i++){
          await deleteDoc(doc(db, "ranks", this.delDatasArr[i]));
        }
        console.log('datas delete done')
        this.delFireStoreUsers()  //firestoreからusersのデータを削除
      },
      async delFireStoreUsers(){  //firestoreからusersのデータを削除
        await deleteDoc(doc(db, "users", this.uid));
        console.log('users delete done')
        this.delFireAuth()  //auth登録を削除するメソッド
      },
      delFireAuth(){  //auth登録を削除するメソッド
        const user = auth.currentUser;
        deleteUser(user).then(() => {
          // User deleted.
          console.log('del success')
        }).catch((error) => {
          // An error ocurred
          console.log(error)
        });
      },
      //削除メソッド------------------------------------------------
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

      <!-- del_edit -->
      <div class="del_edit" v-show="isDelEdit">
        <div class="head">
        <p>←</p>
        <h2>ユーザー情報の削除</h2>
      </div>
      <div class="user_info">
        <div class="nick">
          <p>全ての記録が削除されます！</p>
          <p>パスワード</p>
          <p><input type="text" v-model="password"></p>
        </div>
      </div>
      <div class="my-2">
          <v-btn @click="delUser()"
            color="success"
            dark
          >
            削除する
          </v-btn>
      </div>
      <div class="my-2">
          <v-btn @click="isDelEdit=!isDelEdit"
            color="success"
            dark
          >
            削除せずに戻る
          </v-btn>
      </div>
      </div><!-- del_edit -->
      
      <!-- pass_edit -->
      <div class="pass_edit" v-show="isPassEdit">
        <div class="head">
        <p>←</p>
        <h2>パスワード変更</h2>
      </div>
      <div class="user_info">
        <div class="nick">
          <p>現在のパスワード</p>
          <p><input type="text" v-model="password"></p>
          <p>新しいパスワード</p>
          <p><input type="text" v-model="newPassword"></p>
          <p>新しいパスワード（確認用）</p>
          <p><input type="text" placeholder="●●●"></p>
        </div>
      </div>
      <div class="my-2">
          <v-btn @click="changePass"
            color="success"
            dark
          >
            変更する
          </v-btn>
      </div>
      <div class="my-2">
          <v-btn @click="isPassEdit=!isPassEdit"
            color="success"
            dark
          >
            変更せずに戻る
          </v-btn>
      </div>
      </div><!-- pass_edit -->
      
      <div class="head">
        <p>←</p>
        <h2>ユーザー情報の変更</h2>
      </div>
      <div class="user_info">
        <div class="icon">
          <div>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-emoji-smile" viewBox="0 0 16 16">
              <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
              <path d="M4.285 9.567a.5.5 0 0 1 .683.183A3.498 3.498 0 0 0 8 11.5a3.498 3.498 0 0 0 3.032-1.75.5.5 0 1 1 .866.5A4.498 4.498 0 0 1 8 12.5a4.498 4.498 0 0 1-3.898-2.25.5.5 0 0 1 .183-.683zM7 6.5C7 7.328 6.552 8 6 8s-1-.672-1-1.5S5.448 5 6 5s1 .672 1 1.5zm4 0c0 .828-.448 1.5-1 1.5s-1-.672-1-1.5S9.448 5 10 5s1 .672 1 1.5z"/>
            </svg>  
          </div>
          <p>画像</p>
        </div>
        <div class="nick">
          <p>ニックネーム</p>
          <p><input type="text" placeholder="nickname"></p>
        </div>
      </div>
      <div class="pass" v-show="email!==''">
        <p @click="isPassEdit=!isPassEdit">パスワードを変更する</p>
      </div>

      <div class="my-2">
          <v-btn
            color="success"
            dark
          >
            変更する
          </v-btn>
      </div>
      <div class="my-2">
          <v-btn @click="backToUser()"
            color="success"
            dark
          >
            変更せずに戻る
          </v-btn>
      </div>

      <div class="del">
        <p @click="isDelEdit=!isDelEdit">ユーザー情報を削除する</p>
      </div>

    </div><!-- main -->
  </div><!-- cont -->
</template>


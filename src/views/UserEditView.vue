<script>
  import firebaseApp from "../plugins/firebaseConfig"
  import { getAuth, onAuthStateChanged, signOut, signInWithEmailAndPassword, updatePassword, deleteUser, } from "firebase/auth"
  import { getFirestore, doc, getDoc, getDocs, setDoc, collection, query, where, deleteDoc, } from "firebase/firestore"


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
        name:'',
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
          this.name = docSnap.data().name
        } else {
          // doc.data() will be undefined in this case
          console.log("No such document!");
        }
      },
      backToUser(){
        this.$router.push('/user')
        this.isPassEdit = false
        this.isDelEdit = false
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

      changeIconName(){},
      async updateFireUsers(){
        //firestoreをアップデートするメソッド。
        //users内の既存のuidに対して、上書き保存します
        await setDoc(doc(db, "users", this.uid), 
        { name: this.name,
          },
        { merge: true }
        );
        console.log('update icon and name')
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
  <div class="edit_cont">
<!-- 全画面表示のもの----------------------------------------------------- -->
      <!-- pass_edit --------------------------------------------------->
      <div class="pass_edit" v-if="isPassEdit">
        <div class="edit_head">
          <svg @click="isPassEdit=!isPassEdit" xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-chevron-left" viewBox="0 0 16 16">
              <path fill-rule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"/>
          </svg>
          <h2>パスワード変更</h2>
        </div>
        <div class="pass_input_main">
          <div class="pass_input_wrap">
            <p>現在のパスワード</p>
            <p><input type="text" v-model="password"></p>
            <hr>
            <p><br>新しいパスワード</p>
            <p><input type="text" v-model="newPassword"></p>
            <p>新しいパスワード（確認用）</p>
            <p><input type="text" placeholder="●●●"></p>
          </div>
        </div>
      <div class="edit_btn_wrap">
          <div class="edit_btn">
              <button @click="changePass">
                変更する
              </button>
          </div>
          <div class="edit_btn">
              <button @click="isPassEdit=!isPassEdit">
                変更せずに戻る
              </button>
          </div>
      </div>

      </div><!-- pass_edit ---------------------------------------------->
      <!-- del_edit ------------------------------------------------------>
      <div class="del_edit" v-else-if="isDelEdit">
        <div class="edit_head">
            <svg @click="isDelEdit=!isDelEdit" xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-chevron-left" viewBox="0 0 16 16">
                <path fill-rule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"/>
            </svg>
            <h2>ユーザー情報の削除</h2>
        </div>
        <div class="del_edit_main">
          <div class="del_edit_li">
            <h4>全ての記録が削除されます！</h4>
            <p>パスワード</p>
            <p><input type="text" v-model="password"></p>
          </div>
        </div>
        <div class="edit_btn_wrap">
          <div class="edit_btn_del">
              <button @click="delUser()">
                削除する
              </button>
          </div>
          <div class="edit_btn_del">
              <button @click="isDelEdit=!isDelEdit">
                削除せずに戻る
              </button>
          </div>
        </div>
      </div><!-- del_edit ---------------------------------------------->
      
<!-- 全画面表示のもの ここまで----------------------------------------------------- -->
      
    <div class="edit_main" v-else>
      <div class="edit_head">
        <svg @click="backToUser()" xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-chevron-left" viewBox="0 0 16 16">
            <path fill-rule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"/>
        </svg>
        <h2>ユーザー情報の変更</h2>
      </div>

      <div class="edit_info">
        <div class="icon">
          <p>アイコン</p>
          <img src="@/assets/mogura.png"  alt="">
        </div>
        <div class="nick">
          <p>ニックネーム</p>
          <p><input type="text" v-model="name"></p>
        </div>
      </div>

      <div class="edit_btn_wrap">
          <div class="edit_btn">
              <button>
                変更する
              </button>
          </div>
          <div class="edit_btn">
              <button @click="backToUser()">
                変更せずに戻る
              </button>
          </div>
      </div>

      <div class="edit_pass" v-show="email!==''">
        <p @click="isPassEdit=!isPassEdit">パスワードを変更する</p>
      </div>

      <div class="edit_del">
        <p @click="isDelEdit=!isDelEdit">ユーザー情報を削除する</p>
      </div>

    </div><!-- main -->
  </div><!-- cont -->
</template>

<style scoped>
.edit_cont{
  /* なんかこの上にv-applicationクラスがおるからwidthは％にしてます */
  width: 100%;
  height: 100%;
  background-color: #dad1b5;
  display: flex;
  align-items: center;
  justify-content: center;
}
/* 全画面表示のもの------------------------------------------------------- */
/* ------------------------------------- */
.pass_edit{
  height: 80%;
  background-color: #F5ECCD;
  width: 85%;
  margin: 10% auto 10% auto;
  padding: 10px;
  /* text-align: center; */
}
.pass_input_main{
  width: 70%;
  margin: 0 auto;
}
.pass_input_main input{
  background-color: aliceblue;
  height: 2.5rem;
  width: 100%;
  border: #dad1b5 solid;
  border-radius: 10px;
}
/* ------------------------------------- */
.del_edit{
  height: 80%;
  background-color: #F5ECCD;
  width: 85%;
  margin: 10% auto 10% auto;
  padding: 10px;
  /* text-align: center; */
}
.del_edit_main{
  width: 70%;
  margin: 0 auto;
  height: 50%;
}
.del_edit_main h4{
  color: red;
  margin: 6rem 0;
  text-align: center;
}
.del_edit_main input{
  background-color: aliceblue;
  height: 2.5rem;
  width: 100%;
  border: #dad1b5 solid;
  border-radius: 10px;
}
.edit_btn_del{
  margin: 15px auto;
  font-size: 20px;
  font-weight: bold;
  border-radius: 10px;
  padding: 10px 15px;
  background-color: red;
  color: white;
  width: 60%;
  text-align: center;
}

/* 全画面表示 ここまで------------------------------------------------------- */
/* ------------------------------------- */
.edit_main{
  height: 80%;
  background-color: #F5ECCD;
  width: 85%;
  margin: 10% auto 10% auto;
  padding: 10px;
}
/* ------------------- */
.edit_head{
  height: 10%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
}
.edit_head svg{
  position: absolute;
  top: 20px;
  left: 0;
}
/* ------------------- */
.edit_info{
  height: 35%;
  /* border: #dad1b5 solid; */
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.edit_info p{
  margin: 0;
}
.edit_info img{
  height: 70px;
  width: 70px;
  background-color: aliceblue;
  border-radius: 50%;
  margin-bottom: 10px;
}
.nick{
  width: 100%;
}
.nick input{
  background-color: aliceblue;
  height: 2.5rem;
  width: 65%;
  border: #dad1b5 solid;
  border-radius: 10px;
}
/* ------------------- */
.edit_btn_wrap{
  height: 35%;
  /* border: #dad1b5 solid; */
}
.edit_btn{
  margin: 15px auto;
  font-size: 20px;
  font-weight: bold;
  border-radius: 10px;
  padding: 10px 15px;
  background-color: green;
  color: white;
  width: 60%;
  text-align: center;
}
/* ------------------- */
.edit_pass{
  height: 10%;
  /* border: #dad1b5 solid; */
  text-align: center;
  font-size: 0.8em;
}
/* ------------------- */
.edit_del{
  height: 10%;
  /* border: #dad1b5 solid; */
  text-align: center;
  font-size: 0.8em;
}
</style>
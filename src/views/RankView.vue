<script>
  import firebaseApp from "../plugins/firebaseConfig"
  import { getAuth, onAuthStateChanged, signOut, } from "firebase/auth"
  import { getFirestore, doc, getDoc, collection, query, orderBy, limit, getDocs, } from "firebase/firestore"

  import dayjs from 'dayjs'

  const auth = getAuth(firebaseApp)
  const db = getFirestore(firebaseApp)

  export default {
    data(){
      return{
        uid:'uid',  //ログインならガチUID,してないならブランクにする
        // isConfig:false,//setArrの中身があるかないかを管理
        rankArr:[],   //score降順で6個データ入れる
        rankArrUid:[],//上記のuidのみのもの。combineDataメソッドで使用する
        userArr:[],   //usersから全てのユーザーデータを入れる
      }
    },
    mounted(){
      onAuthStateChanged(auth, (user) => {
        if (user) { //ログインしてたら
          // const uid = user.uid
          // console.log(uid)
          this.uid = user.uid  //this.uidにガチUIDを入れる
          this.$store.commit('authTrue',user.uid)//storeにもガチUIDを入れる

          this.fetchUsersAll()//全てのusersデータ取得
          this.fetchRank()//datasのデータを取得
        } else {
          console.log('ログインしてないよ')
          this.uid = ''
          this.$store.commit('authFalse')//storeのガチUIDを消す
          // this.isConfig = true

        }
      });
    },
    methods:{
      async fetchRank(){
        const datasRef = collection(db, "ranks")
        //デフォルトでは、クエリは、ドキュメント ID の昇順でクエリを満たすすべてのドキュメントを取得します。
        const que = query(datasRef, orderBy("score","desc"), limit(10))
        // const q = await getDocs(que, s =>{
        //   s.forEach(element => {
        //     this.rankArr.push(element.docs.data())
        //   });
        // });
        const querySnapshot = await getDocs(que);
        querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          console.log(doc.id, " => ", doc.data());
          this.rankArr.push(doc.data())
          this.rankArrUid.push(doc.data().uid)
        });
        console.log(que)
        console.log(this.rankArr)
        this.combineData()
      },
      //使わなくなったこれ----------------------------------------
      async fetchUsers(){  //mountedで使う。ログインしてたらuidで自分のusersデータ取得
        const docRef = doc(db, "users", this.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          console.log("Document data:", docSnap.data());
        } else {
          // doc.data() will be undefined in this case
          console.log("No such document!");
        }
      },
      //----------------------------------------

      async fetchUsersAll(){  //mountedで使う。ログインしてたら全てのusersデータ取得
        const querySnapshot = await getDocs(collection(db, "users"));
        querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          console.log(doc.id, " => ", doc.data());
          this.userArr.push(doc.data())
          console.log(this.userArr)
        });
      },
      combineData(){  //rankArrにユーザー情報を合体させる
        for(let i =0;i<this.rankArrUid.length;i++){
          console.log(this.rankArrUid[i])
          const userObj = this.userArr.find((e) => e.uid == this.rankArrUid[i])
          console.log(userObj)
          Object.assign(this.rankArr[i], userObj)
        }
        console.log(this.rankArr)

        this.addFormatDate()
      },
      addFormatDate(){
        for(let i=0;i<this.rankArr.length;i++){
          this.rankArr[i].formatDate=dayjs(this.rankArr[i].date.seconds*1000).format("YYYY/MM/DD")
        }
        console.log(this.rankArr)
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
      backToHome(){
        this.$router.push('/')
      },
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
  <div class="rank_cont">
<!-- 全画面表示のもの------------------------------------------ -->
    <div class="config_error" v-show="this.uid==''">
        <p style="color:red">ログアウトされました</p>
        <p style="color:red">Logouted now</p>
        <div class="my-2" @click="backToHome">
                  <v-btn
                    color="success"
                    dark
                  >
                    ホームに戻る
                  </v-btn>
                </div>
    </div><!-- config_error -->
<!-- 全画面表示 ここまで------------------------------------------ -->

    <div class="rank_main">
      <div class="rank_title">
        <div class="trophy_wrap">
          <img src="@/assets/trophy.png"  alt="icon">
        </div>
        <h2>ランキング</h2>
      </div><!-- title -->
      <div class="rank_list">
          <div class="rank_list_li" v-for="(r,index) in rankArr" :key="index">
            <div>{{r.formatDate}} : </div><div>{{r.name}}</div><div>{{r.score}}問</div>
          </div>
      </div><!-- rank -->
      <div class="select_btn">
              <button @click="backToHome">
                ホームに戻る
              </button>
            </div>
    </div><!-- main -->
  </div><!-- cont -->
</template>

<style scoped>
.rank_cont{
  /* なんかこの上にv-applicationクラスがおるからwidthは％にしてます */
  width: 100%;
  height: 100vh;
  background-color: #dad1b5;
  position: relative;
}
/* 全画面表示--------------------------------------------- */
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
/* 全画面表示ここまで--------------------------------------------- */
.rank_main{
  height: 88%;
  background-color: #F5ECCD;
  width: 85%;
  margin: 5% auto 5% auto;
  padding: 10px;
}
/* ---------------------------------- */
.rank_title{
  height: 10%;
  /* background-color: aliceblue; */
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
}
.trophy_wrap{
  position: absolute;
  width: 100%;
  top: 0;
  left: 0;
  height: 100%;
  /* background-color: blue; */
  text-align: center;
}
.rank_title img{
  object-fit: scale-down;
  height: 100%;
  width: 20%;
}
.rank_title h2{
  z-index: 1;
}
/* ---------------------------------- */
.rank_list{
  height: 80%;
  overflow: hidden;
  /* background-color: whitesmoke; */
}
.rank_list_li{
  height: 8%;
  border: #908a77 solid 1px;
  background-color: whitesmoke;
  border-radius: 10px;
  padding: 10px;
  margin: 10px auto;
  width: 90%;
  display: flex;
  justify-content: space-between;
  
}
/* ---------------------------------- */
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
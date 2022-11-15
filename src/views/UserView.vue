<script>
  import firebaseApp from "../plugins/firebaseConfig"
  import { getAuth, onAuthStateChanged, signOut, } from "firebase/auth"
  import { getFirestore, doc, getDoc } from "firebase/firestore"

  import dayjs from 'dayjs'

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
        // isEdit:false,//ニックネームとか編集画面
        currentUserObj:{name:""},
        // noMissCountArrSort:[],
        favListArr:[],
        historyArr:[],
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

      const date = dayjs().format()
      console.log(date)
    },
    methods:{
      async fetchUsers(){  //mountedで使う。ログインしてたらuidでusersデータ取得
        const docRef = doc(db, "users", this.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          console.log("Document data:", docSnap.data());
          Object.assign(this.currentUserObj,docSnap.data())
          this.makeFavList()
          this.makeHistoryList()
        } else {
          // doc.data() will be undefined in this case
          console.log("No such document!");
        }
      },
      makeFavList(){
        const noMissCountArrCopy = this.currentUserObj.noMissCountArr.concat()
        console.log(JSON.parse(JSON.stringify(noMissCountArrCopy)))
        //2回以上ノーミス正解してるのをフィルタリング
        let noMissCountArrSort = JSON.parse(JSON.stringify(noMissCountArrCopy)).filter(e=>{
          return e.count>1
        })
        //降順に並び替える
        noMissCountArrSort.sort(function(a,b){
          if(a.count > b.count)return -1
          if(b.count > a.count)return 1
          return 0
        })
        console.log(JSON.parse(JSON.stringify(noMissCountArrSort)))
        //とりあえず5こ抽出してみた
        this.favListArr=JSON.parse(JSON.stringify(noMissCountArrSort)).splice(0,5)
        console.log(this.favListArr)
        console.log(JSON.parse(JSON.stringify(this.favListArr)))

        //flagのURLを追記
        for(let i=0;i<this.favListArr.length;i++){
          for(let j=0;j<this.flagLists.length;j++){
            if(this.favListArr[i].id==this.flagLists[j].id){
              this.favListArr[i].flag=this.flagLists[j].flag
              break
            }
          }
        }
        console.log(this.favListArr)
        console.log(JSON.parse(JSON.stringify(this.favListArr)))
      },

      makeHistoryList(){
        this.historyArr = this.currentUserObj.historyArr.concat()
        // console.log(JSON.parse(JSON.stringify(this.historyArrNow)))
        console.log(this.historyArr[0].date)
        console.log(this.historyArr[0].date.toDate())
        console.log(this.historyArr[0].date.seconds*1000)
        console.log(dayjs(this.historyArr[0].date.seconds*1000))
        console.log(dayjs(this.historyArr[0].date.seconds*1000).format())
        console.log(dayjs(this.historyArr[0].date.seconds*1000).format("YYYY/MM/DD"))
        this.historyArr[0].formatDate=dayjs(this.historyArr[0].date.seconds*1000).format("YYYY/MM/DD")

        for(let i=0;i<this.historyArr.length;i++){
          this.historyArr[i].formatDate=dayjs(this.historyArr[i].date.seconds*1000).format("YYYY/MM/DD HH:mm")
        }
        console.log(this.historyArr)
      },


      backToHome(){
        this.$router.push('/')
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
      goToEdit(){
        this.$router.push('/useredit')
      },
    },
    computed:{
    flagLists(){
      return this.$store.state.flagLists
    },
    // currentUserObjName(){
    //   return this.currentUserObj.name
    // }

    // isAuth(){
    //   return this.$store.state.isAuth
    // },
  },
  }
</script>

<template>
  <div class="user_cont">
      <!-- footer ----------------------------------->
      <div class="footer">
          <div class="footer_btn" @click="backToHome">
              <button>
                ホームに戻る
              </button>
            </div>
      </div>
      <!-- footer ----------------------------------->

    <div class="user_main" v-if="currentUserObj">
      <div class="user_head">
        <h2>ユーザー情報</h2>
        <div class="pen">
          <svg @click="goToEdit" xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-pencil" viewBox="0 0 16 16">
            <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z"/>
          </svg>
        </div>
      </div>

      <div class="user_info">
        <div class="icon_wrap">
          <p>アイコン</p>
          <div>
            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-emoji-smile" viewBox="0 0 16 16">
              <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
              <path d="M4.285 9.567a.5.5 0 0 1 .683.183A3.498 3.498 0 0 0 8 11.5a3.498 3.498 0 0 0 3.032-1.75.5.5 0 1 1 .866.5A4.498 4.498 0 0 1 8 12.5a4.498 4.498 0 0 1-3.898-2.25.5.5 0 0 1 .183-.683zM7 6.5C7 7.328 6.552 8 6 8s-1-.672-1-1.5S5.448 5 6 5s1 .672 1 1.5zm4 0c0 .828-.448 1.5-1 1.5s-1-.672-1-1.5S9.448 5 10 5s1 .672 1 1.5z"/>
            </svg>  
          </div>
        </div>
        <div class="nick_wrap">
          <p>ニックネーム</p>
          <h3>{{currentUserObj["name"]}}</h3>
        </div>
      </div>

        <div class="user_medal">
          <p>メダル</p>
          <div class="user_medal_wrap">
              <p>タイムアタック</p>
              <div class="medal_time">
                  <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-emoji-smile" viewBox="0 0 16 16">
                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                    <path d="M4.285 9.567a.5.5 0 0 1 .683.183A3.498 3.498 0 0 0 8 11.5a3.498 3.498 0 0 0 3.032-1.75.5.5 0 1 1 .866.5A4.498 4.498 0 0 1 8 12.5a4.498 4.498 0 0 1-3.898-2.25.5.5 0 0 1 .183-.683zM7 6.5C7 7.328 6.552 8 6 8s-1-.672-1-1.5S5.448 5 6 5s1 .672 1 1.5zm4 0c0 .828-.448 1.5-1 1.5s-1-.672-1-1.5S9.448 5 10 5s1 .672 1 1.5z"/>
                  </svg>  
              </div>

              <p>ノーミスチャレンジ</p>
              <div class="medal_nomiss">
                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-emoji-smile" viewBox="0 0 16 16">
                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                    <path d="M4.285 9.567a.5.5 0 0 1 .683.183A3.498 3.498 0 0 0 8 11.5a3.498 3.498 0 0 0 3.032-1.75.5.5 0 1 1 .866.5A4.498 4.498 0 0 1 8 12.5a4.498 4.498 0 0 1-3.898-2.25.5.5 0 0 1 .183-.683zM7 6.5C7 7.328 6.552 8 6 8s-1-.672-1-1.5S5.448 5 6 5s1 .672 1 1.5zm4 0c0 .828-.448 1.5-1 1.5s-1-.672-1-1.5S9.448 5 10 5s1 .672 1 1.5z"/>
                  </svg> 
              </div>

              <p>ランキング</p>
              <div class="medal_rank">
                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-emoji-smile" viewBox="0 0 16 16">
                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                    <path d="M4.285 9.567a.5.5 0 0 1 .683.183A3.498 3.498 0 0 0 8 11.5a3.498 3.498 0 0 0 3.032-1.75.5.5 0 1 1 .866.5A4.498 4.498 0 0 1 8 12.5a4.498 4.498 0 0 1-3.898-2.25.5.5 0 0 1 .183-.683zM7 6.5C7 7.328 6.552 8 6 8s-1-.672-1-1.5S5.448 5 6 5s1 .672 1 1.5zm4 0c0 .828-.448 1.5-1 1.5s-1-.672-1-1.5S9.448 5 10 5s1 .672 1 1.5z"/>
                  </svg> 
              </div>
          </div>
        </div>
        <div class="fav">
          <p>得意な国</p>
          <div class="fav_wrap">
            <!-- <img :src="flagLists[noMissCountArrSort[0].id].flag" alt="flag"> -->
            <!-- <img :src="flagLists[noMissCountArrSort[1].id].flag" alt="flag"> -->
            <!-- <span>{{flagLists[noMissCountArrSort[0].id].flag}}</span> -->
            <span v-for="(f,index) in favListArr" :key="index">
              <img :src="f.flag" alt=""></span>
          </div>
        </div>
        <div class="user_history">
          <p>最近の記録</p>
          <div class="user_history_wrap">
            <div class="user_history_list" v-for="(h,index) in historyArr" :key="index">
              {{h.formatDate}} : {{h.score}}問
            </div>
          </div>
        </div>
    </div><!-- main -->
  </div><!-- cont -->
</template>

<style scoped>
p{
  margin: 0;
}
html{
  background-color: #aca58f;
}
.user_cont{
  /* なんかこの上にv-applicationクラスがおるからwidthは％にしてます */
  width: 100%;
  height: 100%;
  background-color: #dad1b5;
  position: relative;
}
/* footer--------------------------------------------- */
.footer{
  height: 10%;
  background-color: #908a77;
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
}
.footer_btn{
  margin: 7px auto;
  font-size: 20px;
  font-weight: bold;
  border-radius: 10px;
  padding: 10px 15px;
  background-color: green;
  color: white;
  width: 60%;
  text-align: center;
}
/* --------------------------------------------- */
.user_main{
  height: 88%;
  background-color: #F5ECCD;
  width: 85%;
  margin: 5% auto 5% auto;
  scroll-snap-type: y mandatory;
  overflow: auto;
  padding: 10px;
}
.user_head{
  text-align: center;
  position: relative;
  height: 5%;
  margin-top: 10%;
}
.pen{
  position: absolute;
  right: 0;
  top: 0;
}
/* -------------------------- */
.user_info{
  padding: 5px;
  height: 10%;
  background-color: #908a77;
  display: flex;
}
.icon_wrap{
  background-color: aliceblue;
  text-align: center;
  width: 25%;
}
.nick_wrap{
  background-color: aliceblue;
  margin-left: 5px;
  width: 75%;
}
.nick_wrap h3{
  border: #908a77 solid 1px;
  padding: 2px;
  margin-left: 5px;
}
/* -------------------------- */
.user_medal{
  height: 55%;
  background-color: darkkhaki;
  padding: 5px;
}
.user_medal_wrap{
  height: 93%;
  background-color: whitesmoke;
  padding: 10px;
  border: #908a77 solid 1px;
  border-radius: 10px;
}
.medal_time{
  height: 30%;
  border: #908a77 solid 1px;
  border-radius: 10px;
  padding: 10px;
  margin-bottom: 10px;
}
.medal_nomiss{
  height: 20%;
  border: #908a77 solid 1px;
  border-radius: 10px;
  padding: 10px;
  margin-bottom: 10px;
}
.medal_rank{
  height: 20%;
  border: #908a77 solid 1px;
  border-radius: 10px;
  padding: 10px;
  /* margin-bottom: 10px; */
}
/* -------------------------- */
.fav{
  height: 25%;
  background-color: blueviolet;
  padding: 5px;
}
.fav_wrap{
  height: 80%;
  background-color: whitesmoke;
  border-radius: 10px;
  border: #908a77 solid 1px;
}
.fav_wrap img{
  height: 30px;
  margin: 5px;
}
/* -------------------------- */
.user_history{
  height: 30%;
  background-color: aquamarine;
  padding: 5px;
}
.user_history_wrap{
  /* height: 80%; */
  background-color: whitesmoke;
  border-radius: 10px;
  border: #908a77 solid 1px;

  display: flex;
  /* position: relative; */
  flex-direction: column;
  justify-content: start;
  align-items: center;
  /* height: 100%; */
  height: 220px;
  /* width: 80%; */
  margin: 0 auto;
  scroll-snap-type: y mandatory;
  /* border: 1px solid; */
  overflow: auto;
}
.user_history_list{
  height: 30%;
  border: #908a77 solid 1px;
  border-radius: 10px;
  padding: 10px;
  margin: 10px;
  width: 90%;
}
</style>
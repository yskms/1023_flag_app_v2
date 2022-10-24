<script>
  // import HelloWorld from '../components/HelloWorld'

  export default {
    data(){
      return{
        lang:0,//配列にする？
        game:0,
        land:0,
        diff:0,
        selectG:true,
        selectL:false,
        selectD:false,
      }
    },
    methods:{
      select_game(n){
        this.game = n
        this.selectG = !this.selectG
        this.selectL = !this.selectL
      },
      select_land(n){
        this.land = n
        this.selectL = !this.selectL
        this.selectD = !this.selectD
      },
      select_diff(n){
        this.diff = n
        this.selectD = !this.selectD
        console.log('画面遷移')
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
      </div>

      
      <div class="select_wrap">
        <div class="select_game" v-show="selectG">
          <div class="lang">
            <div class="my-2">
                <v-btn
                  x-small
                  color="warning"
                  dark
                >
                  日本語
                </v-btn>
              </div>
            <div class="my-2">
                <v-btn
                  x-small
                  color="warning"
                  dark
                >
                  English
                </v-btn>
              </div>
          </div>
          <div class="my-2" @click="select_game(0)">
              <v-btn
                color="success"
                dark
              >
                タイムアタック
              </v-btn>
            </div>
            <div class="my-2" @click="select_game(1)">
              <v-btn
                color="success"
                dark
              >
                ノーミスチャレンジ
              </v-btn>
            </div>
            <div class="my-2">
              <v-btn
                color="success"
                dark
              >
                ログイン
              </v-btn>
            </div>
        </div>

        <div class="select_game" v-show="selectL">
          <div class="lang">
          <div class="my-2">
              <v-btn
                x-small
                color="warning"
                dark
              >
                日本語
              </v-btn>
            </div>
          <div class="my-2">
              <v-btn
                x-small
                color="warning"
                dark
              >
                English
              </v-btn>
            </div>
          </div>
          <div class="my-2" @click="select_land(0)">
              <v-btn
                color="success"
                dark
              >
                全ての地域
              </v-btn>
            </div>
            <div class="my-2" @click="select_land(1)">
              <v-btn
                color="success"
                dark
              >
                アジア
              </v-btn>
            </div>
            <div class="my-2">
              <v-btn
                color="success"
                dark
              >
                ヨーロッパ
              </v-btn>
            </div>
        </div>

        <div class="select_game" v-show="selectD">
          <div class="lang">
          <div class="my-2">
              <v-btn
                x-small
                color="warning"
                dark
              >
                日本語
              </v-btn>
            </div>
          <div class="my-2">
              <v-btn
                x-small
                color="warning"
                dark
              >
                English
              </v-btn>
            </div>
          </div>
          <div class="my-2" @click="select_diff(0)">
              <v-btn
                color="success"
                dark
              >
                難しい
              </v-btn>
            </div>
            <div class="my-2" @click="select_diff(1)">
              <v-btn
                color="success"
                dark
              >
                標準
              </v-btn>
            </div>
            <div class="my-2">
              <v-btn
                color="success"
                dark
              >
                やさしい
              </v-btn>
            </div>
        </div>

      </div>
    </div>
  </div>
</template>


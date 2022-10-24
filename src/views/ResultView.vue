<script>
  import firebaseApp from "../plugins/firebaseConfig"
  import { getAuth, createUserWithEmailAndPassword,} from "firebase/auth"
// signInWithEmailAndPassword, signOut 
  import { getFirestore, collection, query, onSnapshot, orderBy,
            } from 'firebase/firestore'
// addDoc, Timestamp, serverTimestamp,
  const auth = getAuth(firebaseApp);
  const db = getFirestore(firebaseApp);

export default {
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
    unsubscribe:null,
    byouga:[],
    dialog: false,
    }),
  mounted(){
      const q = query(collection(db, "datas"), orderBy("test"));
      this.unsubscribe = onSnapshot(q, (snapshot) => {
        snapshot.docChanges().forEach((change) => {
          if (change.type === "added") {
              console.log("New city: ", change.doc.data());
              this.byouga.push(change.doc.data())
          }
          if (change.type === "modified") {
              console.log("Modified city: ", change.doc.data());
          }
          if (change.type === "removed") {
              console.log("Removed city: ", change.doc.data());
          }
        });
      });
  },
  beforeDestroy() {
    this.unsubscribe()
  },
  computed:{
    setArr(){
      return this.$store.state.setArr
    },
    lang(){
      return this.setArr[0]
    }
  },
  methods:{
    register(){
        createUserWithEmailAndPassword(auth, this.email, this.password)
          .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            console.log(user)
            // ...
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode, errorMessage)
            // ..
          });
          console.log('done')
      },
  }
}
</script>

<template>
  <div class="cont">
    <div class="main">
      <div class="upwrap">
        <p>新記録ーとか</p>
        <div>{{setArr[4] + '問'}}</div>
      </div><!-- upwrap -->
      <div class="under">
        <p>２位です！とか</p>
          <div class="my-2" @click="select_game(0)">
              <v-btn
                color="success"
                dark
              >
                {{lang==0 ? "ユーザー登録して記録を残そう！" : "Join and Record"}}
              </v-btn>
          </div>

          <div class="my-2" @click="select_game(0)">
              <v-btn
                color="success"
                dark
              >
                {{lang==0 ? "ログインして記録を残す" : "Login and Record"}}
              </v-btn>
          </div>

    <v-row justify="center">
    <v-dialog
      persistent
      v-model="dialog"
      max-width="600px"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          color="primary"
          dark
          v-bind="attrs"
          v-on="on"
        >
          {{lang==0 ? "ユーザー登録して記録を残そう！" : "Join and Record"}}
        </v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span class="text-h5">アカウント登録</span>
        </v-card-title>

        <v-card-text>
          <v-container>
            <v-row>
              <v-col
                cols="12"
                sm="6"
                md="4"
              >
                <v-text-field
                  label="Legal first name*"
                  required
                ></v-text-field>
              </v-col>
              
              <v-col cols="12">
                <v-text-field
                  label="Email*"
                  required
                  v-model="email"
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  label="Password*"
                  type="password"
                  required
                  v-model="password"
                ></v-text-field>
              </v-col>

              <v-col
                cols="12"
                sm="6"
              >
                <v-select
                  :items="['0-17', '18-29', '30-54', '54+', '無回答']"
                  label="Age*"
                  required
                ></v-select>
              </v-col>
              <v-col
                cols="12"
                sm="6"
              >
              
              </v-col>
            </v-row>
          </v-container>
          <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions>
          <v-btn
            color="blue darken-1"
            text
            @click="dialog = false"
          >
            すでにアカウントをお持ちの方
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn
            color="blue darken-1"
            text
            @click="dialog = false"
          >
            Close
          </v-btn>
          <v-btn
            color="blue darken-1"
            text
            @click="dialog = false ; register()"
          >
            Register
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>


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
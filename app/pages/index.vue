<template>
  <div>
    <!-- ログイン中に表示される画面 -->
    <div v-if="isAuthenticated">
      {{ user.email }}でログイン中です<br>
      <button v-on:click="logout">ログアウト</button><br>
      <a href="/member-page">メンバーページへ</a>
    </div>
    <!-- ログインしていない時に表示される画面 -->
    <div v-else>
      <div>
        メールアドレス<input id="mailAddress" type="mailAddress" placeholder="メールアドレス" v-model="email" required/>
      </div>
      <div>
        パスワード<input id="password" type="password" placeholder="パスワード" v-model="password" required/>
      </div>
      <button v-on:click="login">ログイン</button>
      <button v-on:click="googleLogin">googleでログイン</button>
      <button v-on:click="register">新規登録</button>
    </div>
  </div>
</template>

<script>
import firebase from '~/plugins/firebase'
import { mapActions, mapState, mapGetters } from 'vuex'
export default {
  data() {
    return {
      email: '',
      password: ''
    }
  },
  computed: {
    ...mapState(['user']),
    ...mapGetters(['isAuthenticated'])
  },
  mounted() {
    firebase.auth().onAuthStateChanged((user) => {
      this.setUser(user)
    })
  },
  methods : {
    ...mapActions(['setUser']),
    googleLogin: function(){
      firebase.auth().signInWithRedirect(new firebase.auth.GoogleAuthProvider());
    },
    login() {
      firebase.auth().signInWithEmailAndPassword(this.email, this.password)
      .then(user => {
        // ログインしたら飛ぶページを指定
        // this.$router.push("/member-page")
      }).catch((error) => {
        alert(error)
      });
    },
    logout() {
      firebase.auth().signOut()
      .then(() => {
        this.setUser(null)
      }).catch((error) => {
        alert(error)
      })
    },
    register() {
      var mailAddress = document.getElementById('mailAddress').value;
      var password = document.getElementById('password').value;
  
      firebase.auth().createUserWithEmailAndPassword(mailAddress, password)
      .catch(function(error) {
      alert('登録できません（' + error.message + '）');
      });
    }
  }
}
</script>
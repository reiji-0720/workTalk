<template>
  <div>
    <!-- ログイン中に表示される画面 -->
    <div v-if="isAuthenticated">
      {{ user.email }}でログイン中です
      <br />
      {{ user.displayName }}
      <img :src="user.photoURL" alt="画像" />
      <button v-on:click="logout">ログアウト</button>
      <br />
      <nuxt-link to="/member-page">ページ</nuxt-link>
    </div>
    <!-- ログインしていない時に表示される画面 -->
    <div v-else>
      メール
      <br />
      <input type="text" v-model="email" />
      <br />パスワード
      <br />
      <input type="password" v-model="password" />
      <br />
      <button v-on:click="login">ログイン</button>
    </div>
  </div>
</template>

<script>
import firebase from "~/plugins/firebase";
import { mapActions, mapState, mapGetters } from "vuex";
export default {
  data() {
    return {
      email: "",
      password: "",
      displayName: "",
      photoURL: ""
    };
  },
  computed: {
    ...mapState(["user"]),
    ...mapGetters(["isAuthenticated"])
  },
  mounted() {
    firebase.auth().onAuthStateChanged(user => {
      this.setUser(user);
    });
  },
  methods: {
    ...mapActions(["setUser"]),
    login() {
      firebase
        .auth()
        .signInWithEmailAndPassword(
          this.email,
          this.password,
          this.displayName,
          this.photoURL
        )
        .then(user => {
          // ログインしたら飛ぶページを指定
          // this.$router.push("/member-page")
        })
        .catch(error => {
          alert(error);
        });
    },
    logout() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.setUser(null);
        })
        .catch(error => {
          alert(error);
        });
    }
  }
};
</script>
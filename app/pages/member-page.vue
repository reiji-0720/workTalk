<template>
  <members-only>
    <div id="app">
      <h1>ログインしていないと見れないページ</h1>
      <a href="/account">アカウントページへ</a>
      <!--　Firebase から取得したリストを描画（トランジション付き）　-->
      <transition-group name="chat" tag="div" class="list content">
        <section v-for="{ key, name, image, message } in chat" :key="key" class="item">
          <div class="item-image">
            <img :src="image" width="40" height="40" />
          </div>
          <div class="item-detail">
            <div class="item-name">{{ name }}</div>
            <div class="item-message">
              <p tag="div"> {{message}} </p>
            </div>
          </div>
        </section>
      </transition-group>

      <!-- 入力フォーム -->
      <form action @submit.prevent="doSend" class="form">
        <textarea v-model="input" :disabled="!user.uid" @keydown.enter.exact.prevent="doSend"></textarea>
        <button type="submit" :disabled="!user.uid" class="send-button">Send</button>
      </form>
    </div>
  </members-only>
</template>

<script>
import MembersOnly from "~/components/members-only.vue";
import firebase from '~/plugins/firebase'

export default {
  data() {
    return {
      user: {}, // ユーザー情報
      chat: [], // 取得したメッセージを入れる配列
      input: "" // 入力したメッセージ
    };
  },
  created() {
    firebase.auth().onAuthStateChanged(user => {
      this.user = user ? user : {};
      const ref_message = firebase.database().ref("message");
      if (user) {
        this.chat = [];
        // message に変更があったときのハンドラを登録
        ref_message.limitToLast(10).on("child_added", this.childAdded);
      } else {
        // message に変更があったときのハンドラを解除
        ref_message.limitToLast(10).off("child_added", this.childAdded);
      }
    });
  },
  components: {
    MembersOnly
  },
  methods: {
    // ログイン処理
    doLogin() {
      const provider = new firebase.auth.TwitterAuthProvider();
      firebase.auth().signInWithPopup(provider);
    },
    // ログアウト処理
    doLogout() {
      firebase.auth().signOut();
    },
    // スクロール位置を一番下に移動
    scrollBottom() {
      this.$nextTick(() => {
        window.scrollTo(0, document.body.clientHeight);
      });
    },
    // 受け取ったメッセージをchatに追加
    // データベースに新しい要素が追加されると随時呼び出される
    childAdded(snap) {
      const message = snap.val();
      this.chat.push({
        key: snap.key,
        name: message.name,
        image: message.image,
        message: message.message
      });
      this.scrollBottom();
    },
    doSend() {
      if (this.user.uid && this.input.length) {
        // firebase にメッセージを追加
        firebase
          .database()
          .ref("message")
          .push(
            {
              message: this.input,
              name: this.user.displayName,
              image: this.user.photoURL
            },
            () => {
              this.input = ""; // フォームを空にする
            }
          );
      }
    }
  }
};
</script>
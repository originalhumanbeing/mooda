<template>
  <div id="member">
    <login></login>
    <signup></signup>
  </div>
</template>

<script>
import Vue from 'vue'
import Login from './Login.vue'
import Signup from './Signup.vue'

let eventBus = new Vue();

export default {
  name: 'member',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      eventBus : eventBus
    }
  },
  components: {
    Login,
    Signup
  }
}
</script>

<style lang="sass">
  // 앞장이 로그인
  // 뒷장이 회원가입
  // 로그인에서 회원가입을 누르면 회전
  // 회원가입에서도 로그인 누르면 회전

  #member
    display: flex
    justify-content: center

</style>

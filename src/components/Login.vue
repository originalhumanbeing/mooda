<template>
  <div class="login-card">
    <h2>로그인</h2>
    <form method="get">
      <fieldset>
        <legend>로그인</legend>
        <label>
          <input type="email" class="id" placeholder="이메일" required v-model="logEmail">
        </label>
        <label>
          <input type="password" class="pw" placeholder="비밀번호" required v-model="logPw">
        </label>
      </fieldset>
      <button type="submit" class="login-btn" @click="logIn($event)">로그인</button>
      <button type="submit" class="signup-btn" @click.prevent="$emit('changeMode')">회원가입</button>
    </form>
    <a href="#/forgot" class="id-finder">계정이 기억나지 않아요ㅠㅠ</a>
    <span class="login-options">또는 아래 계정으로 로그인</span>
    <a href="#">facebook</a>
    <a href="#" @click.prevent="googleLogin">google</a>
    <a type="button" class="modal-btn" @click.prevent="$emit('closeModalView')">
      <i class="fa fa-times fa-2x" aria-hidden="true"></i>
    </a>
  </div>
</template>

<script>
  import Vue from 'vue';
  import firebaseService from '../service/firebaseService';

  export default {
    name: 'login-card',
    data () {
      return {
        logEmail: '',
        logPw: '',
      }
    },
    methods: {
      googleLogin() {
        firebaseService.googleLogin().then(user => {
          Vue.thisUser = user;
          this.$emit('closeModalView');
        });
      }
    }
  }
</script>

<style lang="sass" scoped rel="stylesheet/sass">
    *, *::before, *::after
      box-sizing: border-box

    html
      font-size: 16px

    .login-card
      background: #fff
      position: absolute
      z-index: 100
      border: 1px solid #e6e6e6
      border-radius: 5px
      padding: 25px
      text-align: center
      & h2
        margin: 15px 0
        font-size: 35px
        font-weight: 400

    form
      position: relative
      & legend
        position: relative
        left: -9999em
      & fieldset
        outline: 0
        border: 0
      & .id,
      & .pw,
      & .login-btn,
      & .signup-btn
        display: block
      & .id,
      & .pw
        border: 0
        border-bottom: 3px solid #e6e6e6
        outline: 0
        padding: 15px
        margin: 0 30px
        width: 260px
        height: 50px
        line-height: 50px
        font-size: 16px
        font-weight: 300
        transition: all 0.3s ease-in-out
        &:hover
          border-bottom: 3px solid rgb(110, 124, 252)

    form
      & .login-btn,
      & .signup-btn
        position: relative
        outline: 0
        width: 260px
        padding: 10px 30px
        margin: 15px auto
        border-radius: 30px
        cursor: pointer
        font-size: 16px
        font-weight: 400
        transition: all 0.3s ease-in-out
        &:hover
          width: 300px
      & .login-btn
        border: 1px solid #a322ef
        background: #fff
        color: #a322ef
      & .signup-btn
        background: linear-gradient(135deg, #3549fc 0, #a322ef 50%, #fc3fd8 100%)
        color: #fff
        border: 1px solid transparent

    .id-finder
      display: block
      padding: 10px
      font-size: 14px
      color: rgb(121, 121, 121)
      text-decoration: underline
      &:hover
        color: #181818

    .login-options
      font-size: 13px
      display: block
      position: relative
      margin: 8px auto
      &::before
        content: ''
        width: 60px
        height: 1px
        position: absolute
        top: 50%
        left: 10%
        background: rgb(166, 166, 166)
      &::after
        content: ''
        width: 60px
        height: 1px
        position: absolute
        top: 50%
        right: 10%
        background: rgb(166, 166, 166)

    .modal-btn
      position: absolute
      top: 0
      right: -30px
      z-index: 300
      & .fa
        color: #fff

</style>

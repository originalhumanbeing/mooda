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
    <a href="#">google</a>
    <button type="button" class="modal-btn" @click.prevent="$emit('closeModal')">X</button>
  </div>
</template>

<script>
import axios from 'axios';

// facebook 객체 생성
window.fbAsyncInit = function() {
  FB.init({
    appId      : '1417815134942670',
    xfbml      : true,
    version    : 'v2.8'
  });
  FB.AppEvents.logPageView();
};

export default {
  name: 'login-card',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      logEmail: '',
      logPw: '',
      fbSrc: '//connect.facebook.net/en_US/sdk.js'
    }
  },
  methods: {
    logIn: function(e){
      if (e) { e.preventDefault(); }
      console.log(this.email);
      axios.get('http://localhost:3000/member', {
        params : {
          email: this.logEmail,
          password: this.logPw
        }
      })
      .then(response => {
          this.logEmail = '';
          this.logPw = '';
          console.log(response)
          window.alert(response.data[0].nickname+'님, 반갑습니다!');
          // 왜 undefined님으로 뜨지?
          location.hash = '/forgot'
        }
      )
      .catch(error => {
        this.logEmail = '';
        this.logPw = '';
        window.alert('회원 정보가 존재하지 않습니다');
      })
    }
  }
}
</script>

<style lang="sass" scoped>
  html
    font-size: 16px
    box-sizing: content-box

  // login card
  .login-card
    background: #fff
    position: absolute
    width: 400px
    height: 500px
    z-index: 100
    border: 1px solid #e6e6e6
    border-radius: 5px
    padding: 30px
    text-align: center
    & h2
      margin: 20px 0 0 0

  // form 입력 부분
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
      border-bottom: 5px solid #e6e6e6
      padding: 10px
      margin-left: 45px
      width: 260px
      height: 30px
      line-height: 30px
      font-size: 16px
      font-weight: 300
    & .pw
      margin-bottom: 30px
    // & .auto-login
    //   position: absolute
    //   top: 170px
    //   left: 135px

  // 버튼
  form
    & .login-btn,
    & .signup-btn
      position: relative
      outline: 0
      padding: 10px 110px
      margin: 20px 30px 10px 65px
      border: 1px solid rgb(255, 149, 135)
      border-radius: 30px
      background: transparent
      cursor: pointer
      font-size: 16px
      transition: all 0.5s ease-in-out
      &:hover
        color: #fff
      &::after
        content: ''
        position: absolute
        top: 0
        bottom: 0
        left: 0
        right: 100%
        border-radius: 30px
        z-index: -1
        background: rgb(255, 149, 135)
        transition: all 0.5s ease-in-out
      &:hover::after
        right: 0
    & .login-btn
      padding: 10px 115px

  // 나머지
  .id-finder
    display: block
    margin: 10px
    padding: 10px
    font-size: 13px
    color: rgb(121, 121, 121)
    &:hover
      color: #181818

  .login-options
    font-size: 13px
    display: block
    position: relative
    margin-bottom: 10px
    &::before
      content: ''
      width: 80px
      height: 1px
      position: absolute
      top: 50%
      left: 10%
      background: rgb(166, 166, 166)
    &::after
      content: ''
      width: 80px
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
    border: 0
    background: transparent
    color: #fff
    font-weight: bold
    font-size: 1.2em
</style>

<template>
  <div class="signup-card">
    <h2>회원가입</h2>
    <form method="post">
      <fieldset>
        <legend>회원가입</legend>
        <label>
          <input type="email" class="id" placeholder="이메일" required v-model="signEmail">
        </label>
        <label>
          <input type="text" class="user-name" placeholder="닉네임" required v-model="signName">
        </label>
        <label>
          <input type="password" class="pw" placeholder="비밀번호" required v-model="signPw">
        </label>
        <label>
          <input type="password" class="pw-validation" placeholder="비밀번호 한 번 더" required v-model="signPwValidation">
        </label>
      </fieldset>
      <button type="submit" class="signup-btn" @click="signUp($event)">회원가입</button>
    </form>
    <span class="signup-options">또는 아래 계정으로 회원가입</span>
    <a href="#">facebook</a>
    <a href="#">google</a>
    <a href="#" class="member-login" @click.prevent="$emit('changeMode')">이미 계정이 있다면 로그인</a>
    <button type="button" class="modal-btn" @click.prevent="$emit('closeModal')">X</button>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'signup-card',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      signEmail: '',
      signName: '',
      signPw: '',
      signPwValidation: ''
    }
  },
  methods: {
    signUp: function(e){
      // 기본 이벤트 막으면 required나 input 타입 설정해둔 것, 타입 체크 모두 되지 않음
      // 유효성 검사
      if (!this.signEmail || !this.signName || !this.signPw || !this.signPwValidation) { console.error('양식에 맞게 내용을 작성해 주세요');}
      // 안 맞으면 return
      // 그다음에 prevent 후 처리 (prevent 안에 유효성 체크도 포함되어 있음)

      if (e) { e.preventDefault(); }
      // domain/path?query(={})
      axios.post('http://localhost:3000/member', {
        email: this.signEmail,
        password: this.signPw,
        nickname: this.signName,
        validation: this.signPwValidation
      })
      .then(response => {
        console.log(response);
        if (response.status === 201 && response.statusText === 'Created') {
          console.log('then 실행');
          this.signEmail = '';
          this.signPw = '';
          this.signName = '';
          this.signPwValidation = '';
          window.alert(response.data.nickname + '님, 환영합니다!');
          location.hash = '/forgot'
        }
      })
      .catch(error => {
        this.signEmail = '';
        this.signPw = '';
        this.signName = '';
        this.signPwValidation = '';
        window.alert('회원 가입에 실패했습니다ㅠㅠ');
      });
    }
  }
}
</script>

<style lang="sass" scoped>
  html
    font-size: 16px
    display: flex
    box-sizing: content-box

  // signup card
  .signup-card
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
    & .user-name,
    & .signup-btn
      display: block
    & .id,
    & .pw,
    & .pw-validation,
    & .user-name
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
      margin-bottom: 0
      // 위에 margin-bottom은 로그인 만들 때 아래에 bottom:30준 게 계속 기억되고 지워지지 않아서 어쩔 수 없이 설정함, 왜 그런지 아직 모름
    & .pw-validation
      margin-bottom: 30px
      margin-left: 0
      // 얘는 왜 혼자 정렬이 다르지? ㅠㅠ

  // 버튼
  form
    & .signup-btn
      position: relative
      outline: 0
      padding: 10px 110px
      margin: 0 30px 30px 65px
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

  .signup-options
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

  // 나머지
  .member-login
    display: block
    margin: 10px
    padding: 10px
    font-size: 13px
    color: rgb(121, 121, 121)
    &:hover
      color: #181818

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

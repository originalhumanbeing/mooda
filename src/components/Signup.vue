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
    <a type="button" class="modal-btn" @click.prevent="$emit('closeModalView')"><i class="fa fa-times fa-2x" aria-hidden="true"></i></a>
  </div>
</template>

<script>
import axios from 'axios';
import firebaseService from '../service/firebaseService';

export default {
  name: 'signup-card',
  data () {
    return {
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

<style lang="sass" scoped rel="stylesheet/sass">
  *, *::before, *::after
    box-sizing: border-box

  html
    font-size: 16px

  .signup-card
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
    & .user-name,
    & .signup-btn
      display: block
    & .id,
    & .pw,
    & .pw-validation,
    & .user-name
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
    & .signup-btn
      position: relative
      outline: 0
      width: 260px
      padding: 10px 30px
      margin: 15px auto
      background: linear-gradient(135deg,#3549fc 0,#a322ef 50%,#fc3fd8 100%)
      color: #fff
      border: 1px solid transparent
      border-radius: 30px
      cursor: pointer
      font-size: 16px
      transition: all 0.3s ease-in-out
      &:hover
        width: 300px

  .signup-options
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

  .member-login
    display: block
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
    & .fa
      color: #fff

</style>

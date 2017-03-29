<template>
  <div class="login-card" v-show="this.isDisplayed">
    <h2>로그인</h2>
    <form method="get">
      <fieldset>
        <legend>로그인</legend>
        <label>
          <input type="email" class="id" placeholder="이메일" required>
        </label>
        <label>
          <input type="password" class="pw" placeholder="비밀번호" required>
        </label>
        <label>
          <input type="checkbox" class="auto-login"> 자동 로그인
        </label>
      </fieldset>
      <button type="submit" class="login-btn" @click="logIn($event)">로그인</button>
      <!--로그인이 되면 입력창으로 랜딩-->
      <button type="submit" class="signup-btn"  @click="goSignUp($event)">회원가입</button>
    </form>
    <a href="#/forgot" class="id-finder">계정이 기억나지 않아요ㅠㅠ</a>
    <span class="login-options">또는 아래 계정으로 로그인</span>
    <a href="#">facebook</a>
    <a href="#">google</a>
  </div>
</template>

<script>
// 모달을 띄워야 함
// 회원가입 선택할 때 카드를 뒤집어야 함
// 내용 통신해야함
export default {
  name: 'login-card',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      isDisplayed: true
    }
  },
  methods: {
    logIn: function(e){
      if (e) { e.preventDefault(); }
      this.$http.get('http://www.naver.com').then((response) => {
        console.log(response.data)
      })
      console.log('로그인 버튼을 눌렀습니다');
    },
    goSignUp: function(e){
      if (e) { e.preventDefault() }
      this.$parent.eventBus.$emit('signUp');
      this.isDisplayed = false;
    }
  }
}
</script>

<style lang="sass">
  html
    font-size: 16px
  .member
    display: flex
    justify-content: center
    align-items: center
    // background: #181818
    // opacity: 0.5
    position: relative

  // login card
  .login-card
    position: absolute
    width: 400px
    height: 500px
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
    & .auto-login
      position: absolute
      top: 170px
      left: 135px

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

  .flip
    transform: rotateY(180deg) translateX(100%)
</style>

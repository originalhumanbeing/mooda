<template>
  <div id="member">
    <button type="button" name="button" v-if="hideModalBtn" @click="showModal()">Show</button>
    <a href="#/input">input</a>
    <a href="#/today">today</a>
    <a href="#/test">test</a>
    <modal v-if="popUpModal">
      <transition enter-active-class="animated flipInY" leave-active-class="animated flipOutY" duration="450" mode="out-in" appear>
        <component @changeMode="changeView" @closeModalView="closeModal" :is="component_selected"></component>
      </transition>
    </modal>
  </div>
</template>

<script>
import Vue from 'vue'
import Login from './Login.vue'
import Signup from './Signup.vue'
import Modal from './Modal.vue'

export default {
  name: 'member',
  data () {
    return {
      popUpModal: false,
      showLogin: false,
      hideModalBtn: true,
      component_selected: 'login'
    }
  },
  // 자식이 부모 걸 받아올 때 prop 사용
  // 동적 prop: 부모가 data로 가지고 있는 부분을
  // 자식이 prop으로 받을 수 있음
  // 자식이 prop으로 가지고 있는 것을 bind해놔야 부모 것을 동적으로 받을 수 있음
  components: {
    Modal,
    Login,
    Signup
  },
  methods: {
    showModal: function(){
      console.log('showModal 실행됌');
      this.popUpModal = true;
      this.showLogin = true;
      this.hideModalBtn = false;
    },
    closeModal: function(){
      console.log('closeModal 실행됌');
      this.popUpModal = false;
      this.hideModalBtn = true;
    },
    changeView: function(){
      console.log('changeView 실행됌');
      this.component_selected = this.component_selected === 'login' ? 'signup' : 'login';
    }
  }
}
</script>

<style lang="sass" scoped rel="stylesheet/sass">
  *, *::before, *::after
    box-sizing: border-box

  #member
    display: flex
    justify-content: center
    align-items: center

  #member *
    display: block
    margin: 20px

  .modal
    z-index: 10

  .login-card,
  .signup-card
    z-index: 100
</style>

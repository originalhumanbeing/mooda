<template>
  <div id="member">
    <div class="flex-wrapper">
      <transition enter-active-class="animated flipInY" leave-active-class="animated flipOutY" duration="450"
                  mode="out-in" appear>
        <component @changeDailyCard="changeDailyView"
                   :comment="todayComment"
                   :emoji="todayEmoji"
                   :is-update="isUpdate"
                   :is="component_selected">
        </component>
      </transition>
      <week :weeklyItems="this.weeklyItems"></week>
    </div>
    <modal v-if="popUpModal">
      <transition enter-active-class="animated flipInY" leave-active-class="animated flipOutY" duration="450"
                  mode="out-in" appear>
        <component @changeMode="changeView"
                   @closeModalView="closeModal"
                   :is="modal_component_selected">
        </component>
      </transition>
    </modal>
  </div>
</template>

<script>
  import Vue from 'vue'
  import Login from './Login.vue'
  import Signup from './Signup.vue'
  import Modal from './Modal.vue'
  import InputCard from './InputCard.vue'
  import Today from './Today.vue'
  import firebaseService from '../service/firebaseService'
  import Week from './Week.vue'
  import moment from 'moment/moment'

  export default {
    name: 'main',
    data () {
      return {
        weeklyItems : [],
        popUpModal: false,
        showLogin: false,
        completeToday: false,
        modal_component_selected: 'login',
        component_selected: 'input-card',
        showWeek: false,
        todayComment: '',
        todayEmoji: '',
        isUpdate : false
      }
    },
    // 자식이 부모 걸 받아올 때 prop 사용
    // 동적 prop: 부모가 data로 가지고 있는 부분을
    // 자식이 prop으로 받을 수 있음
    // 자식이 prop으로 가지고 있는 것을 bind해놔야 부모 것을 동적으로 받을 수 있음
    components: {
      Modal,
      Login,
      Signup,
      InputCard,
      Today,
      Week
    },
    methods: {
      fetchDailyAndWeeklyEmojis() {
        if(Vue.isLogined()) {
          firebaseService.fetchEmoji({uid: Vue.thisUser.uid, date: new Date()}).then(r => {
            if (r)
              this.component_selected = 'today';
          });
          firebaseService.fetchEmojis({uid: Vue.thisUser.uid, baseDate: moment().add(-1, 'days').toDate(), range: 7})
            .then(r => {
              this.weeklyItems = r
            });
        }
      },
      showModal(){
        console.log('showModal 실행됌');
        this.popUpModal = true;
        this.showLogin = true;
        this.hideModalBtn = false;
      },
      closeModal(){
        console.log('closeModal 실행됌');
        this.popUpModal = false;
        this.hideModalBtn = true;

        this.fetchDailyAndWeeklyEmojis();
      },
      changeView(){
        console.log('changeView 실행됌');
        this.modal_component_selected = this.modal_component_selected === 'login' ? 'signup' : 'login';
      },
      changeDailyView(){
        console.log('changeDailyView 실행됌');
        this.component_selected = this.component_selected === 'input-card' ? 'today' : 'input-card';
        firebaseService.fetchEmoji({uid: Vue.thisUser.uid, date: new Date()}).then(r => {
          if (r) {
            this.todayComment = r.comment;
            this.todayEmoji = r.emoji;
            this.isUpdate = true;
          }
        });
      }
    },
    created() {
      if (!Vue.isLogined()) {
        this.modal_component_selected = 'login';
        this.showModal();
      }
      this.fetchDailyAndWeeklyEmojis();
    }
  }
</script>

<style lang="sass" scoped rel="stylesheet/sass">
  *, *::before, *::after
    box-sizing: border-box

  #member *
    margin: 20px

  .flex-wrapper
    width: 1000px
    display: flex
    align-items: flex-start
    justify-content: center

  .modal
    z-index: 10

  .login-card,
  .signup-card
    z-index: 100
</style>

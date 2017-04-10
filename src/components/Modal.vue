<template>
  <div id="modal" v-if="popUpModal">
    <div class="card-wrapper">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import Login from './Login.vue'
import Signup from './Signup.vue'

export default {
  name: 'modal',
  data () {
    return {
      popUpModal: true
    }
  }
}
</script>

<style lang="sass" scoped rel="stylesheet/sass">
  *, *::before, *::after
    box-sizing: border-box

  #modal
    background: rgba(122, 122, 122, 0.6)
    position: fixed
    top: 0
    bottom: 0
    left: 0
    right: 0
    margin: 0
    z-index: 10
    display: flex
    justify-content: center
    align-content: center

  .card-wrapper
    position: relative
    display: flex
    justify-content: center
    align-items: center
</style>

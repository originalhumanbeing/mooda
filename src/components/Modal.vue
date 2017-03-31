<template>
  <div id="modal" v-if="popUpModal">
    <div class="card-wrapper">
      <slot></slot>
      <button type="button" class="modal-btn" @click.prevent="$emit('closeModal')">X</button>
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

<style lang="sass">
  #modal
    background: rgba(122, 122, 122, 0.6)
    position: fixed
    top: 0
    bottom: 0
    left: 0
    right: 0
    z-index: -5
    display: flex
    justify-content: center
    align-content: center

  .card-wrapper
    position: relative
    display: flex
    justify-content: center
    align-items: center

  .modal-btn
    position: absolute
    top: 25px
    right: -260px
    z-index: 300
    border: 0
    // border-radius: 100%
    background: transparent
    color: #fff
    font-weight: bold
    font-size: 1.2em
</style>

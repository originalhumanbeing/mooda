<template>
  <div class="input-card">
    <md-card>
      <md-card-area>
        <md-card-header>
          <div class="md-title">Day Update</div>
          <div class="md-subhead">Dayback</div>
        </md-card-header>

        <form novalidate @submit.stop.prevent="submit">
          <md-input-container class="input-area">
            <md-input-container class="input-area">
              <label>How are you doing?</label>
              <md-textarea></md-textarea>
            </md-input-container>
            <div class="emoji-group">
              <!--emoji는 a 각각 sprite로 바꾸기!-->
              <a href="#" class="happy"><img src="../../img/emoji.png" alt=""></a>
              <!-- <a href="#" class="sulky"><img src="../../img/emoji.png" alt=""></a>
              <a href="#" class="naughty"><img src="../../img/emoji.png" alt=""></a>
              <a href="#" class="hungry"><img src="../../img/emoji.png" alt=""></a> -->
            </div>
          </md-input-container>
        </form>

        <md-card-actions>
          <md-button>Post</md-button>
        </md-card-actions>
      </md-card-area>
    </md-card>
  </div>
</template>

<script>
export default {
  name: 'input-card',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>

<style lang="sass" scoped>
  .input-card
    width: 50%
    margin: 60px auto

  .input-area
    display: block
    width: 90%
    margin: 0 auto

  .emoji-group
    display: block
    // width: 50px
    // height: 50px
    // overflow: hidden
    // & a
    //   display: inline-block
    //
  fieldset

</style>

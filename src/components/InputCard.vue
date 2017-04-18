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
            <md-input-container>
              <label>How are you doing?</label>
              <md-textarea maxlength="100" v-model="user_input.comment"></md-textarea>
            </md-input-container>
            <div class="emoji-group">
              <a href="#" class="happy" @click.prevent="selectEmoji(4)"
                 :class="{'active' : user_input.emoji === 4}"><img src="../assets/happy.png" alt=""></a>
              <a href="#" class="sulky" @click.prevent="selectEmoji(3)"
                 :class="{'active' : user_input.emoji === 3}"><img src="../assets/sulky.png" alt=""></a>
              <a href="#" class="naughty" @click.prevent="selectEmoji(2)"
                 :class="{'active' : user_input.emoji === 2}"><img src="../assets/naughty.png" alt=""></a>
              <a href="#" class="hungry" @click.prevent="selectEmoji(1)"
                 :class="{'active' : user_input.emoji === 1}"><img src="../assets/hungry.png" alt=""></a>
            </div>
          </md-input-container>
        </form>

        <md-card-actions>
          <md-button @click.native="createEmoji">Post</md-button>
        </md-card-actions>
      </md-card-area>
    </md-card>
  </div>
</template>

<script>

  import Vue from 'vue';
  import firebaseService from '../service/firebaseService';


  export default {
    name: 'input-card',
    props:['comment', 'emoji', 'isUpdate'],
    data () {
      return {
        user_input: {
          date: new Date(),
          comment: this.comment,
          emoji: this.emoji
        },
      }
    },
    methods: {
      selectEmoji(emoji) {
        this.user_input.emoji = emoji;
        console.log(emoji);
      },
      createEmoji() {
        let create = firebaseService.createEmoji;
        if (this.isUpdate) {
            create = firebaseService.updateEmoji;
        }

        create({
          uid: Vue.thisUser.uid,
          emoji: this.user_input.emoji,
          comment: this.user_input.comment,
          date: this.user_input.date
        })
          .then(() => {
            this.$emit('changeDailyCard')
          })
          .catch(e => {
            window.alert('등록에 실패됐습니다')
          })
      }
    }
  }
</script>

<style lang="sass" scoped rel="stylesheet/sass">
  .input-card
    margin: 60px auto
    width: 800px
    min-height: 400px
    // 내용 쓰는 것 글자수 제한해야 하나? 안 그러면 view가 어떻게 되지

  .input-area
    display: block
    margin: 0 auto
    padding: 20px

  .emoji-group
    display: block

  .active
    opacity: 0.5

  img
    width: 150px
    height: 150px

</style>

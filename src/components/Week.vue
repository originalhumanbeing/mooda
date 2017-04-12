<template>
  <div class="week">
    <div class="weekly-title">Weekly</div>
    <ul class="weeklyItems">
      <li :class="item.matchingColor" v-for="item of items">
        <md-card>
          <span>{{item.date}}</span>
          <md-card-media>
            <img :src="item.emojiSrc" alt="">
          </md-card-media>
          <md-card-content>{{item.comment}}</md-card-content>
        </md-card>
      </li>
    </ul>
  </div>

</template>

<script>
  import moment from 'moment';
  import Vue from 'vue';
  import firebaseService from '../service/firebaseService';

  export default {
    name: 'Week',
    data () {
      return {
        items: []
      }
    },
    methods: {
      getEmojiImage(emoji) {
        if (emoji == 4) {
          return require('../assets/happy.png');
        }
        else if (emoji == 3) {
          return require('../assets/sulky.png');
        }
        else if (emoji == 2) {
          return require('../assets/naughty.png');
        }
        else if (emoji == 1) {
          return require('../assets/hungry.png');
        }
        else
          return '';
      },
      getMatchingColor(emoji) {
        if (emoji == 4) {
          return 'happy';
        }
        else if (emoji == 3) {
          return 'sulky';
        }
        else if (emoji == 2) {
          return 'naughty';
        }
        else if (emoji == 1) {
          return 'hungry';
        }
        else
          return '';
      }
    },
    created(){
      if (Vue.isLogined())
        firebaseService.fetchEmojis({uid: Vue.thisUser.uid, baseDate: moment().add(-1, 'days').toDate(), range: 7})
          .then(r => {
            this.items = Object.keys(r).map(key => {
              let item = {};
              item.date = key;
              Object.assign(item, r[key]);
              item.emojiSrc = this.getEmojiImage(item.emoji);
              item.matchingColor =  this.getMatchingColor(item.emoji);
              return item
            });
          })
    }
  };
</script>

<style lang="sass" scoped rel="stylesheet/sass">
  *, *::before, *::after
    box-sizing: border-box

  .weekly-title
    background: linear-gradient(135deg, #3549fc 0, #a322ef 50%, #fc3fd8 100%)
    width: 150px
    padding: 15px

  ul
    list-style: none
    padding-left: 0
    border-left: 3px solid  #3549fc

  li
    padding-left: 30px

  li::before
    content: ''
    border: 15px solid #a322ef
    border-radius: 50%
    position: relative
    left: -140px
    top: 150px
    z-index: 100

  .happy::before
    border-color: yellow

  .sulky::before
    border-color: green

  .naughty::before
    border-color: blue

  .hungry::before
    border-color: red
</style>

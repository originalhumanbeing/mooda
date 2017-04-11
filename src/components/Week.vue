<template>
  <div class="Weekly">
    <div class="weekly-title">Weekly</div>
    <md-card class="weeklyCard">
      <ul class="weeklyItems">
        <li v-for="item of items">
          <span>{{item.date}}</span>
          <md-card-media>
            <div :class="weeklyEmotion">
              <img class="weeklyEmoji" :src="item.emojiSrc" alt="">
            </div>
          </md-card-media>
          <md-card-content>
            {{item.comment}}
          </md-card-content>
        </li>
      </ul>
    </md-card>
  </div>
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
        weeklyEmotion: '',
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
              return item
            });
          })
    }
  };
</script>

<style lang="sass" scoped rel="stylesheet/sass">
  *, *::before, *::after
    box-sizing: border-box
</style>

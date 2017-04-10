<template>
  <div class="today">
    <div class="daily">
      <div class="daily-title">My Stuffs</div>
      <md-card class="dailyCard">
        <span>{{dailyItem.date}}</span>
        <md-card-media>
          <div :class="dailyEmotion">
            <img class="dailyEmoji" :src="this.emotion_src" alt="">
          </div>
        </md-card-media>
        <md-card-content>
          {{dailyItem.comment}}
        </md-card-content>
        <md-button @click.native="changeDaily">Change</md-button>
        <md-button @click.native="deleteDaily">Delete</md-button>
      </md-card>
    </div>
  </div>
</template>

<script>
  import moment from 'moment';
  import Vue from 'vue';
  import firebaseService from '../service/firebaseService';

  const DATE_FORMAT = 'YYYY년 M월 D일';

  export default {
    name: 'today',
    data () {
      return {
        dailyEmotion: '',
        emotion_src: '',
        dailyItem: {
          emoji: '이날은 기록한 기분이 없습니다',
          comment: '이날은 기록한 코멘트가 없습니다.'
        },
        datalist: []
      }
    },
    methods: {
      renderEmoji() {
        let emoji = this.dailyItem.emoji;
        if (emoji == 4) {
          this.dailyEmotion = 'happy';
          this.emotion_src = require('../assets/happy.png');
        }
        else if (emoji == 3) {
          this.dailyEmotion = 'sulky';
          this.emotion_src = require('../assets/sulky.png');
        }
        else if (emoji == 2) {
          this.dailyEmotion = 'naughty';
          this.emotion_src = require('../assets/naughty.png');
        }
        else if (emoji == 1) {
          this.dailyEmotion = 'hungry';
          this.emotion_src = require('../assets/hungry.png');
        }
        else
          return '이날 기분은 없습니다.'
      },

      changeDaily(){
        this.$emit('changeDailyCard')
      },

      deleteDaily(){
        firebaseService.deleteEmoji({uid: Vue.thisUser.uid, date: new Date()})
          .then(()=> this.$emit('changeDailyCard'))
      }
    },
    created: function () {
      firebaseService.fetchEmoji({uid: Vue.thisUser.uid, date: new Date()})
        .then(r=>{
            this.dailyItem = r;
            this.dailyItem.date = moment().format(DATE_FORMAT);
            this.renderEmoji();
        })
    }
  };
</script>

<style lang="sass" scoped rel="stylesheet/sass">
  body
    background: #fff

    .today
      background: #e6e6e6
      border-top-left-radius: 10px
      border-top-right-radius: 10px

    .daily
      padding: 20px
      margin: 0 auto
      position: relative

    .daily-title
      padding: 10px
      background: orange
      position: absolute
      top: 0
      left: 30px
      z-index: 10

    .dailyCard
      padding: 30px
      border-radius: 5px

    .dailyEmoji
      width: 150px

    .md-card .md-card-media img
      width: 150px

</style>

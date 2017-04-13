<template>
  <div class="today">
    <div class="daily">
      <div class="daily-title">Today</div>
      <md-card class="dailyCard">
        <span class="dailyDate">{{dailyItem.date}}</span>
        <div class="dailyContent">
          <md-card-media>
            <div :class="dailyEmotion">
              <img class="dailyEmoji" :src="this.emotion_src" alt="">
            </div>
          </md-card-media>
          <md-card-content>
            {{dailyItem.comment}}
          </md-card-content>
        </div>
        <div class="btn-group">
          <md-button @click.native="changeDaily">Change</md-button>
          <md-button @click.native="deleteDaily">Delete</md-button>
        </div>
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
  .daily
    margin: 60px auto
    width: 800px
    min-height: 400px
    position: relative

  .daily-title
    background: powderblue
    padding: 10px 30px
    position: absolute
    top: -10px
    left: 30px
    z-index: 10
    font-weight: 600
    font-size: 1.2em

  .dailyCard
    padding: 30px
    border-radius: 5px

  .dailyEmoji
    width: 150px

  .dailyDate
    font-weight: 500
    font-size: 1.2em
    text-align: left
    margin-top: 8px

  .dailyContent
    display: flex
    justify-content: center
    align-items: center
    flex-direction: row

  .md-card .md-card-media img
    width: 150px
    height: 150px

  .md-card-content
    width: 480px
    margin-left: 5%
    margin-bottom: 15px
    background: lighten(lightgray, 13%)
    border-radius: 5px

  .btn-group
    display: flex
    align-content: center
    justify-content: flex-end
    & md-button md-default-theme
      background: lightgray

</style>

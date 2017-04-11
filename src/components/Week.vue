<template>
  <div class="Weekly">
    <div class="weekly-title">Weekly</div>
    <md-card class="weeklyCard">
      <ul class="weeklyItems">
        <li v-for="item of items">
          <span>{{item.date}}</span>
          <md-card-media>
            <div :class="weeklyEmotion">
              <img class="weeklyEmoji" :src="this.emotion_src" alt="">
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
        emotion_src: '',
        items: {
          date: '',
          emoji: '이날은 기록한 기분이 없습니다',
          comment: '이날은 기록한 코멘트가 없습니다.'
        },
        datalist: []
      }
    },
    methods: {}
  };
</script>

<style lang="sass" scoped rel="stylesheet/sass">
</style>

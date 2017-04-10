<template>
  <div class="today">
    <header class="today-header">
      <div class="date-group">
        {{this.dailyItem.date}}
      </div>
      <div class="weather-group">
        <div>날씨 API 공간</div>
      </div>
    </header>
    <div class="button-group">
      <md-button class="md-fab">
        <md-icon>edit</md-icon>
      </md-button>
    </div>
    <div class="main-content">
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

      <!--주간-->
      <!--<ul class="weeklyCards">-->
        <!--<li class="today">-->
          <!--<div class="date"></div>-->
          <!--<div class="circle"></div>-->
          <!--<div class="content">-->
            <!--<div class="weeklyItem" v-for="item in weeklyItems"></div>-->
              <!--<md-card>-->
                <!--<span>{{dailyItem.date}}</span>-->
                <!--<md-card-media>-->
                  <!--<div :class="dailyEmotion">-->
                    <!--<img class="dailyEmoji" :src="this.emotion_src" alt="">-->
                  <!--</div>-->
                <!--</md-card-media>-->
                <!--<md-card-content>-->
                  <!--{{dailyItem.comment}}-->
                  <!--&lt;!&ndash;코멘트 저장해뒀다면 해당 코멘트가 들어오는 부분&ndash;&gt;-->
                  <!--&lt;!&ndash; 일간일간일간일간일간 코멘트 &ndash;&gt;-->
                <!--</md-card-content>-->
              <!--</md-card>-->
          <!--</div>-->
        <!--</li>-->
      <!--</ul>-->
      <!--<div class="line"></div>-->
    </div>
  </div>
</template>

<script>
  import moment from 'moment';

  const DATE_FORMAT = 'YYYY년 M월 D일';

  export default {
    name: 'today',
    data () {
      return {
        dailyEmotion: '',
        emotion_src: '',
         dailyItem: {
           date : moment().format(DATE_FORMAT),
           emoji : '이날은 기록한 기분이 없습니다',
           comment : '이날은 기록한 코멘트가 없습니다.'
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
        this.$http.get('https://mooda-f6e38.firebaseio.com/daily.json')
          .then( response => { return response.data} )
          .then( data => {
//            console.log('data: ', data);
//            console.log(Object.keys(data));
            // data는 obj 안에 입력값 다 합쳐놓은 obj가 들어 있음
            let arr = Object.keys(data).map(key => {
              console.log(key);
              let obj = data[key];
              obj.key = key;
              return obj;
            })
//            console.log('arr: ', arr);
            this.datalist = arr;
//            console.log('datalist: ', this.datalist);
//            console.log('datalist의 첫번째: ', this.datalist[0]);
//            console.log('datalist의 key: ', this.datalist[0].key);
            return this.datalist[0].key
          })
          .then( result => {
            this.$http.put(`https://mooda-f6e38.firebaseio.com/daily/${this.datalist[0].key}.json`, {
              "comment": this.dailyItem.comment,
              "emoji": this.dailyItem.emoji})
          })
      },
      deleteDaily(){
        this.$http.get('https://mooda-f6e38.firebaseio.com/daily.json')
          .then( response => { return response.data} )
          .then( data => {
//            console.log('data: ', data);
//            console.log(Object.keys(data));
            // data는 obj 안에 입력값 다 합쳐놓은 obj가 들어 있음
            let arr = Object.keys(data).map(key => {
              console.log(key);
              let obj = data[key];
              obj.key = key;
              return obj;
            })
//            console.log('arr: ', arr);
            this.datalist = arr;
//            console.log('datalist: ', this.datalist);
//            console.log('datalist의 첫번째: ', this.datalist[0]);
//            console.log('datalist의 key: ', this.datalist[0].key);
            return this.datalist[0].key
          })
          .then (result => {
            this.$http.delete(`https://mooda-f6e38.firebaseio.com/daily/${this.datalist[0].key}.json`)
          })
      }
    },
    created: function() {
      console.log("created");
      // db에서 데이터를 가져온다
      this.$http.get('https://mooda-f6e38.firebaseio.com/daily.json')
                .then(response => response.data)
                .then(data => {
                  let arr = Object.keys(data).map(item => data[item]);
                  if (arr.length > 0) {
                    this.dailyItem.date = moment(arr[0].date).format(DATE_FORMAT);
                    this.dailyItem.emoji = arr[0].emoji;
                    // this.dailyItem.emoji = 4;
                    this.dailyItem.comment = arr[0].comment;
                    this.renderEmoji();
                }
                });
      // 데이터를 뿌리기 좋게 조작한다
      // 데이터를 뿌린다

      // mounted될 때 변경사항 있으면 또 다르게 뿌리게????

    }
  };
</script>

<style lang="sass" scoped rel="stylesheet/sass">
  body
    width: 100%
    background: #fff

  .today
    background: #e6e6e6
    width: 960px
    height: 100vh
    margin: 50px auto
    border-top-left-radius: 10px
    border-top-right-radius: 10px

  .today-header
    background: #fff
    max-height: 100px
    box-shadow: 2px 3px 21px -1px rgba(84, 84, 84, 0.75)
    border-top-left-radius: 10px
    border-top-right-radius: 10px
    display: flex
    align-items: center

  .date-group
    width: 50%
    max-height: 100px
    padding: 30px
    text-align: left
    font-size: 30px
    line-height: 30px
    letter-spacing: 2px

  .weather-group
    width: 50%
    max-height: 100px
    padding: 30px
    & div
      min-height: 100px
      font-size: 30px
      text-align: right
      line-height: 30px

  .button-group
    margin-bottom: 50px

  .md-fab
    position: relative
    top: 30px
    right: -425px

  .main-content
    display: flex
    justify-content: center

  .daily
    width: 40%
    padding: 20px
    margin: 0 auto
    position: relative

  .daily-title
    width: 30%
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

  .weekly
    width: 40%
    margin: 0 auto
</style>

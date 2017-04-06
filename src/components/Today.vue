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
        <md-card>
          <span>{{dailyItem.date}}</span>
          <md-card-media>
            <div :class="dailyEmotion"><img
              :src="this.emotion_src" alt=""></div>
              <!-- /static/img/emoji.9aaa704.png
            정적으로 넣을 때 이미지가 들어가는 방식 -->
            <!-- {{renderEmoji(dailyItem.emoji)}} -->
            <!--저장해둔 이모티콘이 들어오는 부분-->
            <!-- <img src="assets/card-image-2.jpg" alt="People"> -->
            <!-- 일간일간일간일간일간 이모지 -->
          </md-card-media>

          <md-card-content>
            {{dailyItem.comment}}
            <!--코멘트 저장해뒀다면 해당 코멘트가 들어오는 부분-->
            <!-- 일간일간일간일간일간 코멘트 -->
          </md-card-content>
        </md-card>
      </div>
      <div class="weekly">
        <ul class="weekly-data">
          <li>
            <!-- v-for="item in items" -->
            <md-card>
              <md-card-content>임시 주간 컨텐츠컨텐츠 영역</md-card-content>
              <!-- <md-card-content>{{item.content}}</md-card-content> -->
              <!-- <md-card-media>
                <!--저장해둔 이모티콘이 들어오는 부분-->
                <!-- <img src="assets/card-image-2.jpg" alt="People"> -->
                <!-- 주간주간주간주간 이모지 -->
              <!-- </md-card-media> -->

              <!-- <md-card-content> -->
                <!--코멘트 저장해뒀다면 해당 코멘트가 들어오는 부분-->
                <!-- 주간주간주간주간 코멘트 -->
              <!-- </md-card-content> --> -->
            </md-card>
          </li>
        </ul>
      </div>
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
           emoji : '이날 기분은 없습니다.',
           comment : '이날 코멘트는 없습니다.'
         }
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

    }
  };
</script>

<style lang="sass" scoped>
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
    background: orange
    width: 40%
    margin: 0 auto

  .weekly
    width: 40%
    margin: 0 auto
</style>

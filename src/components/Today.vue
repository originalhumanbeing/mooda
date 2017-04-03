<template>
  <div class="today">
    <header class="today-header">
      <div class="date-group">
        <span class="dd">28th Monday</span>
        <span class="mmyy">March 2017</span>
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
        <md-card>
          <md-card-media>
            <!--저장해둔 이모티콘이 들어오는 부분-->
            <!-- <img src="assets/card-image-2.jpg" alt="People"> -->
          </md-card-media>

          <md-card-content>
            <!--코멘트 저장해뒀다면 해당 코멘트가 들어오는 부분-->
            일간일간일간일간일간
          </md-card-content>
        </md-card>
      </div>
      <div class="weekly">
        <md-card>
          <md-card-media>
            <!--저장해둔 이모티콘이 들어오는 부분-->
            <!-- <img src="assets/card-image-2.jpg" alt="People"> -->
          </md-card-media>

          <md-card-content>
            <!--코멘트 저장해뒀다면 해당 코멘트가 들어오는 부분-->
            주간ㄱ주간주간주간
          </md-card-content>
        </md-card>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'today',
    data () {
      return {
        msg: 'Welcome to Your Vue.js App'
      }
    }
  };
</script>

<style lang="sass">
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
    // background: orange
    width: 50%
    max-height: 100px
    padding: 30px
    & span
      display: block
      text-align: left
    & .dd
      font-size: 30px
      line-height: 30px
      letter-spacing: 2px

  .weather-group
    // background: skyblue
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

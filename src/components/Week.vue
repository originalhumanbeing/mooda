<template>
  <div class="Weekly">
      <div class="weekly-title">Weekly</div>
      <md-card class="weeklyCard">
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
  export default {
    name: 'Week',
    data () {
      return {}
    },
    methods: {}
  };
</script>

<style lang="sass" scoped rel="stylesheet/sass">
</style>

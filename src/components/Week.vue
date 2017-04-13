<template>
  <div class="week">
    <div class="weekly-title">Weekly</div>
    <ul class="weeklyItems">
      <li :class="item.matchingColor" v-for="item of weeklyItems">
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
  export default {
    name: 'Week',
    props : ['weeklyItems'],
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
    width: 10px
    height: 10px
    border: 15px solid #a322ef
    border-radius: 50%
    position: relative
    left: -120px
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

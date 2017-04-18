<template>
  <div class="week">
    <div class="weekly-title">Weekly</div>
    <ul class="weeklyItems">
      <li :class="item.matchingColor" v-for="item of weeklyItems">
        <md-card>
          <span class="weeklyItemsDate">{{item.date}}</span>
          <div class="weeklyContent">
            <md-card-media>
              <img class="emojiPic" :src="item.emojiSrc" alt="">
            </md-card-media>
            <md-card-content>{{item.comment}}</md-card-content>
          </div>
        </md-card>
      </li>
    </ul>
  </div>

</template>

<script>
  export default {
    name: 'Week',
    data () {
      return {
//        scrolled: false,
        rect: ''
      }
    },
    props: ['weeklyItems'],
    methods: {},
    updated () {
      let listItems = document.querySelectorAll('.weeklyItems li');
      window.addEventListener('scroll', () => callbackFunc(listItems));

    }
  }

  function isElementInViewport(el) {
    let rect = el.getBoundingClientRect();
    console.log('완전 이해 못함');
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    )
  }

  function callbackFunc(listItems) {
    for (var i = 0; i < listItems.length; i++) {
      if (isElementInViewport(listItems[i])) {
        listItems[i].classList.add("in-view");
        console.log('in-view');
      }
    }
  }
</script>

<style lang="sass" scoped rel="stylesheet/sass">
    *, *::before, *::after
      box-sizing: border-box

    .week
      background: #fff
      padding: 60px
      border-radius: 5px
      overflow: auto
      box-shadow: 0 1px 5px rgba(0, 0, 0, .2), 0 2px 2px rgba(0, 0, 0, .14), 0 3px 1px -2px rgba(0, 0, 0, .12)
      /*display: flex*/
      /*flex-direction: column*/
      /*justify-content: center*/
      /*align-items: center*/
      position: relative

    .weekly-title
      background: lightcoral
      padding: 10px 30px
      position: absolute
      top: -10px
      left: 30px
      z-index: 100
      font-weight: 600
      font-size: 1.2em
    // daily의 margin에 가려서 위에가 짤려 보임 ㅠㅠ..

    ul
      list-style: none
      padding-left: 0
      width: 2px
      margin: 0 auto
      background: lightcoral

    li
      padding-left: 30px
      min-width: 200px
      width: 380px
      postion: relative
      visibility: hidden

    li::before
      content: ''
      position: absolute
      left: 395px
      width: 10px
      height: 10px
      border-radius: 50%

    .happy::before
      background: yellow

    .sulky::before
      background: green

    .naughty::before
      background: blue

    .hungry::before
      background: red

    // 카드에 화살표 붙이는 부분
    //.md-card
      position: relative

    //.md-card::before
      content: ''
      width: 0
      height: 0
      border-top: 10px solid transparent
      border-bottom: 10px solid transparent
      border-right: 20px solid lightcoral
      position: absolute
      left: -8px

    li:nth-child(odd) .md-card
      left: -410px

    .md-card
      padding: 10px

    .md-card .md-card-media img
      width: 50%

    .weeklyItemsDate
      padding: 10px
      font-weight: 500
      font-size: 1.1em

    .weeklyContent
      display: flex
      justify-content: center
      align-items: center

    .md-card-content
      width: 300px

    .in-view
      visibility: visible

    ul li
      visibility: hidden;
      opacity: 0;
      transition: all .5s ease-in-out;

    ul li:nth-child(odd)
      transform: translate3d(-200px, 0, 0);


    ul li:nth-child(even)
      transform: translate3d(100px, 0, 0);

    ul li.in-view
      transform: none;
      visibility: visible;
      opacity: 1;


</style>

<template>
  <section>
    <h2>fireBaseTest</h2>
    <div>
      <span>{{JSON.stringify(user)}}</span>
    </div>
    <button @click.prevent="googleLogin">구글로그인</button>
    <button @click.prevent="googleLogout">구글로그아웃</button>

    <div>
      <div>
        <label> comment :
          <input type="text" v-model="newEmoji.comment"/>
        </label>
      </div>
      <div>
        <label> date :
          <input type="text" v-model="newEmoji.date" placeholder="YYYYMMDD"/>
        </label>
      </div>
      <div>
        <label> emoji :
          <select v-model="newEmoji.emoji">
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
          </select>
        </label>
      </div>
      <button @click.prevent="createEmoji">오늘 기분 등록</button>
    </div>
    <div>
      {{JSON.stringify(this.todayEmoji)}}
    </div>
    <button @click.prevent="deleteEmoji">deleteEmoji</button>
    <button @click.prevent="fetchEmoji">fetchEmoji!!!!!!!!</button>
    <button @click.prevent="fetchEmojis">fetchEmojis</button>
  </section>
</template>

<script>
  import firebaseService from '../service/firebaseService';
  import moment from 'moment';


  export default {
    name: 'FireBaseTest',
    data () {
      return {
        newEmoji: {
          date: moment().format('YYYYMMDD')
        },
        user: {},
        todayEmoji: {},
        last7Emojis: {}
      }
    },
    methods: {
      googleLogin() {
        console.log('google.login');
        return firebaseService.googleLogin().then(user => {
          console.log(user);
          this.user = user
        });
      },

      googleLogout() {
        console.log('google.logout');
        return firebaseService.googleLogout().then(result => {
          if (result)
            this.user = {};
        });
      },

      createEmoji() {
        let data = Object.assign({}, this.newEmoji);
        data.uid = this.user.uid;
        //문자열을 moment 객체로 파싱하고 데이트 객체로 변환
        data.date = moment(this.newEmoji.date, 'YYYYMMDD').toDate();
        return firebaseService.createEmoji(data).then(r => {
          if (r) {
            alert('등록되었습니다.');
          }
        });
      },

      fetchEmoji() {
        firebaseService.fetchEmoji({uid: this.user.uid, date: new Date()}).then(emoji => {
          console.log(emoji);
        })
      },

      fetchEmojis() {
        firebaseService.fetchEmojis({uid: this.user.uid, baseDate: new Date(), range: 7}).then(emojis => {
          console.log(emojis);
        });
      },

      deleteEmoji() {
        let deleteDate = moment(this.newEmoji.date, 'YYYYMMDD').toDate();

        firebaseService.deleteEmoji({uid: this.user.uid, date: deleteDate}).then(() => {
          console.log('deleted');
        })
      }
    },

    created: function () {
      this.googleLogin().then(() => {
        firebaseService.fetchEmoji({uid: this.user.uid, date: new Date()}).then(daily => {
          this.todayEmoji = daily;
        })
      });
    }
  };
</script>

<style lang="sass" scoped rel="stylesheet/sass">
</style>

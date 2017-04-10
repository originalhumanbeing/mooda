import * as firebase from 'firebase';
import moment from 'moment';

export default {
  googleLogin() {
    return {}
  },

  googleLogout() {
    return {}
  },

  createEmoji({uid, emoji, comment = '', date}) {
    $http.post('http://example.com/emoji', {uid, emoji, comment, date});
    return {}
  },

  fetchEmoji({uid, date}) {
    return {}
  },

  updateEmoji({uid, comment='', emoji, date}) {
    return {}
  },
  fetchEmojis({uid, baseDate, range}) {
      return {}

  }

}



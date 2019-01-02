import Vue from 'vue'
import VueI18n from 'vue-i18n'
Vue.use(VueI18n)
// Ready translated locale messages
const messages = {
  zh: {
    group1: '所有城市',
    group2: '浙江',
    group3: '江苏',
    group4: '福建',
    city1: [{
      text: '杭州',
      id: 1
    }, {
      text: '温州',
      id: 2
    }, {
      text: '宁波',
      id: 3,
      disabled: true
    }, {
      text: '义乌',
      id: 4
    }],
    city2: [{
      text: '南京',
      id: 5
    }, {
      text: '无锡',
      id: 6
    }, {
      text: '徐州',
      id: 7
    }, {
      text: '苏州',
      id: 8
    }],
    city3: [{
      text: '泉州',
      id: 9
    }, {
      text: '厦门',
      id: 10
    }]
  },
  en: {
    message: {
      hello: 'hello world'
    }
  },
  ja: {
    message: {
      hello: 'こんにちは、世界'
    }
  }
};

export default new VueI18n({
  locale: 'zh', // set locale
  messages // set locale messages
});

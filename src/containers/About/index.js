'use strict';

import './styles.scss';

import EventManagerMixin from 'mixins/EventManagerMixin';
import FadeTransitionMixin from 'mixins/FadeTransitionMixin';

import Mobile from 'components/Mobile';

export default Vue.extend({

  mixins: [ EventManagerMixin, FadeTransitionMixin ],

  template: require( './template.html' ),

  data() {

    return {
      _hidden: null,
      scrolled: false
    };
  },

  created() {
    setTimeout(() => {
      const content = document.querySelector('.about__content.isDesktop');

      content.classList.add('about__content--enter');
    }, 500);
    setTimeout(() => {
      const nav = document.querySelectorAll('.about__link');

      for (const elm of nav) {
        elm.classList.add('about__link--enter');
      }
    }, 700);
  },

  methods: {

    goBack() {
      window.history.back();
    }

  },

  components: {
    'mobile': Mobile
  }
});

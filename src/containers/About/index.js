'use strict';

import './styles.scss';

import EventManagerMixin from 'mixins/EventManagerMixin';
import FadeTransitionMixin from 'mixins/FadeTransitionMixin';

import {
  WINDOW_RESIZE
} from 'config/messages';

export default Vue.extend({

  mixins: [ EventManagerMixin, FadeTransitionMixin ],

  template: require( './template.html' ),

  emitterEvents: [{
    message: WINDOW_RESIZE,
    method: 'onWindowResize'
  }],

  data() {

    return {
      _hidden: null,
      scrolled: false
    };
  },

  created() {

  },

  methods: {

    onWindowResize( {width, height} ) {
      /*eslint-disable */
      console.log( `Window resize from application with debounce -> width: ${width}px || height: ${ height }` );
      /*eslint-enable */
    },

    goBack() {
      window.history.back();
    }

  },

  components: {}
});

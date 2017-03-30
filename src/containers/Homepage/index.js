'use strict';

import './styles.scss';

import EventManagerMixin from 'mixins/EventManagerMixin';
//import FadeLoaderMixin from 'mixins/FadeLoaderMixin';

import {
  WINDOW_RESIZE
} from 'config/messages';

import LogoLoader from 'components/LogoLoader';
import ProjectsLeftSide from 'components/ProjectsLeftSide';
import ProjectsRightSide from 'components/ProjectsRightSide';

export default Vue.extend({

  mixins: [ EventManagerMixin ],

  template: require( './template.html' ),

  emitterEvents: [{
    message: WINDOW_RESIZE,
    method: 'onWindowResize'
  }],

  domEvents: [
    {
      target: window,
      event: 'mousewheel',
      method: 'hideScrollCursor'
    },
    {
      target: window,
      event: 'DOMMouseScroll',
      method: 'hideScrollCursor'
    }
  ],

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

    hideScrollCursor() {
      if (!this.scrolled) {
        this.scrolled = true;
      }
    }

  },

  components: {
    'logo-loader': LogoLoader,
    'projects-left-side': ProjectsLeftSide,
    'projects-right-side': ProjectsRightSide
  }
});

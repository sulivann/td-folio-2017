'use strict';

import './styles.scss';

import EventManagerMixin from 'mixins/EventManagerMixin';
import FadeLoaderMixin from 'mixins/FadeLoaderMixin';

import {
  WINDOW_RESIZE
} from 'config/messages';

import LogoLoader from 'components/LogoLoader';
import ProjectsLeftSide from 'components/ProjectsLeftSide';
import ProjectsRightSide from 'components/ProjectsRightSide';

export default Vue.extend({

  mixins: [ EventManagerMixin, FadeLoaderMixin ],

  template: require( './template.html' ),

  emitterEvents: [{
    message: WINDOW_RESIZE,
    method: 'onWindowResize'
  }],

  data() {

    return {
      _hidden: null
    };
  },

  created() {

  },

  methods: {

    onWindowResize( {width, height} ) {
      /*eslint-disable */
      console.log( `Window resize from application with debounce -> width: ${width}px || height: ${ height }` );
      /*eslint-enable */
    }

  },

  components: {
    'logo-loader': LogoLoader,
    'projects-left-side': ProjectsLeftSide,
    'projects-right-side': ProjectsRightSide
  }
});

'use strict';

import './styles.scss';

import throttle from 'lodash.throttle';

import EventManagerMixin from 'mixins/EventManagerMixin';
import FadeTransitionMixin from 'mixins/FadeTransitionMixin';

import {
  WINDOW_RESIZE
} from 'config/messages';

import {
  changeProject
} from 'vuex/projectNumber/actions';

import {
  projectNumber
} from 'vuex/projectNumber/getters';

import LogoLoader from 'components/LogoLoader';
import ProjectsLeftSide from 'components/ProjectsLeftSide';
import ProjectsRightSide from 'components/ProjectsRightSide';

export default Vue.extend({

  mixins: [ EventManagerMixin, FadeTransitionMixin ],

  template: require( './template.html' ),

  vuex: {
    getters: {
      projectNumber: projectNumber
    },
    actions: {
      changeProject
    }
  },

  emitterEvents: [{
    message: WINDOW_RESIZE,
    method: 'onWindowResize'
  }],

  domEvents: [
    {
      target: window,
      event: 'wheel',
      method: 'handleScrollDown'
    },
    {
      target: window,
      event: 'DOMMouseScroll',
      method: 'handleScrollDown'
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

    bind() {
      this.handleScrollDown = throttle(this.broadcastScrollDown, 1400, { trailing: false, leading: true });
    },

    onWindowResize( {width, height} ) {
      /*eslint-disable */
      console.log( `Window resize from application with debounce -> width: ${width}px || height: ${ height }` );
      /*eslint-enable */
    },

    broadcastScrollDown(e) {
      const wDelta = e.wheelDelta < 0 ? 'down' : 'up';

      if (wDelta == 'down') {
        if (!this.scrolled) {
          this.scrolled = true;
        }
        this.changeProject(this.projectNumber+1);
      }
    }

  },

  components: {
    'logo-loader': LogoLoader,
    'projects-left-side': ProjectsLeftSide,
    'projects-right-side': ProjectsRightSide
  }
});

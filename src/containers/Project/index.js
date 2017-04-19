'use strict';

import './styles.scss';

import EventManagerMixin from 'mixins/EventManagerMixin';
import FadeTransitionMixin from 'mixins/FadeTransitionMixin';

import {
  WINDOW_RESIZE
} from 'config/messages';

import projectsData from 'config/projectsData';

import ProjectHeader from 'components/ProjectHeader';

import ProjectShow from 'components/ProjectShow';

export default Vue.extend({

  mixins: [ EventManagerMixin, FadeTransitionMixin ],

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
    for (const data of projectsData) {
      if (data.slug == this.$route.params.projectName) {
        this.projectData = data;
        break;
      }
    }

    return {
      projectData: this.projectData,
      _hidden: null
    };
  },

  created() {},

  methods: {

    onWindowResize( {width, height} ) {
      /*eslint-disable */
      console.log( `Window resize from application with debounce -> width: ${width}px || height: ${ height }` );
      /*eslint-enable */
    }

  },

  components: {
    'project-header': ProjectHeader,
    'project-show': ProjectShow
  }
});

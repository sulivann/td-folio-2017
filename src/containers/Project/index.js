'use strict';

import './styles.scss';

import throttle from 'lodash.throttle';

import VirtualScroll  from 'virtual-scroll';

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

import projectsData from 'config/projectsData';

import ProjectHeader from 'components/ProjectHeader';

import ProjectShow from 'components/ProjectShow';

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
      event: 'mousewheel',
      method: 'handleScrollDown'
    },
    {
      target: window,
      event: 'DOMMouseScroll',
      method: 'handleScrollDown'
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

  created() {
    setTimeout( () => {
      this.broadcastScrollDown();
      this.smoothScroll();

    }, 1050);

    document.addEventListener('touchmove', function(e) {
      e.preventDefault();
    });
  },

  methods: {

    bind() {
      this.handleScrollDown = throttle(this.broadcastScrollDown, 200, { trailing: false, leading: true });
      this.handleBackToHome = throttle(this.broadcastBackToHome, 1400, { trailing: false, leading: true });
    },

    onWindowResize( {width, height} ) {
      /*eslint-disable */
      console.log( `Window resize from application with debounce -> width: ${width}px || height: ${ height }` );
      /*eslint-enable */
    },

    broadcastScrollDown() {
      let images = document.querySelectorAll('.projectShow__imageContainer, .projectShow__imageContainer--centered');
      for (let elm of images) {
        if ((elm.getBoundingClientRect().top - window.innerHeight) < 100 && !elm.classList.contains('projectShow__imageContainer--active')) {
          elm.classList.add('projectShow__imageContainer--active');
        }
      }
    },

    broadcastBackToHome() {
      let end = document.querySelector('.project__end');

      if(end.getBoundingClientRect().top < 800) {

        if (this.projectNumber >= projectsData.length) {
          this.changeProject(1);
        }
        else {
          this.changeProject(this.projectNumber+1);
        }

        this.$router.go('/');
      }
    },

    smoothScroll() {
      let section = document.querySelector('.project');
      let targetY = 0;
      let scroll = new VirtualScroll();

      scroll.on((e) => {
        targetY += e.deltaY;
        targetY = Math.max( (section.scrollHeight - window.innerHeight) * -1, targetY);
        targetY = Math.min(0, targetY);

        this.handleScrollDown();
      });

      let currentY = 0, ease = 0.12;

      let run = function() {
        requestAnimationFrame(run);
        currentY += (targetY - currentY) * ease;
        let t = 'translateY(' + currentY + 'px) translateZ(0)';
        let s = section.style;
        s["transform"] = t;
        s["webkitTransform"] = t;
        s["mozTransform"] = t;
        s["msTransform"] = t;
      };

      run();
    }


  },

  components: {
    'project-header': ProjectHeader,
    'project-show': ProjectShow
  }
});

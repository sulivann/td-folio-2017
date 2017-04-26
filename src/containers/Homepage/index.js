'use strict';

import './styles.scss';

import throttle from 'lodash.throttle';

import EventManagerMixin from 'mixins/EventManagerMixin';
//import FadeTransitionMixin from 'mixins/FadeTransitionMixin';

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

import LogoLoader from 'components/LogoLoader';
import ProjectsLeftSide from 'components/ProjectsLeftSide';
import ProjectsRightSide from 'components/ProjectsRightSide';

export default Vue.extend({

  mixins: [ EventManagerMixin ],

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
      _hidden: null
    };
  },

  created() {

  },

  methods: {

    bind() {
      this.handleScrollDown = throttle(this.broadcastScrollDown, 2400, { trailing: false, leading: true });
    },

    onWindowResize( {width, height} ) {
      /*eslint-disable */
      console.log( `Window resize from application with debounce -> width: ${width}px || height: ${ height }` );
      /*eslint-enable */
    },

    broadcastScrollDown(e) {
      const wDelta = e.wheelDelta < 0 ? 'down' : 'up';

      if (wDelta == 'down') {

        this.toggleChangeProjectUp();

      }
      else if (wDelta == 'up') {

        this.toggleChangeProjectDown();

      }

    },

    toggleChangeProjectUp() {

      const projectName = document.querySelector('.projectsList__name--selected');
      const projectCoverContainer = document.querySelector('.projectsLeftSide__cover');
      const projectCover = document.querySelector('.projectsLeftSide__mask');
      const projectNumber = document.querySelector('.projectRightSide__selectedNumber');

      projectName.classList.remove('projectsList__name--selected');
      projectName.classList.add('projectsList__name--hidden');

      projectNumber.classList.remove('projectRightSide__selectedNumber');
      projectNumber.classList.add('projectRightSide__selectedNumber--hidden');

      projectCoverContainer.classList.remove('projectsLeftSide__cover');
      projectCoverContainer.classList.add('projectsLeftSide__cover--hidden');

      projectCover.classList.remove('projectsLeftSide__mask');
      projectCover.classList.add('projectsLeftSide__mask--scrolled');

      setTimeout( () => {

        if (this.projectNumber >= projectsData.length) {
          this.changeProject(1);
        }
        else {
          this.changeProject(this.projectNumber+1);
        }

        projectCover.classList.remove('projectsLeftSide__mask--scrolled');
        void projectCover.offsetWidth;
        projectCover.classList.add('projectsLeftSide__mask');

        projectNumber.classList.remove('projectRightSide__selectedNumber--hidden');
        void projectNumber.offsetWidth;
        projectNumber.classList.add('projectRightSide__selectedNumber');

        projectCoverContainer.classList.remove('projectsLeftSide__cover--hidden');
        void projectCoverContainer.offsetWidth;
        projectCoverContainer.classList.add('projectsLeftSide__cover');
      }, 1050);

    },

    toggleChangeProjectDown() {

      const projectName = document.querySelector('.projectsList__name--selected');
      const projectCoverContainer = document.querySelector('.projectsLeftSide__cover');
      const projectCover = document.querySelector('.projectsLeftSide__mask');
      const projectNumber = document.querySelector('.projectRightSide__selectedNumber');

      projectName.classList.remove('projectsList__name--selected');
      projectName.classList.add('projectsList__name--hidden');

      projectNumber.classList.remove('projectRightSide__selectedNumber');
      projectNumber.classList.add('projectRightSide__selectedNumber--hidden');

      projectCoverContainer.classList.remove('projectsLeftSide__cover');
      projectCoverContainer.classList.add('projectsLeftSide__cover--hidden');

      projectCover.classList.remove('projectsLeftSide__mask');
      projectCover.classList.add('projectsLeftSide__mask--scrolled');

      setTimeout( () => {

        if (this.projectNumber <= 1) {
          this.changeProject(projectsData.length);
        }
        else {
          this.changeProject(this.projectNumber-1);
        }

        projectCover.classList.remove('projectsLeftSide__mask--scrolled');
        void projectCover.offsetWidth;
        projectCover.classList.add('projectsLeftSide__mask');

        projectNumber.classList.remove('projectRightSide__selectedNumber--hidden');
        void projectNumber.offsetWidth;
        projectNumber.classList.add('projectRightSide__selectedNumber');

        projectCoverContainer.classList.remove('projectsLeftSide__cover--hidden');
        void projectCoverContainer.offsetWidth;
        projectCoverContainer.classList.add('projectsLeftSide__cover');
      }, 1050);

    }

  },

  components: {
    'logo-loader': LogoLoader,
    'projects-left-side': ProjectsLeftSide,
    'projects-right-side': ProjectsRightSide
  }
});

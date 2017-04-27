'use strict';

import './styles.scss';

import throttle from 'lodash.throttle';

import EventManagerMixin from 'mixins/EventManagerMixin';
import HomeTransitionMixin from 'mixins/HomeTransitionMixin';

import {
  WINDOW_RESIZE
} from 'config/messages';

import {
  changeProject
} from 'vuex/projectNumber/actions';

import {
  projectNumber
} from 'vuex/projectNumber/getters';

import {
  updateInteraction
} from 'vuex/status/actions';

import projectsData from 'config/projectsData';

import LogoLoader from 'components/LogoLoader';
import ProjectsLeftSide from 'components/ProjectsLeftSide';
import ProjectsRightSide from 'components/ProjectsRightSide';

export default Vue.extend({

  mixins: [ EventManagerMixin, HomeTransitionMixin ],

  template: require( './template.html' ),

  vuex: {
    getters: {
      projectNumber: projectNumber
    },
    actions: {
      changeProject,
      updateInteraction
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

      const projectName = document.querySelector('.projectsList__name--selected, .projectsList__name--selectedInteracted');
      const projectCoverContainer = document.querySelector('.projectsLeftSide__cover');
      const projectCover = document.querySelector('.projectsLeftSide__mask');
      const projectNumber = document.querySelector('.projectRightSide__selectedNumber, .projectRightSide__selectedNumber--interacted');
      const projectDiscover = document.querySelector('.projectsList__discover--active, .projectsList__discover--activeInteracted');

      projectName.classList.remove('projectsList__name--selected');
      projectName.classList.remove('projectsList__name--selectedInteracted');
      projectName.classList.add('projectsList__name--hidden');

      if(projectDiscover) {
        projectDiscover.classList.remove('projectsList__discover--active');
        projectDiscover.classList.remove('projectsList__discover--activeInteracted');
        projectDiscover.classList.add('projectsList__discover');
      }

      projectNumber.classList.remove('projectRightSide__selectedNumber');
      projectNumber.classList.remove('projectRightSide__selectedNumber--interacted');
      projectNumber.classList.add('projectRightSide__selectedNumber--hidden');

      projectCoverContainer.classList.remove('projectsLeftSide__cover');
      projectCoverContainer.classList.add('projectsLeftSide__cover--hidden');

      projectCover.classList.remove('projectsLeftSide__mask');
      projectCover.classList.add('projectsLeftSide__mask--scrolled');

      setTimeout( () => {

        this.updateInteraction();

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

      const projectName = document.querySelector('.projectsList__name--selected, .projectsList__name--selectedInteracted');
      const projectCoverContainer = document.querySelector('.projectsLeftSide__cover');
      const projectCover = document.querySelector('.projectsLeftSide__mask');
      const projectNumber = document.querySelector('.projectRightSide__selectedNumber, .projectRightSide__selectedNumber--interacted');
      const projectDiscover = document.querySelector('.projectsList__discover--active, .projectsList__discover--activeInteracted');

      projectName.classList.remove('projectsList__name--selected');
      projectName.classList.remove('projectsList__name--selectedInteracted');
      projectName.classList.add('projectsList__name--hidden');

      if(projectDiscover) {
        projectDiscover.classList.remove('projectsList__discover--active');
        projectDiscover.classList.remove('projectsList__discover--activeInteracted');
        projectDiscover.classList.add('projectsList__discover');
      }

      projectNumber.classList.remove('projectRightSide__selectedNumber');
      projectNumber.classList.remove('projectRightSide__selectedNumber--interacted');
      projectNumber.classList.add('projectRightSide__selectedNumber--hidden');

      projectCoverContainer.classList.remove('projectsLeftSide__cover');
      projectCoverContainer.classList.add('projectsLeftSide__cover--hidden');

      projectCover.classList.remove('projectsLeftSide__mask');
      projectCover.classList.add('projectsLeftSide__mask--scrolled');

      setTimeout( () => {

        this.updateInteraction();

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

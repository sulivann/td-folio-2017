'use strict';

import './styles.scss';

import throttle from 'lodash.throttle';

import EventManagerMixin from 'mixins/EventManagerMixin';
import HomeTransitionMixin from 'mixins/HomeTransitionMixin';

import {
  WINDOW_RESIZE
} from 'config/messages';

import {
  changeProject,
  resetPrevious
} from 'vuex/projectNumber/actions';

import {
  projectNumber
} from 'vuex/projectNumber/getters';

import {
  updateInteraction,
  resetInteraction
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
      updateInteraction,
      resetInteraction,
      resetPrevious
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
    this.resetInteraction();
    this.resetPrevious();
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

      let projectName = document.querySelector('.projectsList__name--selected, .projectsList__name--selectedIsLoaded');
      let discover = document.querySelector('.projectsList__discover--active');
      let cover = document.querySelector('.projectsLeftSide__cover');
      const selectedNumber = document.querySelector('.projectRightSide__selectedNumber');
      const coverMask = document.querySelector('.projectsLeftSide__mask');

      projectName.classList.add('projectsList__name--selectedOut');

      if (discover) {
        discover.classList.add('projectsList__discover');
      }

      cover.classList.add('projectsLeftSide__cover--out');
      coverMask.classList.add('projectsLeftSide__mask--out');
      selectedNumber.classList.add('projectRightSide__selectedNumber--out');

      setTimeout(() => {

        this.updateInteraction();

        if (this.projectNumber >= projectsData.length) {
          this.changeProject(1);
        }
        else {
          this.changeProject(this.projectNumber+1);
        }

        setTimeout(() => {
          cover = document.querySelector('.projectsLeftSide__cover');

          coverMask.classList.remove('projectsLeftSide__mask--out');
          coverMask.classList.remove('projectsLeftSide__mask--enter');
          void coverMask.offsetWidth;
          coverMask.classList.add('projectsLeftSide__mask--enter');

          cover.classList.remove('projectsLeftSide__cover--out');
          cover.classList.remove('projectsLeftSide__cover--enter');
          void cover.offsetWidth;
          cover.classList.add('projectsLeftSide__cover--enter');

          const prevProject = document.querySelector('.projectsList__name--previous');
          prevProject.classList.add('projectsList__name--previousEnter');
        }, 1);

        setTimeout(() => {
          projectName = document.querySelector('.projectsList__name--selected, .projectsList__name--selectedIsLoaded');
          projectName.classList.add('projectsList__name--selectedEnter');
        }, 700);

        setTimeout(() => {
          discover = document.querySelector('.projectsList__discover--active');
          if (discover) {
            discover = document.querySelector('.projectsList__discover--active');
            discover.classList.add('projectsList__discover--enter');
          }

          selectedNumber.classList.remove('projectRightSide__selectedNumber--out');
          selectedNumber.classList.add('projectRightSide__selectedNumber--enter');
        }, 1200);

      }, 1050);

    },

    toggleChangeProjectDown() {

      let projectName = document.querySelector('.projectsList__name--selected, .projectsList__name--selectedIsLoaded');
      let discover = document.querySelector('.projectsList__discover--active');
      let cover = document.querySelector('.projectsLeftSide__cover');
      const selectedNumber = document.querySelector('.projectRightSide__selectedNumber');
      const coverMask = document.querySelector('.projectsLeftSide__mask');

      projectName.classList.add('projectsList__name--selectedOut');

      if (discover) {
        discover.classList.add('projectsList__discover');
      }

      cover.classList.add('projectsLeftSide__cover--out');
      coverMask.classList.add('projectsLeftSide__mask--out');
      selectedNumber.classList.add('projectRightSide__selectedNumber--out');

      setTimeout(() => {

        this.updateInteraction();

        if (this.projectNumber <= 1) {
          this.changeProject(projectsData.length);
        }
        else {
          this.changeProject(this.projectNumber-1);
        }

        setTimeout(() => {
          cover = document.querySelector('.projectsLeftSide__cover');

          coverMask.classList.remove('projectsLeftSide__mask--out');
          coverMask.classList.remove('projectsLeftSide__mask--enter');
          void coverMask.offsetWidth;
          coverMask.classList.add('projectsLeftSide__mask--enter');

          cover.classList.remove('projectsLeftSide__cover--out');
          cover.classList.remove('projectsLeftSide__cover--enter');
          void cover.offsetWidth;
          cover.classList.add('projectsLeftSide__cover--enter');

          const prevProject = document.querySelector('.projectsList__name--previous');
          prevProject.classList.add('projectsList__name--previousEnter');
        }, 1);

        setTimeout(() => {
          projectName = document.querySelector('.projectsList__name--selected, .projectsList__name--selectedIsLoaded');
          projectName.classList.add('projectsList__name--selectedEnter');
        }, 700);

        setTimeout(() => {
          discover = document.querySelector('.projectsList__discover--active');
          if (discover) {
            discover = document.querySelector('.projectsList__discover--active');
            discover.classList.add('projectsList__discover--enter');
          }

          selectedNumber.classList.remove('projectRightSide__selectedNumber--out');
          selectedNumber.classList.add('projectRightSide__selectedNumber--enter');
        }, 1200);

      }, 1050);

    }

  },

  components: {
    'logo-loader': LogoLoader,
    'projects-left-side': ProjectsLeftSide,
    'projects-right-side': ProjectsRightSide
  }
});

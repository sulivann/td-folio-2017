'use strict';

import './styles.scss';

import EventManagerMixin from 'mixins/EventManagerMixin';

import {
  changeProject
} from 'vuex/projectNumber/actions';

import {
  projectNumber,
  prevProjectNumber
} from 'vuex/projectNumber/getters';

import {
  updateInteraction
} from 'vuex/status/actions';

import {
  interaction,
  fromCase
} from 'vuex/status/getters';

import projectsData from 'config/projectsData';

export default Vue.extend({

  mixins: [ EventManagerMixin ],

  template: require( './template.html' ),

  vuex: {
    getters: {
      projectNumber: projectNumber,
      prevProjectNumber: prevProjectNumber,
      interaction: interaction,
      fromCase: fromCase
    },
    actions: {
      changeProject,
      updateInteraction
    }
  },

  emitterEvents: [],

  domEvents: [],

  data() {

    return {
      projectsData: projectsData,
      _hidden: null
    };
  },

  computed: {
    isLoaded: function() {

      return this.interaction;
    }
  },

  ready() {

    if(!this.fromCase) {
      const projectName = document.querySelector('.projectsList__name--selected');
      const discover = document.querySelector('.projectsList__discover--active');
      const projectsName = document.querySelectorAll('.projectsList__name');

      setTimeout( () => {
        projectName.classList.add('projectsList__name--fade');
      }, 1400);

      setTimeout( () => {
        projectName.classList.add('projectsList__name--selectedEnter');
      }, 1600);

      setTimeout( () => {
        discover.classList.add('projectsList__discover--enter');
      }, 2100);

      setTimeout( () => {
        for(const el of projectsName) {
          el.classList.add('projectsList__name--enter');
        }
      }, 2500);
    }
  },

  methods: {
    handleOnChangeProject: function(index) {
      this.onChangeProject(index);
    },

    onChangeProject: function (index) {

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
        this.changeProject(index);

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

  transitions: {},

  components: {}
});

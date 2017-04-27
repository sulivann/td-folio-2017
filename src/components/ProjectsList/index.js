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
  updateLoaded,
  updateInteraction
} from 'vuex/status/actions';

import {
  loaded,
  interaction
} from 'vuex/status/getters';

import projectsData from 'config/projectsData';

export default Vue.extend({

  mixins: [ EventManagerMixin ],

  template: require( './template.html' ),

  vuex: {
    getters: {
      projectNumber: projectNumber,
      prevProjectNumber: prevProjectNumber,
      loaded: loaded,
      interaction: interaction
    },
    actions: {
      changeProject,
      updateLoaded,
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

      return this.loaded;
    }
  },

  ready() {
    this.updateLoadedStore();
  },

  methods: {
    updateLoadedStore: function () {
      setTimeout(() => {
        this.updateLoaded();
      }, 2500);
    },

    onChangeProject: function (index) {

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

        this.changeProject(index);

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

  transitions: {},

  components: {}
});

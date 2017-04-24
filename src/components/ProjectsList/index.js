'use strict';

import './styles.scss';

import EventManagerMixin from 'mixins/EventManagerMixin';

import {
  changeProject
} from 'vuex/projectNumber/actions';

import {
  projectNumber
} from 'vuex/projectNumber/getters';

import projectsData from 'config/projectsData';

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

  emitterEvents: [],

  domEvents: [],

  data() {

    return {
      projectsData: projectsData,
      _hidden: null
    };
  },

  ready() {
  },

  methods: {
    onChangeProject: function (index) {

      this.changeProject(index);

      const projectCoverContainer = document.querySelector('.projectsLeftSide__cover');
      const projectCover = document.querySelector('.projectsLeftSide__mask');

      projectCover.classList.remove('projectsLeftSide__mask');
      void projectCover.offsetWidth;
      projectCover.classList.add('projectsLeftSide__mask');

      projectCoverContainer.classList.remove('projectsLeftSide__cover');
      void projectCover.offsetWidth;
      projectCoverContainer.classList.add('projectsLeftSide__cover');

    }
  },

  transitions: {},

  components: {}
});

'use strict';

import './styles.scss';

import EventManagerMixin from 'mixins/EventManagerMixin';

import projectsData from 'config/projectsData';

import {
  projectNumber
} from 'vuex/projectNumber/getters';

import {
  fromCase
} from 'vuex/status/getters';

export default Vue.extend({

  mixins: [ EventManagerMixin ],

  template: require( './template.html' ),

  vuex: {
    getters: {
      projectNumber: projectNumber,
      fromCase: fromCase
    }
  },

  emitterEvents: [],

  domEvents: [],

  data() {

    return {
      _hidden: null
    };
  },

  computed: {
    projectCover: function () {

      return {
        backgroundImage: `url('./images/${projectsData[this.projectNumber-1].imageCover}')`
      };
    },

    isReleased: function () {

      return projectsData[this.projectNumber-1].released;
    },

    projectSlug: function () {

      return projectsData[this.projectNumber-1].slug;
    }
  },

  ready() {

    if(!this.fromCase) {
      const cover = document.querySelector('.projectsLeftSide__cover');
      const coverMask = document.querySelector('.projectsLeftSide__mask');
      const about = document.querySelector('.projectsLeftSide__about');

      setTimeout(() => {
        cover.classList.add('projectsLeftSide__cover--enter');
        coverMask.classList.add('projectsLeftSide__mask--enter');
      }, 500);

      setTimeout(() => {
        about.classList.add('projectsLeftSide__about--enter');
      }, 2100);
    }
  },

  methods: {},

  transitions: {},

  components: {}
});

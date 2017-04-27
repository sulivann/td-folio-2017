'use strict';

import './styles.scss';

import EventManagerMixin from 'mixins/EventManagerMixin';

import projectsData from 'config/projectsData';

import {
  changeProject
} from 'vuex/projectNumber/actions';

import {
  projectNumber
} from 'vuex/projectNumber/getters';

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

  ready() {},

  methods: {},

  transitions: {},

  components: {}
});

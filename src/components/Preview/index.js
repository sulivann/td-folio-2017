'use strict';

import './styles.scss';

import EventManagerMixin from 'mixins/EventManagerMixin';

import projectsData from 'config/projectsData';

import {
  projectNumber
} from 'vuex/projectNumber/getters';

export default Vue.extend({

  mixins: [ EventManagerMixin ],

  template: require( './template.html' ),

  vuex: {
    getters: {
      projectNumber: projectNumber
    }
  },

  emitterEvents: [],

  domEvents: [],

  data() {

    return {
      projectsData: projectsData,
      nextProject: this.returnNextProject(),
      _hidden: null
    };
  },

  computed: {
    projectCover: function () {

      return {
        backgroundImage: `url('./images/${projectsData[this.nextProject-1].imageCover}')`
      };
    },

    isReleased: function () {

      return projectsData[this.nextProject].released;
    },

    projectSlug: function () {

      return projectsData[this.nextProject].slug;
    }
  },

  ready() {},

  methods: {


    returnNextProject() {
      if (this.projectNumber >= projectsData.length) {
        return 1;
      }
      else {
        return this.projectNumber+1;
      }
    }
  },

  transitions: {},

  components: {}
});

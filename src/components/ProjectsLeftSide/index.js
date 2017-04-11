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
      aboutUrl: '#',
      projectCover: {

      },
      _hidden: null
    };
  },

  computed: {
    projectCover: function () {

      return {
        backgroundImage: `url('/images/${projectsData[this.projectNumber-1].imageCover}')`
      };
    }
  },

  ready() {},

  methods: {},

  transitions: {},

  components: {}
});

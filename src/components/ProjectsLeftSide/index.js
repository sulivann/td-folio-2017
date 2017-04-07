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

    const projectCover = projectsData[this.projectNumber-1].imageCover;

    return {
      aboutUrl: '#',
      projectCover: {
        backgroundImage: `url('/images/${projectCover}')`
      },
      _hidden: null
    };
  },

  ready() {},

  methods: {},

  transitions: {},

  components: {}
});

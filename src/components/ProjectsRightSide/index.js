'use strict';

import './styles.scss';

import EventManagerMixin from 'mixins/EventManagerMixin';

import {
  changeProject
} from 'vuex/projectNumber/actions';

import {
  projectNumber
} from 'vuex/projectNumber/getters';

import {
  updateLoaded,
  updateInteraction
} from 'vuex/status/actions';

import {
  loaded,
  interaction
} from 'vuex/status/getters';

import ProjectsList from 'components/ProjectsList';

export default Vue.extend({

  mixins: [ EventManagerMixin ],

  template: require( './template.html' ),

  vuex: {
    getters: {
      projectNumber: projectNumber,
      interaction: interaction,
      loaded: loaded
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
      _hidden: null
    };
  },

  ready() {},

  methods: {},

  transitions: {},

  components: {
    'projects-list': ProjectsList
  }
});

'use strict';

import './styles.scss';

import EventManagerMixin from 'mixins/EventManagerMixin';

import {
  changeProject
} from 'vuex/projectNumber/actions';

import {
  projectNumber
} from 'vuex/projectNumber/getters';

import ProjectsList from 'components/ProjectsList';

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

  ready() {},

  methods: {},

  transitions: {},

  components: {
    'projects-list': ProjectsList
  }
});

'use strict';

import './styles.scss';

import EventManagerMixin from 'mixins/EventManagerMixin';

import {
  changeProject
} from 'vuex/projectNumber/actions';

import {
  projectNumber
} from 'vuex/projectNumber/getters';

export default Vue.extend({

  props: ['projectData'],

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
  },

  ready() {
    setTimeout( () => {
      const firstElement = document.querySelector('.projectShow__element');

      firstElement.classList.add('projectShow__element--enter');
    }, 1250);
  },

  methods: {},

  transitions: {},

  components: {}
});

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

    const title = document.querySelectorAll('.projectHeader__titleTypo');
    const presentation = document.querySelector('.projectHeader__description');
    const links = document.querySelectorAll('.projectHeader__link');

    setTimeout(() => {
      for (const el of title) {
        el.classList.add('projectHeader__titleTypo--enter');
      }
    }, 500);

    setTimeout(() => {
      presentation.classList.add('projectHeader__description--enter');
    }, 1250);

    setTimeout(() => {
      for (const el of links) {
        el.classList.add('projectHeader__link--enter');
      }
    }, 1600);
  },

  methods: {},

  transitions: {},

  components: {}
});

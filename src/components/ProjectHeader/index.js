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

  ready() {},

  methods: {

    changePage(page) {
      const project = document.querySelector('.project');

      project.classList.add('project--out');

      setTimeout(() => {
        if (page == 'works') {
          this.$router.go('/');
        } else if (page == 'about') {
          this.$router.go('/about');
        }
      }, 700);
    }
  },

  transitions: {},

  components: {}
});

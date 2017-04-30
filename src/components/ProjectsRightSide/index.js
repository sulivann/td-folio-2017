'use strict';

import './styles.scss';

import EventManagerMixin from 'mixins/EventManagerMixin';


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
    }
  },

  emitterEvents: [],

  domEvents: [],

  data() {

    return {
      _hidden: null
    };
  },

  ready() {

    const selectedWorks = document.querySelectorAll('.projectsRightSide__typo');
    const projectNumber = document.querySelector('.projectRightSide__selectedNumber');

    setTimeout(() => {
      for(const el of selectedWorks) {
        el.classList.add('projectsRightSide__typo--enter');
      }
    }, 1100);

    setTimeout(() => {
      projectNumber.classList.add('projectRightSide__selectedNumber--enter');
    }, 2100);

  },

  methods: {},

  transitions: {},

  components: {
    'projects-list': ProjectsList
  }
});

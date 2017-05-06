'use strict';

import './styles.scss';

import EventManagerMixin from 'mixins/EventManagerMixin';


import {
  projectNumber
} from 'vuex/projectNumber/getters';

import {
  fromCase
} from 'vuex/status/getters';

import ProjectsList from 'components/ProjectsList';

export default Vue.extend({

  mixins: [ EventManagerMixin ],

  template: require( './template.html' ),

  vuex: {
    getters: {
      projectNumber: projectNumber,
      fromCase: fromCase
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

    // if(!this.fromCase) {
    //   const selectedWorks = document.querySelectorAll('.projectsRightSide__typo');
    //   const projectNumber = document.querySelector('.projectRightSide__selectedNumber');
    //   const projectsRightSide = document.querySelector('.projectsRightSide');
    //
    //   setTimeout(() => {
    //     projectsRightSide.classList.add('projectsRightSide--enter');
    //   }, 500);
    //
    //   setTimeout(() => {
    //     for(const el of selectedWorks) {
    //       el.classList.add('projectsRightSide__typo--enter');
    //     }
    //   }, 1100);
    //
    //   setTimeout(() => {
    //     projectNumber.classList.add('projectRightSide__selectedNumber--enter');
    //   }, 2100);
    // }
  },

  methods: {},

  transitions: {},

  components: {
    'projects-list': ProjectsList
  }
});

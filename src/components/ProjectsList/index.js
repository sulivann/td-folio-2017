'use strict';

import './styles.scss';

import EventManagerMixin from 'mixins/EventManagerMixin';

import ProjectsData from 'config/projectsData';

export default Vue.extend({

  mixins: [ EventManagerMixin ],

  template: require( './template.html' ),

  emitterEvents: [],

  domEvents: [],

  data() {

    return {
      projectsData: ProjectsData,
      _hidden: null
    };
  },

  ready() {
  },

  methods: {
    triggerProject: function (e) {

      const selectedEl = document.getElementsByClassName('projectsList__name--selected')[0];
      const activeDiscover = selectedEl.nextElementSibling;

      /*eslint-disable*/
      console.log(this.scrolled);
      /*eslint-enable*/

      selectedEl.classList.add('projectsList__name');
      selectedEl.classList.remove('projectsList__name--selected');

      e.target.classList.add('projectsList__name--selected');
      e.target.classList.remove('projectsList__name');

      activeDiscover.classList.add('projectsList__discover');
      activeDiscover.classList.remove('projectsList__discover--active');

      e.target.nextElementSibling.classList.add('projectsList__discover--active');
      e.target.nextElementSibling.classList.remove('projectsList__discover');

    }
  },

  transitions: {},

  components: {}
});

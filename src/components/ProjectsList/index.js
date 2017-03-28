'use strict';

import './styles.scss';

import EventManagerMixin from 'mixins/EventManagerMixin';

export default Vue.extend({

  mixins: [ EventManagerMixin ],

  template: require( './template.html' ),

  emitterEvents: [],

  domEvents: [],

  data() {

    return {
      _hidden: null
    };
  },

  ready() {},

  methods: {
    triggerProject: function (e) {
      /*eslint-disable*/
      const el = document.getElementsByClassName('projectsList__name--selected');

      el[0].classList.add('projectsList__name');
      el[0].classList.remove('projectsList__name--selected');

      e.target.classList.add('projectsList__name--selected');
      e.target.classList.remove('projectsList__name');
      /*eslint-enable*/
    }
  },

  transitions: {},

  components: {}
});

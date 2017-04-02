'use strict';

import './styles.scss';

import EventManagerMixin from 'mixins/EventManagerMixin';

import ProjectsList from 'components/ProjectsList';

export default Vue.extend({

  mixins: [ EventManagerMixin ],

  template: require( './template.html' ),

  emitterEvents: [],

  domEvents: [],

  data() {

    return {
      projectNumber: 1,
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

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

  methods: {},

  transitions: {},

  components: {}
});

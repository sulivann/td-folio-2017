'use strict';

import './styles.scss';

import EventManagerMixin from 'mixins/EventManagerMixin';

//import projectsData from 'config/projectsData';

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

  computed: {
  },

  ready() {},

  methods: {},

  transitions: {},

  components: {}
});

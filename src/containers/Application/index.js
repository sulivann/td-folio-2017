'use strict';

import EventManagerMixin from 'mixins/EventManagerMixin';

import States from 'core/States';

import store from 'vuex/store';

export default Vue.extend({

  store,

  mixins: [EventManagerMixin],

  template: require('./template.html'),

  emitterEvents: [],

  data() {

    return {
    };
  },

  ready() {

    this.addDeviceClass();
    this.addBrowserClass();
  },

  methods: {

    addBrowserClass() {
      this.$el.classList.add(States.browserName + '-browser');
    },

    addDeviceClass() {
      this.$el.classList.add(States.deviceType + '-device');
    }
  }
});

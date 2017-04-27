'use strict';

import Vuex from 'vuex';
import projectNumberStore from 'vuex/projectNumber/store';
import statusStore from 'vuex/status/store';
import createLogger from 'vuex/logger';

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production';

export default new Vuex.Store({
  modules: {
    projectNumberStore,
    statusStore
  },
  strict: debug,
  middlewares: debug ? [createLogger()] : []
});

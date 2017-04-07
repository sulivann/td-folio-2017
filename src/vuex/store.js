'use strict';

import Vuex from 'vuex';
import projectNumberStore from 'vuex/projectNumber/store';
import createLogger from 'vuex/logger';

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production';

export default new Vuex.Store({
  modules: {
    projectNumberStore
  },
  strict: debug,
  middlewares: debug ? [createLogger()] : []
});

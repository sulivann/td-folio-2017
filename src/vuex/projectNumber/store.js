'use strict';

import {
  CHANGE_PROJECT,
  RESET_PREVIOUS
} from '../mutation-types';

const state = {
  projectNumber: 1,
  prevProjectNumber: 0
};

const mutations = {
  [ CHANGE_PROJECT ] (state, n) {
    state.prevProjectNumber = state.projectNumber;
    state.projectNumber = n;
  },

  [ RESET_PREVIOUS ] () {
    state.prevProjectNumber = 0;
  }
};

export default {
  state,
  mutations
};

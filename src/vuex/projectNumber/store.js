'use strict';

import {
  CHANGE_PROJECT
} from '../mutation-types';

const state = {
  projectNumber: 1,
  prevProjectNumber: 0
};

const mutations = {
  [ CHANGE_PROJECT ] (state, n) {
    state.prevProjectNumber = state.projectNumber;
    state.projectNumber = n;
  }
};

export default {
  state,
  mutations
};

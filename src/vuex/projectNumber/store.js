'use strict';

import {
  CHANGE_PROJECT
} from '../mutation-types';

const state = {
  projectNumber: 1
};

const mutations = {
  [ CHANGE_PROJECT ] (state, n) {
    state.projectNumber = n;
  }
};

export default {
  state,
  mutations
};

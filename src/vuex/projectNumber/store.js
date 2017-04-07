'use strict';

import {
  CHANGE_PROJECT
} from '../mutation-types';

const state = {
  projectNumber: 1
};

const mutations = {
  [ CHANGE_PROJECT ] (state, {number}) {
    state.projectNumber = number;
  }
};

export default {
  state,
  mutations
};

'use strict';

import {
  UPDATE_INTERACTION
} from '../mutation-types';

const state = {
  interaction: false
};

const mutations = {
  [ UPDATE_INTERACTION ] () {
    state.interaction = true;
  }
};

export default {
  state,
  mutations
};

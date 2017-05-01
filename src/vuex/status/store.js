'use strict';

import {
  UPDATE_INTERACTION,
  RESET_INTERACTION
} from '../mutation-types';

const state = {
  interaction: false
};

const mutations = {
  [ UPDATE_INTERACTION ] () {
    state.interaction = true;
  },

  [ RESET_INTERACTION ] () {
    state.interaction = false;
  }
};

export default {
  state,
  mutations
};

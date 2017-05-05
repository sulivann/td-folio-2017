'use strict';

import {
  UPDATE_INTERACTION,
  RESET_INTERACTION,
  UPDATE_FROMCASE,
  RESET_FROMCASE
} from '../mutation-types';

const state = {
  interaction: false,
  fromCase: false
};

const mutations = {
  [ UPDATE_INTERACTION ] () {
    state.interaction = true;
  },
  [ RESET_INTERACTION ] () {
    state.interaction = false;
  },
  [ UPDATE_FROMCASE ] () {
    state.fromCase = true;
  },
  [ RESET_FROMCASE ] () {
    state.fromCase = false;
  }

};

export default {
  state,
  mutations
};

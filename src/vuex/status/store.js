'use strict';

import {
  UPDATE_INTERACTION,
  RESET_INTERACTION,
  UPDATE_FROMCASE,
  RESET_FROMCASE,
  UPDATE_ASSETS
} from '../mutation-types';

const state = {
  interaction: false,
  fromCase: false,
  assets: false
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
  },
  [ UPDATE_ASSETS ] () {
    state.assets = true;
  }


};

export default {
  state,
  mutations
};

'use strict';

import {
  UPDATE_LOADED,
  UPDATE_INTERACTION
} from '../mutation-types';

const state = {
  loaded: false,
  interaction: false
};

const mutations = {
  [ UPDATE_LOADED ] () {
    state.loaded = true;
  },
  [ UPDATE_INTERACTION ] () {
    state.interaction = true;
  }
};

export default {
  state,
  mutations
};

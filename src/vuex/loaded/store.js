'use strict';

import {
  UPDATE_LOADED
} from '../mutation-types';

const state = {
  loaded: false
};

const mutations = {
  [ UPDATE_LOADED ] () {
    state.loaded = true;
  }
};

export default {
  state,
  mutations
};

'use strict';

import * as types from '../mutation-types';

export const updateLoaded = ({ dispatch }, n) => {
  dispatch(types.UPDATE_LOADED, n);
};

'use strict';

import * as types from '../mutation-types';

export const updateInteraction = ({ dispatch }, n) => {
  dispatch(types.UPDATE_INTERACTION, n);
};

'use strict';

import * as types from '../mutation-types';

export const updateInteraction = ({ dispatch }, n) => {
  dispatch(types.UPDATE_INTERACTION, n);
};

export const resetInteraction = ({ dispatch }, n) => {
  dispatch(types.RESET_INTERACTION, n);
};

export const updateFromCase = ({ dispatch }, n) => {
  dispatch(types.UPDATE_FROMCASE, n);
};

export const resetFromCase = ({ dispatch }, n) => {
  dispatch(types.RESET_FROMCASE, n);
};

'use strict';

import * as types from '../mutation-types';

export const changeProject = ({ dispatch }, n) => {
  dispatch(types.CHANGE_PROJECT, n);
};

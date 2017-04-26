'use strict';

export const projectNumber = (state) => {
  return state.projectNumberStore.projectNumber;
};

export const prevProjectNumber = (state) => {
  return state.projectNumberStore.prevProjectNumber;
};

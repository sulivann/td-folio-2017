'use strict';

export const interaction = (state) => {
  return state.statusStore.interaction;
};

export const fromCase = (state) => {
  return state.statusStore.fromCase;
};

export const assets = (state) => {
  return state.statusStore.assets;
};

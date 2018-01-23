import { HISTORY, RESULT, STRUCTURE } from './constants';

export const addStructure = arr => ({
  type: STRUCTURE.ADD_STRUCTURE, arr,
});

export const editStructure = (cml, base64) => ({
  type: STRUCTURE.EDIT_STRUCTURE, cml, base64,
});

export const addSelectModel = model => ({
  type: STRUCTURE.ADD_SELECTED_MODEL, model,
});


export const addResult = arr => ({
  type: RESULT.ADD, arr,
});

export const addHistory = arr => ({
  type: HISTORY.ADD, arr,
});

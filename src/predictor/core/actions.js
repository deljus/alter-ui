import { HISTORY, RESULT, STRUCTURE } from './constants';

export const addStructure = arr => ({
  type: STRUCTURE.ADD_STRUCTURE, arr,
});

export const deleteStructure = id => ({
    type: STRUCTURE.DELETE_STRUCTURE, id,
});

export const editStructure = arr => ({
  type: STRUCTURE.EDIT_STRUCTURE, arr,
});

export const addStructures = arr => ({
    type: STRUCTURE.ADD_STRUCTURES, arr,
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

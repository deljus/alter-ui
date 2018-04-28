import * as CONST from './constants';

// Index page actions
export const addStructureIndex = arr => ({
  type: CONST.ADD_STRUCTURE_INDEX, arr,
});

export const deleteStructureIndex = id => ({
  type: CONST.DELETE_STRUCTURE_INDEX, id,
});

export const editStructureIndex = arr => ({
  type: CONST.EDIT_STRUCTURE_INDEX, arr,
});


// Validate page actions
export const addStructuresValidate = arr => ({
  type: CONST.ADD_STRUCTURES_VALIDATE, arr,
});

export const chekedStructure = (id, check) => ({
  type: CONST.CHECK_STRUCTURE, id,
});

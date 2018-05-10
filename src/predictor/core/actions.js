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

export const addStructuresResult = arr => ({
  type: CONST.ADD_STRUCTURE_RESULT, arr,
});


export const addAllAdditives = additives => ({
  type: CONST.ADD_ALL_ADDITIVES, additives,
});

// Add all models
export const addAllModels = models => ({
  type: CONST.ADD_ALL_MODELS, models,
});
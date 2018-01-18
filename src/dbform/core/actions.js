import { ADD_STRUCTURE, ADD_STRUCTURES, EDIT_STRUCTURE, DELETE_STRUCTURE } from './constants';

export const addStructures = structures => ({
  type: ADD_STRUCTURES, structures,
});

export const deleteStructure = id => ({
  type: DELETE_STRUCTURE, id,
});

import { combineReducers } from 'redux';
import * as CONST from './constants';
import { request, modal } from '../../base/reducers';

const indexPageStructure = (state = [], action) => {
  switch (action.type) {
    case CONST.ADD_STRUCTURE_INDEX:
      return [
        {
          id: state.reduce((maxId, task) => Math.max(task.id, maxId), -1) + 1,
          ...action.arr,
        },
        ...state,
      ];
    case CONST.DELETE_STRUCTURE_INDEX:
      return state.filter(structure => structure.id !== action.id);
    case CONST.EDIT_STRUCTURE_INDEX:
      return state.map(structure =>
        (structure.id === action.arr.id ?
          { ...action.arr } :
          structure),
      );
    default:
      return state;
  }
};

const validatePageStructure = (state = [], action) => {
  switch (action.type) {
    case CONST.ADD_STRUCTURES_VALIDATE:
      return action.arr;
    default:
      return state;
  }
};

const allAdditives = (state = [], action) => {
  switch (action.type) {
    case CONST.ADD_ALL_ADDITIVES:
      return action.additives;
    default:
      return state;
  }
};

const allModels = (state = [], action) => {
  switch (action.type) {
    case CONST.ADD_ALL_MODELS:
      return action.models;
    default:
      return state;
  }
};


const resultPageStructure = (state = [], action) => {
  switch (action.type) {
    case CONST.ADD_STRUCTURE_RESULT:
      return action.arr.map((s, i) => ({ id: i, ...s }));
    default:
      return state;
  }
};


export default combineReducers({
  modal,
  allModels,
  allAdditives,
  request,
  indexPageStructure,
  validatePageStructure,
  resultPageStructure,
});

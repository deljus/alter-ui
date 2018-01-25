import { combineReducers } from 'redux';
import { HISTORY, RESULT, STRUCTURE, TRIGGER, REQUEST } from './constants';
import { request, modal } from '../../base/reducers';

const histories = (state = [], action) => {
  switch (action.type) {
    case HISTORY.ADD:
      state.push(action.arr);
      return state;
    default:
      return state;
  }
};

const results = (state = null, action) => {
  switch (action.type) {
    case RESULT.ADD:
      return action.arr;

    default:
      return state;
  }
};

let i = 0;

const structure = (state = [], action) => {
  switch (action.type) {
    case STRUCTURE.ADD_STRUCTURE:
      return [
        {
          id: i++,
          ...action.arr,
        },
        ...state,
      ];
    case STRUCTURE.ADD_STRUCTURES:
      return action.arr;
    case STRUCTURE.DELETE_STRUCTURE:
      return state.filter(structure => structure.id !== action.id);
    case STRUCTURE.EDIT_STRUCTURE:
      return state.map(structure =>
        (structure.id === action.arr.id ?
          { ...action.arr } :
          structure),
      );
    default:
      return state;
  }
};


export default combineReducers({
  modal,
  request,
  structure,
  results,
  histories,
});

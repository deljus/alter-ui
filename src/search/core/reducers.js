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

const structure = (state = null, action) => {
  switch (action.type) {
    case STRUCTURE.ADD_STRUCTURE:
      return action.arr;
    case STRUCTURE.ADD_SELECTED_MODEL:
      return { ...state, selectModel: action.model };
    case STRUCTURE.EDIT_STRUCTURE:
      return { ...state, cml: action.cml, base64: action.base64, revalidateStructure: true };
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

import { combineReducers } from 'redux';
import { HISTORY, RESULT, STRUCTURE, TRIGGER, MODELS, REQUEST } from './constants';

const histories = (state = [], action) => {
  switch (action.type) {
    case HISTORY.ADD:
      state.push(action.arr);
      return state;
    default:
      return state;
  }
};

const modal = (state = { visible: false }, action) => {
  switch (action.type) {
    case TRIGGER:
      return {
        visible: action.bool,
        typeAction: action.typeAction,
        cml: action.cml,
      };
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

const requestState = {
  loading: false,
  error: false,
  errorText: '',
  lastActions: '',
};

const request = (state = requestState, action) => {
  switch (action.type) {
    case REQUEST.START_REQUEST:
      return { loading: true, error: false, errorText: '', lastActions: '' };

    case REQUEST.SUCCESS_REQUEST:
      return { loading: false, error: false, errorText: '', lastActions: '' };

    case REQUEST.ERROR_REQUEST:
      return { loading: false, error: true, errorText: action.errText, lastActions: action.lastActions };

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

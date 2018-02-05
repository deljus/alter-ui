import { combineReducers } from 'redux';
import { ADD_STRUCTURE, ADD_STRUCTURES, EDIT_STRUCTURE, DELETE_STRUCTURE, TRIGGER_MODAL, ADD_SETTINGS } from './constants';
import { request } from '../../base/reducers';

export const structures = (state = [], action) => {
  switch (action.type) {
    case ADD_STRUCTURE:
      return [
        ...state,
        {
          ...action.structure,
        },
      ];

    case ADD_STRUCTURES:
      return action.structures;

    case EDIT_STRUCTURE:
      return state.map(structure =>
        (structure.id === action.structure.id ?
          { ...action.structure } :
          structure),
      );

    case DELETE_STRUCTURE:
      return state.filter(apple =>
        apple.id !== action.id,
      );

    default:
      return state;
  }
};

const modal = (state = { visible: false }, action) => {
  switch (action.type) {
    case TRIGGER_MODAL:
      return {
        ...action,
      };
    default:
      return state;
  }
};

const defaultSettings = {
  tabs: {
    tabPosition: 'top',
    size: 'large',
  },
  grid: {
    xs: 1,
    sm: 2,
    md: 3,
    lg: 3,
    xl: 3,
  },
  condition: {
    temperature: 298,
    pressure: 1,
  },
  auto_reset: false,
};

export const settings = (state = defaultSettings, action) => {
  switch (action.type) {
    case ADD_SETTINGS:
      return { ...action.settings };
    default:
      return state;
  }
};

export default combineReducers({
  request,
  structures,
  modal,
  settings,
});

import { combineReducers } from 'redux';
import { ADD_STRUCTURE, ADD_STRUCTURES, EDIT_STRUCTURE, DELETE_STRUCTURE, TRIGGER_MODAL, ADD_SETTINGS, ADD_FIELDS } from './constants';
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
  dbfields: [],
  tableFields: ['molecule', 'reaction'],
};

function getSettings() {
  let state;
  const settigsOnStorageJson = localStorage.getItem('settings');
  if (settigsOnStorageJson === null) state = defaultSettings;
  else state = JSON.parse(settigsOnStorageJson);
  return state;
}

export const settings = (state = getSettings(), action) => {
  switch (action.type) {
    case ADD_SETTINGS:
      return { ...action.settings };
    case ADD_FIELDS:
      return { ...state, dbfields: action.fields };
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

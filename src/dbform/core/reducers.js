import { combineReducers } from 'redux';
import { ADD_STRUCTURE, ADD_STRUCTURES, EDIT_STRUCTURE, DELETE_STRUCTURE } from './constants';

export const structures = (state = [], action) => {
  switch (action.type) {
    case ADD_STRUCTURE:
      return [
        {
          ...action.department,
        },
        ...state,
      ];

    case ADD_STRUCTURES:
      return action.structures;

    case EDIT_STRUCTURE:
      return state.map(department =>
        (department.id === action.id ?
          { ...department, ...action.department } :
          department),
      );

    case DELETE_STRUCTURE:
      return state.filter(apple =>
        apple.id !== action.id,
      );

    default:
      return state;
  }
};


export default combineReducers({
    structures
});
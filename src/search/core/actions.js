import { HISTORY, RESULT, STRUCTURE, TRIGGER, REQUEST } from './constants';

export const addStructure = arr => ({
  type: STRUCTURE.ADD_STRUCTURE, arr,
});

export const editStructure = (cml, base64) => ({
  type: STRUCTURE.EDIT_STRUCTURE, cml, base64,
});

export const addSelectModel = model => ({
  type: STRUCTURE.ADD_SELECTED_MODEL, model,
});


export const addResult = arr => ({
  type: RESULT.ADD, arr,
});

export const modal = (bool, typeAction) => ({
  type: TRIGGER, bool, typeAction,
});

export const addHistory = arr => ({
  type: HISTORY.ADD, arr,
});

// Request actions

export const startRequest = () => ({
  type: REQUEST.START_REQUEST,
});

export const succsessRequest = () => ({
  type: REQUEST.SUCCESS_REQUEST,
});

export const errorRequest = (errText, lastActions) => ({
  type: REQUEST.ERROR_REQUEST, errText, lastActions,
});

import { REQUEST } from './constants';

export const startRequest = () => ({
  type: REQUEST.START_REQUEST,
});

export const succsessRequest = () => ({
  type: REQUEST.SUCCESS_REQUEST,
});

export const errorRequest = (errText, lastActions) => ({
  type: REQUEST.ERROR_REQUEST, errText, lastActions,
});

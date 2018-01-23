import { delay } from 'redux-saga';
import { call } from 'redux-saga/effects';
import { REPEATED_REQUESTS } from '../config';

function* repeatedRequests(request, data) {
  let error;
  for (let i = 1; i <= REPEATED_REQUESTS.RETRY; i += 1) {
    try {
      const responseData = yield call(request, data);
      return responseData;
    } catch (err) {
      error = err;
      if (i < REPEATED_REQUESTS.RETRY) {
        yield call(delay, REPEATED_REQUESTS.TIMEOUT);
      }
    }
  }
  throw new Error(error);
}

export default repeatedRequests;

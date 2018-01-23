import { delay } from 'redux-saga';
import { takeEvery, put, call } from 'redux-saga/effects';
import { addStructure, addHistory, addResult, editStructure } from './actions';
import { startRequest, succsessRequest, errorRequest, modal } from '../../base/actions';
import Request from '../../base/requests';
import history from '../../base/history';
import { URLS, MODAL } from '../../config';
import { getUrlParams, stringifyUrl } from '../../base/parseUrl';
import repeatedRequests from '../../base/repeatedRequests';
import Serialize from '../../base/magic';
import { message } from 'antd';
import { convertCmlToBase64, clearEditor, exportCml, importCml, convertCmlToBase64Arr } from '../../base/marvinAPI';

import 'antd/lib/message/style/css';

function* drawStructure() {
  try {
    yield call(clearEditor);
    yield put(modal(true, MODAL.CREATE_TASK));
  } catch (e) {
    yield call(message.error, e.message);
  }
}

function* createStructure() {
  try {
    const cml = yield call(exportCml);
    yield put(modal(false));
    const base64 = yield call(convertCmlToBase64, cml);
    yield put(addStructure({ data: cml, base64 }));
  } catch (e) {
    yield call(message.error, e.message);
  }
}


export function* sagas() {
  // yield takeEvery('CREATE_TASK', createTask);
  // yield takeEvery('INIT_VALIDATE_PAGE', validateTask);
  // yield takeEvery('CREATE_RESULT_TASK', createResultTask);
  // yield takeEvery('INIT_RESULT_PAGE', resultPage);
  yield takeEvery('DRAW_STRUCTURE', drawStructure);
  yield takeEvery('CREATE_TASK_SEARCH', createStructure);
  // yield takeEvery('EDIT_STRUCTURE_1', editStructureR);
  // yield takeEvery('EDIT_TASK_SEARCH', editTaskStructure);
  // yield takeEvery('REVALIDATE_TASK', revalidateTask);
}

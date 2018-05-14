import { takeEvery, put, call, fork, take } from 'redux-saga/effects';
import { addStructure, addHistory, addResult, editStructure } from './actions';
import { modal } from '../../base/actions';
import * as Request from '../../base/requests';
import history from '../../base/history';
import { URLS, MODAL } from '../../config';
import { getUrlParams, stringifyUrl } from '../../base/parseUrl';
import { repeatedRequests, requestSaga, catchErrSaga, requestSagaContinius } from '../../base/sagas';
import * as Serialize from '../../base/magic';
import { convertCmlToBase64, clearEditor, exportCml, importCml, convertCmlToBase64Arr } from '../../base/marvinAPI';
import {
  SAGA_CREATE_RESULT_TASK,
  SAGA_CREATE_TASK,
  SAGA_CREATE_TASK_SEARCH,
  SAGA_DRAW_STRUCTURE,
  SAGA_EDIT_STRUCTURE_1,
  SAGA_EDIT_TASK_SEARCH,
  SAGA_INIT_RESULT_PAGE,
  SAGA_INIT_VALIDATE_PAGE,
  SAGA_REVALIDATE_TASK,
} from './constants';

// Index Page

function* createTask({ data }) {
  const response = yield call(Request.createSearchTask, { data });
  yield call(history.push, stringifyUrl(URLS.VALIDATE, { task: response.data.task }));
}

function* drawStructure() {
  yield call(clearEditor);
  yield put(modal(true, MODAL.CREATE_TASK));
}

// Validate Page

function* validateTask() {
  const urlParams = yield getUrlParams();
  const task = yield call(repeatedRequests, Request.getSearchTask, urlParams.task);
  const models = yield call(Request.getModels);
  const magic = yield call(Request.getMagic);
  const structure = Serialize.models(task.data, models.data, magic.data)[0];
  const base64 = yield call(convertCmlToBase64, structure.cml);
  structure.base64 = base64;
  yield put(addStructure(structure));
}

function* editStructureR(action) {
  yield call(importCml, action.cml);
  yield put(modal(true, MODAL.EDIT_TASK));
}

function* revalidateTask(action) {
  yield call(createTask, action);
  yield call(validateTask);
}

function* createResultTask(action) {
  const urlParams = getUrlParams();
  const response = yield call(Request.createResultTask, { models: [{ model: action.structure.selectModel, data: action.structure.cml }], structure: 1 }, urlParams.task);
  const resultTaskId = response.data.task;
  action.structure.validateTaskId = urlParams.task;
  action.structure.resultTaskId = resultTaskId;
  yield put(addHistory(action.structure));
  yield call(history.push, stringifyUrl(URLS.RESULT, { task: resultTaskId }));
}

// Result page

function* resultPage() {
  const urlParams = yield getUrlParams();
  const responce = yield call(repeatedRequests, Request.getResultTask, urlParams.task);
  const results = yield call(convertCmlToBase64Arr, responce.data.structures, { width: 700, height: 450, typeImg: 'image/png' });
  yield put(addResult(results));
}


function* createStructure() {
  const cml = yield call(exportCml);
  yield put(modal(false));
  yield put({ type: SAGA_CREATE_TASK, cml });
}

function* editTaskStructure() {
  const cml = yield call(exportCml);
  const base64 = yield call(convertCmlToBase64, cml);
  yield put(modal(false));
  yield put(editStructure(cml, base64));
}


export function* sagas() {
  // Index Page
  yield takeEvery(SAGA_CREATE_TASK, requestSagaContinius, createTask);
  yield takeEvery(SAGA_DRAW_STRUCTURE, catchErrSaga, drawStructure);
  // Validate Page
  yield takeEvery(SAGA_INIT_VALIDATE_PAGE, requestSaga, validateTask);
  yield takeEvery(SAGA_EDIT_STRUCTURE_1, catchErrSaga, editStructureR);
  yield takeEvery(SAGA_REVALIDATE_TASK, revalidateTask);
  yield takeEvery(SAGA_CREATE_RESULT_TASK, requestSagaContinius, createResultTask);
  // Result Page
  yield takeEvery(SAGA_INIT_RESULT_PAGE, requestSaga, resultPage);


  yield takeEvery(SAGA_CREATE_TASK_SEARCH, catchErrSaga, createStructure);
  yield takeEvery(SAGA_EDIT_TASK_SEARCH, catchErrSaga, editTaskStructure);
}

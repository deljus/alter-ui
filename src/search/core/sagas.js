import { takeEvery, put, call, fork, take } from 'redux-saga/effects';
import { message } from 'antd';
import { addStructure, addHistory, addResult, editStructure } from './actions';
import { startRequest, succsessRequest, errorRequest, modal } from '../../base/actions';
import Request from '../../base/requests';
import history from '../../base/history';
import { URLS, MODAL, API_URLS } from '../../config';
import { getUrlParams, stringifyUrl } from '../../base/parseUrl';
import { repeatedRequests, subSSE } from '../../base/sagas';
import * as Serialize from '../../base/magic';
import { convertCmlToBase64, clearEditor, exportCml, importCml, convertCmlToBase64Arr } from '../../base/marvinAPI';

function* createTask(action) {
  try {
    yield put(startRequest());
    const response = yield call(Request.createSearchTask, { data: action.cml });
    yield put(succsessRequest());
    yield call(history.push, stringifyUrl(URLS.VALIDATE, { task: response.data.task }));
  } catch (e) {
    yield put(errorRequest(e.message, action));
  }
}

function* validateTask(action) {
  try {
    yield put(startRequest());
    const urlParams = yield getUrlParams();
    const task = yield call(repeatedRequests, Request.getSearchTask, urlParams.task);
    const models = yield call(Request.getModels);
    const magic = yield call(Request.getMagic);
    const structure = Serialize.models(task.data, models.data, magic.data)[0];
    const base64 = yield call(convertCmlToBase64, structure.cml);
    structure.base64 = base64;
    yield put(addStructure(structure));
    yield put(succsessRequest());
  } catch (e) {
    yield put(errorRequest(e.message, action));
  }
}

function* createResultTask(action) {
  try {
    yield put(startRequest());
    const urlParams = getUrlParams();
    const response = yield call(Request.createResultTask, { models: [{ model: action.structure.selectModel, data: action.structure.cml }], structure: 1 }, urlParams.task);
    const resultTaskId = response.data.task;
    action.structure.validateTaskId = urlParams.task;
    action.structure.resultTaskId = resultTaskId;
    yield put(addHistory(action.structure));
    yield put(succsessRequest());
    yield call(history.push, stringifyUrl(URLS.RESULT, { task: resultTaskId }));
  } catch (e) {
    yield put(errorRequest(e.message, action));
  }
}

function* resultPage(action) {
  try {
    yield put(startRequest());
    const urlParams = yield getUrlParams();
    const responce = yield call(repeatedRequests, Request.getResultTask, urlParams.task);
    const results = yield call(convertCmlToBase64Arr, responce.data.structures, { width: 700, height: 450, typeImg: 'image/png' });
    yield put(addResult(results));
    yield put(succsessRequest());
  } catch (e) {
    yield put(errorRequest(e.message, action));
  }
}

function* revalidateTask(action) {
  yield call(createTask, action);
  yield call(validateTask);
}

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
    yield put({ type: 'CREATE_TASK', cml });
  } catch (e) {
    yield call(message.error, e.message);
  }
}

function* editStructureR(action) {
  try {
    yield call(importCml, action.cml);
    yield put(modal(true, MODAL.EDIT_TASK));
  } catch (e) {
    yield call(message.error, e.message);
  }
}

function* editTaskStructure() {
  try {
    const cml = yield call(exportCml);
    const base64 = yield call(convertCmlToBase64, cml);
    yield put(modal(false));
    yield put(editStructure(cml, base64));
  } catch (e) {
    yield call(message.error, e.message);
  }
}


function* sagas() {
  yield takeEvery('CREATE_TASK', createTask);
  yield takeEvery('INIT_VALIDATE_PAGE', validateTask);
  yield takeEvery('CREATE_RESULT_TASK', createResultTask);
  yield takeEvery('INIT_RESULT_PAGE', resultPage);
  yield takeEvery('DRAW_STRUCTURE', drawStructure);
  yield takeEvery('CREATE_TASK_SEARCH', createStructure);
  yield takeEvery('EDIT_STRUCTURE_1', editStructureR);
  yield takeEvery('EDIT_TASK_SEARCH', editTaskStructure);
  yield takeEvery('REVALIDATE_TASK', revalidateTask);
}

function* sseSagas() {
  const eventSrc = new EventSource(API_URLS.SERVER_SIDE_SUBSCRIBE);
  const chan = yield call(subSSE, eventSrc);
  while (true) {
    const msg = yield take(chan);
    console.log(msg);
  }
}

export default function* root() {
  yield [
    fork(sagas),
    fork(sseSagas),
  ];
}

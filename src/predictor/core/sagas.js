import { takeEvery, put, call } from 'redux-saga/effects';
import { addStructureIndex, addStructuresValidate, editStructureIndex, addAllAdditives, addAllModels } from './actions';
import { startRequest, succsessRequest, errorRequest, modal } from '../../base/actions';
import Request from '../../base/requests';
import history from '../../base/history';
import { URLS, MODAL } from '../../config';
import { getUrlParams, stringifyUrl } from '../../base/parseUrl';
import { repeatedRequests } from '../../base/sagas';
import * as Serialize from '../../base/magic';
import { message } from 'antd';
import { convertCmlToBase64, clearEditor, exportCml, convertCmlToBase64Arr } from '../../base/marvinAPI';
import {
  SAGA_EDIT_STRUCTURE_INDEX,
  SAGA_DRAW_STRUCTURE,
  SAGA_CREATE_TASK_SEARCH,
  SAGA_CREATE_TASK_INDEX,
  SAGA_INIT_VALIDATE_PAGE,
  SAGA_CREATE_RESULT_TASK,
} from './constants';

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
    yield put(addStructureIndex({ data: cml, base64 }));
  } catch (e) {
    yield call(message.error, e.message);
  }
}

function* editStructureForModal(action) {
  try {
    const cml = yield call(exportCml);
    yield put(modal(false));
    const base64 = yield call(convertCmlToBase64, cml);
    yield put(editStructureIndex({ id: action.id, data: cml, base64 }));
  } catch (e) {
    yield call(message.error, e.message);
  }
}

function* createTaskIndex(action) {
  try {
    yield put(startRequest());
    const response = yield call(Request.createModellingTask, action.structure);
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
    const additives = yield call(Request.getAdditives);
    const magic = yield call(Request.getMagic);
    const structureAddModel = Serialize.models(task.data, models.data, magic.data);
    const structureAddAdditives = Serialize.additives(structureAddModel, additives.data, magic.data);
    const structureAndBase64 = yield call(convertCmlToBase64Arr, structureAddAdditives);
    yield put(addStructuresValidate(structureAndBase64));
    yield put(addAllAdditives(additives.data));
    yield put(addAllModels(models.data));
    yield put(succsessRequest());
  } catch (e) {
    yield put(errorRequest(e.stack, action));
  }
}

export function* sagas() {
  // yield takeEvery('CREATE_TASK', createTask);
  yield takeEvery(SAGA_INIT_VALIDATE_PAGE, validateTask);
  // yield takeEvery(SAGA_CREATE_RESULT_TASK, createResultTask);
  // yield takeEvery('INIT_RESULT_PAGE', resultPage);
  yield takeEvery(SAGA_DRAW_STRUCTURE, drawStructure);
  yield takeEvery('CREATE_TASK_SEARCH', createStructure);
  yield takeEvery(SAGA_EDIT_STRUCTURE_INDEX, editStructureForModal);
  yield takeEvery(SAGA_CREATE_TASK_INDEX, createTaskIndex);
  // yield takeEvery('EDIT_TASK_SEARCH', editTaskStructure);
  // yield takeEvery('REVALIDATE_TASK', revalidateTask);
}

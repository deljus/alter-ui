import { takeEvery, call, put } from 'redux-saga/effects';
import { Structures } from './requests';
import {addStructures, deleteStructure, addStructure, editStructure, showModal} from './actions';
import { message } from 'antd';

import { convertCmlToBase64, clearEditor, exportCml, importCml, convertCmlToBase64Arr, convertCmlToBase64Obj } from '../../core/marvinAPI';

import 'antd/lib/message/style/css';


function* initStructureListPage(action) {
  try {
    const response = yield call(Structures.getAll);
    const structures = yield call(convertCmlToBase64Arr, response.data);
    yield put(addStructures(structures));
  } catch (e) {
    console.log(e.message);
  }
}

function* addNewStructure(action) {
  try {
    const response = yield call(Structures.add, { data: action.data, params: action.params });
    const base64 = yield call(convertCmlToBase64, response.data.data);
    yield put(addStructure({ base64, ...response.data }));
    yield message.success('Add structure');
  } catch (e) {
    message.error(e.message);
  }
}

function* deleteStructureInList(action) {
  try {
    yield call(Structures.delete, action.id);
    yield put(deleteStructure, action.id );
  } catch (e) {
    console.log(e.message);
  }
}

function* modalDiscard(action) {
  try {
    const response = yield call(Structures.edit, action.id, action.data, action.params);
    const base64 = yield call(convertCmlToBase64, response.data.data);
    yield put(editStructure({ base64, ...response.data }));
    yield put(showModal(false));
  } catch (e) {
    message.error(e.message);
  }
}


export function* sagas() {
  yield takeEvery('INIT_STRUCTURE_LIST_PAGE', initStructureListPage);
  yield takeEvery('ADD_STRUCTURE_SAGA', addNewStructure);
  yield takeEvery('DELETE_STRUCTURE', deleteStructureInList);
  yield takeEvery('MARVIN_MODAL_DISCARD', modalDiscard);
}

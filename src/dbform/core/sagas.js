import { takeEvery, call, put } from 'redux-saga/effects';
import { Structures } from './requests';
import { addStructures, deleteStructure } from './actions';
import { message } from 'antd';

import { convertCmlToBase64, clearEditor, exportCml, importCml, convertCmlToBase64Arr } from '../../core/marvinAPI';

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

function* deleteStructureInList(action) {
  try {
    yield call(Structures.delete(action.id));
    yield put(deleteStructure(action.id));
  } catch (e) {
    console.log(e.message);
  }
}


export function* sagas() {
  yield takeEvery('INIT_STRUCTURE_LIST_PAGE', initStructureListPage);
  yield takeEvery('DELETE_STRUCTURE', deleteStructureInList);
}

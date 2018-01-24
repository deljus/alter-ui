import { takeEvery, call, put } from 'redux-saga/effects';
import { message } from 'antd';
import { Structures, Settings } from './requests';
import { addStructures, deleteStructure, addStructure, editStructure, showModal, addSettings } from './actions';
import { startRequest, succsessRequest, errorRequest } from '../../base/actions';
import { convertCmlToBase64, convertCmlToBase64Arr } from '../../base/marvinAPI';


function* initStructureListPage(action) {
  try {
    yield put(startRequest());
    const responseStructures = yield call(Structures.getAll);
    const structures = yield call(convertCmlToBase64Arr, responseStructures.data);
    yield put(addStructures(structures));
    const responseSettings = yield call(Settings.getAll);
    yield put(addSettings(responseSettings.data));
    yield put(succsessRequest());
  } catch (e) {
    yield put(errorRequest(e.message, action));
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
    yield put(deleteStructure, action.id);
    yield message.success('Delete structure');
  } catch (e) {
    yield message.error(e.message);
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

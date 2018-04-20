import { takeEvery, call, put } from 'redux-saga/effects';
import { message } from 'antd';
import { Structures } from './requests';
import { addStructures, deleteStructure, addStructure, editStructure, showModal } from './actions';
import { requestSaga } from '../../base/sagas';
import { convertCmlToBase64, convertCmlToBase64Arr } from '../../base/marvinAPI';
import {
  SAGA_INIT_STRUCTURE_LIST_PAGE,
  SAGA_EDIT_STRUCTURE,
  SAGA_DELETE_STRUCTURE,
  SAGA_ADD_STRUCTURE
} from './constants';


function* initStructureListPage() {
  const responseStructures = yield call(Structures.getAll);
  const structures = yield call(convertCmlToBase64Arr, responseStructures.data);
  yield put(addStructures(structures));
}

function* addNewStructure(action) {
  const { data, params, condition } = action;
  const response = yield call(Structures.add, { data, params, condition });
  const base64 = yield call(convertCmlToBase64, response.data.data);
  yield put(addStructure({ base64, ...response.data }));
  yield message.success('Add structure');
}

function* deleteStructureInList(action) {
  yield call(Structures.delete, action.id);
  yield put(deleteStructure, action.id);
  yield message.success('Delete structure');
}

function* modalDiscard(action) {
  const { data, params, condition } = action;
  const response = yield call(Structures.edit, action.id, data, params, condition);
  const base64 = yield call(convertCmlToBase64, response.data.data);
  yield put(editStructure({ base64, ...response.data }));
  yield put(showModal(false));
}


export function* sagas() {
  yield takeEvery(SAGA_INIT_STRUCTURE_LIST_PAGE, requestSaga, initStructureListPage);
  yield takeEvery(SAGA_ADD_STRUCTURE, requestSaga, addNewStructure);
  yield takeEvery(SAGA_DELETE_STRUCTURE, requestSaga, deleteStructureInList);
  yield takeEvery(SAGA_EDIT_STRUCTURE, requestSaga, modalDiscard);
}

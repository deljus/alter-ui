import { takeEvery } from 'redux-saga/effects';
import { message } from 'antd';
import { convertCmlToBase64, clearEditor, exportCml, importCml, convertCmlToBase64Arr } from '../../core/marvinAPI';

import 'antd/lib/message/style/css';


function* initListPage(action) {
  try {

  } catch (e) {

  }
}


export function* sagas() {
  yield takeEvery('INIT_LIST_PAGE', initListPage);
}

export const MARVIN_PATH_IFRAME = '/static/marvinjs/editorws.html';
export const MARVIN_EDITOR_IS_EMPTY = '<cml><MDocument></MDocument></cml>';
export const MARVIN_ID = "#marvinjs";

const BASE_URL = process.env.NODE_ENV === 'production' ? 'http://cimm.kpfu.ru/' : 'http://localhost:3001/';

export const API_URLS = {
  CREATE_TASK_PREDICTOR: `${BASE_URL}api/task/create/0`,
  CREATE_TASK_SEARCH: `${BASE_URL}api/task/create/1`,
  CREATE_STRUCTUSE: `${BASE_URL}structures`,
  PREPARE_TASK: `${BASE_URL}api/task/prepare/`,
  RESULT: `${BASE_URL}api/task/model/`,
  ADDITIVES: `${BASE_URL}api/resources/additives`,
  MODELS: `${BASE_URL}api/resources/models`,
  UPLOAD_FILE: `${BASE_URL}api/task/upload`,
  SAVE_TASK: `${BASE_URL}api/task/results/`,
  USER_AUTH: `${BASE_URL}api/auth`,
  MAGIC: `${BASE_URL}api/resources/magic`,
  STRUCTURES: `${BASE_URL}structures`,
};

export const MODAL = {
  CREATE_TASK: 'CREATE_TASK_SEARCH',
  EDIT_TASK: 'EDIT_TASK_SEARCH',
};

export const URLS = {
  INDEX: '/',
  VALIDATE: '/validate',
  RESULT: '/result/',
  MANUAL: '/manual/',
  PREPARE: '/prepare/',
  ERROR: '/error/',
  HISTORY: '/history/',
  INFO: '/info/',
  EDIT: '/edit/',
  SETTINGS: '/settings',
};

export const REPEATED_REQUESTS = {
  TIMEOUT: 2000,
  RETRY: 5,
};

export const MARVIN_PATH_IFRAME = '/static/marvinjs/editorws.html';
export const MARVIN_EDITOR_IS_EMPTY = '<cml><MDocument></MDocument></cml>';
export const MARVIN_ID = '#marvinjs';

const BASE_URL = process.env.NODE_ENV === 'production' ? 'http://cimm.kpfu.ru' : 'http://localhost:3001';

const API = {
  CREATE_TASK_PREDICTOR: '/api/task/create/0',
  CREATE_TASK_SEARCH: '/api/task/create/1',
  CREATE_STRUCTUSE: '/structures',
  PREPARE_TASK: '/api/task/prepare/',
  RESULT: '/api/task/model/',
  ADDITIVES: '/api/resources/additives',
  MODELS: '/api/resources/models',
  UPLOAD_FILE: '/api/task/upload',
  SAVE_TASK: '/api/task/results/',
  USER_AUTH: '/api/auth',
  MAGIC: '/api/resources/magic',
  STRUCTURES: '/structures',
  SETTINGS: '/settings',
  RECORDS: '/api/:database/:table/records',
  RECORDS_METADATA: '/api/:database/:table/records/:metadata',
  CREATE_TASK_DBFORM: '/api/validate/:type',
};

const MODAL = {
  CREATE_TASK: 'CREATE_TASK_SEARCH',
  EDIT_TASK: 'EDIT_TASK_SEARCH',
};

const URLS = {
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

const REPEATED_REQUESTS = {
  TIMEOUT: 2000,
  RETRY: 5,
};

const API_URLS = Object.keys(API)
  .reduce((acc, key) => {
    acc[key] = BASE_URL + API[key];
    return acc;
  }, {});

export {
  API_URLS,
  BASE_URL,
  MODAL,
  URLS,
  REPEATED_REQUESTS,
};

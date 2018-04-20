import axios from 'axios';
import { API_URLS } from '../../config';


const Structures = {
  getAll: () => axios.get(API_URLS.STRUCTURES),
  add: data => axios.post(API_URLS.STRUCTURES, { ...data }),
  delete: id => axios.delete(`${API_URLS.STRUCTURES}/${id}`),
  edit: (id, data, params, condition) => axios.put(`${API_URLS.STRUCTURES}/${id}`, { data, params, condition }),
};

const Settings = {
  getAll: () => axios.get(API_URLS.SETTINGS),
};

const Records = {
  getAllbyUser: (database, table) => axios.get(API_URLS.RECORDS, { database, table }),
};

export { Structures, Settings, Records };
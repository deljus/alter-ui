import axios from 'axios';
import { API_URLS } from '../../config';


class Structures {
  static getAll() {
    return axios.get(API_URLS.STRUCTURES);
  }

  static add(data) {
    return axios.post(API_URLS.STRUCTURES, { ...data });
  }

  static delete(id) {
    return axios.delete(`${API_URLS.STRUCTURES}/${id}`);
  }

  static edit(id, data, params) {
    return axios.put(`${API_URLS.STRUCTURES}/${id}`, { data, params });
  }
}

export { Structures };

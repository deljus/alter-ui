import axios from 'axios';
import { API_URLS } from '../../config';


class Structures {
  static getAll() {
    return axios.get(API_URLS.STRUCTURES);
  }

  static add(name) {
    return axios.post(API_URLS.STRUCTURES, { name });
  }

  static delete(id) {
    return axios.delete(`${API_URLS.STRUCTURES}/${id}`);
  }

  static edit(id, name) {
    return axios.put(`${API_URLS.STRUCTURES}/${id}`, { name });
  }
}

export { Structures };

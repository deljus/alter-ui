import axios from 'axios';
import { API_URLS } from '../config';


class Request {
  static createSearchTask(data) {
    return axios.post(API_URLS.CREATE_TASK_SEARCH, data, { withCredentials: true });
  }

  static createModellingTask(data) {
    return axios.post(API_URLS.CREATE_TASK_PREDICTOR, data, { withCredentials: true });
  }

  static getSearchTask(task) {
    return axios.get(API_URLS.PREPARE_TASK + task, { withCredentials: true });
  }

  static getModels() {
    return axios.get(API_URLS.MODELS, { withCredentials: true });
  }

  static getAdditives() {
    return axios.get(API_URLS.ADDITIVES, { withCredentials: true });
  }

  static getMagic() {
    return axios.get(API_URLS.MAGIC, { withCredentials: true });
  }

  static createResultTask(cml, task) {
    return axios.post(API_URLS.RESULT + task, cml, { withCredentials: true });
  }

  static getResultTask(task) {
    return axios.get(API_URLS.RESULT + task, { withCredentials: true });
  }
}

export default Request;

import axios from 'axios';
import { API_URLS } from '../config';

/**
 * Class of requests
 *
 */
class Request {
  /**
   * Create search task
   * @static
   * @param {object} data format {data: string }
   * @return {AxiosPromise<any>}
   */
  static createSearchTask(data) {
    return axios.post(API_URLS.CREATE_TASK_SEARCH, data, { withCredentials: true });
  }

  /**
   * Create modelling task
   * @static
   * @param data format {data: string }
   * @return {AxiosPromise<any>}
   */
  static createModellingTask(data) {
    return axios.post(API_URLS.CREATE_TASK_PREDICTOR, data, { withCredentials: true });
  }

  /**
   * Get data after created search task
   * @static
   * @param {string} task - id of task
   * @return {AxiosPromise<any>}
   */
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

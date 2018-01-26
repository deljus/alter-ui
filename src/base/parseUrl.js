import queryString from 'query-string';

const pathUrl = () => window.location.hash.replace('#', '');

export const getUrlParams = () => {
  const path = pathUrl();
  return queryString.parse(path.split('?')[1]);
};

export const getUrlPath = () => {
  const path = pathUrl();
  return path.split('?')[0];
};

export const stringifyUrl = (url, params) => `${url}?${queryString.stringify(params)}`;

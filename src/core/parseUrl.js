import queryString from 'query-string';

export const getUrlParams = () => {
  const url = window.location.hash.replace('#', '');
  return queryString.parse(url.split('?')[1]);
};

export const stringifyUrl = (url, params) => `${url}?${queryString.stringify(params)}`;

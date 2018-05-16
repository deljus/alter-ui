import queryString from 'query-string';
/**
 * Merges two (or more) objects, giving the last one precedence.
 * @param {object} target Object precedence
 * @param {object} source Object
 * @returns {object}
 */
function merge(target, source) {
  if (typeof target !== 'object') {
    target = {};
  }

  for (const property in source) {
    if (source.hasOwnProperty(property)) {
      const sourceProperty = source[property];

      if (typeof sourceProperty === 'object') {
        target[property] = merge(target[property], sourceProperty);
        continue;
      }

      target[property] = sourceProperty;
    }
  }

  for (let a = 2, l = arguments.length; a < l; a++) {
    merge(target, arguments[a]);
  }

  return target;
}

function urlConverter(template, base, get = null) {
  for (const key in base) {
    template = template.replace(`:${key}`, base[key]);
  }

  if (get) {
    template = `${template}?${queryString.stringify(get)}`;
  }

  return template;
}

function getWindowSize() {
  const w = window,
    d = document,
    e = d.documentElement,
    g = d.getElementsByTagName('body')[0],
    x = w.innerWidth || e.clientWidth || g.clientWidth,
    y = w.innerHeight || e.clientHeight || g.clientHeight;

  return { x, y };
}

const gridSize = {
  xs:	0,
  sm: 576,
  md: 768,
  lg: 992,
  xl: 1200,
  xxl: 1600,
};

function currentGrid() {
  const size = getWindowSize();

  const gridKey = Object.keys(gridSize).reduce((acc, key) => {
    if (gridSize[key] <= size.x && gridSize[acc] >= size.x) {
      return key;
    }
  }, '');

  return gridKey;
}

export { merge, urlConverter, getWindowSize, currentGrid };

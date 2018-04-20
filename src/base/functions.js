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

function superMeow(template, params) {
  for (let key in params) {
       template = template.replace(:${key}, params[key])
    }
  return template;
}


export { merge, superMeow };


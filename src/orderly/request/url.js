const PARAMS_FORMAT = new RegExp(/\?.*$/);

function filterParams(url) {
  return url.toString().replace(PARAMS_FORMAT, '')
}

export { filterParams }

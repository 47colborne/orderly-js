const PARAMS_FORMAT = new RegExp(/\?.*$/);

function filterParams(url) {
  return url.split('?')[0]
}

export { filterParams }

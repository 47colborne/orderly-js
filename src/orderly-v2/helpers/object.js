const getOr = (key, defaultValue) => {
  return (obj) => obj[key] || defaultValue
}

export { getOr }
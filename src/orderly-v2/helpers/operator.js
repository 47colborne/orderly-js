const lessThanUsing = (fn) => {
  return (x, y) => lessThan(fn(x), fn(y))
}

const lessThan = (x, y) => {
  return x < y
}

export { lessThanUsing, lessThan }
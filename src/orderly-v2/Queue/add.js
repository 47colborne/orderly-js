const add = (heap, opts) => {
  let adder = (t) => heap.add(t)

  if (opts.add)
    adder = (t) => opts.add(t, heap)

  return (...ts) => ts.map(adder)
}

export default add


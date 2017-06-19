const get = (heap, opts) => {
  if (opts.get)
    return () => opts.get(heap)

  return () => heap.poll()
}

export default get
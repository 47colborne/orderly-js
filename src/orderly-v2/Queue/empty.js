const empty = (heap, opts) => {
  if (opts.empty)
    return () => opts.empty(heap)

  return () => heap.isEmpty()
}

export default empty
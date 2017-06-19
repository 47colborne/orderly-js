const trim = (heap, opts) => {
  if (opts.trim)
    return () => opts.trim(heap)

  return () => heap.trim()
}

export default trim
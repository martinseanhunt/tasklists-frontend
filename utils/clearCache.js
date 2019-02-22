export default (cache) => {
  Object.keys(cache.data.data).forEach((key) => {
    if (key.match(/^Task/) || key.match(/^taskList/) || key.match(/^TaskList/)) {
      cache.data.delete(key);
    }
  })
}


export default (cache, onlyTasks) => {
  if (onlyTasks) {
    Object.keys(cache.data.data).forEach((key) => {
      if (key.match(/^Task:/)) {
        cache.data.delete(key);
      }
    })
  } else {
    Object.keys(cache.data.data).forEach((key) => {
      if (key.match(/^Task/) || key.match(/^taskList/) || key.match(/^TaskList/)) {
        cache.data.delete(key);
      }
    })
  }
}


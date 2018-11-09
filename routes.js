const routes = module.exports = require('next-routes')()

routes
  .add('tasklist', '/tasklist/:slug', 'taskList')
  .add('createTask', '/:taskListSlug/create', 'createTask')
  .add('task', '/task/:id', 'task')
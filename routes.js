const routes = module.exports = require('next-routes')()

routes
  .add('tasklist', '/tasklist/:slug', 'taskList')
  .add('createTask', '/:taskListSlug/create', 'createTask')
  // leaving this here temporarily to avoid any unexpected bugs and keep old links in tact
  .add('task', '/task/:id', 'task') 
  // New url structure for tasks includes tasklist slug for dynamic sidebar
  .add('taskWithSlug', '/task/:taskListSlug/:id', 'task')
  .add('editTask', '/task/:taskListSlug/:id/edit', 'editTask')

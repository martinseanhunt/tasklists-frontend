const routes = module.exports = require('next-routes')()

routes
  .add('tasklist', '/tasklist/:slug', 'taskList')
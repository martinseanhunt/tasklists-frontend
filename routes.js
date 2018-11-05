const routes = module.exports = require('next-routes')()

routes
  .add('list', '/list/:slug', 'category')
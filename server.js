// server.js
const next = require('next')
const routes = require('./routes')
const app = next({dev: process.env.NODE_ENV !== 'production'})
const handler = routes.getRequestHandler(app)

console.log(process.env.NODE_ENV)
 
const {createServer} = require('http')
app.prepare().then(() => {
  createServer(handler).listen(3000)
})
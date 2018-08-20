const http = require('http');
const app = require('./app');//import main module for route handling

const port = process.env.port || 3000;//port for server to be on

const server = http.createServer(app);//create server for app

console.log("Connected to port " + port);

server.listen(port);
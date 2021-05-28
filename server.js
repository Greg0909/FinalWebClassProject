const http = require('http');
const app = require('./app');
const { port } = require('./config');

const portNumber = port || 3000;

const server = http.createServer(app);

server.listen(portNumber, function(){
    console.log('Server ready and running on http://localhost:' + portNumber + '/productcreation');
    console.log('Do not use 127.0.0.1, use localhost');
});
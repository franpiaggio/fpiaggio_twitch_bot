
require('dotenv').config()
const express = require('express');
const http = require('http');
const bots = require('./bots/index');
const { Server } = require('socket.io');
const app = express();
const server = http.createServer(app);
const io = new Server(server, {
	cors: true,
	origins: "*"
})
server.listen(4000, () => {
	console.log("Server 4000")
});
io.on('connection', (socket) => {
	console.log("Se conectó el usuario")
})
bots.init(io);

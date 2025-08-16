// const express = require('express');
// const http = require('http');
// const { Server } = require('socket.io');

// const app = express();
// const server = http.createServer(app);

// const io = new Server(server, {
//   cors: {
//     origin: '*',
//     methods: ['GET', 'POST']
//   }
// });

// io.on('connection', (socket) => {
//   console.log('✅ New client connected:', socket.id);

//   socket.on('pingTest', (msg) => {
//     console.log('📩 Received from client:', msg);
//     socket.emit('pongTest', 'Hello from server');
//   });

//   socket.on('disconnect', () => {
//     console.log('❌ Client disconnected:', socket.id);
//   });
// });

// server.listen(4000, () => {
//   console.log('🚀 Socket test server running on port 4000');
// });

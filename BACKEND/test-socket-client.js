// const { io } = require('socket.io-client');

// // Change to your machine's LAN IP if testing across devices
// const socket = io("http://localhost:4000", {
//   transports: ["websocket"],
//   reconnectionAttempts: 3
// });

// socket.on('connect', () => {
//   console.log("✅ Connected:", socket.id);
//   socket.emit('pingTest', 'Hello from client');
// });

// socket.on('pongTest', (msg) => {
//   console.log('📩 Received from server:', msg);
// });

// socket.on('connect_error', (err) => {
//   console.error("⚠️ Connection error:", err.message);
// });

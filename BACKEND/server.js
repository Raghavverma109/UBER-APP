require('dotenv').config(); // At the top

const http = require('http');
const app = require('./app');
const { initializeSocket } = require('./socket'); 
const port = process.env.PORT || 4000;

const server = http.createServer(app);  

initializeSocket(server);

server.listen(port, '0.0.0.0', () => {
  console.log(`🚀 Server running at:`);
  console.log(`🖥️  → http://localhost:${port}`);
  console.log(`📱  → http://192.168.1.10:${port}`); // replace this in logs too if you want
});



// require('dotenv').config();
// const fs = require('fs');
// const https = require('https');
// const app = require('./app');
// const { initializeSocket } = require('./socket');
// const port = process.env.PORT || 4000;

// // Load SSL certs (create these with mkcert or openssl for local dev)
// const options = {
//   key: fs.readFileSync('./certs/key.pem'),
//   cert: fs.readFileSync('./certs/cert.pem'),
// };

// const server = https.createServer(options, app);

// initializeSocket(server);

// server.listen(port, '0.0.0.0', () => {
//   console.log(`🚀 Secure Server running at:`);
//   console.log(`🖥️  → https://localhost:${port}`);
//   console.log(`📱  → https://192.168.1.10:${port}`);
// });

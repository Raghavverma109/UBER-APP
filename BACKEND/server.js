require('dotenv').config(); // At the top

const http = require('http');
const app = require('./app');
const port = process.env.PORT || 4000;

const server = http.createServer(app);  


// server.listen(port, '192.168.1.5' , () => {
//   console.log(`Server is running on port ${port}`);
// });

app.listen(port, '0.0.0.0', () => {
  console.log(`🚀 Server running at:`);
  console.log(`🖥️  → http://localhost:${port}`);
  console.log(`📱  → http://192.168.1.20:${port}`); // replace this in logs too if you want
});

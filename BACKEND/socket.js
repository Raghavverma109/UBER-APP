const socketIO = require('socket.io');
const userModel = require('./models/user.model');
const captainModel = require('./models/captain.model');

let io = null;
const connectedSockets = new Map();

const initializeSocket = (server) => {
    io = socketIO(server, {
        cors: {
            origin: "*",
            methods: ["GET", "POST"]
        }
    });

    io.on('connection', (socket) => {
        console.log('⚡ New client connected:', socket.id);
        connectedSockets.set(socket.id, socket);

        // Register a user or captain
       socket.on('join', async (data) => {

        //  console.log("📦 Raw data from client:", data);
            const { userId, userType } = data;

            if (userType === 'user') {
                await userModel.findByIdAndUpdate(userId, { socketId: socket.id });
            } else if (userType === 'captain') {
                console.log(userId);
                await captainModel.findByIdAndUpdate(userId, { socketId: socket.id });
            }
             console.log(`${userType} ${userId} joined with socket ${socket.id}`);
        });

        socket.on('update-location-captain', async (data) => {
            const { userId, location } = data;

            if (!location || !location.ltd || !location.lng) {
                return socket.emit('error', { message: 'Invalid location data' });
            }

            await captainModel.findByIdAndUpdate(userId, {
                location: {
                    ltd: location.ltd,
                    lng: location.lng
                }
            });
        });

        // Test event
        socket.on('pingTest', (msg) => {
            console.log('📩 Received from client:', msg);
            socket.emit('pongTest', 'Hello from server 👋');
        });

        // Manual register without DB
        socket.on('register', (userId) => {
            socket.userId = userId;
            console.log(`User ${userId} registered with socket ${socket.id}`);
        });

        socket.on('disconnect', () => {
            console.log('❌ Client disconnected:', socket.id);
            connectedSockets.delete(socket.id);
        });
    });

    return io;
};

const sendMessageToSocketId = (socketId, event, data) => {
    try {
        const socket = connectedSockets.get(socketId);
        if (socket) {
            socket.emit(event, data);
            return true;
        }
        return false;
    } catch (error) {
        console.error('Error sending message:', error);
        return false;
    }
};

module.exports = {
    initializeSocket,
    sendMessageToSocketId
};

const socketio = require('socket.io');

const parseArray = require('./utils/parseArray');
const calculateDistance = require('./utils/calculateDistance');

let io;
const connections = [];

exports.setup = server => {
  io = socketio(server);

  io.on('connection', socket => {
    const { latitude, longitude, techs } = socket.handshake.query;

    connections.push({
      id: socket.id,
      coordinates: {
        longitude: Number(longitude),
        latitude: Number(latitude),
      },
      techs: parseArray(techs),
    });
  });
};

exports.findConnections = (coordinates, techs) => {
  return connections.filter(connection => {
    return (
      calculateDistance(coordinates, connection.coordinates) < 10 &&
      connection.techs.some(item => techs.includes(item))
    );
  });
};

exports.sendMessage = (to, message, data) => {
  to.forEach(connection => {
    io.to(connection.id).emit(message, data);
  });
};

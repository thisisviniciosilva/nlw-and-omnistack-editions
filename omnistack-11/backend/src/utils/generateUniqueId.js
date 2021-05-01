const { randomBytes } = require('crypto');

const generateUniqueId = () => randomBytes(4).toString('HEX');

module.exports = generateUniqueId;

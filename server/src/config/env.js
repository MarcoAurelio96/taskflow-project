const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../../.env') });

if (!process.env.PORT) {
  throw new Error('El puerto no está definido');
}

module.exports = {
  PORT: process.env.PORT
};
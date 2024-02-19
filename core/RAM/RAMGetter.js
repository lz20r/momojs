const RAM_SET = require('./RAMSetter');

class RAM_GET {
  getDBConnection() {
    return RAM_SET.DBConnection;
  }
}

module.exports = new RAM_GET();

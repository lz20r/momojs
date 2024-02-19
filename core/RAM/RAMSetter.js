class RAM_SET {
    constructor() {
      this.DBConnection;
    }

    setDBConnection(DBConnection) {
        this.DBConnection = DBConnection;
    }
  }
  
  module.exports = new RAM_SET();

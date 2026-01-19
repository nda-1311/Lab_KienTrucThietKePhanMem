const MariaDBConnection = require("./mariadbConnection");

class DatabaseFactory {
  static createDatabase(type) {
    if (type === "mariadb") {
      return new MariaDBConnection();
    }
    throw new Error("Unsupported database");
  }
}

module.exports = DatabaseFactory;

// Abstract State - Định nghĩa interface cho các state
class ConnectionState {
  constructor(name) {
    this.name = name;
  }

  connect(context) {
    throw new Error("Method connect() must be implemented");
  }

  disconnect(context) {
    throw new Error("Method disconnect() must be implemented");
  }

  query(context, sql) {
    throw new Error("Method query() must be implemented");
  }

  getStatus() {
    return this.name;
  }
}

module.exports = ConnectionState;

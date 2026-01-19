const ConnectionState = require("./connectionState");

class ConnectedState extends ConnectionState {
  constructor() {
    super("CONNECTED");
  }

  connect(context) {
    console.log("✅ Đã kết nối rồi!");
  }

  disconnect(context) {
    console.log("🔌 Ngắt kết nối database...");
    const DisconnectedState = require("./disconnectedState");
    context.setState(new DisconnectedState());
  }

  async query(context, sql) {
    console.log(`📊 Thực hiện query: ${sql}`);
    // Sử dụng strategy pattern để thực hiện query
    return await context.executeQuery(sql);
  }
}

module.exports = ConnectedState;

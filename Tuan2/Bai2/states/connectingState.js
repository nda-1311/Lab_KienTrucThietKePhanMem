const ConnectionState = require("./connectionState");

class ConnectingState extends ConnectionState {
  constructor() {
    super("CONNECTING");
  }

  connect(context) {
    console.log("⏳ Đang trong quá trình kết nối...");
  }

  disconnect(context) {
    console.log("🛑 Hủy kết nối...");
    const DisconnectedState = require("./disconnectedState");
    context.setState(new DisconnectedState());
  }

  query(context, sql) {
    throw new Error("❌ Đang kết nối, vui lòng đợi...");
  }
}

module.exports = ConnectingState;

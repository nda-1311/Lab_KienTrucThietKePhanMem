const ConnectionState = require("./connectionState");

class DisconnectedState extends ConnectionState {
  constructor() {
    super("DISCONNECTED");
  }

  connect(context) {
    console.log("🔌 Đang kết nối đến database...");
    const ConnectingState = require("./connectingState");
    context.setState(new ConnectingState());

    // Simulate async connection
    setTimeout(() => {
      context.completeConnection();
    }, 1000);
  }

  disconnect(context) {
    console.log("⚠️  Đã ở trạng thái ngắt kết nối");
  }

  query(context, sql) {
    throw new Error("❌ Không thể thực hiện query khi chưa kết nối!");
  }
}

module.exports = DisconnectedState;

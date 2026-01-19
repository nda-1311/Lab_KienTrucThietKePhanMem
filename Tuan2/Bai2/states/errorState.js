const ConnectionState = require("./connectionState");

class ErrorState extends ConnectionState {
  constructor(errorMessage) {
    super("ERROR");
    this.errorMessage = errorMessage;
  }

  connect(context) {
    console.log("🔄 Thử kết nối lại sau lỗi...");
    const ConnectingState = require("./connectingState");
    context.setState(new ConnectingState());

    setTimeout(() => {
      context.completeConnection();
    }, 1000);
  }

  disconnect(context) {
    console.log("🛑 Ngắt kết nối từ trạng thái lỗi...");
    const DisconnectedState = require("./disconnectedState");
    context.setState(new DisconnectedState());
  }

  query(context, sql) {
    throw new Error(`❌ Không thể query do lỗi: ${this.errorMessage}`);
  }
}

module.exports = ErrorState;

const DisconnectedState = require("../states/disconnectedState");
const ConnectedState = require("../states/connectedState");
const ErrorState = require("../states/errorState");

class DatabaseConnection {
  constructor(queryStrategy) {
    // State Pattern: Bắt đầu với trạng thái Disconnected
    this.state = new DisconnectedState();

    // Strategy Pattern: Chiến lược query có thể thay đổi
    this.queryStrategy = queryStrategy;

    this.pool = null;
  }

  // State management methods
  setState(newState) {
    console.log(
      `🔄 State changed: ${this.state.getStatus()} → ${newState.getStatus()}`,
    );
    this.state = newState;
  }

  getStatus() {
    return this.state.getStatus();
  }

  // Delegate connection actions to current state
  connect() {
    this.state.connect(this);
  }

  disconnect() {
    this.state.disconnect(this);
  }

  async query(sql) {
    return await this.state.query(this, sql);
  }

  // Strategy Pattern: Thay đổi query strategy runtime
  setQueryStrategy(strategy) {
    console.log(`🔧 Query Strategy changed to: ${strategy.getName()}`);
    this.queryStrategy = strategy;
  }

  // Method được gọi bởi states
  completeConnection() {
    try {
      // Simulate successful connection
      console.log("✅ Kết nối thành công!");
      this.setState(new ConnectedState());
    } catch (error) {
      console.log(`❌ Kết nối thất bại: ${error.message}`);
      this.setState(new ErrorState(error.message));
    }
  }

  // Execute query using current strategy
  async executeQuery(sql) {
    if (!this.queryStrategy) {
      throw new Error("No query strategy set!");
    }

    return await this.queryStrategy.execute(sql, this.pool);
  }
}

module.exports = DatabaseConnection;

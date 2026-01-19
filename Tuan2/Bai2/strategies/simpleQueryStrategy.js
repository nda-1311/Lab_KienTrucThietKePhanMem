const QueryStrategy = require("./queryStrategy");

class SimpleQueryStrategy extends QueryStrategy {
  async execute(sql, pool) {
    console.log("   → Strategy: Simple Query (no optimization)");

    // Mock data để demo (không cần database thật)
    return [
      { id: 1, name: "Product A", price: 100 },
      { id: 2, name: "Product B", price: 200 },
    ];
  }

  getName() {
    return "SimpleQueryStrategy";
  }
}

module.exports = SimpleQueryStrategy;

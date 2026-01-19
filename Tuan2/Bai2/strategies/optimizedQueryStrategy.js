const QueryStrategy = require("./queryStrategy");

class OptimizedQueryStrategy extends QueryStrategy {
  async execute(sql, pool) {
    console.log("   → Strategy: Optimized Query (with indexing)");

    // Giả lập query được tối ưu hóa
    const startTime = Date.now();

    // Mock data với thời gian xử lý nhanh hơn
    const result = [
      { id: 1, name: "Optimized Product A", price: 120, indexed: true },
      { id: 2, name: "Optimized Product B", price: 220, indexed: true },
    ];

    const duration = Date.now() - startTime;
    console.log(`   ⚡ Query completed in ${duration}ms (optimized)`);

    return result;
  }

  getName() {
    return "OptimizedQueryStrategy";
  }
}

module.exports = OptimizedQueryStrategy;

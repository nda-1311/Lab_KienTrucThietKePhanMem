const QueryStrategy = require("./queryStrategy");

class CachedQueryStrategy extends QueryStrategy {
  constructor() {
    super();
    this.cache = new Map();
  }

  async execute(sql, pool) {
    console.log("   → Strategy: Cached Query");

    // Kiểm tra cache
    if (this.cache.has(sql)) {
      console.log("   ✅ Cache HIT - Trả về từ cache");
      return this.cache.get(sql);
    }

    console.log("   ❌ Cache MISS - Query từ DB");

    // Mock data
    const result = [
      { id: 1, name: "Cached Product A", price: 150 },
      { id: 2, name: "Cached Product B", price: 250 },
    ];

    // Lưu vào cache
    this.cache.set(sql, result);
    console.log("   💾 Đã lưu vào cache");

    return result;
  }

  getName() {
    return "CachedQueryStrategy";
  }

  clearCache() {
    this.cache.clear();
    console.log("🗑️  Cache đã được xóa");
  }
}

module.exports = CachedQueryStrategy;

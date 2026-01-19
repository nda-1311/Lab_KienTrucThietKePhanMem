const DatabaseConnection = require("./db/databaseConnection");

// Import Strategies
const SimpleQueryStrategy = require("./strategies/simpleQueryStrategy");
const CachedQueryStrategy = require("./strategies/cachedQueryStrategy");
const OptimizedQueryStrategy = require("./strategies/optimizedQueryStrategy");

// Import Decorators
const LoggingDecorator = require("./decorators/loggingDecorator");
const RetryDecorator = require("./decorators/retryDecorator");
const ValidationDecorator = require("./decorators/validationDecorator");

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// ========== 1. STATE PATTERN DEMO ==========
async function demoStatePattern() {
  console.log("\n" + "=".repeat(60));
  console.log("📌 STATE PATTERN - Quản lý trạng thái kết nối");
  console.log("=".repeat(60));

  const db = new DatabaseConnection(new SimpleQueryStrategy());

  console.log(`\n✅ Trạng thái ban đầu: ${db.getStatus()}`);

  // Thử query khi chưa kết nối
  try {
    await db.query("SELECT * FROM products");
  } catch (error) {
    console.log(`❌ ${error.message}`);
  }

  // Kết nối
  console.log("\n🔌 Đang kết nối...");
  db.connect();
  await wait(1500);

  console.log(`✅ Trạng thái sau khi kết nối: ${db.getStatus()}`);

  // Query thành công
  const result = await db.query("SELECT * FROM products");
  console.log(`📊 Query result:`, result);

  // Ngắt kết nối
  console.log("\n🔌 Ngắt kết nối...");
  db.disconnect();
  console.log(`✅ Trạng thái cuối: ${db.getStatus()}\n`);
}

// ========== 2. STRATEGY PATTERN DEMO ==========
async function demoStrategyPattern() {
  console.log("\n" + "=".repeat(60));
  console.log("📌 STRATEGY PATTERN - Các chiến lược query");
  console.log("=".repeat(60));

  const db = new DatabaseConnection(new SimpleQueryStrategy());
  db.connect();
  await wait(1500);

  // Strategy 1: Simple Query
  console.log("\n1️⃣ SimpleQueryStrategy:");
  db.setQueryStrategy(new SimpleQueryStrategy());
  let result = await db.query("SELECT * FROM products");
  console.log("   →", result);

  // Strategy 2: Cached Query
  console.log("\n2️⃣ CachedQueryStrategy:");
  const cachedStrategy = new CachedQueryStrategy();
  db.setQueryStrategy(cachedStrategy);

  console.log("   Lần 1 (cache miss):");
  result = await db.query("SELECT * FROM products");

  console.log("\n   Lần 2 (cache hit):");
  result = await db.query("SELECT * FROM products");

  // Strategy 3: Optimized Query
  console.log("\n3️⃣ OptimizedQueryStrategy:");
  db.setQueryStrategy(new OptimizedQueryStrategy());
  result = await db.query("SELECT * FROM products ORDER BY price");
  console.log("   →", result);

  db.disconnect();
  console.log();
}

// ========== 3. DECORATOR PATTERN DEMO ==========
async function demoDecoratorPattern() {
  console.log("\n" + "=".repeat(60));
  console.log("📌 DECORATOR PATTERN - Trang trí thêm tính năng");
  console.log("=".repeat(60));

  const db = new DatabaseConnection(new SimpleQueryStrategy());
  db.connect();
  await wait(1500);

  // 1. Base Strategy
  console.log("\n1️⃣ Base Strategy (không decorator):");
  let strategy = new SimpleQueryStrategy();
  db.setQueryStrategy(strategy);
  await db.query("SELECT * FROM users");

  // 2. Logging Decorator
  console.log("\n2️⃣ + Logging Decorator:");
  strategy = new LoggingDecorator(new SimpleQueryStrategy());
  db.setQueryStrategy(strategy);
  await db.query("SELECT * FROM users");

  // 3. Validation Decorator
  console.log("\n3️⃣ + Validation Decorator:");
  strategy = new ValidationDecorator(new SimpleQueryStrategy());
  db.setQueryStrategy(strategy);

  console.log("   ✅ Valid query:");
  await db.query("SELECT * FROM orders");

  console.log("\n   ❌ Invalid query (SQL injection):");
  try {
    await db.query("SELECT * FROM users; DROP TABLE users;");
  } catch (error) {
    console.log(`   ${error.message}`);
  }

  // 4. Multiple Decorators
  console.log("\n4️⃣ Multiple Decorators (Validation + Logging + Retry):");
  strategy = new RetryDecorator(
    new LoggingDecorator(new ValidationDecorator(new SimpleQueryStrategy())),
    2,
  );
  db.setQueryStrategy(strategy);
  console.log(`   Strategy: ${strategy.getName()}`);
  await db.query("SELECT * FROM products");

  db.disconnect();
  console.log();
}

// ========== 4. DEMO TẤT CẢ ==========
async function demoAll() {
  console.log("\n" + "=".repeat(60));
  console.log("🎯 DEMO TẤT CẢ 3 PATTERNS");
  console.log("=".repeat(60));

  await demoStatePattern();
  await demoStrategyPattern();
  await demoDecoratorPattern();

  console.log("=".repeat(60));
  console.log("✅ HOÀN TẤT!");
  console.log("=".repeat(60));
  console.log("\n📚 Tóm tắt:");
  console.log(
    "   • STATE: 4 trạng thái (Disconnected, Connecting, Connected, Error)",
  );
  console.log("   • STRATEGY: 3 chiến lược (Simple, Cached, Optimized)");
  console.log("   • DECORATOR: 3 decorators (Logging, Validation, Retry)");
  console.log("=".repeat(60) + "\n");
}

// ========== MAIN ==========
// Gọi các hàm demo:
// await demoStatePattern();
// await demoStrategyPattern();
// await demoDecoratorPattern();
// await demoAll();

// Uncomment dòng dưới để chạy tất cả:
demoAll().catch(console.error);

const DatabaseFactory = require("./db/databaseFactory");

async function demo() {
  console.log("---- Lần tạo DB thứ 1 ----");
  const db1 = DatabaseFactory.createDatabase("mariadb");

  console.log("---- Lần tạo DB thứ 2 ----");
  const db2 = DatabaseFactory.createDatabase("mariadb");

  console.log("\nSo sánh instance:");
  console.log(db1 === db2); // TRUE → Singleton

  const result = await db1.query("SELECT 1 AS test");
  console.log(result);

  // Đóng connection pool để chương trình dừng
  await db1.close();
}

demo();

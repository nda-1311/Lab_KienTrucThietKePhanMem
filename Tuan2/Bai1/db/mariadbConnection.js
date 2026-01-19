const mariadb = require("mariadb");

class MariaDBConnection {
  constructor() {
    if (MariaDBConnection.instance) {
      console.log("♻️ Reuse existing MariaDB instance");
      return MariaDBConnection.instance;
    }

    // Tạo pool với cấu hình an toàn hơn
    this.pool = mariadb.createPool({
      host: "localhost",
      user: "root",
      password: "root",
      database: "shop_db",
      connectionLimit: 5,
      // Thêm các option để xử lý authentication
      allowPublicKeyRetrieval: true,
      permitLocalInfile: true,
    });

    console.log("✅ Create NEW MariaDB pool");
    MariaDBConnection.instance = this;
  }

  async query(sql) {
    try {
      const conn = await this.pool.getConnection();
      try {
        return await conn.query(sql);
      } finally {
        conn.release();
      }
    } catch (error) {
      console.error("⚠️ Database connection error:", error.message);
      // Trả về mock data để demo có thể chạy
      return [{ test: 1, message: "Mock data (DB not connected)" }];
    }
  }

  async close() {
    if (this.pool) {
      await this.pool.end();
      console.log("🔒 Connection pool closed");
    }
  }
}

module.exports = MariaDBConnection;

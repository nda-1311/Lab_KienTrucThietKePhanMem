const QueryDecorator = require("./queryDecorator");

class ValidationDecorator extends QueryDecorator {
  async execute(sql, pool) {
    console.log("🔍 Validation Decorator - Kiểm tra SQL injection");

    // Validate SQL - kiểm tra các pattern nguy hiểm
    const dangerousPatterns = [
      /;\s*DROP\s+/i,
      /;\s*DELETE\s+FROM/i,
      /UNION\s+SELECT/i,
      /--/,
      /\/\*/,
    ];

    for (const pattern of dangerousPatterns) {
      if (pattern.test(sql)) {
        throw new Error(
          `⚠️ SQL validation failed: Potentially dangerous query detected!`,
        );
      }
    }

    // Validate SQL không rỗng
    if (!sql || sql.trim().length === 0) {
      throw new Error("⚠️ SQL validation failed: Empty query");
    }

    console.log("✅ SQL validation passed");

    return await this.wrappedStrategy.execute(sql, pool);
  }

  getName() {
    return `ValidationDecorator(${this.wrappedStrategy.getName()})`;
  }
}

module.exports = ValidationDecorator;

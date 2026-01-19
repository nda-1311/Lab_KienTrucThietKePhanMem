const QueryDecorator = require("./queryDecorator");

class LoggingDecorator extends QueryDecorator {
  async execute(sql, pool) {
    const timestamp = new Date().toISOString();
    console.log(`📝 [LOG ${timestamp}] Query started: ${sql}`);

    const startTime = Date.now();

    try {
      const result = await this.wrappedStrategy.execute(sql, pool);
      const duration = Date.now() - startTime;

      console.log(`📝 [LOG ${timestamp}] Query completed in ${duration}ms`);
      console.log(`📝 [LOG ${timestamp}] Result count: ${result.length} rows`);

      return result;
    } catch (error) {
      console.log(`📝 [LOG ${timestamp}] Query failed: ${error.message}`);
      throw error;
    }
  }

  getName() {
    return `LoggingDecorator(${this.wrappedStrategy.getName()})`;
  }
}

module.exports = LoggingDecorator;

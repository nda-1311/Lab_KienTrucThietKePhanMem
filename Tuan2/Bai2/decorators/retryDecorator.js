const QueryDecorator = require("./queryDecorator");

class RetryDecorator extends QueryDecorator {
  constructor(queryStrategy, maxRetries = 3) {
    super(queryStrategy);
    this.maxRetries = maxRetries;
  }

  async execute(sql, pool) {
    let lastError;

    for (let attempt = 1; attempt <= this.maxRetries; attempt++) {
      try {
        console.log(
          `🔄 Retry Decorator - Attempt ${attempt}/${this.maxRetries}`,
        );

        const result = await this.wrappedStrategy.execute(sql, pool);

        if (attempt > 1) {
          console.log(`✅ Query succeeded on attempt ${attempt}`);
        }

        return result;
      } catch (error) {
        lastError = error;
        console.log(`❌ Attempt ${attempt} failed: ${error.message}`);

        if (attempt < this.maxRetries) {
          const delay = attempt * 500; // Exponential backoff
          console.log(`⏳ Waiting ${delay}ms before retry...`);
          await new Promise((resolve) => setTimeout(resolve, delay));
        }
      }
    }

    throw new Error(
      `Query failed after ${this.maxRetries} attempts: ${lastError.message}`,
    );
  }

  getName() {
    return `RetryDecorator(${this.wrappedStrategy.getName()}, max=${this.maxRetries})`;
  }
}

module.exports = RetryDecorator;

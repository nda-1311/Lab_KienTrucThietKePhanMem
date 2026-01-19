// Base Decorator - Wraps a QueryStrategy
class QueryDecorator {
  constructor(queryStrategy) {
    this.wrappedStrategy = queryStrategy;
  }

  async execute(sql, pool) {
    return await this.wrappedStrategy.execute(sql, pool);
  }

  getName() {
    return this.wrappedStrategy.getName();
  }
}

module.exports = QueryDecorator;

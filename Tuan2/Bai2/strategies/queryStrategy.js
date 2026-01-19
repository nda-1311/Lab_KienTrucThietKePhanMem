// Interface cho Query Strategy
class QueryStrategy {
  async execute(sql, pool) {
    throw new Error("Method execute() must be implemented");
  }

  getName() {
    throw new Error("Method getName() must be implemented");
  }
}

module.exports = QueryStrategy;

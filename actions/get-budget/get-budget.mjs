import app from "../../productive_io.app.mjs";

export default {
  key: "productive_io-get-budget",
  name: "Get Budget",
  description: "Gets a single budget by ID in Productive.io. [See the documentation](https://developer.productive.io/budgets.html)",
  version: "0.0.1",
  type: "action",
  props: {
    app,
    budgetId: {
      type: "string",
      label: "Budget ID",
      description: "The ID of the budget to retrieve.",
    },
  },
  async run({ $ }) {
    const response = await this.app._makeRequest({
      path: `/budgets/${this.budgetId}`,
    });
    $.export("$summary", `Fetched budget ${this.budgetId}`);
    return response;
  },
}; 
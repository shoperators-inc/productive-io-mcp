import app from "../../productive_io.app.mjs";

export default {
  key: "productive_io-get-expense",
  name: "Get Expense",
  description: "Gets a single expense by ID in Productive.io. [See the documentation](https://developer.productive.io/expenses.html)",
  version: "0.0.1",
  type: "action",
  props: {
    app,
    expenseId: {
      type: "string",
      label: "Expense ID",
      description: "The ID of the expense to retrieve.",
    },
  },
  async run({ $ }) {
    const response = await this.app._makeRequest({
      path: `/expenses/${this.expenseId}`,
    });
    $.export("$summary", `Fetched expense ${this.expenseId}`);
    return response;
  },
}; 
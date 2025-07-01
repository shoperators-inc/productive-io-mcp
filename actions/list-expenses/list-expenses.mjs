import app from "../../productive_io.app.mjs";

export default {
  key: "productive_io-list-expenses",
  name: "List Expenses",
  description: "Lists expenses in Productive.io. [See the documentation](https://developer.productive.io/expenses.html)",
  version: "0.0.1",
  type: "action",
  props: {
    app,
    personId: {
      propDefinition: [app, "personId"],
      optional: true,
    },
    budgetId: {
      type: "string",
      label: "Budget ID",
      description: "Filter by budget ID.",
      optional: true,
    },
    page: {
      type: "integer",
      label: "Page",
      description: "Page number.",
      optional: true,
      default: 1,
    },
    pageSize: {
      type: "integer",
      label: "Page Size",
      description: "Number of results per page.",
      optional: true,
      default: 30,
    },
  },
  async run({ $ }) {
    const params = {
      ...(this.personId && { "filter[person_id]": this.personId }),
      ...(this.budgetId && { "filter[budget_id]": this.budgetId }),
      "page[number]": this.page,
      "page[size]": this.pageSize,
    };
    const response = await this.app._makeRequest({
      path: "/expenses",
      params,
    });
    $.export("$summary", `Found ${response.data.length} expenses`);
    return response;
  },
}; 
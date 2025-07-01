import app from "../../productive_io.app.mjs";

export default {
  key: "productive_io-list-budgets",
  name: "List Budgets",
  description: "Lists budgets in Productive.io. [See the documentation](https://developer.productive.io/budgets.html)",
  version: "0.0.1",
  type: "action",
  props: {
    app,
    projectId: {
      propDefinition: [app, "projectId"],
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
      ...(this.projectId && { "filter[project_id]": this.projectId }),
      "page[number]": this.page,
      "page[size]": this.pageSize,
    };
    const response = await this.app._makeRequest({
      path: "/budgets",
      params,
    });
    $.export("$summary", `Found ${response.data.length} budgets`);
    return response;
  },
}; 
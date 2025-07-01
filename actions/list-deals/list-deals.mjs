import app from "../../productive_io.app.mjs";

export default {
  key: "productive_io-list-deals",
  name: "List Deals",
  description: "Lists deals in Productive.io. [See the documentation](https://developer.productive.io/deals.html)",
  version: "0.0.1",
  type: "action",
  props: {
    app,
    companyId: {
      propDefinition: [app, "companyId"],
      optional: true,
    },
    status: {
      type: "string",
      label: "Status",
      description: "Filter by status.",
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
      ...(this.companyId && { "filter[company_id]": this.companyId }),
      ...(this.status && { "filter[status]": this.status }),
      "page[number]": this.page,
      "page[size]": this.pageSize,
    };
    const response = await this.app._makeRequest({
      path: "/deals",
      params,
    });
    $.export("$summary", `Found ${response.data.length} deals`);
    return response;
  },
}; 
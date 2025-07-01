import app from "../../productive_io.app.mjs";

export default {
  key: "productive_io-list-payments",
  name: "List Payments",
  description: "Lists payments in Productive.io. [See the documentation](https://developer.productive.io/payments.html)",
  version: "0.0.1",
  type: "action",
  props: {
    app,
    companyId: {
      propDefinition: [app, "companyId"],
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
      "page[number]": this.page,
      "page[size]": this.pageSize,
    };
    const response = await this.app._makeRequest({
      path: "/payments",
      params,
    });
    $.export("$summary", `Found ${response.data.length} payments`);
    return response;
  },
}; 
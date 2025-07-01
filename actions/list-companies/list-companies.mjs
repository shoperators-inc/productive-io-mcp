import app from "../../productive_io.app.mjs";

export default {
  key: "productive_io-list-companies",
  name: "List Companies",
  description: "Lists companies in Productive.io. [See the documentation](https://developer.productive.io/companies.html)",
  version: "0.0.1",
  type: "action",
  props: {
    app,
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
      "page[number]": this.page,
      "page[size]": this.pageSize,
    };
    const response = await this.app._makeRequest({
      path: "/companies",
      params,
    });
    $.export("$summary", `Found ${response.data.length} companies`);
    return response;
  },
}; 
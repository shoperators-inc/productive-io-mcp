import app from "../../productive_io.app.mjs";

export default {
  key: "productive_io-get-company",
  name: "Get Company",
  description: "Gets a single company by ID in Productive.io. [See the documentation](https://developer.productive.io/companies.html)",
  version: "0.0.1",
  type: "action",
  props: {
    app,
    companyId: {
      type: "string",
      label: "Company ID",
      description: "The ID of the company to retrieve.",
    },
  },
  async run({ $ }) {
    const response = await this.app._makeRequest({
      path: `/companies/${this.companyId}`,
    });
    $.export("$summary", `Fetched company ${this.companyId}`);
    return response;
  },
}; 
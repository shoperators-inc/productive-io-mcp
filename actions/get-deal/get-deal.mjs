import app from "../../productive_io.app.mjs";

export default {
  key: "productive_io-get-deal",
  name: "Get Deal",
  description: "Gets a single deal by ID in Productive.io. [See the documentation](https://developer.productive.io/deals.html)",
  version: "0.0.1",
  type: "action",
  props: {
    app,
    dealId: {
      type: "string",
      label: "Deal ID",
      description: "The ID of the deal to retrieve.",
    },
  },
  async run({ $ }) {
    const response = await this.app._makeRequest({
      path: `/deals/${this.dealId}`,
    });
    $.export("$summary", `Fetched deal ${this.dealId}`);
    return response;
  },
}; 
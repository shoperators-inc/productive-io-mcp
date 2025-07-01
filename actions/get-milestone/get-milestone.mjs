import app from "../../productive_io.app.mjs";

export default {
  key: "productive_io-get-milestone",
  name: "Get Milestone",
  description: "Gets a single milestone by ID in Productive.io. [See the documentation](https://developer.productive.io/milestones.html)",
  version: "0.0.1",
  type: "action",
  props: {
    app,
    milestoneId: {
      type: "string",
      label: "Milestone ID",
      description: "The ID of the milestone to retrieve.",
    },
  },
  async run({ $ }) {
    const response = await this.app._makeRequest({
      path: `/milestones/${this.milestoneId}`,
    });
    $.export("$summary", `Fetched milestone ${this.milestoneId}`);
    return response;
  },
}; 
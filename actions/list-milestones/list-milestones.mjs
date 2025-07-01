import app from "../../productive_io.app.mjs";

export default {
  key: "productive_io-list-milestones",
  name: "List Milestones",
  description: "Lists milestones in Productive.io. [See the documentation](https://developer.productive.io/milestones.html)",
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
      path: "/milestones",
      params,
    });
    $.export("$summary", `Found ${response.data.length} milestones`);
    return response;
  },
}; 
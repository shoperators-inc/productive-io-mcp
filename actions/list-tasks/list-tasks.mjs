import app from "../../productive_io.app.mjs";

export default {
  key: "productive_io-list-tasks",
  name: "List Tasks",
  description: "Lists tasks in Productive.io. [See the documentation](https://developer.productive.io/tasks.html)",
  version: "0.0.1",
  type: "action",
  props: {
    app,
    projectId: {
      propDefinition: [app, "projectId"],
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
      ...(this.projectId && { "filter[project_id]": this.projectId }),
      ...(this.status && { "filter[status]": this.status }),
      "page[number]": this.page,
      "page[size]": this.pageSize,
    };
    const response = await this.app._makeRequest({
      path: "/tasks",
      params,
    });
    $.export("$summary", `Found ${response.data.length} tasks`);
    return response;
  },
}; 
import app from "../../productive_io.app.mjs";

export default {
  key: "productive_io-get-task",
  name: "Get Task",
  description: "Gets a single task by ID in Productive.io. [See the documentation](https://developer.productive.io/tasks.html)",
  version: "0.0.1",
  type: "action",
  props: {
    app,
    taskId: {
      type: "string",
      label: "Task ID",
      description: "The ID of the task to retrieve.",
    },
  },
  async run({ $ }) {
    const response = await this.app._makeRequest({
      path: `/tasks/${this.taskId}`,
    });
    $.export("$summary", `Fetched task ${this.taskId}`);
    return response;
  },
}; 
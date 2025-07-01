import app from "../../productive_io.app.mjs";

export default {
  key: "productive_io-change-task-status",
  name: "Change Task Status",
  description: "Changes the status of a task in Productive.io. [See the documentation](https://developer.productive.io/tasks.html)",
  version: "0.0.1",
  type: "action",
  props: {
    app,
    taskId: {
      type: "string",
      label: "Task ID",
      description: "The ID of the task to update.",
    },
    status: {
      type: "string",
      label: "Status",
      description: "The new status for the task.",
      options: [
        "open",
        "in_progress",
        "done",
        "archived",
      ],
    },
  },
  methods: {
    updateTaskStatus(args = {}) {
      return this.app._makeRequest({
        method: "patch",
        path: `/tasks/${this.taskId}`,
        ...args,
      });
    },
  },
  async run({ $ }) {
    const {
      updateTaskStatus,
      status,
    } = this;

    const response = await updateTaskStatus({
      $,
      data: {
        data: {
          type: "tasks",
          id: this.taskId,
          attributes: {
            status,
          },
        },
      },
    });

    $.export("$summary", `Successfully changed status of task ${this.taskId} to ${status}`);
    return response;
  },
}; 
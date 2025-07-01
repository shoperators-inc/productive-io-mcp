import app from "../../productive_io.app.mjs";

export default {
  key: "productive_io-create-time-log",
  name: "Create Time Log Entry",
  description: "Creates a new time log entry (time entry) in Productive.io. [See the documentation](https://developer.productive.io/time_entries.html)",
  version: "0.0.1",
  type: "action",
  props: {
    app,
    personId: {
      propDefinition: [
        app,
        "personId",
      ],
    },
    serviceId: {
      propDefinition: [
        app,
        "serviceId",
      ],
    },
    startedAt: {
      type: "string",
      label: "Started At",
      description: "The start datetime of the time entry (ISO 8601 format).",
    },
    endedAt: {
      type: "string",
      label: "Ended At",
      description: "The end datetime of the time entry (ISO 8601 format).",
    },
    note: {
      type: "string",
      label: "Note",
      description: "A note for the time entry.",
      optional: true,
    },
  },
  methods: {
    createTimeLog(args = {}) {
      return this.app.post({
        path: "/time_entries",
        ...args,
      });
    },
  },
  async run({ $ }) {
    const {
      createTimeLog,
      personId,
      serviceId,
      startedAt,
      endedAt,
      note,
    } = this;

    const response = await createTimeLog({
      $,
      data: {
        data: {
          type: "time_entries",
          attributes: {
            started_at: startedAt,
            ended_at: endedAt,
            note,
          },
          relationships: {
            person: {
              data: {
                type: "people",
                id: personId,
              },
            },
            service: {
              data: {
                type: "services",
                id: serviceId,
              },
            },
          },
        },
      },
    });

    $.export("$summary", `Successfully created time log entry for person ${personId}`);
    return response;
  },
}; 
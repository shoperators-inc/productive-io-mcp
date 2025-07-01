import app from "../../productive_io.app.mjs";

export default {
  key: "productive_io-create-milestone",
  name: "Create Milestone",
  description: "Creates a new milestone in Productive.io. [See the documentation](https://developer.productive.io/milestones.html)",
  version: "0.0.1",
  type: "action",
  props: {
    app,
    name: {
      type: "string",
      label: "Name",
      description: "The name of the milestone.",
    },
    projectId: {
      propDefinition: [
        app,
        "projectId",
      ],
    },
    description: {
      type: "string",
      label: "Description",
      description: "The description of the milestone.",
      optional: true,
    },
  },
  methods: {
    createMilestone(args = {}) {
      return this.app.post({
        path: "/milestones",
        ...args,
      });
    },
  },
  async run({ $ }) {
    const {
      createMilestone,
      name,
      projectId,
      description,
    } = this;

    const response = await createMilestone({
      $,
      data: {
        data: {
          type: "milestones",
          attributes: {
            name,
            description,
          },
          relationships: {
            project: {
              data: {
                type: "projects",
                id: projectId,
              },
            },
          },
        },
      },
    });

    $.export("$summary", `Successfully created milestone with name: ${response.data?.attributes?.name}`);
    return response;
  },
}; 
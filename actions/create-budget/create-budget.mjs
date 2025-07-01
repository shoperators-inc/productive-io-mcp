import app from "../../productive_io.app.mjs";

export default {
  key: "productive_io-create-budget",
  name: "Create Budget",
  description: "Creates a new budget in Productive.io. [See the documentation](https://developer.productive.io/budgets.html)",
  version: "0.0.1",
  type: "action",
  props: {
    app,
    projectId: {
      propDefinition: [
        app,
        "projectId",
      ],
    },
    name: {
      type: "string",
      label: "Name",
      description: "The name of the budget.",
    },
    description: {
      type: "string",
      label: "Description",
      description: "The description of the budget.",
      optional: true,
    },
  },
  methods: {
    createBudget(args = {}) {
      return this.app.post({
        path: "/budgets",
        ...args,
      });
    },
  },
  async run({ $ }) {
    const {
      createBudget,
      projectId,
      name,
      description,
    } = this;

    const response = await createBudget({
      $,
      data: {
        data: {
          type: "budgets",
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

    $.export("$summary", `Successfully created budget with name: ${response.data?.attributes?.name}`);
    return response;
  },
}; 
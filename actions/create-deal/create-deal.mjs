import app from "../../productive_io.app.mjs";

export default {
  key: "productive_io-create-deal",
  name: "Create Deal",
  description: "Creates a new deal in Productive.io. [See the documentation](https://developer.productive.io/deals.html)",
  version: "0.0.1",
  type: "action",
  props: {
    app,
    name: {
      type: "string",
      label: "Name",
      description: "The name of the deal.",
    },
    companyId: {
      propDefinition: [
        app,
        "companyId",
      ],
    },
    description: {
      type: "string",
      label: "Description",
      description: "The description of the deal.",
      optional: true,
    },
  },
  methods: {
    createDeal(args = {}) {
      return this.app.post({
        path: "/deals",
        ...args,
      });
    },
  },
  async run({ $ }) {
    const {
      createDeal,
      name,
      companyId,
      description,
    } = this;

    const response = await createDeal({
      $,
      data: {
        data: {
          type: "deals",
          attributes: {
            name,
            description,
          },
          relationships: {
            company: {
              data: {
                type: "companies",
                id: companyId,
              },
            },
          },
        },
      },
    });

    $.export("$summary", `Successfully created deal with name: ${response.data?.attributes?.name}`);
    return response;
  },
}; 
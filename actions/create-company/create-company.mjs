import app from "../../productive_io.app.mjs";

export default {
  key: "productive_io-create-company",
  name: "Create Company",
  description: "Creates a new company in Productive.io. [See the documentation](https://developer.productive.io/companies.html)",
  version: "0.0.1",
  type: "action",
  props: {
    app,
    name: {
      type: "string",
      label: "Name",
      description: "The name of the company.",
    },
    description: {
      type: "string",
      label: "Description",
      description: "The description of the company.",
      optional: true,
    },
  },
  methods: {
    createCompany(args = {}) {
      return this.app.post({
        path: "/companies",
        ...args,
      });
    },
  },
  async run({ $ }) {
    const {
      createCompany,
      name,
      description,
    } = this;

    const response = await createCompany({
      $,
      data: {
        data: {
          type: "companies",
          attributes: {
            name,
            description,
          },
        },
      },
    });

    $.export("$summary", `Successfully created company with name: ${response.data?.attributes?.name}`);
    return response;
  },
}; 
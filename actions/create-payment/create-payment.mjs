import app from "../../productive_io.app.mjs";

export default {
  key: "productive_io-create-payment",
  name: "Create Payment",
  description: "Creates a new payment in Productive.io. [See the documentation](https://developer.productive.io/payments.html)",
  version: "0.0.1",
  type: "action",
  props: {
    app,
    amount: {
      type: "number",
      label: "Amount",
      description: "The amount of the payment.",
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
      description: "The description of the payment.",
      optional: true,
    },
  },
  methods: {
    createPayment(args = {}) {
      return this.app.post({
        path: "/payments",
        ...args,
      });
    },
  },
  async run({ $ }) {
    const {
      createPayment,
      amount,
      companyId,
      description,
    } = this;

    const response = await createPayment({
      $,
      data: {
        data: {
          type: "payments",
          attributes: {
            amount,
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

    $.export("$summary", `Successfully created payment for company ${companyId}`);
    return response;
  },
}; 
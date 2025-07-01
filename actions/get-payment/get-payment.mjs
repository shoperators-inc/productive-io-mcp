import app from "../../productive_io.app.mjs";

export default {
  key: "productive_io-get-payment",
  name: "Get Payment",
  description: "Gets a single payment by ID in Productive.io. [See the documentation](https://developer.productive.io/payments.html)",
  version: "0.0.1",
  type: "action",
  props: {
    app,
    paymentId: {
      type: "string",
      label: "Payment ID",
      description: "The ID of the payment to retrieve.",
    },
  },
  async run({ $ }) {
    const response = await this.app._makeRequest({
      path: `/payments/${this.paymentId}`,
    });
    $.export("$summary", `Fetched payment ${this.paymentId}`);
    return response;
  },
}; 
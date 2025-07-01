import app from "../../productive_io.app.mjs";

export default {
  key: "productive_io-change-deal-status",
  name: "Change Deal Status",
  description: "Changes the status of a deal in Productive.io. [See the documentation](https://developer.productive.io/deals.html)",
  version: "0.0.1",
  type: "action",
  props: {
    app,
    dealId: {
      type: "string",
      label: "Deal ID",
      description: "The ID of the deal to update.",
    },
    status: {
      type: "string",
      label: "Status",
      description: "The new status for the deal.",
      options: [
        "open",
        "won",
        "lost",
        "archived",
      ],
    },
  },
  methods: {
    updateDealStatus(args = {}) {
      return this.app._makeRequest({
        method: "patch",
        path: `/deals/${this.dealId}`,
        ...args,
      });
    },
  },
  async run({ $ }) {
    const {
      updateDealStatus,
      status,
    } = this;

    const response = await updateDealStatus({
      $,
      data: {
        data: {
          type: "deals",
          id: this.dealId,
          attributes: {
            status,
          },
        },
      },
    });

    $.export("$summary", `Successfully changed status of deal ${this.dealId} to ${status}`);
    return response;
  },
}; 
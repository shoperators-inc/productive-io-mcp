import app from "../../productive_io.app.mjs";

export default {
  key: "productive_io-get-document",
  name: "Get Document",
  description: "Gets a single document by ID in Productive.io. [See the documentation](https://developer.productive.io/docs.html)",
  version: "0.0.1",
  type: "action",
  props: {
    app,
    documentId: {
      type: "string",
      label: "Document ID",
      description: "The ID of the document to retrieve.",
    },
  },
  async run({ $ }) {
    const response = await this.app._makeRequest({
      path: `/docs/${this.documentId}`,
    });
    $.export("$summary", `Fetched document ${this.documentId}`);
    return response;
  },
}; 
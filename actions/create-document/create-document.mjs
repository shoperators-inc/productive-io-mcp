import app from "../../productive_io.app.mjs";

export default {
  key: "productive_io-create-document",
  name: "Create Document",
  description: "Creates a new document in Productive.io. [See the documentation](https://developer.productive.io/docs.html)",
  version: "0.0.1",
  type: "action",
  props: {
    app,
    name: {
      type: "string",
      label: "Name",
      description: "The name of the document.",
    },
    projectId: {
      propDefinition: [
        app,
        "projectId",
      ],
    },
    content: {
      type: "string",
      label: "Content",
      description: "The content of the document.",
      optional: true,
    },
  },
  methods: {
    createDocument(args = {}) {
      return this.app.post({
        path: "/docs",
        ...args,
      });
    },
  },
  async run({ $ }) {
    const {
      createDocument,
      name,
      projectId,
      content,
    } = this;

    const response = await createDocument({
      $,
      data: {
        data: {
          type: "docs",
          attributes: {
            name,
            content,
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

    $.export("$summary", `Successfully created document with name: ${response.data?.attributes?.name}`);
    return response;
  },
}; 
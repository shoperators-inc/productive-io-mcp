import app from "../../productive_io.app.mjs";

export default {
  key: "productive_io-create-expense",
  name: "Create Expense",
  description: "Creates a new expense in Productive.io. [See the documentation](https://developer.productive.io/expenses.html)",
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
    budgetId: {
      type: "string",
      label: "Budget ID",
      description: "The ID of the budget this expense is related to.",
    },
    amount: {
      type: "number",
      label: "Amount",
      description: "The amount of the expense.",
    },
    description: {
      type: "string",
      label: "Description",
      description: "The description of the expense.",
      optional: true,
    },
  },
  methods: {
    createExpense(args = {}) {
      return this.app.post({
        path: "/expenses",
        ...args,
      });
    },
  },
  async run({ $ }) {
    const {
      createExpense,
      personId,
      budgetId,
      amount,
      description,
    } = this;

    const response = await createExpense({
      $,
      data: {
        data: {
          type: "expenses",
          attributes: {
            amount,
            description,
          },
          relationships: {
            person: {
              data: {
                type: "people",
                id: personId,
              },
            },
            budget: {
              data: {
                type: "budgets",
                id: budgetId,
              },
            },
          },
        },
      },
    });

    $.export("$summary", `Successfully created expense for person ${personId}`);
    return response;
  },
}; 
#!/usr/bin/env node

import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ErrorCode,
  ListToolsRequestSchema,
  McpError,
} from "@modelcontextprotocol/sdk/types.js";
import axios from "axios";

// Import our constants
import constants from "./common/constants.mjs";

class ProductiveMCPServer {
  constructor() {
    this.server = new Server(
      {
        name: "productive-io-mcp-server",
        version: "1.0.0",
      },
      {
        capabilities: {
          tools: {},
        },
      }
    );

    this.authToken = process.env.PRODUCTIVE_AUTH_TOKEN;
    this.organizationId = process.env.PRODUCTIVE_ORGANIZATION_ID;

    if (!this.authToken || !this.organizationId) {
      throw new Error("PRODUCTIVE_AUTH_TOKEN and PRODUCTIVE_ORGANIZATION_ID environment variables are required");
    }

    this.setupToolHandlers();
  }

  getHeaders() {
    return {
      "X-Auth-Token": this.authToken,
      "X-Organization-Id": this.organizationId,
      "Content-Type": "application/vnd.api+json",
    };
  }

  getUrl(path) {
    return `${constants.BASE_URL}${constants.VERSION_PATH}${path}`;
  }

  async makeRequest({ method = "GET", path, data, params }) {
    try {
      const config = {
        method,
        url: this.getUrl(path),
        headers: this.getHeaders(),
        ...(data && { data }),
        ...(params && { params }),
      };

      const response = await axios(config);
      return response.data;
    } catch (error) {
      throw new McpError(
        ErrorCode.InternalError,
        `Productive.io API error: ${error.response?.data?.message || error.message}`
      );
    }
  }

  setupToolHandlers() {
    this.server.setRequestHandler(ListToolsRequestSchema, async () => {
      return {
        tools: [
          {
            name: "list_projects",
            description: "List all projects in Productive.io",
            inputSchema: {
              type: "object",
              properties: {
                page: {
                  type: "number",
                  description: "Page number for pagination",
                  default: 1,
                },
                pageSize: {
                  type: "number",
                  description: "Number of results per page",
                  default: 30,
                },
              },
            },
          },
          {
            name: "get_project",
            description: "Get details of a specific project",
            inputSchema: {
              type: "object",
              properties: {
                projectId: {
                  type: "string",
                  description: "The ID of the project to retrieve",
                },
              },
              required: ["projectId"],
            },
          },
          {
            name: "list_tasks",
            description: "List tasks in Productive.io",
            inputSchema: {
              type: "object",
              properties: {
                projectId: {
                  type: "string",
                  description: "Filter tasks by project ID",
                },
                status: {
                  type: "string",
                  description: "Filter tasks by status",
                },
                page: {
                  type: "number",
                  description: "Page number for pagination",
                  default: 1,
                },
                pageSize: {
                  type: "number",
                  description: "Number of results per page",
                  default: 30,
                },
              },
            },
          },
          {
            name: "create_task",
            description: "Create a new task in Productive.io",
            inputSchema: {
              type: "object",
              properties: {
                title: {
                  type: "string",
                  description: "The title of the task",
                },
                projectId: {
                  type: "string",
                  description: "The ID of the project to create the task in",
                },
                taskListId: {
                  type: "string",
                  description: "The ID of the task list to create the task in",
                },
                description: {
                  type: "string",
                  description: "Optional description for the task",
                },
              },
              required: ["title", "projectId", "taskListId"],
            },
          },
          {
            name: "get_task",
            description: "Get details of a specific task",
            inputSchema: {
              type: "object",
              properties: {
                taskId: {
                  type: "string",
                  description: "The ID of the task to retrieve",
                },
              },
              required: ["taskId"],
            },
          },
          {
            name: "list_companies",
            description: "List all companies in Productive.io",
            inputSchema: {
              type: "object",
              properties: {
                page: {
                  type: "number",
                  description: "Page number for pagination",
                  default: 1,
                },
                pageSize: {
                  type: "number",
                  description: "Number of results per page",
                  default: 30,
                },
              },
            },
          },
          {
            name: "create_company",
            description: "Create a new company in Productive.io",
            inputSchema: {
              type: "object",
              properties: {
                name: {
                  type: "string",
                  description: "The name of the company",
                },
                website: {
                  type: "string",
                  description: "Company website URL",
                },
                description: {
                  type: "string",
                  description: "Company description",
                },
              },
              required: ["name"],
            },
          },
          {
            name: "list_people",
            description: "List all people in Productive.io",
            inputSchema: {
              type: "object",
              properties: {
                page: {
                  type: "number",
                  description: "Page number for pagination",
                  default: 1,
                },
                pageSize: {
                  type: "number",
                  description: "Number of results per page",
                  default: 30,
                },
              },
            },
          },
          {
            name: "list_deals",
            description: "List all deals in Productive.io",
            inputSchema: {
              type: "object",
              properties: {
                page: {
                  type: "number",
                  description: "Page number for pagination",
                  default: 1,
                },
                pageSize: {
                  type: "number",
                  description: "Number of results per page",
                  default: 30,
                },
              },
            },
          },
          {
            name: "create_deal",
            description: "Create a new deal in Productive.io",
            inputSchema: {
              type: "object",
              properties: {
                name: {
                  type: "string",
                  description: "The name of the deal",
                },
                value: {
                  type: "number",
                  description: "The value of the deal",
                },
                companyId: {
                  type: "string",
                  description: "The ID of the company associated with the deal",
                },
              },
              required: ["name"],
            },
          },
          {
            name: "list_time_entries",
            description: "List time entries (bookings) in Productive.io",
            inputSchema: {
              type: "object",
              properties: {
                projectId: {
                  type: "string",
                  description: "Filter by project ID",
                },
                personId: {
                  type: "string",
                  description: "Filter by person ID",
                },
                page: {
                  type: "number",
                  description: "Page number for pagination",
                  default: 1,
                },
                pageSize: {
                  type: "number",
                  description: "Number of results per page",
                  default: 30,
                },
              },
            },
          },
          {
            name: "create_time_entry",
            description: "Create a new time entry (booking) in Productive.io",
            inputSchema: {
              type: "object",
              properties: {
                date: {
                  type: "string",
                  description: "Date for the time entry (YYYY-MM-DD format)",
                },
                time: {
                  type: "number",
                  description: "Time in minutes",
                },
                note: {
                  type: "string",
                  description: "Note for the time entry",
                },
                projectId: {
                  type: "string",
                  description: "The ID of the project",
                },
                personId: {
                  type: "string",
                  description: "The ID of the person",
                },
              },
              required: ["date", "time", "projectId", "personId"],
            },
          },
        ],
      };
    });

    this.server.setRequestHandler(CallToolRequestSchema, async (request) => {
      switch (request.params.name) {
        case "list_projects":
          return this.listProjects(request.params.arguments);
        case "get_project":
          return this.getProject(request.params.arguments);
        case "list_tasks":
          return this.listTasks(request.params.arguments);
        case "create_task":
          return this.createTask(request.params.arguments);
        case "get_task":
          return this.getTask(request.params.arguments);
        case "list_companies":
          return this.listCompanies(request.params.arguments);
        case "create_company":
          return this.createCompany(request.params.arguments);
        case "list_people":
          return this.listPeople(request.params.arguments);
        case "list_deals":
          return this.listDeals(request.params.arguments);
        case "create_deal":
          return this.createDeal(request.params.arguments);
        case "list_time_entries":
          return this.listTimeEntries(request.params.arguments);
        case "create_time_entry":
          return this.createTimeEntry(request.params.arguments);
        default:
          throw new McpError(
            ErrorCode.MethodNotFound,
            `Unknown tool: ${request.params.name}`
          );
      }
    });
  }

  async listProjects(args = {}) {
    const { page = 1, pageSize = 30 } = args;
    const params = {
      "page[number]": page,
      "page[size]": pageSize,
    };

    const response = await this.makeRequest({
      path: "/projects",
      params,
    });

    return {
      content: [
        {
          type: "text",
          text: JSON.stringify(response, null, 2),
        },
      ],
    };
  }

  async getProject(args) {
    const { projectId } = args;
    const response = await this.makeRequest({
      path: `/projects/${projectId}`,
    });

    return {
      content: [
        {
          type: "text",
          text: JSON.stringify(response, null, 2),
        },
      ],
    };
  }

  async listTasks(args = {}) {
    const { projectId, status, page = 1, pageSize = 30 } = args;
    const params = {
      "page[number]": page,
      "page[size]": pageSize,
      ...(projectId && { "filter[project_id]": projectId }),
      ...(status && { "filter[status]": status }),
    };

    const response = await this.makeRequest({
      path: "/tasks",
      params,
    });

    return {
      content: [
        {
          type: "text",
          text: JSON.stringify(response, null, 2),
        },
      ],
    };
  }

  async createTask(args) {
    const { title, projectId, taskListId, description } = args;
    const data = {
      data: {
        type: "tasks",
        attributes: {
          title,
          ...(description && { description }),
        },
        relationships: {
          project: {
            data: {
              type: "projects",
              id: projectId,
            },
          },
          task_list: {
            data: {
              type: "task_lists",
              id: taskListId,
            },
          },
        },
      },
    };

    const response = await this.makeRequest({
      method: "POST",
      path: "/tasks",
      data,
    });

    return {
      content: [
        {
          type: "text",
          text: `Task created successfully: ${JSON.stringify(response, null, 2)}`,
        },
      ],
    };
  }

  async getTask(args) {
    const { taskId } = args;
    const response = await this.makeRequest({
      path: `/tasks/${taskId}`,
    });

    return {
      content: [
        {
          type: "text",
          text: JSON.stringify(response, null, 2),
        },
      ],
    };
  }

  async listCompanies(args = {}) {
    const { page = 1, pageSize = 30 } = args;
    const params = {
      "page[number]": page,
      "page[size]": pageSize,
    };

    const response = await this.makeRequest({
      path: "/companies",
      params,
    });

    return {
      content: [
        {
          type: "text",
          text: JSON.stringify(response, null, 2),
        },
      ],
    };
  }

  async createCompany(args) {
    const { name, website, description } = args;
    const data = {
      data: {
        type: "companies",
        attributes: {
          name,
          ...(website && { website }),
          ...(description && { description }),
        },
      },
    };

    const response = await this.makeRequest({
      method: "POST",
      path: "/companies",
      data,
    });

    return {
      content: [
        {
          type: "text",
          text: `Company created successfully: ${JSON.stringify(response, null, 2)}`,
        },
      ],
    };
  }

  async listPeople(args = {}) {
    const { page = 1, pageSize = 30 } = args;
    const params = {
      "page[number]": page,
      "page[size]": pageSize,
    };

    const response = await this.makeRequest({
      path: "/people",
      params,
    });

    return {
      content: [
        {
          type: "text",
          text: JSON.stringify(response, null, 2),
        },
      ],
    };
  }

  async listDeals(args = {}) {
    const { page = 1, pageSize = 30 } = args;
    const params = {
      "page[number]": page,
      "page[size]": pageSize,
    };

    const response = await this.makeRequest({
      path: "/deals",
      params,
    });

    return {
      content: [
        {
          type: "text",
          text: JSON.stringify(response, null, 2),
        },
      ],
    };
  }

  async createDeal(args) {
    const { name, value, companyId } = args;
    const data = {
      data: {
        type: "deals",
        attributes: {
          name,
          ...(value && { value }),
        },
        ...(companyId && {
          relationships: {
            company: {
              data: {
                type: "companies",
                id: companyId,
              },
            },
          },
        }),
      },
    };

    const response = await this.makeRequest({
      method: "POST",
      path: "/deals",
      data,
    });

    return {
      content: [
        {
          type: "text",
          text: `Deal created successfully: ${JSON.stringify(response, null, 2)}`,
        },
      ],
    };
  }

  async listTimeEntries(args = {}) {
    const { projectId, personId, page = 1, pageSize = 30 } = args;
    const params = {
      "page[number]": page,
      "page[size]": pageSize,
      ...(projectId && { "filter[project_id]": projectId }),
      ...(personId && { "filter[person_id]": personId }),
    };

    const response = await this.makeRequest({
      path: "/bookings",
      params,
    });

    return {
      content: [
        {
          type: "text",
          text: JSON.stringify(response, null, 2),
        },
      ],
    };
  }

  async createTimeEntry(args) {
    const { date, time, note, projectId, personId } = args;
    const data = {
      data: {
        type: "bookings",
        attributes: {
          date,
          time,
          ...(note && { note }),
        },
        relationships: {
          project: {
            data: {
              type: "projects",
              id: projectId,
            },
          },
          person: {
            data: {
              type: "people",
              id: personId,
            },
          },
        },
      },
    };

    const response = await this.makeRequest({
      method: "POST",
      path: "/bookings",
      data,
    });

    return {
      content: [
        {
          type: "text",
          text: `Time entry created successfully: ${JSON.stringify(response, null, 2)}`,
        },
      ],
    };
  }

  async run() {
    const transport = new StdioServerTransport();
    await this.server.connect(transport);
    console.error("Productive.io MCP server running on stdio");
  }
}

const server = new ProductiveMCPServer();
server.run().catch(console.error);
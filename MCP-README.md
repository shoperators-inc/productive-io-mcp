# Productive.io MCP Server

A Model Context Protocol (MCP) server that provides AI assistants with the ability to interact with the Productive.io API. This server enables AI models to manage projects, tasks, companies, deals, time entries, and more within your Productive.io workspace.

## Features

- **Project Management**: List and retrieve project details
- **Task Management**: Create, list, and retrieve tasks
- **Company Management**: List and create companies
- **People Management**: List people in your organization
- **Deal Management**: List and create deals
- **Time Tracking**: List and create time entries (bookings)
- **Pagination Support**: Handle large datasets with built-in pagination
- **Error Handling**: Comprehensive error handling with meaningful messages

## Prerequisites

- Node.js 18.0.0 or higher
- A Productive.io account with API access
- Productive.io API credentials (Auth Token and Organization ID)

## Installation

1. Clone this repository:
```bash
git clone <your-repo-url>
cd productive-io-mcp-server
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
export PRODUCTIVE_AUTH_TOKEN="your_auth_token_here"
export PRODUCTIVE_ORGANIZATION_ID="your_organization_id_here"
```

Or create a `.env` file:
```env
PRODUCTIVE_AUTH_TOKEN=your_auth_token_here
PRODUCTIVE_ORGANIZATION_ID=your_organization_id_here
```

## Getting Productive.io API Credentials

1. Log in to your Productive.io account
2. Navigate to Settings → Integrations → API
3. Generate an API token
4. Note your Organization ID (visible in the URL or API documentation)

## Configuration

### Claude Desktop

Add the server to your Claude Desktop configuration file:

**macOS**: `~/Library/Application Support/Claude/claude_desktop_config.json`
**Windows**: `%APPDATA%\Claude\claude_desktop_config.json`

```json
{
  "mcpServers": {
    "productive-io": {
      "command": "node",
      "args": ["/path/to/your/productive-io-mcp-server/mcp-server.js"],
      "env": {
        "PRODUCTIVE_AUTH_TOKEN": "your_auth_token_here",
        "PRODUCTIVE_ORGANIZATION_ID": "your_organization_id_here"
      }
    }
  }
}
```

### Other MCP Clients

For other MCP clients, run the server directly:

```bash
node mcp-server.js
```

## Available Tools

### Project Management

- **`list_projects`**: List all projects with pagination
- **`get_project`**: Get details of a specific project

### Task Management

- **`list_tasks`**: List tasks with optional filtering by project and status
- **`create_task`**: Create a new task in a project
- **`get_task`**: Get details of a specific task

### Company Management

- **`list_companies`**: List all companies
- **`create_company`**: Create a new company

### People Management

- **`list_people`**: List all people in the organization

### Deal Management

- **`list_deals`**: List all deals
- **`create_deal`**: Create a new deal

### Time Tracking

- **`list_time_entries`**: List time entries (bookings) with optional filtering
- **`create_time_entry`**: Create a new time entry

## Usage Examples

### List Projects
```javascript
// AI Assistant can use this tool to get all projects
{
  "name": "list_projects",
  "arguments": {
    "page": 1,
    "pageSize": 10
  }
}
```

### Create a Task
```javascript
// AI Assistant can create tasks in projects
{
  "name": "create_task",
  "arguments": {
    "title": "Implement new feature",
    "projectId": "123",
    "taskListId": "456",
    "description": "Add the new dashboard feature as discussed"
  }
}
```

### Create a Time Entry
```javascript
// AI Assistant can log time entries
{
  "name": "create_time_entry",
  "arguments": {
    "date": "2024-01-15",
    "time": 120,
    "note": "Worked on API integration",
    "projectId": "123",
    "personId": "789"
  }
}
```

## Error Handling

The server includes comprehensive error handling:

- **Authentication Errors**: Invalid or missing API credentials
- **API Errors**: Productive.io API errors with detailed messages
- **Validation Errors**: Missing required parameters
- **Network Errors**: Connection issues with the Productive.io API

## Development

### Running in Development Mode

```bash
npm run dev
```

This runs the server with Node.js inspector for debugging.

### Testing the Server

You can test the server using the MCP Inspector:

```bash
npx @modelcontextprotocol/inspector node mcp-server.js
```

## API Rate Limits

Productive.io has API rate limits. The server handles these gracefully, but be mindful of:

- Making too many requests in a short period
- Using appropriate page sizes for list operations
- Implementing client-side caching when possible

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

MIT License - see LICENSE file for details

## Support

For issues related to:
- **This MCP Server**: Open an issue in this repository
- **Productive.io API**: Check the [Productive.io API documentation](https://developer.productive.io/)
- **MCP Protocol**: Check the [Model Context Protocol documentation](https://modelcontextprotocol.io/)

## Changelog

### Version 1.0.0
- Initial release
- Support for projects, tasks, companies, people, deals, and time entries
- Comprehensive error handling
- Pagination support
- Full MCP protocol compliance
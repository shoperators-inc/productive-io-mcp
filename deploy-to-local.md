# Deploy Productive.io MCP Server to Your Local Mac

Based on the log files, I can see you need to copy the MCP server files from this remote environment to your local Mac at `/Users/joeboloten/Repos/pipedream/productive_io/`.

## 🚨 **Issue Identified**

Claude Desktop on your Mac is looking for the server at:
```
/Users/joeboloten/Repos/pipedream/productive_io/mcp-server.js
```

But the files are currently in this remote `/workspace` environment.

## 📁 **Files to Copy to Your Mac**

Copy these files from this workspace to `/Users/joeboloten/Repos/pipedream/productive_io/`:

### **Essential MCP Server Files:**
- `mcp-server.js` - Main MCP server
- `mcp-package.json` - Dependencies (rename to `package.json`)
- `.env` - Environment variables (with your credentials)
- `common/constants.mjs` - Constants file
- `common/utils.mjs` - Utility functions

### **Optional Documentation:**
- `MCP-README.md` - Full documentation
- `PROJECT_SUMMARY.md` - Project overview
- `claude_desktop_config.json` - Claude Desktop config

## 🔧 **Setup Steps on Your Mac**

### **1. Copy Files**
```bash
# Navigate to your local productive_io directory
cd /Users/joeboloten/Repos/pipedream/productive_io

# Copy the essential files here (you'll need to transfer them from this remote environment)
# Make sure you have:
# - mcp-server.js
# - package.json (renamed from mcp-package.json)  
# - .env (with your API credentials)
# - common/ directory with constants.mjs and utils.mjs
```

### **2. Install Dependencies**
```bash
cd /Users/joeboloten/Repos/pipedream/productive_io
npm install
```

### **3. Test the Server**
```bash
# Set environment variables and test
export PRODUCTIVE_AUTH_TOKEN="902441be-ad05-4442-a920-e9a426e2f44c"
export PRODUCTIVE_ORGANIZATION_ID="46295"

# Test the server
node mcp-server.js
```

### **4. Configure Claude Desktop**

Copy this configuration to your Claude Desktop config file:

**macOS Location:** `~/Library/Application Support/Claude/claude_desktop_config.json`

```json
{
  "mcpServers": {
    "productive-io": {
      "command": "node",
      "args": ["/Users/joeboloten/Repos/pipedream/productive_io/mcp-server.js"],
      "env": {
        "PRODUCTIVE_AUTH_TOKEN": "902441be-ad05-4442-a920-e9a426e2f44c",
        "PRODUCTIVE_ORGANIZATION_ID": "46295"
      }
    }
  }
}
```

### **5. Restart Claude Desktop**

After copying the config, restart Claude Desktop to load the new MCP server.

## 🔍 **Troubleshooting**

If you get errors:

1. **"Cannot find module"** - Make sure all files are copied to the correct path
2. **"Environment variables missing"** - Verify your `.env` file has the correct credentials
3. **"Dependencies missing"** - Run `npm install` in the productive_io directory

## ✅ **Verification**

Once set up correctly, Claude Desktop should:
- Connect to your MCP server without errors
- Show "productive-io" as an available server
- Allow you to use Productive.io tools in conversations

## 📂 **Final Directory Structure on Your Mac**

```
/Users/joeboloten/Repos/pipedream/productive_io/
├── mcp-server.js              # Main MCP server
├── package.json               # Dependencies (from mcp-package.json)
├── package-lock.json          # Auto-generated after npm install
├── .env                       # Your API credentials
├── node_modules/              # Dependencies (after npm install)
├── common/
│   ├── constants.mjs          # API constants
│   └── utils.mjs              # Utility functions
└── [your existing Pipedream files]
```

The key is making sure the MCP server files are in the exact path that Claude Desktop expects: `/Users/joeboloten/Repos/pipedream/productive_io/`
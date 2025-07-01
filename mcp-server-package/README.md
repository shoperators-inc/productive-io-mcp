# Productive.io MCP Server Package

This package contains all the files you need to set up your Productive.io MCP server on your Mac.

## 📁 **Package Contents**

✅ **Essential Files:**
- `mcp-server.js` - Main MCP server
- `mcp-package.json` - Dependencies (rename to `package.json`)
- `.env` - Your API credentials (already configured)
- `common/constants.mjs` - API constants
- `common/utils.mjs` - Utility functions

📖 **Setup Files:**
- `claude_desktop_config.json` - Claude Desktop configuration
- `copy-files.sh` - Automated setup script
- `deploy-to-local.md` - Detailed deployment instructions
- `README.md` - This file

## 🚀 **Quick Setup (3 Steps)**

### **Step 1: Copy Files to Your Mac**
```bash
# Navigate to your productive_io directory
cd /Users/joeboloten/Repos/pipedream/productive_io

# Copy all files from this package to that directory
# (You can drag and drop or use cp command)
```

### **Step 2: Run Setup Script**
```bash
# Make the script executable and run it
chmod +x copy-files.sh
./copy-files.sh
```

### **Step 3: Configure Claude Desktop**
```bash
# Copy the configuration to Claude Desktop
cp claude_desktop_config.json ~/Library/Application\ Support/Claude/claude_desktop_config.json

# Restart Claude Desktop
```

## 🔧 **Manual Setup (Alternative)**

If you prefer to set up manually:

```bash
cd /Users/joeboloten/Repos/pipedream/productive_io

# Rename package file
mv mcp-package.json package.json

# Install dependencies
npm install

# Test the server
export PRODUCTIVE_AUTH_TOKEN="902441be-ad05-4442-a920-e9a426e2f44c"
export PRODUCTIVE_ORGANIZATION_ID="46295"
node mcp-server.js
```

## ✅ **Verification**

After setup, you should see in Claude Desktop:
- No connection errors in the logs
- "productive-io" server listed as connected
- Ability to use Productive.io tools in conversations

## 📞 **Support**

If you encounter issues:
1. Check the `deploy-to-local.md` file for detailed troubleshooting
2. Verify all files are in `/Users/joeboloten/Repos/pipedream/productive_io/`
3. Ensure Claude Desktop config points to the correct path

Your Productive.io MCP server is ready to bring AI-powered project management to your workflow! 🎉
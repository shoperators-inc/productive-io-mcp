#!/bin/bash

# Productive.io MCP Server Setup Script

set -e

echo "🚀 Setting up Productive.io MCP Server..."
echo

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18.0.0 or higher."
    echo "   Download from: https://nodejs.org/"
    exit 1
fi

# Check Node.js version
NODE_VERSION=$(node --version | cut -d'v' -f2)
REQUIRED_VERSION="18.0.0"

if ! node -e "
const semver = (v) => v.split('.').map(Number);
const [major1, minor1, patch1] = semver('$NODE_VERSION');
const [major2, minor2, patch2] = semver('$REQUIRED_VERSION');
const isGreater = major1 > major2 || (major1 === major2 && minor1 > minor2) || (major1 === major2 && minor1 === minor2 && patch1 >= patch2);
if (!isGreater) process.exit(1);
"; then
    echo "❌ Node.js version $NODE_VERSION is too old. Please upgrade to $REQUIRED_VERSION or higher."
    exit 1
fi

echo "✅ Node.js version $NODE_VERSION is compatible"

# Install dependencies using the MCP-specific package.json
echo "📦 Installing dependencies..."
if [ -f "mcp-package.json" ]; then
    cp mcp-package.json package.json
    npm install
    echo "✅ Dependencies installed"
else
    echo "❌ mcp-package.json not found"
    exit 1
fi

# Create .env file if it doesn't exist
if [ ! -f ".env" ]; then
    echo "📝 Creating .env file..."
    cp .env.example .env
    echo "✅ Created .env file from template"
    echo
    echo "⚠️  IMPORTANT: Please edit .env file and add your Productive.io credentials:"
    echo "   - PRODUCTIVE_AUTH_TOKEN"
    echo "   - PRODUCTIVE_ORGANIZATION_ID"
    echo
    echo "   You can get these from your Productive.io account:"
    echo "   Settings → Integrations → API"
    echo
else
    echo "✅ .env file already exists"
fi

# Make scripts executable
chmod +x mcp-server.js test-server.js

echo "✅ Setup completed successfully!"
echo
echo "Next steps:"
echo "1. Edit .env file with your Productive.io credentials"
echo "2. Test the server: npm test"
echo "3. Start the server: npm start"
echo
echo "For Claude Desktop integration, add this to your config:"
echo "{"
echo "  \"mcpServers\": {"
echo "    \"productive-io\": {"
echo "      \"command\": \"node\","
echo "      \"args\": [\"$(pwd)/mcp-server.js\"],"
echo "      \"env\": {"
echo "        \"PRODUCTIVE_AUTH_TOKEN\": \"your_token_here\","
echo "        \"PRODUCTIVE_ORGANIZATION_ID\": \"your_org_id_here\""
echo "      }"
echo "    }"
echo "  }"
echo "}"
echo
#!/bin/bash

# Script to copy essential MCP server files to local Mac directory
# Run this on your Mac after transferring files from the remote environment

TARGET_DIR="/Users/joeboloten/Repos/pipedream/productive_io"

echo "🚀 Setting up Productive.io MCP Server on your Mac..."
echo

# Create target directory if it doesn't exist
mkdir -p "$TARGET_DIR"
cd "$TARGET_DIR"

echo "📁 Current directory: $(pwd)"
echo

# Check if essential files exist
echo "🔍 Checking for essential files..."

REQUIRED_FILES=(
    "mcp-server.js"
    "mcp-package.json"
    ".env"
    "common/constants.mjs"
    "common/utils.mjs"
)

MISSING_FILES=()

for file in "${REQUIRED_FILES[@]}"; do
    if [ -f "$file" ]; then
        echo "✅ Found: $file"
    else
        echo "❌ Missing: $file"
        MISSING_FILES+=("$file")
    fi
done

echo

if [ ${#MISSING_FILES[@]} -gt 0 ]; then
    echo "⚠️  Missing files detected. Please copy these files from the remote environment:"
    for file in "${MISSING_FILES[@]}"; do
        echo "   - $file"
    done
    echo
    echo "You can download these files from your remote environment and place them in:"
    echo "   $TARGET_DIR"
    echo
    exit 1
fi

# Rename mcp-package.json to package.json
if [ -f "mcp-package.json" ] && [ ! -f "package.json" ]; then
    echo "📝 Renaming mcp-package.json to package.json..."
    cp mcp-package.json package.json
    echo "✅ Created package.json"
fi

# Install dependencies
echo "📦 Installing dependencies..."
npm install

if [ $? -eq 0 ]; then
    echo "✅ Dependencies installed successfully"
else
    echo "❌ Failed to install dependencies"
    exit 1
fi

echo

# Test environment variables
echo "🔧 Testing environment setup..."
if grep -q "PRODUCTIVE_AUTH_TOKEN=902441be-ad05-4442-a920-e9a426e2f44c" .env; then
    echo "✅ API token found in .env"
else
    echo "⚠️  API token not found in .env file"
fi

if grep -q "PRODUCTIVE_ORGANIZATION_ID=46295" .env; then
    echo "✅ Organization ID found in .env"
else
    echo "⚠️  Organization ID not found in .env file"
fi

echo

# Make server executable
chmod +x mcp-server.js

echo "🎉 Setup complete!"
echo
echo "Next steps:"
echo "1. Test the server: node mcp-server.js"
echo "2. Copy the Claude Desktop config from claude_desktop_config.json"
echo "3. Restart Claude Desktop"
echo
echo "Claude Desktop config location:"
echo "   ~/Library/Application Support/Claude/claude_desktop_config.json"
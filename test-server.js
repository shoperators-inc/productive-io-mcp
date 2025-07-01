#!/usr/bin/env node

import { spawn } from 'child_process';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

console.log('Testing Productive.io MCP Server...\n');

// Check environment variables
if (!process.env.PRODUCTIVE_AUTH_TOKEN || !process.env.PRODUCTIVE_ORGANIZATION_ID) {
  console.error('❌ Missing required environment variables:');
  console.error('   PRODUCTIVE_AUTH_TOKEN');
  console.error('   PRODUCTIVE_ORGANIZATION_ID');
  console.error('\nPlease set these environment variables and try again.');
  process.exit(1);
}

console.log('✅ Environment variables found');

// Test the server by spawning it and sending a test message
const serverPath = join(__dirname, 'mcp-server.js');
const server = spawn('node', [serverPath], {
  stdio: ['pipe', 'pipe', 'pipe'],
  env: process.env
});

let output = '';
let errorOutput = '';

server.stdout.on('data', (data) => {
  output += data.toString();
});

server.stderr.on('data', (data) => {
  errorOutput += data.toString();
  if (data.toString().includes('Productive.io MCP server running on stdio')) {
    console.log('✅ Server started successfully');
    
    // Send a test list_tools request
    const listToolsRequest = {
      jsonrpc: '2.0',
      id: 1,
      method: 'tools/list'
    };
    
    server.stdin.write(JSON.stringify(listToolsRequest) + '\n');
    
    setTimeout(() => {
      server.kill();
    }, 2000);
  }
});

server.on('close', (code) => {
  if (code === 0 || code === null) {
    console.log('✅ Server test completed successfully');
    
    // Check if we got a valid response
    if (output.includes('list_projects') && output.includes('create_task')) {
      console.log('✅ Server is exposing expected tools');
    } else {
      console.log('⚠️  Server response may be incomplete');
    }
  } else {
    console.error(`❌ Server exited with code ${code}`);
    if (errorOutput) {
      console.error('Error output:', errorOutput);
    }
  }
});

server.on('error', (err) => {
  console.error('❌ Failed to start server:', err.message);
});

// Timeout after 5 seconds
setTimeout(() => {
  console.log('⚠️  Test timeout - killing server');
  server.kill();
}, 5000);
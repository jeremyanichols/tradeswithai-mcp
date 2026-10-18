/**
 * Example MCP client for Trades With AI
 *
 * Connects to the remote server and calls the search_trade_tools tool.
 *
 * Usage:
 *   npm install @modelcontextprotocol/sdk
 *   node examples/client.mjs
 */

import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StreamableHTTPClientTransport } from "@modelcontextprotocol/sdk/client/streamableHttp.js";

const SERVER_URL = "https://tradeswithai.com/mcp";

async function main() {
  const transport = new StreamableHTTPClientTransport(new URL(SERVER_URL));

  const client = new Client({
    name: "tradeswithai-example",
    version: "1.0.0",
  });

  await client.connect(transport);

  console.log("Connected to:", SERVER_URL);
  console.log("Server info:", client.getServerVersion());

  // List available tools
  const tools = await client.listTools();
  console.log("\nAvailable tools:");
  for (const tool of tools.tools) {
    console.log(`  - ${tool.name}: ${tool.title || tool.description.slice(0, 60)}...`);
  }

  // Call search_trade_tools
  console.log("\nSearching for HVAC AI tools...\n");

  const result = await client.callTool({
    name: "search_trade_tools",
    arguments: {
      trade: "hvac",
      limit: 3,
    },
  });

  if (result.content && result.content.length > 0) {
    for (const item of result.content) {
      if (item.type === "text") {
        const data = JSON.parse(item.text);
        console.log(JSON.stringify(data, null, 2));
      }
    }
  }

  await client.close();
}

main().catch(console.error);

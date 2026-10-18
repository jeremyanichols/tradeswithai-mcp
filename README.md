# Trades With AI MCP Server

A remote MCP (Model Context Protocol) server that provides read-only data on AI tools for trades businesses and public SaaS pricing. No authentication required.

**Endpoint:** `https://tradeswithai.com/mcp`  
**Transport:** Streamable HTTP  
**Registry:** `com.tradeswithai/directory`

## What It Does

This server gives AI agents access to:

- A curated directory of AI and software tools for trades businesses (HVAC, plumbing, electrical, roofing, lawn care, cleaning, pest control, contractors)
- Public pricing data for 300+ SaaS vendors, checked weekly against vendor pricing pages
- Price change tracking with source quotes and check dates

All prices include the vendor's own text and the date verified. Data is CC BY 4.0.

## Tools

| Tool | Description |
|------|-------------|
| `search_trade_tools` | Find AI tools by trade, task, category, or max monthly price |
| `get_trade_tool` | Get full details for one tool: prices, integrations, trades served |
| `compare_trade_tools` | Compare 2 to 12 tools side by side |
| `search_saas_vendors` | Search 300+ SaaS vendors by name or category |
| `get_vendor_pricing` | Get public plan prices for one vendor with source quotes |
| `recent_price_changes` | List price changes detected between weekly checks |

## Installation

### Claude Desktop

Add to your `claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "tradeswithai": {
      "url": "https://tradeswithai.com/mcp"
    }
  }
}
```

### Cursor

Add to your MCP settings (Settings > MCP Servers):

```json
{
  "mcpServers": {
    "tradeswithai": {
      "url": "https://tradeswithai.com/mcp"
    }
  }
}
```

Or add to `.cursor/mcp.json` in your project:

```json
{
  "mcpServers": {
    "tradeswithai": {
      "url": "https://tradeswithai.com/mcp"
    }
  }
}
```

### VS Code

Add to your VS Code settings or `.vscode/mcp.json`:

```json
{
  "mcp": {
    "servers": {
      "tradeswithai": {
        "url": "https://tradeswithai.com/mcp"
      }
    }
  }
}
```

### Generic (mcp-remote / npx)

For clients that do not support remote servers, use `mcp-remote`:

```json
{
  "mcpServers": {
    "tradeswithai": {
      "command": "npx",
      "args": ["-y", "mcp-remote", "https://tradeswithai.com/mcp"]
    }
  }
}
```

## curl Example

Initialize a session and list tools:

```bash
# Initialize
curl -X POST "https://tradeswithai.com/mcp" \
  -H "Content-Type: application/json" \
  -d '{"jsonrpc":"2.0","id":1,"method":"initialize","params":{"protocolVersion":"2025-03-26","capabilities":{},"clientInfo":{"name":"curl","version":"1.0.0"}}}'

# Call a tool
curl -X POST "https://tradeswithai.com/mcp" \
  -H "Content-Type: application/json" \
  -d '{"jsonrpc":"2.0","id":2,"method":"tools/call","params":{"name":"search_trade_tools","arguments":{"trade":"hvac","limit":3}}}'
```

## Links

- Website: https://tradeswithai.com
- Documentation: https://tradeswithai.com/agents/
- Server card: https://tradeswithai.com/.well-known/mcp-server-card
- OpenAPI spec: https://tradeswithai.com/openapi.json
- Glama: https://glama.ai/mcp/connectors/com.tradeswithai/directory

## License

MIT License - See [LICENSE](LICENSE) for details.

# Install StarryKit in Cursor

[中文](README.zh-CN.md) · [Back to the Plugin](../../README.md)

## Install from the Cursor Marketplace

Open `/add-plugin` in Cursor, search for **StarryKit**, and select **Install**. Cursor installs the canonical StarryKit Skill and configures the Hosted MCP together.

The Marketplace listing is currently under review. Until it is available, use the manual setup below.

## Install the Plugin manually

Clone the complete Plugin into Cursor's local Plugin directory:

```sh
git clone https://github.com/StarryKit/starrykit-plugin.git ~/.cursor/plugins/local/starrykit-plugin
```

Restart Cursor or run **Developer: Reload Window**. Cursor loads the bundled Skill and MCP configuration from the Plugin.

If you only want to configure the MCP without installing the Plugin, add this entry to global `~/.cursor/mcp.json`, or to `.cursor/mcp.json` for one project:

```json
{
  "mcpServers": {
    "starrykit": {
      "type": "http",
      "url": "https://mcp.starrykit.com/mcp"
    }
  }
}
```

## Connect your account

Open Cursor's MCP settings and complete browser OAuth when prompted. Cursor Agent CLI users can run:

```sh
cursor-agent mcp login starrykit
cursor-agent mcp list-tools starrykit
```

Do not add credentials or static Authorization headers.

## Verify

Ask Cursor Agent to use StarryKit to list the visual documents you can access. The setup is ready when it can call `list_documents` and returns your authorized documents, or an empty result without an authentication error.

Official references: [Cursor plugins](https://cursor.com/docs/plugins), [Cursor MCP](https://cursor.com/docs/context/mcp), [Cursor Agent CLI MCP commands](https://cursor.com/docs/cli/reference/parameters), and [Cursor Skills](https://cursor.com/docs/skills).

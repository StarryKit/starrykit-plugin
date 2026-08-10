# Install StarryKit in Cursor

[中文](README.zh-CN.md) · [Back to the Plugin](../../README.md)

## 1. Install the Skill

Clone this repository and copy the canonical Skill into a Cursor-supported personal location:

```sh
git clone https://github.com/StarryKit/starrykit-plugin.git
mkdir -p ~/.cursor/skills
cp -R starrykit-plugin/skills/starrykit ~/.cursor/skills/
```

## 2. Configure MCP

Add this entry to your global `~/.cursor/mcp.json`, or to `.cursor/mcp.json` for one project:

```json
{
  "mcpServers": {
    "starrykit": {
      "url": "https://mcp.starrykit.com/mcp"
    }
  }
}
```

Open Cursor's MCP settings and complete OAuth when prompted. Cursor Agent CLI users can run:

```sh
cursor-agent mcp login starrykit
cursor-agent mcp list-tools starrykit
```

Do not add credentials or static Authorization headers.

## 3. Verify

Ask Cursor Agent to use StarryKit to list the visual documents you can access. The setup is ready when it can call `list_documents`.

Official references: [Cursor MCP](https://cursor.com/docs/context/mcp), [Cursor Agent CLI MCP commands](https://cursor.com/docs/cli/reference/parameters), [Cursor Skills](https://cursor.com/docs/skills).

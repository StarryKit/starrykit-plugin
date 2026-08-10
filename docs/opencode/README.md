# Install StarryKit in OpenCode

[中文](README.zh-CN.md) · [Back to the Plugin](../../README.md)

## 1. Install the Skill

```sh
git clone https://github.com/StarryKit/starrykit-plugin.git
mkdir -p ~/.config/opencode/skills
cp -R starrykit-plugin/skills/starrykit ~/.config/opencode/skills/
```

OpenCode also supports `~/.agents/skills` and project-local `.opencode/skills` or `.agents/skills` locations.

## 2. Configure MCP

Merge this block into `~/.config/opencode/opencode.json` or a project `opencode.json`:

```json
{
  "$schema": "https://opencode.ai/config.json",
  "mcp": {
    "starrykit": {
      "type": "remote",
      "url": "https://mcp.starrykit.com/mcp",
      "enabled": true
    }
  }
}
```

Authenticate and inspect the connection:

```sh
opencode mcp auth starrykit
opencode mcp list
```

OpenCode handles OAuth for remote MCP servers. Do not add a static token.

## 3. Verify

Ask OpenCode to use StarryKit to list your accessible visual documents. The setup is ready when `list_documents` completes.

Official references: [OpenCode MCP servers](https://opencode.ai/docs/mcp-servers/), [OpenCode Agent Skills](https://opencode.ai/docs/skills/).

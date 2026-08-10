# Install StarryKit in Claude Code

[中文](README.zh-CN.md) · [Back to the Plugin](../../README.md)

Use the root README's one-prompt installation first. These steps install the Skill and Hosted MCP connection manually.

## 1. Install the Skill

```sh
git clone https://github.com/StarryKit/starrykit-plugin.git
mkdir -p ~/.claude/skills
cp -R starrykit-plugin/skills/starrykit ~/.claude/skills/
```

Claude Code discovers personal skills under `~/.claude/skills`. Restart Claude Code if this is the first Skill directory created during the current session.

## 2. Add the Hosted MCP server

```sh
claude mcp add --transport http --scope user starrykit https://mcp.starrykit.com/mcp
```

Open Claude Code, run `/mcp`, select `starrykit`, and complete the browser OAuth flow. Do not configure a bearer token or client secret.

## 3. Verify

Ask Claude Code:

```text
Use StarryKit to list the visual documents I can access.
```

The connection is ready when `list_documents` completes without an authentication error.

Official references: [Claude Code MCP](https://code.claude.com/docs/en/mcp), [Claude Code Skills](https://code.claude.com/docs/en/skills).

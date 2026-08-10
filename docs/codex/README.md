# Install StarryKit in Codex

[中文](README.zh-CN.md) · [Back to the Plugin](../../README.md)

Use the root README's one-prompt installation first. These are the manual steps for Codex CLI, the IDE extension, and the Codex app.

## 1. Install the Skill

Clone this repository, then copy the canonical Skill into your personal Agent Skills directory:

```sh
git clone https://github.com/StarryKit/starrykit-plugin.git
mkdir -p ~/.agents/skills
cp -R starrykit-plugin/skills/starrykit ~/.agents/skills/
```

Codex discovers personal skills under `~/.agents/skills`. Restart Codex if the Skill does not appear.

## 2. Add the Hosted MCP server

```sh
codex mcp add starrykit --url https://mcp.starrykit.com/mcp
codex mcp login starrykit
```

Complete StarryKit authorization in the browser. Never add a bearer token or client secret to the command.

## 3. Verify

Start a new Codex task and ask:

```text
Use StarryKit to list the visual documents I can access.
```

The connection is ready when Codex can call `list_documents` and return your authorized documents or an empty result without an authentication error.

Official references: [Codex MCP](https://developers.openai.com/codex/mcp), [Codex Skills](https://developers.openai.com/codex/skills).

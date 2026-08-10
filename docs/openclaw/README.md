# Install StarryKit in OpenClaw

[中文](README.zh-CN.md) · [Back to the Plugin](../../README.md)

## 1. Install the Skill

```sh
git clone https://github.com/StarryKit/starrykit-plugin.git
openclaw skills install ./starrykit-plugin/skills/starrykit --as starrykit
```

Add `--global` if the Skill should be available to every local OpenClaw agent.

## 2. Add and authenticate MCP

```sh
openclaw mcp add starrykit \
  --url https://mcp.starrykit.com/mcp \
  --transport streamable-http \
  --auth oauth
openclaw mcp login starrykit
```

Complete authorization in the browser. If OpenClaw returns an authorization code, finish with `openclaw mcp login starrykit --code <code>`.

## 3. Verify

```sh
openclaw mcp doctor starrykit --probe
openclaw mcp status --verbose
```

Then ask an OpenClaw agent to use StarryKit to list your accessible visual documents.

Official references: [OpenClaw Skills](https://docs.openclaw.ai/skills), [OpenClaw MCP CLI](https://docs.openclaw.ai/cli/mcp).

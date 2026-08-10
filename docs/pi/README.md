# StarryKit and Pi

[中文](README.zh-CN.md) · [Back to the Plugin](../../README.md)

Pi can discover Agent Skills, but its core intentionally does **not** include an MCP client. Installing the StarryKit Skill alone therefore cannot connect Pi to the StarryKit Hosted MCP.

Do not paste a token into a Skill or invent an unofficial connection. Use StarryKit with Codex, Claude Code, Cursor, OpenCode, OpenClaw, or another host with remote Streamable HTTP MCP and OAuth support.

Pi support can be added later through a maintained extension that exposes the discovered StarryKit MCP tools to Pi. Until that adapter exists and is tested, Pi is not a supported StarryKit host.

Official reference: [Pi coding agent README](https://github.com/badlogic/pi-mono/blob/main/packages/coding-agent/README.md).

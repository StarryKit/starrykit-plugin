# Install StarryKit in another agent host

[中文](README.zh-CN.md) · [Back to the Plugin](../../README.md)

Your host must support:

- Agent Skills (`SKILL.md`) or an equivalent instruction mechanism;
- remote MCP over Streamable HTTP;
- browser OAuth for protected remote MCP servers.

## Setup

1. Clone `https://github.com/StarryKit/starrykit-plugin`.
2. Install `skills/starrykit/` in the host's supported Skill directory. Keep it canonical; do not fork the workflow into a host-specific copy.
3. Add a remote MCP server named `starrykit` with URL `https://mcp.starrykit.com/mcp`.
4. Complete the host-managed browser OAuth flow. Never put an access token or client secret in configuration.
5. Restart or refresh tool discovery, then ask the host to call `list_documents`.

If the host lacks remote MCP OAuth, StarryKit is not fully supported there. Do not work around that boundary by asking the user for a bearer token in chat.

Protocol reference: [Model Context Protocol](https://modelcontextprotocol.io/specification/latest).

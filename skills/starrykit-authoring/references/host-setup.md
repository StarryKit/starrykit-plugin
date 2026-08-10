# Hosted MCP setup by Agent host

Use the installed plugin connection first. Use these manual paths only when the `starrykit` MCP server or its tools are absent.
Use the non-empty deployment-provided `STARRYKIT_MCP_URL`. If it is unavailable, stop and ask for the published StarryKit MCP endpoint instead of executing a command with an empty value.
Never execute a setup command with an empty placeholder, guess a hostname, or put a token or secret in configuration.

## Codex

If the combined StarryKit plugin is installed, enable its bundled `starrykit` MCP server and authenticate it. For a manual connection:

```sh
: "${STARRYKIT_MCP_URL:?Set STARRYKIT_MCP_URL to the deployed StarryKit MCP endpoint}"
codex mcp add starrykit --url "$STARRYKIT_MCP_URL"
codex mcp login starrykit
```

Restart or open a new task if discovery remains stale, then confirm the server with `/mcp` or `codex mcp list` and call `list_documents`.

## Claude Code

Prefer the StarryKit plugin, whose root `.mcp.json` registers the Stage server. For a manual connection, use Claude Code's MCP UI or its current `claude mcp add` flow to add a remote HTTP server named `starrykit` at the configured deployment URL or the Stage endpoint above, then complete OAuth when first prompted. Do not invent CLI flags when the installed Claude Code version presents a different syntax; inspect `claude mcp --help` and use its remote HTTP form.

## Cursor

Install the skill under `.cursor/skills/` or `~/.cursor/skills/`. Merge the plugin's `hosts/cursor/mcp.json` entry into project `.cursor/mcp.json` or global `~/.cursor/mcp.json`, replacing the endpoint placeholder with the deployed URL. Let Cursor follow the server's OAuth discovery after the first protected request, then refresh MCP tools.

## OpenCode

Install the skill under `.opencode/skills/` or `~/.config/opencode/skills/`. Merge `hosts/opencode/opencode.json` into the active config, replace the endpoint placeholder, then run:

```sh
opencode mcp auth starrykit
```

## OpenClaw

Install the canonical skill, add the remote MCP server, and authenticate:

```sh
openclaw skills install <plugin-checkout>/skills/starrykit-authoring --as starrykit-authoring
: "${STARRYKIT_MCP_URL:?Set STARRYKIT_MCP_URL to the deployed StarryKit MCP endpoint}"
openclaw mcp add starrykit --url "$STARRYKIT_MCP_URL" --transport streamable-http --auth oauth
openclaw mcp login starrykit
```

## Pi coding agent

Pi does not currently provide built-in MCP support. Do not implement an MCP client or OAuth flow inside this skill. Explain that the maintained StarryKit MCP extension/adapter is required; until it is installed, the skill cannot execute StarryKit operations.

## Other hosts

Require remote Streamable HTTP plus OAuth authorization-code support with protected-resource discovery and PKCE. Add a server named `starrykit`, complete the host-managed OAuth flow, refresh tool discovery, and verify with `list_documents`. If the host lacks one of those capabilities, report the unsupported boundary rather than asking for a bearer token in chat.

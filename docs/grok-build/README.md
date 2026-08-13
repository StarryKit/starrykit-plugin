# Install StarryKit in Grok Build

[中文](README.zh-CN.md) · [All installation guides](../README.md)

Install the StarryKit Plugin directly from its public GitHub repository:

```bash
grok plugin install StarryKit/starrykit-plugin --trust
```

`--trust` allows Grok Build to activate the Hosted MCP bundled with the Plugin. StarryKit does not include local executables, hooks, or embedded credentials; its only MCP connection is the production endpoint at `https://mcp.starrykit.com/mcp`.

## Connect your account

Start Grok Build, open `/mcps`, select `starrykit`, and complete the browser OAuth flow. Do not paste an API token or client secret into the Plugin configuration.

## Verify the installation

Start a new session and ask:

```text
Use StarryKit to list my recent visual documents.
```

The connection is ready when Grok Build can call `list_documents` and return your authorized documents, or an empty result without an authentication error.

## Troubleshooting

Inspect the installed Plugin with:

```bash
grok plugin details starrykit-plugin
grok inspect --json
```

If the MCP is disabled, open `/plugins` and trust the Plugin, or reinstall it with `--trust`.

Official reference: [Grok Build plugins, skills, and marketplaces](https://docs.x.ai/build/features/skills-plugins-marketplaces).

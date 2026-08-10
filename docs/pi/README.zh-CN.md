# StarryKit 与 Pi

[English](README.md) · [返回 Plugin 首页](../../README.zh-CN.md)

Pi 能发现 Agent Skills，但其核心明确不内置 MCP client。因此，仅安装 StarryKit Skill 并不能让 Pi 连接 StarryKit Hosted MCP。

不要把 token 写进 Skill，也不要使用未经验证的非官方连接。请在 Codex、Claude Code、Cursor、OpenCode、OpenClaw，或其他支持远程 Streamable HTTP MCP 与 OAuth 的宿主中使用 StarryKit。

未来可以通过一个受维护的 Pi Extension，把 StarryKit MCP 动态发现的工具暴露给 Pi。在该 adapter 完成并通过验证前，Pi 不属于正式支持的 StarryKit 宿主。

官方参考：[Pi coding agent README](https://github.com/badlogic/pi-mono/blob/main/packages/coding-agent/README.md)。

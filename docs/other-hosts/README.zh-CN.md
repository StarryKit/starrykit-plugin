# 在其他 Agent 宿主中安装 StarryKit

[English](README.md) · [返回 Plugin 首页](../../README.zh-CN.md)

宿主需要支持：

- Agent Skills（`SKILL.md`）或等价的指令机制；
- 基于 Streamable HTTP 的远程 MCP；
- 受保护远程 MCP 的浏览器 OAuth。

## 安装

1. Clone `https://github.com/StarryKit/starrykit-plugin`。
2. 把 `skills/starrykit/` 安装到宿主支持的 Skill 目录。保持这份 canonical Skill，不要复制出宿主专用分叉。
3. 添加名为 `starrykit` 的远程 MCP，URL 为 `https://mcp.starrykit.com/mcp`。
4. 通过宿主管理的浏览器流程完成 OAuth。不要把 access token 或 client secret 写进配置。
5. 重启或刷新工具发现，然后让宿主调用 `list_documents`。

如果宿主不支持远程 MCP OAuth，StarryKit 就无法在该宿主上完整工作。不要通过让用户在聊天中粘贴 bearer token 来绕过这一限制。

协议参考：[Model Context Protocol](https://modelcontextprotocol.io/specification/latest)。

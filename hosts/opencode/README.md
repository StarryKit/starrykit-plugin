# StarryKit × OpenCode

兼容等级：**Tier A**（原生 Agent Skills + 原生 remote MCP OAuth，含 RFC 7591 DCR）。状态：adapter 就绪，真实 Stage dogfood 未完成（#959 后续），在 dogfood 通过前不视为正式支持。

OpenCode 加载 canonical Skill，并通过原生 remote MCP 客户端连接 StarryKit Hosted MCP。本目录只包含安装位置、配置 adapter 与命令，不包含业务语义，也不复制 tool schema。

## 安装 Skill

把 canonical Skill 目录 `../../skills/starrykit-authoring/` 复制（或符号链接）到：

- 项目：`.opencode/skills/starrykit-authoring/`（或 `.agents/skills/`）
- 全局：`~/.config/opencode/skills/starrykit-authoring/`（或 `~/.agents/skills/`）

OpenCode 也会读取 `.claude/skills/` 与 `~/.claude/skills/`；若本机已按 Claude Code 方式安装过 canonical Skill，无需重复安装。可用 `permission.skill` 模式控制可见性。

## 配置 MCP

把 `opencode.json` 中的 `mcp` 块合并进项目或全局 `~/.config/opencode/opencode.json`。配置已固定连接 Production endpoint `https://mcp.starrykit.com/mcp`：

```json
{
  "mcp": {
    "starrykit": {
      "type": "remote",
      "url": "https://mcp.starrykit.com/mcp",
      "enabled": true
    }
  }
}
```

## Login

```sh
opencode mcp auth starrykit
```

OpenCode 也会在首次请求收到 401 时自动发起 OAuth，支持 RFC 7591 Dynamic Client Registration（StarryKit 授权服务器支持无鉴权 DCR 与 PKCE S256，无需手动配置 client 凭据）。consent 页按两步流程确认连接并选择授权范围（整个 Workspace 或选定 Folder，各带 read / read & write 等级）。查看状态：

```sh
opencode mcp list
```

token 存储在 `~/.local/share/opencode/mcp-auth.json`。

## Update

- Skill：重新同步 canonical 目录。
- MCP：服务端升级不需要改客户端配置。

## Uninstall

```sh
opencode mcp logout starrykit
```

然后移除 `opencode.json` 中的 `mcp.starrykit` 条目与 skill 目录。在 StarryKit 设置中撤销授权；把 Document 移出授权 Folder、删除 Folder 或撤销授权都会立即撤销访问。

## 已知限制

- 最低版本要求未知；官方文档未标注远程 transport 的 MCP protocol 版本。
- MCP 工具会占用上下文，OpenCode 官方建议按需启用。
- Draft 只能在 StarryKit UI 中接受或丢弃，MCP 不提供 accept/drop（所有宿主一致）。

## 来源

- https://opencode.ai/docs/skills/
- https://opencode.ai/docs/mcp-servers/
- https://opencode.ai/docs/config/

# StarryKit × Cursor

兼容等级：**Tier A**（原生 Agent Skills + 原生 remote MCP OAuth）。状态：adapter 就绪，真实 Stage dogfood（IDE 与 CLI Agent）未完成（#959 后续），在 dogfood 通过前不视为正式支持。

Cursor（编辑器与 CLI Agent，Agent Skills 需 Cursor ≥ 2.4）加载 canonical Skill，并用原生 MCP 客户端连接 StarryKit Hosted MCP。本目录只包含安装位置、配置 adapter 与命令，不包含业务语义，也不复制 tool schema。

## 安装 Skill

把 canonical Skill 目录 `../../skills/starrykit-authoring/` 复制（或符号链接）到：

- 项目：`.cursor/skills/starrykit-authoring/`（或 `.agents/skills/`）
- 个人：`~/.cursor/skills/starrykit-authoring/`（或 `~/.agents/skills/`）

Cursor 也会读取 legacy 位置 `.claude/skills/` 与 `~/.claude/skills/`；若本机已按 Claude Code 方式安装过 canonical Skill，无需重复安装。

## 配置 MCP

把 `mcp.json` 合并进项目 `.cursor/mcp.json` 或全局 `~/.cursor/mcp.json`。配置已固定连接 Production endpoint `https://mcp.starrykit.com/mcp`：

```json
{
  "mcpServers": {
    "starrykit": { "url": "https://mcp.starrykit.com/mcp" }
  }
}
```

### Add to Cursor deeplink

Marketing 可用官方 install link 生成一键安装入口：

```
cursor://anysphere.cursor-deeplink/mcp/install?name=starrykit&config=<BASE64({"url":"https://mcp.starrykit.com/mcp"})>
```

## Login

Cursor 首次请求收到 401 后，会按 RFC 9728 metadata 发现 StarryKit 授权服务器、通过 Dynamic Client Registration 注册并跳转浏览器完成授权（consent 页按两步流程确认连接并选择授权范围（整个 Workspace 或选定 Folder，各带 read / read & write 等级））。StarryKit 授权服务器支持无鉴权 DCR 与 PKCE S256，无需手动配置 client 凭据。桌面回调地址为 `http://localhost:8787/callback`，Cursor Web/Agents 使用官方托管回调。

## Update

- Skill：重新同步 canonical 目录。
- MCP：服务端升级不需要改客户端配置。

## Uninstall

- 从 `.cursor/mcp.json` / `~/.cursor/mcp.json` 移除 `starrykit` 条目（或在 MCP 设置中停用）。
- 删除 skill 目录。
- 在 StarryKit 设置中撤销授权；把 Document 移出授权 Folder、删除 Folder 或撤销授权都会立即撤销访问。

## 已知限制

- OAuth 依赖服务端 DCR：Cursor 不提供手动填写 client_id/secret 的通用流程（官方论坛确认）；StarryKit 已满足 DCR 要求。
- token 存储位置未公开文档化。
- Draft 只能在 StarryKit UI 中接受或丢弃，MCP 不提供 accept/drop（所有宿主一致）。

## 来源

- https://cursor.com/docs/skills
- https://cursor.com/changelog/2-4
- https://cursor.com/docs/context/mcp
- https://cursor.com/docs/context/mcp/install-links
- https://forum.cursor.com/t/oauth-code-flow-with-cursor-in-mcp-server-without-dynamic-client-registration/115319

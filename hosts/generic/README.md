# 其他 Agent 宿主：通用手动接入

StarryKit Hosted MCP 的 Production endpoint 是 `https://mcp.starrykit.com/mcp`。

兼容等级：**Tier C**（受限手动接入）。未经过 Stage dogfood 的宿主一律不承诺为正式支持；本文档描述任何标准 MCP 客户端的手动接入方式，并明确缺失能力。

## 服务端能力（所有宿主一致）

- Transport：Streamable HTTP（`POST https://mcp.starrykit.com/mcp`），无 session 依赖。同一 endpoint 同时支持 legacy `2025-06-18` initialize 流程与 `2026-07-28` stateless enveloped 双协议，由服务端按请求自动分流；各宿主客户端的实证状态见 `../compatibility.json`。
- OAuth 2.1 authorization code + PKCE（S256）。授权服务器通过 RFC 9728 protected resource metadata 发现：相对 MCP origin 的 `/.well-known/oauth-protected-resource/mcp`。
- Dynamic Client Registration（RFC 7591）：支持无鉴权注册，宿主无需预置 client 凭据。宿主不支持 DCR 时，可先手动调用 metadata 公布的 registration endpoint 注册 public client，再把 client_id 配置进宿主（不发放 client secret，不要在配置中存放任何 secret）。
- Scopes：`documents:read`、`documents:write`、`authoring:run`（可选 `offline_access`）。
- 授权边界：consent 页两步授权，选择整个 Workspace 或选定 Folder，各带 read / read & write 等级；移出授权 Folder、删除 Folder 或撤销授权立即失效。授权语义、撤销与错误恢复在所有宿主一致。
- MCP 不提供 Page Draft 的 accept/drop；用户只能在 StarryKit UI 中接受或丢弃。
- 宿主上报的 clientInfo 只作为 best-effort analytics 维度，不参与权限、Document Origin 或幂等 identity。

## 接入步骤

1. 确认宿主 MCP 客户端支持：remote Streamable HTTP、401 → RFC 9728 发现 → OAuth authorization code（PKCE S256）。
2. 在宿主 MCP 配置中新增名为 `starrykit` 的 remote server，URL 使用 `https://mcp.starrykit.com/mcp`；不要把 token 或 secret 写入配置。
3. 完成宿主的 OAuth 流程，在 StarryKit consent 页确认连接并选择授权范围（可在授权时新建 Folder）。
4. 工具列表以服务端 discovery 为准；不要在宿主侧复制 tool schema 或业务语义。

## Skill 引用

- 宿主支持 Agent Skills（SKILL.md）：直接安装 canonical Skill 目录 `../../skills/starrykit-authoring/`，等同 Tier A/B 宿主的做法。
- 宿主只支持 rules / AGENTS.md 指令：在规则中引用 canonical `SKILL.md` 的位置（仓库 checkout 或发布包路径），让 Agent 需要时读取。不要把内容复制成宿主私有版本——canonical Skill 是唯一 source of truth，复制会分叉业务语义。

## 缺失能力（Tier C 的含义）

- 没有 Agent Skills 的宿主只有"裸工具"接入：MCP 工具可用，但没有 canonical 工作流与安全边界指引，行为质量不做承诺。
- 没有原生 remote MCP OAuth 的宿主需要自带 adapter；StarryKit 不为未具名宿主维护 adapter。
- 支持矩阵（`../compatibility.json`）中未列出或未 dogfood 的宿主，问题排查与兼容性自负。

## 来源

- https://modelcontextprotocol.io/specification/2025-06-18
- https://www.rfc-editor.org/rfc/rfc7591
- https://www.rfc-editor.org/rfc/rfc9728

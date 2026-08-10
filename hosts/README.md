# StarryKit Agent Plugin 宿主接入层

`hosts/` 为 Claude Code / Codex 之外的 Agent 宿主提供接入 adapter。所有宿主共享同一套业务边界：

- 一个完整 canonical Skill：`../skills/starrykit-authoring/SKILL.md` 能从工具缺失开始完成宿主识别、MCP 连接、OAuth、验证与 Authoring 工作流。宿主 adapter 引用它，绝不分叉。
- 一个独立完整 Hosted MCP endpoint：所有宿主连接同一个 Production Streamable HTTP 服务 `https://mcp.starrykit.com/mcp`；即使 Skill 未加载，MCP instructions、tool metadata、严格 schema 与 structured results 也足以指导正确调用。
- `hosts/<host>/` 只放 manifest、安装位置、配置 adapter、命令与宿主特定说明；不含服务端业务逻辑，不复制 tool schema。
- 宿主上报的 clientInfo 仅作 best-effort analytics 维度，不参与权限、Document Origin 或幂等 identity。
- MCP 一律不提供 Page Draft 的 accept/drop。

## 目录布局

仓库根目录的 `.claude-plugin/`、`.codex-plugin/`、`.mcp.json`、`skills/` 是既有 Claude Code 与 Codex 两宿主的发布路径，保持原位不迁移：Claude Code plugin 体系要求 `.claude-plugin/plugin.json` 位于 plugin 根目录，搬迁会破坏已验证的安装路径。`hosts/` 收纳新增宿主：

- `openclaw/`：OpenClaw adapter（Tier A）。
- `pi/`：Pi coding agent（pi-mono）adapter 契约（Tier B，MCP extension adapter 未交付）。
- `cursor/`：Cursor adapter（Tier A）。
- `opencode/`：OpenCode adapter（Tier A）。
- `generic/`：其他兼容 Agent 的通用手动接入说明（Tier C）。
- `compatibility.json` + `compatibility.schema.json`：machine-readable 支持矩阵（Marketing 支持矩阵的数据源）。

## 兼容等级

| Tier | 定义 |
| --- | --- |
| A | 原生 SKILL.md + remote MCP OAuth，可直接安装。 |
| B | 原生 Skill，但 MCP 需要受维护的 host adapter/extension。 |
| C | 只支持 MCP 或 rules/AGENTS 指令，受限手动接入并明确缺失能力。 |

## 支持矩阵摘要

| 宿主 | Tier | 状态 | Stage dogfood |
| --- | --- | --- | --- |
| Claude Code | A | shipped（根目录 adapter） | pending（#898） |
| Codex | A | shipped（根目录 adapter） | pending（#898） |
| OpenClaw | A | adapter-ready | pending（#959） |
| Pi coding agent | B | planned（MCP adapter 未交付） | pending（#959） |
| Cursor | A | adapter-ready | pending（#959） |
| OpenCode | A | adapter-ready | pending（#959） |
| 其他兼容 Agent | C | manual | 不适用 |

完整字段（最低版本、Skill discovery、MCP transport/protocol、OAuth/DCR/PKCE、token storage、安装范围、update/uninstall、已知限制、来源）见 `compatibility.json`；表格与各宿主 README 必须与它保持一致，由校验强制。

未完成真实 Stage dogfood 的宿主一律不视为正式支持；宿主能力以官方文档实证为准，查不到确凿证据的字段记为 `unknown`，不虚构。

## 协议版本表达

`compatibility.json` 的 `canonical.protocolEras` 描述 Hosted MCP 服务端当前支持的 wire protocol：同一 endpoint 同时支持 legacy `2025-06-18` initialize 流程与 `2026-07-28` stateless enveloped 双协议，由服务端按请求自动分流。每个宿主的 `mcp.protocolEras` 记录该宿主客户端的实证状态（`verified` / `documented` / `unknown` / `unsupported`）。服务端协议能力变化只需更新 manifest 字段，宿主 adapter 无需改动。

## 新增宿主

1. 新建 `hosts/<host-id>/README.md`（含 Tier、安装/login/update/uninstall、限制、来源 URL）与必要的配置 adapter 文件（endpoint 一律使用 `https://mcp.starrykit.com/mcp`，不得使用 Stage hostname，不放任何 secret）。
2. 在 `compatibility.json` 追加宿主条目（schema 见 `compatibility.schema.json`）。
3. 运行 `node scripts/validate-hosts.mjs` 直至通过。

以上步骤不需要修改 Hosted MCP 业务代码；宿主能力变化只更新 adapter 与矩阵。

## 校验

- `node scripts/validate-hosts.mjs`：hosts 层契约校验（manifest schema 一致性、目录/文档一致性、Production endpoint 与禁写规则、无 SKILL.md 副本、无 tool schema 复制）。
- `python3 scripts/validate.py`：root 契约校验（manifest、`.mcp.json`、Skill 边界短语、fixtures）。
- `node --test tests/host-contract.test.mjs`：契约测试（覆盖上述两者与导出流程）。

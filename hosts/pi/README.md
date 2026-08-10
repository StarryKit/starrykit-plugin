# StarryKit × Pi coding agent（pi-mono）

StarryKit Hosted MCP 的 Production endpoint 是 `https://mcp.starrykit.com/mcp`。

兼容等级：**Tier B**（原生 Skill，但 MCP 需要受维护的 host adapter/extension）。状态：planned——Pi 官方 README 明确"No MCP"，在 MCP extension adapter 交付前，Pi 无法调用 StarryKit Hosted MCP 工具，仅安装 Skill 没有实际作用。

本目录只记录安装位置与 adapter 契约，不包含业务语义，也不复制 tool schema。

## Skill 安装位置（原生支持）

Pi 遵循 Agent Skills 标准，从以下位置发现 SKILL.md：

- 全局：`~/.pi/agent/skills/`、`~/.agents/skills/`
- 项目：`.pi/skills/`、`.agents/skills/`（向上级目录搜索）
- `settings.json` 的 `"skills"` 数组可追加目录（例如指向本仓库 checkout 的 `skills`）
- pi package：`package.json` 的 `"pi"` 字段声明 `skills` 资源，用 `pi install npm:...` / `pi install git:...` 安装，`pi update` 更新，`pi remove <package>` 卸载

安装即复制或引用 canonical Skill 目录 `../../skills/starrykit-authoring/`，不要 fork 内容；后续计划以 pi package 形式分发同一 Skill。

## MCP adapter 契约（未交付）

Pi 没有内建 MCP 支持；官方建议"build an extension that adds MCP support"。StarryKit 的接入方式为一个受维护的 TypeScript extension（放置于 `~/.pi/agent/extensions/` 或以 pi package 分发），要求：

- 在 extension 内通过标准 MCP 客户端连接 `STARRYKIT_MCP_URL`（Streamable HTTP + OAuth），把 Hosted MCP tools 注册为 pi 工具（`pi.registerTool`）。
- 不复制 tool schema、不改写业务语义：工具定义来自 Hosted MCP discovery。
- 决不把 MCP client 或 OAuth 逻辑实现在 Skill 脚本中。
- token 存储由 adapter 定义并随 adapter 文档化。

adapter 实现与 Pi 的 Stage dogfood 一并交付（#959 后续），避免提交未经真实宿主验证的 OAuth 客户端代码。

## Update / Uninstall

- Skill：重新同步 canonical 目录；package 分发后用 `pi update` / `pi remove <package>`。
- 服务端：在 StarryKit 设置中撤销授权；把 Document 移出授权 Folder、删除 Folder 或撤销授权都会立即撤销访问。

## 已知限制

- 无内建 MCP（官方 README："No MCP. Build CLI tools with READMEs (see Skills), or build an extension that adds MCP support."）。
- 最低版本要求未知；npm 包名为 `@earendil-works/pi-coding-agent`（曾用 `@mariozechner/pi-coding-agent`）。
- Draft 只能在 StarryKit UI 中接受或丢弃，MCP 不提供 accept/drop（所有宿主一致）。

## 来源

- https://github.com/badlogic/pi-mono/blob/main/packages/coding-agent/README.md
- https://github.com/badlogic/pi-mono/blob/main/packages/coding-agent/docs/skills.md
- https://github.com/badlogic/pi-mono/blob/main/packages/coding-agent/docs/extensions.md
- https://github.com/badlogic/pi-mono/blob/main/packages/coding-agent/docs/packages.md

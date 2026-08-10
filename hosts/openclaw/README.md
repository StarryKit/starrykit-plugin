# StarryKit × OpenClaw

兼容等级：**Tier A**（原生 SKILL.md + 原生 remote MCP OAuth）。状态：adapter 就绪，真实 Stage dogfood 未完成（#959 后续），在 dogfood 通过前不视为正式支持。

OpenClaw 加载 canonical Skill（`../../skills/starrykit-authoring/SKILL.md`），并通过原生 MCP 客户端连接 StarryKit Hosted MCP。本目录只包含安装位置、配置 adapter 与命令，不包含业务语义，也不复制 tool schema。

## 前置

设置 Hosted MCP Production endpoint：

```sh
export STARRYKIT_MCP_URL="https://mcp.starrykit.com/mcp"
```

## 安装 Skill

从仓库 checkout 安装 canonical Skill（不要 fork 或改写内容）：

```sh
openclaw skills install <checkout>/skills/starrykit-authoring --as starrykit-authoring
```

也可以手动把 skill 目录放入任一发现位置：`<workspace>/skills`、`<workspace>/.agents/skills`、`~/.agents/skills` 或 managed 目录 `~/.openclaw/skills`（`--global` 安装的目标）。同名时高优先级位置生效。

## 配置 MCP connector

```sh
openclaw mcp add starrykit --url "$STARRYKIT_MCP_URL" --transport streamable-http --auth oauth
```

或将 `openclaw.mcp.json` 的内容合并进 OpenClaw 配置的 `mcp.servers`；该 adapter 已固定连接 `https://mcp.starrykit.com/mcp`。

## Login

```sh
openclaw mcp login starrykit
```

按打印的 authorization URL 在浏览器完成 StarryKit OAuth 授权（consent 页按两步流程确认连接并选择授权范围（整个 Workspace 或选定 Folder，各带 read / read & write 等级）），必要时按提示用 `--code` 继续。验证连通性：

```sh
openclaw mcp doctor starrykit --probe
openclaw mcp status --verbose
```

## Update

- Skill：`openclaw skills update --all`（ClawHub/git 安装时），本地路径安装则重新执行安装命令。
- MCP：服务端升级不需要改客户端配置。

## Uninstall

- Skill：OpenClaw 目前没有官方 skills uninstall 命令（openclaw/openclaw#14264）。手动删除 skill 目录，或在 `openclaw.json` 中设 `skills.entries.starrykit-authoring.enabled: false`。
- MCP：从配置的 `mcp.servers` 中移除 `starrykit` 条目。
- 服务端：在 StarryKit 设置中撤销授权；把 Document 移出授权 Folder、删除 Folder 或撤销授权都会立即撤销访问。

## 已知限制

- token 存储位置与 OAuth DCR/PKCE 细节未在官方文档说明；以 Stage dogfood 实测为准。
- 最低版本要求未知。
- Draft 只能在 StarryKit UI 中接受或丢弃，MCP 不提供 accept/drop（所有宿主一致）。

## 来源

- https://docs.openclaw.ai/tools/skills
- https://docs.openclaw.ai/tools/skills-config
- https://docs.openclaw.ai/tools/mcp
- https://github.com/openclaw/openclaw/issues/14264

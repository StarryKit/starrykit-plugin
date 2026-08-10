# 版本策略与兼容矩阵

本文定义 StarryKit Agent Plugin 的版本对象、兼容矩阵、回滚方式，以及 MCP contract version 的声明位置。

## 三个版本对象

| 对象 | 声明位置 | 语义 |
| --- | --- | --- |
| Plugin bundle 版本 | `.claude-plugin/plugin.json` 与 `.codex-plugin/plugin.json` 的 `version` | 用户安装到的东西：manifest、canonical Skill、宿主 adapter、fixtures。两处必须一致，由 `scripts/validate.py` 强制。 |
| MCP wire protocol era | `hosts/compatibility.json` 的 `canonical.protocolEras` | Hosted MCP 服务端支持的协议纪元。当前 `2025-06-18`（legacy initialize 流程）与 `2026-07-28`（stateless enveloped）均为 `supported`，同一 endpoint 自动分流。 |
| Tool contract | Hosted MCP 服务端 discovery（`tools/list`） | 工具列表、schema 与 annotations 只由服务端声明；插件不复制、不 pin 任何 tool schema。 |

服务端 `serverInfo.version` 是实现版本，不是 contract 版本；宿主与 Skill 都不得依赖它做行为分支。

## Plugin 版本规则（semver）

- **patch**：文档、fixtures、宿主 adapter 修正，不改变 Skill 语义。
- **minor**：新增宿主 adapter、新增工作流指引、跟进服务端新增的工具。
- **major**：Skill 语义或安全边界变化（例如某工具的语义收紧、授权边界表述变化）。

发布节奏与 tool contract 解耦：

- 服务端**新增工具或放宽输入**：旧版插件继续工作（工具来自 discovery），可在下一个 minor 里补充 Skill 指引。
- 服务端**收紧、删除或改变某工具语义**：必须同步更新 canonical Skill 并发布新插件版本；服务端在既有插件版本仍在流通期间保持旧语义可用。

每个发布版本在公开仓库打 `v<semver>` tag，并保持两份 manifest 的 `version` 与 tag 一致。

## 兼容矩阵

`hosts/compatibility.json`（schema 见 `hosts/compatibility.schema.json`）是 machine-readable 的支持矩阵，覆盖：

- 每个宿主的兼容等级（Tier A/B/C）、状态与 Stage dogfood 实证结果；
- Skill discovery 方式与安装位置、MCP transport 与 protocol era 实证状态、OAuth/DCR/PKCE、token 存储、install/login/update/uninstall、已知限制与来源 URL；
- `canonical` 块：所有宿主共享的服务端 contract（见下节）。

`hosts/README.md` 的摘要表必须与矩阵一致，由 `scripts/validate-hosts.mjs` 强制。未完成真实 Stage dogfood 的宿主一律不视为正式支持；查不到确凿证据的字段记为 `unknown`，不虚构。

## MCP contract version 的声明位置

服务端 contract 的可版本化事实全部集中在 `hosts/compatibility.json` 的 `canonical` 块：

- `protocolEras`：wire protocol 纪元支持状态（`supported` / `planned` / `none`）。
- `oauth`：grant types、PKCE、Dynamic Client Registration、scopes、RFC 9728 resource metadata 路径。
- `transport` 与 `endpointVariable`：Streamable HTTP 与 endpoint 占位符约定。
- `draftAcceptDrop: false` 与 `clientInfoUsage: "best-effort-analytics-only"`：两条行为边界被 schema 与校验钉死，任何版本都不得漂移。

`updated` 字段记录矩阵最后一次与服务端实际能力核对的日期；`canonical` 块的每次变化都必须来自服务端已经发布的真实变更，而不是计划。

## 回滚方式

- **插件侧**：回滚 = 安装上一个发布版本。Claude Code 与 Codex 的 marketplace 分发都按 `version` pin 更新，marketplace 条目可用 `ref`/`sha` 钉住旧 tag；手动安装的宿主（`hosts/` 下的 adapter）checkout 旧 tag 重新同步 Skill 目录即可。
- **服务端**：由 StarryKit 运维执行、对宿主透明。回滚窗口内服务端保证：既有 protocol era 不消失、既有工具语义不回退到不兼容状态（新增工具暂时消失是允许的降级）。
- **Skill**：canonical Skill 随 bundle 走，没有独立回滚通道；回滚插件版本即回滚 Skill。

授权状态不受回滚影响：OAuth 授权与 consent grant 存在 StarryKit 服务端，插件升级、回滚或重装后按当前 grant 继续生效，用户可随时在 StarryKit 设置中撤销。

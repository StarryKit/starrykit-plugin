# StarryKit Plugin

> 本仓库是从 StarryKit 主仓导出的独立发布快照。Hosted MCP 服务端与其 contract 测试保留在 StarryKit 主仓（不开源）；本仓库只包含宿主安装所需的 manifest、canonical Skill、宿主 adapter 与契约校验。服务端行为契约见 `docs/versioning.md` 与 `hosts/compatibility.json`。

这是多个 Agent 宿主共用的 StarryKit Authoring Plugin。canonical Skill 是完整的用户入口：可以发现、连接并使用 Hosted MCP；Hosted MCP 也是完整的能力入口：没有加载 Skill 时仍可只靠 instructions、tool metadata、严格 schema 与 structured results 正确工作。两者共享行为契约但互不假设对方已经提供上下文。Claude Code 与 Codex 使用仓库根目录的 manifest，其他宿主见 `hosts/`。

OAuth 授权分两步：先确认连接方、账户与目标 Workspace，再选择访问范围——默认整个 Workspace（read & write，可改为只读），也可以改为若干个 Folder 并按 Folder 混合设置 `read` / `read_write`，还可以让 StarryKit 在允许授权时新建一个 Folder。Plugin 只能看到授权范围内的 Document：Folder 模式不包含 Workspace 根目录，把 Document 移入授权 Folder 会获得访问，移出会立即失去访问；用户随时可以撤销授权。宿主名称仅用于展示，不参与权限。

## MCP endpoint

Plugin 固定连接 StarryKit Production Streamable HTTP MCP endpoint：

```text
https://mcp.starrykit.com/mcp
```

不要把 access token 或 client secret 写入配置；MCP host 与宿主客户端通过 OAuth 完成认证。

## 目录

- `.codex-plugin/plugin.json`：Codex manifest。
- `.claude-plugin/plugin.json`：Claude Code manifest。
- `.mcp.json`：共享 Hosted MCP 配置。
- `skills/starrykit-authoring/SKILL.md`：完整的跨宿主发现、连接、OAuth、Authoring 与恢复工作流；`references/host-setup.md` 提供按需加载的宿主接入路径。
- `hosts/`：其他宿主的接入层（adapter、兼容等级、machine-readable `compatibility.json` 支持矩阵、通用手动接入说明）。
- `docs/versioning.md`：版本策略、兼容矩阵、回滚方式与 MCP contract version 声明位置。
- `scripts/validate.py`：root 契约校验（Codex/Claude manifest、`.mcp.json`、Skill 边界短语、fixtures）。
- `scripts/validate-hosts.mjs`：hosts 层契约校验。
- `tests/`：契约 fixtures 与测试（`fixtures.json` 为 Skill 行为样例，也是正/负 eval 与平台提交测试用例的数据源；`host-fixtures/` 为宿主 manifest 契约样例；`host-contract.test.mjs` 为可独立运行的契约测试）。

既有 `.claude-plugin/`、`.codex-plugin/` 保持在 plugin 根目录：Claude Code plugin 体系要求 `.claude-plugin/plugin.json` 位于根目录，迁入 `hosts/` 会破坏已验证的安装路径；布局详见 `hosts/README.md`。

## 校验与测试

- `node scripts/validate-hosts.mjs`：hosts 层契约校验。
- `python3 scripts/validate.py`：root 契约校验与 fixtures。
- `node --test tests/host-contract.test.mjs`：契约测试（覆盖上述两者与导出流程）。

以上命令在 plugin 目录内运行。

## License

StarryKit Plugin is licensed under the [MIT License](./LICENSE).

<sub>Historical note: this repository previously hosted Starry Slides. The final source snapshot is preserved on the [`archive/starry-slides-v0.1.38`](https://github.com/StarryKit/starrykit-plugin/tree/archive/starry-slides-v0.1.38) branch.</sub>

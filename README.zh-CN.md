<p align="center">
  <img src="assets/brand/starrykit-wordmark.svg" alt="StarryKit" width="420" />
</p>

<h1 align="center">StarryKit Plugin</h1>

<p align="center">
  不离开你的 AI Agent，把一个想法变成精致、可继续编辑的演示文稿与视觉设计。
</p>

<p align="center">
  <a href="README.md">English</a> ·
  <a href="#用一句-prompt-完成安装">开始使用</a> ·
  <a href="#看看实际效果">演示</a> ·
  <a href="#手动安装">手动安装</a> ·
  <a href="https://starrykit.com">官方网站</a>
</p>

StarryKit Plugin 为 Codex、Claude Code、Cursor、OpenCode、OpenClaw 等兼容 Agent 提供统一的视觉创作工作流。你只需描述想讲的故事，Agent 就可以通过 StarryKit Hosted MCP 创建文档、设计页面、优化已有作品并导出最终成果。

所有结果在 StarryKit 中保持可编辑。文档归你所有，页面草稿由你审核，最终版本也由你决定。

## 用一句 Prompt 完成安装

把下面这段话发送给你的 Agent：

```text
请从 https://github.com/StarryKit/starrykit-plugin 安装 StarryKit Plugin。
配置 https://mcp.starrykit.com/mcp 这个 StarryKit Hosted MCP，
为当前 Agent 宿主安装 skills/starrykit-authoring 下的 canonical Skill，
完成 OAuth，并通过列出我有权访问的 StarryKit 文档来验证连接。
如果需要，请按 docs/ 下对应宿主的说明操作。不要让我在聊天中粘贴 access token。
```

Agent 会识别当前宿主、安装 Skill、添加远程 MCP、打开 StarryKit 浏览器 OAuth，并验证工具是否可用。完成后，直接描述你想要的结果：

```text
帮我做一份五页的 AI 旅行规划产品 Pitch Deck。整体乐观、有编辑感、
以图片为主，每一页只表达一个核心观点。
```

```text
打开我最近的产品发布 Deck，收紧叙事，并重新设计那张过于拥挤的对比页，
但不要改变任何事实和结论。
```

```text
把这份活动 Brief 做成一张可编辑的竖版海报，然后导出 PNG。
```

## 看看实际效果

### 从零创作并持续优化一份完整演示文稿

Agent 可以组织叙事、确定视觉系统、创作每一页，并在同一份可编辑文档里继续迭代。

[![观看 StarryKit 创作并编辑公路旅行演示文稿](assets/demos/roadtrip-editing-poster.webp)](assets/demos/roadtrip-editing.mp4)

<p align="center"><a href="assets/demos/roadtrip-editing.mp4">观看演示文稿 Demo</a></p>

### 创作可编辑的营销与活动视觉

同一套工作流也适用于海报、社交媒体图片、邀请函等画布式设计，并不局限于 Slides。

[![观看 StarryKit 创作可编辑的活动视觉](assets/demos/event-design-poster.webp)](assets/demos/event-design.mp4)

<p align="center"><a href="assets/demos/event-design.mp4">观看活动视觉 Demo</a></p>

## Agent 可以做什么

- 创建演示文稿、海报、社交媒体图片和其他可编辑视觉文档。
- 浏览你授权的 StarryKit 文档与文件夹。
- 读取页面内容、查看预览并完成局部视觉修改。
- 新增、重写、移动页面以及修改标题，同时保留文档结构。
- 将完整文档或指定页面导出为 PPTX、PDF、SVG、PNG、JPEG、HTML 或 Google Slides。
- 把每一张新生成的页面作为 StarryKit 中可审核的草稿交给你决定。

## 工作原理

Plugin 由两个部分组成：

- **StarryKit Authoring Skill** 教 Agent 以设计总监的方式思考，写出明确的单页设计 Brief，选择正确的创作工具，并避免常见的 AI 模板化设计。
- **StarryKit Hosted MCP** 提供实时工具，用来读取、创建、编辑、预览和导出你已授权的 StarryKit 文档。

认证通过浏览器 OAuth 完成。不要在聊天或配置文件中粘贴 access token、client secret 或账号密码。Agent 只能访问你授权的 Workspace 或 Folder，你可以随时在 StarryKit 中撤销授权。

## 手动安装

推荐优先使用上面的一句话安装方式。如果 Agent 无法自动完成某一步，请查看对应宿主的中英文手动指南：

| 宿主 | 中文 | English |
| --- | --- | --- |
| Codex | [安装](docs/codex/README.zh-CN.md) | [Setup](docs/codex/README.md) |
| Claude Code | [安装](docs/claude-code/README.zh-CN.md) | [Setup](docs/claude-code/README.md) |
| Cursor | [安装](docs/cursor/README.zh-CN.md) | [Setup](docs/cursor/README.md) |
| OpenCode | [安装](docs/opencode/README.zh-CN.md) | [Setup](docs/opencode/README.md) |
| OpenClaw | [安装](docs/openclaw/README.zh-CN.md) | [Setup](docs/openclaw/README.md) |
| Pi | [当前限制](docs/pi/README.zh-CN.md) | [Current limitation](docs/pi/README.md) |
| 其他 MCP 宿主 | [安装](docs/other-hosts/README.zh-CN.md) | [Setup](docs/other-hosts/README.md) |

仓库维护者可以阅读 [development.md](docs/development.md)，了解 CI workflow 与测试实际覆盖和不覆盖的内容。

<sub>历史说明：这个仓库过去用于 Starry Slides。最终源码快照仍保存在 <a href="https://github.com/StarryKit/starrykit-plugin/tree/archive/starry-slides-v0.1.38">archive/starry-slides-v0.1.38</a> 分支。</sub>

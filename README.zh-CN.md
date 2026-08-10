<p align="center">
  <img src="assets/brand/starrykit-wordmark-on-purple.svg" alt="StarryKit" width="360" />
</p>

<h1 align="center">StarryKit Plugin</h1>

<p align="center">
  不离开你的 AI Agent，把一个想法变成精致、可继续编辑的演示文稿与视觉设计。
</p>

<p align="center">
  <a href="README.md">English</a> ·
  <a href="#安装">安装</a> ·
  <a href="#看看实际效果">效果展示</a> ·
  <a href="#使用场景">使用场景</a> ·
  <a href="#功能">功能</a> ·
  <a href="docs/README.zh-CN.md">手动安装</a> ·
  <a href="https://starrykit.com">官方网站</a>
</p>

StarryKit 让你的 AI Agent 直接拥有视觉创作能力：

- ✨ 从一句 Prompt 开始，完成演示文稿、海报或社交媒体图片。
- 🎨 所有页面保持完整可编辑，每一份草稿都可以在 StarryKit 中审核。
- 🔌 一套 Skill 与 Hosted MCP，同时支持 Codex、Claude Code、Cursor、OpenCode、OpenClaw 等宿主。

## 安装

把这一段发送给你的 Agent：

```text
请为当前 Agent 配置 StarryKit。
Skill: npx skills add StarryKit/starrykit-plugin --skill starrykit-authoring -g -y
MCP: https://mcp.starrykit.com/mcp
```

Agent 会安装 Skill、配置 MCP 并打开浏览器 OAuth。需要手动操作时，请打开[宿主安装指南](docs/README.zh-CN.md)。

## 看看实际效果

### 用 AI 创建和优化

![StarryKit 创建并编辑公路旅行演示文稿](assets/demos/roadtrip-editing.gif)

### 手动编辑和导出

![StarryKit 创建可编辑活动海报](assets/demos/event-design.gif)

## 使用场景

### Presentation

| Prompt | Showcase |
| --- | --- |
| **产品目录**<br><pre><code>为一组模块化吸音产品制作一份六页发布目录，&#10;要有编辑感、材质感，并且能够清楚呈现&#10;产品规格。</code></pre> | <img src="assets/demos/gallery-morrow-formworks.webp" alt="使用 StarryKit 创建的编辑风格产品目录" width="520" /> |
| **技术发布**<br><pre><code>把这份事故响应 Brief 做成一份高对比度发布&#10;Deck，围绕一个核心证据展开：11 分钟内&#10;定位根因。</code></pre> | <img src="assets/demos/gallery-relay-one.webp" alt="使用 StarryKit 创建的高对比度技术发布 Deck" width="520" /> |
| **策略提案**<br><pre><code>为一项为期 90 天的遮阳试点制作高管策略&#10;Deck。整体温暖、有编辑感，并围绕一个清晰的&#10;公共空间成果展开。</code></pre> | <img src="assets/demos/gallery-noon-loop.webp" alt="使用 StarryKit 创建的温暖编辑风格策略 Deck" width="520" /> |

### Poster

| Prompt | Showcase |
| --- | --- |
| **开放工作室**<br><pre><code>为开放工作室之夜制作一张鲜明的黑白海报，&#10;让未完成作品显得有意图、有质感，也更有&#10;邀请感。</code></pre> | <img src="assets/demos/gallery-poster-unfinished.webp" alt="使用 StarryKit 创建的黑白开放工作室海报" width="520" /> |
| **AI 峰会**<br><pre><code>为一场以人为本的 AI 峰会设计未来感活动海报，&#10;用精确排版搭配具有氛围感的信号视觉。</code></pre> | <img src="assets/demos/gallery-poster-vector-shift.webp" alt="使用 StarryKit 创建的未来感 AI 峰会海报" width="520" /> |
| **产品展示**<br><pre><code>把这份四件产品 Brief 做成周末工具展的简洁&#10;目录海报，让价格和活动信息一眼就能看清。</code></pre> | <img src="assets/demos/gallery-poster-orbit-04.webp" alt="使用 StarryKit 创建的极简产品展示海报" width="520" /> |

### Social Media

| Prompt | Showcase |
| --- | --- |
| **产品发布**<br><pre><code>为一组模块化桌面配件制作大胆的社交媒体&#10;发布图，加入编号式标注和高饱和配色。</code></pre> | <img src="assets/demos/gallery-social-orbit-drop-01.webp" alt="使用 StarryKit 创建的产品发布社交图片" width="520" /> |
| **知识轮播图**<br><pre><code>设计一组简洁的社交媒体轮播图，讲清楚每位&#10;设计师都应该了解的六种字体风格。</code></pre> | <img src="assets/demos/gallery-social-type-index.webp" alt="使用 StarryKit 创建的字体知识轮播图" width="520" /> |
| **观点传播**<br><pre><code>为一份关于五个产品策略弱信号的报告制作一张&#10;高冲击力社交媒体图片。</code></pre> | <img src="assets/demos/gallery-social-weak-signals.webp" alt="使用 StarryKit 创建的观点传播社交图片" width="520" /> |

### 更多 Gallery 作品

| Web | UI | Diagram |
| :---: | :---: | :---: |
| <img src="assets/demos/gallery-noriform.webp" alt="使用 StarryKit 创建的可持续材料网站" width="280" /> | <img src="assets/demos/gallery-dark-telemetry.webp" alt="使用 StarryKit 创建的深色运营 Dashboard" width="280" /> | <img src="assets/demos/gallery-diagram-event-delivery.webp" alt="使用 StarryKit 创建的事件交付模式图" width="280" /> |
| **Web** | **UI** | **Card** |
| <img src="assets/demos/gallery-web-loop-01.webp" alt="使用 StarryKit 创建的产品发布网站" width="280" /> | <img src="assets/demos/gallery-ui-data-canvas.webp" alt="使用 StarryKit 创建的浅色数据工作区 UI" width="280" /> | <img src="assets/demos/gallery-card-years-look-good.webp" alt="使用 StarryKit 创建的编辑风格生日卡片" width="280" /> |
| **Infographic** | **Email** | **Email** |
| <img src="assets/demos/gallery-infographic-reform.webp" alt="使用 StarryKit 创建的循环材料信息图" width="280" /> | <img src="assets/demos/gallery-email-green-hour.webp" alt="使用 StarryKit 创建的编辑风格产品邮件" width="280" /> | <img src="assets/demos/gallery-email-decision-drag.webp" alt="使用 StarryKit 创建的研究简报邮件" width="280" /> |

[前往 StarryKit Gallery 查看更多作品。](https://starrykit.com/gallery)

## 功能

| 功能 | 说明 |
| --- | --- |
| **完整可编辑** | 所有 Design 都能在 StarryKit 中继续编辑，包括单个元素和完整页面。 |
| **完美导出** | 完整文档或指定页面都可以顺畅导出为 PPTX、PDF、SVG、PNG、JPEG、HTML 或 Google Slides。 |
| **导入与复刻** | 提供一张图片、一个网站，或 `design.md` 等源文件。StarryKit 会把它作为视觉参考，复刻成可编辑的设计，不需要预先准备模板。 |
| **1000+ Prompts** | 浏览 [1,000+ 个可以直接使用的 Prompt](https://starrykit.com/explore) 与视觉灵感，并在 StarryKit 中打开、编辑成自己的作品。 |

---

<sub>历史说明：这个仓库过去用于 Starry Slides。最终源码快照仍保存在 <a href="https://github.com/StarryKit/starrykit-plugin/tree/archive/starry-slides-v0.1.38">archive/starry-slides-v0.1.38</a> 分支。</sub>

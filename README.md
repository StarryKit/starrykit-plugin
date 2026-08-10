<p align="center">
  <img src="assets/brand/starrykit-wordmark-on-purple.svg" alt="StarryKit" width="360" />
</p>

<h1 align="center">StarryKit Plugin</h1>

<p align="center">
  Turn an idea into a polished, editable presentation or visual design—without leaving your AI agent.
</p>

<p align="center">
  <a href="README.zh-CN.md">简体中文</a> ·
  <a href="#install">Install</a> ·
  <a href="#see-it-in-action">Demos</a> ·
  <a href="#usage">Usage</a> ·
  <a href="#metrics">Metrics</a> ·
  <a href="#features">Features</a> ·
  <a href="#manual-setup">Manual setup</a> ·
  <a href="https://starrykit.com">Website</a>
</p>

StarryKit turns your AI agent into a visual co-creator:

- ✨ Go from a prompt to a polished presentation, poster, or social graphic.
- 🎨 Keep every page fully editable and review each draft in StarryKit.
- 🔌 Use one shared Skill and Hosted MCP across Codex, Claude Code, Cursor, OpenCode, OpenClaw, and more.

## Install

Send this to your agent:

```text
Set up StarryKit for this agent.
Skill: npx skills add StarryKit/starrykit-plugin --skill starrykit-authoring -g -y
MCP: https://mcp.starrykit.com/mcp
```

Your agent installs the Skill, configures the MCP, and opens browser OAuth. For manual installation, choose your host in [Manual setup](#manual-setup).

## See it in action

### Create and refine a complete presentation

![StarryKit creating and editing a road-trip presentation](assets/demos/roadtrip-editing.gif)

<p align="center"><a href="assets/demos/roadtrip-editing.mp4">Watch the HD presentation demo</a></p>

### Create an editable event design

![StarryKit creating an editable event poster](assets/demos/event-design.gif)

<p align="center"><a href="assets/demos/event-design.mp4">Watch the HD event-design demo</a></p>

## Usage

Each request produces an editable StarryKit result you can review and continue refining.

| Prompt | Showcase |
| --- | --- |
| **Presentation**<br><br>“Create a five-page road-trip deck. Make it optimistic, editorial, and image-led, with one clear idea per page.” | <img src="assets/demos/roadtrip-editing-poster.webp" alt="Editable road-trip presentation in StarryKit" width="520" /> |
| **Poster**<br><br>“Turn this event brief into a bold, editable portrait poster for social media, then export a PNG.” | <img src="assets/demos/event-design-poster.webp" alt="Editable event poster in StarryKit" width="520" /> |

You can also ask StarryKit to inspect an existing document, tighten its story, redesign one page, reorder content, or export selected pages.

## Metrics

| ⚡ 1 prompt install | 🧰 14 MCP tools | 📤 7 export formats | 🔐 Browser OAuth |
| --- | --- | --- | --- |
| Skill + MCP setup | Read, author, preview, and export | PPTX, PDF, SVG, PNG, JPEG, HTML, Google Slides | No pasted access tokens |

## Features

| Feature | What your agent can do |
| --- | --- |
| ✨ Visual creation | Create presentations, posters, social graphics, invitations, and other editable designs. |
| 🔎 Document discovery | Browse only the StarryKit documents and folders you authorize. |
| 🎨 Design direction | Apply clear hierarchy, intentional composition, and page-specific art direction. |
| 🛠 Focused editing | Read content and previews, then edit, rewrite, retitle, or reorder the right page. |
| ✅ Reviewable drafts | Hand every generated page back to you for review inside StarryKit. |
| 📤 Flexible export | Export a complete document or selected pages in seven supported formats. |

## Manual setup

If your agent cannot complete installation automatically, use the bilingual guide for your host:

| Host | English | 中文 |
| --- | --- | --- |
| Codex | [Setup](docs/codex/README.md) | [安装](docs/codex/README.zh-CN.md) |
| Claude Code | [Setup](docs/claude-code/README.md) | [安装](docs/claude-code/README.zh-CN.md) |
| Cursor | [Setup](docs/cursor/README.md) | [安装](docs/cursor/README.zh-CN.md) |
| OpenCode | [Setup](docs/opencode/README.md) | [安装](docs/opencode/README.zh-CN.md) |
| OpenClaw | [Setup](docs/openclaw/README.md) | [安装](docs/openclaw/README.zh-CN.md) |
| Pi | [Current limitation](docs/pi/README.md) | [当前限制](docs/pi/README.zh-CN.md) |
| Other MCP hosts | [Setup](docs/other-hosts/README.md) | [安装](docs/other-hosts/README.zh-CN.md) |

For maintainers, [development.md](docs/development.md) explains the repository checks and what the CI workflow does—and does not—test.

<sub>Historical note: this repository previously hosted Starry Slides. Its final source snapshot remains available on the <a href="https://github.com/StarryKit/starrykit-plugin/tree/archive/starry-slides-v0.1.38">archive/starry-slides-v0.1.38</a> branch.</sub>

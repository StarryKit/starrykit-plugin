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
  <a href="#features">Features</a> ·
  <a href="docs/README.md">Manual setup</a> ·
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

Your agent installs the Skill, configures the MCP, and opens browser OAuth. If needed, open the [manual setup guides](docs/README.md).

## See it in action

### Create and Refine with AI

![StarryKit creating and editing a road-trip presentation](assets/demos/roadtrip-editing.gif)

### Edit Manually and Export

![StarryKit creating an editable event poster](assets/demos/event-design.gif)

## Usage

Each request produces an editable StarryKit result you can review and continue refining.

### Prompt → Showcase

| Prompt | Showcase |
| --- | --- |
| **Product catalog**<br><br>“Create a six-page launch catalog for a modular acoustic collection. Make it editorial, tactile, and specification-ready.” | <img src="assets/demos/gallery-morrow-formworks.webp" alt="Editorial product catalog created with StarryKit" width="520" /> |
| **Technical launch**<br><br>“Turn this incident-response brief into a high-contrast launch deck built around one clear proof point: verified cause in 11 minutes.” | <img src="assets/demos/gallery-relay-one.webp" alt="High-contrast technical launch deck created with StarryKit" width="520" /> |

### More from the Gallery

| | |
| --- | --- |
| <img src="assets/demos/gallery-orbit-drop-01.webp" alt="Bold product campaign graphic created with StarryKit" width="420" /> | <img src="assets/demos/gallery-type-index.webp" alt="Typography education carousel created with StarryKit" width="420" /> |
| <img src="assets/demos/gallery-afterlight-2026.webp" alt="Nocturnal garden festival poster created with StarryKit" width="420" /> | <img src="assets/demos/gallery-where-the-rain-goes.webp" alt="Rain garden infographic created with StarryKit" width="420" /> |

You can also ask StarryKit to inspect an existing document, tighten its story, redesign one page, reorder content, or export selected pages.

## Features

| Feature | What it means |
| --- | --- |
| ✏️&nbsp;Editable | Every design stays editable in StarryKit—from individual elements to complete pages. |
| 📤&nbsp;Perfect&nbsp;export | Export complete documents or selected pages cleanly to PPTX, PDF, SVG, PNG, JPEG, HTML, or Google Slides. |
| 💡&nbsp;1000+&nbsp;Prompts | Explore [1,000+ ready-to-use prompts](https://starrykit.com/explore) and visual ideas, then open one in StarryKit to make it your own. |

---

<sub>Historical note: this repository previously hosted Starry Slides. Its final source snapshot remains available on the <a href="https://github.com/StarryKit/starrykit-plugin/tree/archive/starry-slides-v0.1.38">archive/starry-slides-v0.1.38</a> branch.</sub>

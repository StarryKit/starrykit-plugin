<p align="center">
  <img src="assets/brand/starrykit-wordmark.svg" alt="StarryKit" width="420" />
</p>

<h1 align="center">StarryKit Plugin</h1>

<p align="center">
  Turn an idea into a polished, editable presentation or visual design—without leaving your AI agent.
</p>

<p align="center">
  <a href="README.zh-CN.md">简体中文</a> ·
  <a href="#install-with-one-prompt">Get started</a> ·
  <a href="#see-it-in-action">Demos</a> ·
  <a href="#manual-setup">Manual setup</a> ·
  <a href="https://starrykit.com">Website</a>
</p>

StarryKit Plugin gives Codex, Claude Code, Cursor, OpenCode, OpenClaw, and other compatible agents a shared visual-authoring workflow. Describe the story you want to tell; your agent can create a StarryKit document, compose its pages, refine existing designs, and export the result through StarryKit's hosted MCP service.

The result stays editable in StarryKit. You keep control of the document, the review process, and the final export.

## Install with one prompt

Send this prompt to your agent:

```text
Install the StarryKit Plugin from https://github.com/StarryKit/starrykit-plugin.
Configure the StarryKit Hosted MCP server at https://mcp.starrykit.com/mcp,
install the canonical skill from skills/starrykit-authoring for this agent host,
complete OAuth, and verify the connection by listing my accessible StarryKit documents.
Follow the host-specific guide in docs/ when needed. Never ask me to paste an access token.
```

Your agent should detect its host, install the Skill, add the remote MCP connection, open StarryKit's browser-based OAuth flow, and verify the tools. After that, simply ask for an outcome:

```text
Create a five-page pitch deck for an AI travel planner. Make it optimistic,
editorial, and image-led, with one clear idea per page.
```

```text
Open my latest product launch deck, tighten the story, and redesign the crowded
comparison page without changing the underlying claims.
```

```text
Turn this event brief into an editable portrait poster, then export a PNG.
```

## See it in action

### Build and refine a complete presentation

Create a narrative, direct the visual system, author every page, and continue refining the editable result with your agent.

[![Watch StarryKit create and edit a road-trip presentation](assets/demos/roadtrip-editing-poster.webp)](assets/demos/roadtrip-editing.mp4)

<p align="center"><a href="assets/demos/roadtrip-editing.mp4">Watch the presentation demo</a></p>

### Create editable campaign and event graphics

Use the same workflow for posters, social graphics, invitations, and other canvas-based designs—not just slide decks.

[![Watch StarryKit create an editable event design](assets/demos/event-design-poster.webp)](assets/demos/event-design.mp4)

<p align="center"><a href="assets/demos/event-design.mp4">Watch the event-design demo</a></p>

## What your agent can do

- Create presentations, posters, social graphics, and other editable visual documents.
- Browse the StarryKit documents and folders you have authorized.
- Read page content, inspect previews, and make focused visual edits.
- Add, rewrite, reorder, and retitle pages while preserving document structure.
- Export selected pages or complete documents as PPTX, PDF, SVG, PNG, JPEG, HTML, or Google Slides.
- Hand every generated page back to you as a reviewable draft in StarryKit.

## How it works

The Plugin combines two pieces:

- The **StarryKit Authoring Skill** teaches your agent how to think like a design director, write precise page briefs, use the right authoring tool, and avoid generic AI-generated layouts.
- The **StarryKit Hosted MCP** provides the live tools that read, create, edit, preview, and export authorized StarryKit documents.

Authentication happens through OAuth in your browser. Do not paste access tokens, client secrets, or account credentials into chat or configuration. Your agent can only access the workspace or folders you authorize, and you can revoke that access in StarryKit.

## Manual setup

The one-prompt installation above is recommended. If your agent cannot complete a step automatically, use the bilingual manual guide for your host:

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

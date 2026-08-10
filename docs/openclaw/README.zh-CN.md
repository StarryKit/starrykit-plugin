# 在 OpenClaw 中安装 StarryKit

[English](README.md) · [返回 Plugin 首页](../../README.zh-CN.md)

## 1. 安装 Skill

```sh
git clone https://github.com/StarryKit/starrykit-plugin.git
openclaw skills install ./starrykit-plugin/skills/starrykit --as starrykit
```

如果希望所有本地 OpenClaw Agent 都能使用，请加上 `--global`。

## 2. 添加 MCP 并认证

```sh
openclaw mcp add starrykit \
  --url https://mcp.starrykit.com/mcp \
  --transport streamable-http \
  --auth oauth
openclaw mcp login starrykit
```

在浏览器中完成授权。如果 OpenClaw 返回 authorization code，使用 `openclaw mcp login starrykit --code <code>` 完成流程。

## 3. 验证

```sh
openclaw mcp doctor starrykit --probe
openclaw mcp status --verbose
```

然后让 OpenClaw Agent 使用 StarryKit 列出你有权访问的视觉文档。

官方参考：[OpenClaw Skills](https://docs.openclaw.ai/skills)、[OpenClaw MCP CLI](https://docs.openclaw.ai/cli/mcp)。

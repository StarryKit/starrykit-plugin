# 在 Claude Code 中安装 StarryKit

[English](README.md) · [返回 Plugin 首页](../../README.zh-CN.md)

请优先使用项目首页的一句话安装方式。下面是手动安装 Skill 和 Hosted MCP 的步骤。

## 1. 安装 Skill

```sh
git clone https://github.com/StarryKit/starrykit-plugin.git
mkdir -p ~/.claude/skills
cp -R starrykit-plugin/skills/starrykit ~/.claude/skills/
```

Claude Code 会从 `~/.claude/skills` 发现个人 Skill。如果这是当前会话中新建的第一个 Skill 目录，请重启 Claude Code。

## 2. 添加 Hosted MCP

```sh
claude mcp add --transport http --scope user starrykit https://mcp.starrykit.com/mcp
```

进入 Claude Code，运行 `/mcp`，选择 `starrykit`，然后在浏览器中完成 OAuth。不要配置 bearer token 或 client secret。

## 3. 验证

发送：

```text
请使用 StarryKit 列出我有权访问的视觉文档。
```

当 `list_documents` 能正常完成且没有认证错误时，连接即完成。

官方参考：[Claude Code MCP](https://code.claude.com/docs/en/mcp)、[Claude Code Skills](https://code.claude.com/docs/en/skills)。

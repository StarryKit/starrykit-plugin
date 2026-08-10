# 在 Codex 中安装 StarryKit

[English](README.md) · [返回 Plugin 首页](../../README.zh-CN.md)

请优先使用项目首页的一句话安装方式。下面是 Codex CLI、IDE Extension 和 Codex App 的手动安装步骤。

## 1. 安装 Skill

Clone 本仓库，然后把 canonical Skill 复制到个人 Agent Skills 目录：

```sh
git clone https://github.com/StarryKit/starrykit-plugin.git
mkdir -p ~/.agents/skills
cp -R starrykit-plugin/skills/starrykit ~/.agents/skills/
```

Codex 会从 `~/.agents/skills` 发现个人 Skill。如果没有出现，请重启 Codex。

## 2. 添加 Hosted MCP

```sh
codex mcp add starrykit --url https://mcp.starrykit.com/mcp
codex mcp login starrykit
```

在浏览器中完成 StarryKit 授权。不要向命令中加入 bearer token 或 client secret。

## 3. 验证

新建一个 Codex 任务并发送：

```text
请使用 StarryKit 列出我有权访问的视觉文档。
```

当 Codex 能调用 `list_documents`，并返回已授权文档或没有认证错误的空结果时，连接即完成。

官方参考：[Codex MCP](https://developers.openai.com/codex/mcp)、[Codex Skills](https://developers.openai.com/codex/skills)。

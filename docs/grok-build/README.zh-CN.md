# 在 Grok Build 中安装 StarryKit

[English](README.md) · [全部安装指南](../README.zh-CN.md)

直接从 StarryKit 的公开 GitHub 仓库安装 Plugin：

```bash
grok plugin install StarryKit/starrykit-plugin --trust
```

`--trust` 允许 Grok Build 启用 Plugin 中配置的 Hosted MCP。StarryKit 不包含本地可执行文件、Hook 或内嵌凭据；它只会连接生产 MCP 地址 `https://mcp.starrykit.com/mcp`。

## 连接账号

启动 Grok Build，打开 `/mcps`，选择 `starrykit`，然后在浏览器中完成 OAuth。不要把 API token 或 client secret 写入 Plugin 配置。

## 验证安装

新建一个会话并发送：

```text
使用 StarryKit 列出我最近的视觉文档。
```

当 Grok Build 能调用 `list_documents`，并返回已授权文档或没有认证错误的空结果时，连接即完成。

## 排查问题

使用下面的命令检查已安装的 Plugin：

```bash
grok plugin details starrykit-plugin
grok inspect --json
```

如果 MCP 被禁用，请在 `/plugins` 中信任该 Plugin，或使用 `--trust` 重新安装。

官方参考：[Grok Build Plugins、Skills 与 Marketplaces](https://docs.x.ai/build/features/skills-plugins-marketplaces)。

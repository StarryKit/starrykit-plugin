# 在 Cursor 中安装 StarryKit

[English](README.md) · [返回 Plugin 首页](../../README.zh-CN.md)

## 从 Cursor Marketplace 安装

在 Cursor 中打开 `/add-plugin`，搜索 **StarryKit**，然后选择 **Install**。Cursor 会同时安装 canonical StarryKit Skill，并配置 Hosted MCP。

Marketplace 条目目前正在审核。在正式上架前，请使用下面的手动安装方式。

## 手动安装

Clone 本仓库，并把 canonical Skill 复制到 Cursor 的个人 Skill 目录：

```sh
git clone https://github.com/StarryKit/starrykit-plugin.git
mkdir -p ~/.cursor/skills
cp -R starrykit-plugin/skills/starrykit ~/.cursor/skills/
```

然后把下面的配置加入全局 `~/.cursor/mcp.json`，或单个项目的 `.cursor/mcp.json`：

```json
{
  "mcpServers": {
    "starrykit": {
      "type": "http",
      "url": "https://mcp.starrykit.com/mcp"
    }
  }
}
```

## 连接账号

打开 Cursor 的 MCP 设置，并在提示时通过浏览器完成 OAuth。Cursor Agent CLI 用户也可以运行：

```sh
cursor-agent mcp login starrykit
cursor-agent mcp list-tools starrykit
```

不要添加账号凭据或静态 Authorization header。

## 验证

让 Cursor Agent 使用 StarryKit 列出你有权访问的视觉文档。当它能够调用 `list_documents`，并返回已授权文档或没有认证错误的空结果时，安装即完成。

官方参考：[Cursor Plugins](https://cursor.com/docs/plugins)、[Cursor MCP](https://cursor.com/docs/context/mcp)、[Cursor Agent CLI MCP 命令](https://cursor.com/docs/cli/reference/parameters)和 [Cursor Skills](https://cursor.com/docs/skills)。

# 在 Cursor 中安装 StarryKit

[English](README.md) · [返回 Plugin 首页](../../README.zh-CN.md)

## 1. 安装 Skill

Clone 本仓库，并把 canonical Skill 复制到 Cursor 支持的个人目录：

```sh
git clone https://github.com/StarryKit/starrykit-plugin.git
mkdir -p ~/.cursor/skills
cp -R starrykit-plugin/skills/starrykit ~/.cursor/skills/
```

## 2. 配置 MCP

把下面的配置加入全局 `~/.cursor/mcp.json`，或单个项目的 `.cursor/mcp.json`：

```json
{
  "mcpServers": {
    "starrykit": {
      "url": "https://mcp.starrykit.com/mcp"
    }
  }
}
```

打开 Cursor 的 MCP 设置，并在提示时完成 OAuth。Cursor Agent CLI 用户也可以运行：

```sh
cursor-agent mcp login starrykit
cursor-agent mcp list-tools starrykit
```

不要添加账号凭据或静态 Authorization header。

## 3. 验证

让 Cursor Agent 使用 StarryKit 列出你有权访问的视觉文档。能够调用 `list_documents` 即表示安装完成。

官方参考：[Cursor MCP](https://cursor.com/docs/context/mcp)、[Cursor Agent CLI MCP 命令](https://cursor.com/docs/cli/reference/parameters)、[Cursor Skills](https://cursor.com/docs/skills)。

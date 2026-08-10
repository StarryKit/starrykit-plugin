# 在 OpenCode 中安装 StarryKit

[English](README.md) · [返回 Plugin 首页](../../README.zh-CN.md)

## 1. 安装 Skill

```sh
git clone https://github.com/StarryKit/starrykit-plugin.git
mkdir -p ~/.config/opencode/skills
cp -R starrykit-plugin/skills/starrykit ~/.config/opencode/skills/
```

OpenCode 也支持 `~/.agents/skills`，以及项目级 `.opencode/skills` 或 `.agents/skills`。

## 2. 配置 MCP

把下面的内容合并到 `~/.config/opencode/opencode.json` 或项目的 `opencode.json`：

```json
{
  "$schema": "https://opencode.ai/config.json",
  "mcp": {
    "starrykit": {
      "type": "remote",
      "url": "https://mcp.starrykit.com/mcp",
      "enabled": true
    }
  }
}
```

完成认证并查看连接状态：

```sh
opencode mcp auth starrykit
opencode mcp list
```

OpenCode 会为远程 MCP 自动处理 OAuth。不要添加静态 token。

## 3. 验证

让 OpenCode 使用 StarryKit 列出你有权访问的视觉文档。`list_documents` 能正常完成即表示安装成功。

官方参考：[OpenCode MCP servers](https://opencode.ai/docs/mcp-servers/)、[OpenCode Agent Skills](https://opencode.ai/docs/skills/)。

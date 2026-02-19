---
title: Kimi API 第三方集成指南
description: 如何在 Claude Code、Cursor 等第三方工具中使用 Kimi API Key
---

# Kimi API 第三方集成指南

Kimi 开放平台支持标准的 OpenAI SDK 调用方式，这意味着你可以在各种兼容 OpenAI API 格式的第三方工具中使用 Kimi API Key。

## 获取 API Key

1. 访问 [Kimi 开放平台](https://platform.moonshot.cn/)
2. 登录并完成实名认证
3. 进入「会员中心」→「API Key 管理」
4. 点击「创建 API Key」，复制生成的密钥

## 核心配置参数

使用第三方工具时，需要配置以下环境变量：

| 环境变量 | 值 | 说明 |
|---------|-----|------|
| `ANTHROPIC_BASE_URL` | `https://api.kimi.com/coding/` | Kimi 的 API 端点 |
| `ANTHROPIC_API_KEY` | `sk-kimi-...` | 你的 Kimi API Key |

> **注意**：虽然变量名包含 `ANTHROPIC`，但这是为了兼容 Claude Code 等工具的设计。实际调用的是 Kimi 的模型服务。

## Windows 配置方法

### PowerShell (临时设置)

当前终端会话有效，关闭后失效：

```powershell
$env:ANTHROPIC_BASE_URL="https://api.kimi.com/coding/"
$env:ANTHROPIC_API_KEY="sk-kimi-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"

# 启动 Claude Code
claude
```

### 系统环境变量 (永久设置)

永久生效，推荐给日常使用：

```powershell
# 设置用户级环境变量
[Environment]::SetEnvironmentVariable("ANTHROPIC_BASE_URL", "https://api.kimi.com/coding/", "User")
[Environment]::SetEnvironmentVariable("ANTHROPIC_API_KEY", "sk-kimi-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx", "User")
```

设置完成后，**重启终端**使配置生效。

## 验证配置

启动 Claude Code 后，输入以下命令验证模型状态：

```
/status
```

如果配置正确，你应该能看到模型信息和使用状态。

## 支持的模型

Kimi 开放平台提供以下模型：

| 模型 | 上下文长度 | 特点 |
|------|-----------|------|
| `kimi-k2.5` | 256K | 最新版本，性能最强 |
| `kimi-k2` | 128K | 高性价比 |
| `kimi-k1.5` | 128K | 经典稳定版本 |

## 兼容工具列表

以下工具已通过测试，支持 Kimi API：

| 工具 | 配置方式 | 备注 |
|------|---------|------|
| **Claude Code** | 环境变量 | 完全兼容 |
| **Cursor** | 设置 → Models → OpenAI API | 选择 OpenAI 兼容模式 |
| **Continue** | `config.json` 配置 | VS Code 插件 |
| **ChatGPT-Next-Web** | 自定义接口设置 | 选择 OpenAI 兼容 |

## 配置示例：Cursor

1. 打开 Cursor Settings（`Ctrl/Cmd + ,`）
2. 选择「Models」→「OpenAI API」
3. 配置如下：
   - **Base URL**: `https://api.kimi.com/coding/v1`
   - **API Key**: `sk-kimi-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx`
   - **Model**: `kimi-k2.5`

## 配置示例：Continue 插件

在 VS Code 的 `~/.continue/config.json` 中添加：

```json
{
  "models": [
    {
      "title": "Kimi K2.5",
      "provider": "openai",
      "model": "kimi-k2.5",
      "apiBase": "https://api.kimi.com/coding/v1",
      "apiKey": "sk-kimi-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
    }
  ]
}
```

## 费用说明

Kimi API 采用按量计费模式：

- **输入 Token**: 按实际使用量计费
- **输出 Token**: 按实际使用量计费
- **上下文缓存**: 支持，可降低重复输入成本

建议开启用量预警，避免意外超支。

## 常见问题

### Q: 为什么使用 ANTHROPIC_ 前缀的环境变量？

A: Claude Code 等工具原生设计为调用 Claude API，但通过设置 `ANTHROPIC_BASE_URL` 指向 Kimi 的端点，可以透明地切换到 Kimi 服务。

### Q: 支持流式输出吗？

A: 完全支持，与 OpenAI 的 SSE 流式格式一致。

### Q: 如何查看 API 调用日志？

A: 在 Kimi 开放平台的「调用日志」页面可以查看详细的请求记录。

## 参考链接

- [Kimi 开放平台文档](https://platform.moonshot.cn/docs/)
- [第三方 Agents 集成指南](https://www.kimi.com/code/docs/more/third-party-agents.html)
- [Claude Code 官方文档](https://docs.anthropic.com/en/docs/agents-and-tools/claude-code/overview)

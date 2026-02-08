# 开发环境工具清单

> 本机开发环境工具安装路径汇总，使用 Scoop 包管理器统一管理。

## 包管理器

| 工具 | 路径 |
|------|------|
| Scoop | `D:\Dev_Center\04_Tools\Scoop\shims\scoop` |

### Scoop 常用命令

```bash
# 搜索软件
scoop search <name>

# 安装软件
scoop install <name>

# 更新软件
scoop update <name>

# 查看已安装
scoop list

# 查看软件信息
scoop info <name>

# 查找命令所在路径
where <command>
```

## 编程语言 & 运行时

| 工具 | 版本 | 路径 |
|------|------|------|
| Node.js | - | `D:\Dev_Center\04_Tools\Scoop\apps\nodejs\current\node.exe` |
| Python 3.12 | 3.12 | `D:\Dev_Center\04_Tools\Scoop\apps\python312\current\python.exe` |
| Python (默认) | - | `D:\Dev_Center\04_Tools\Scoop\apps\python\current\python.exe` |

## 开发工具

| 工具 | 用途 | 路径 |
|------|------|------|
| Git | 版本控制 | `D:\Dev_Center\04_Tools\Scoop\apps\git\current\cmd\git.exe` |
| ffmpeg | 音视频处理 | `D:\Dev_Center\04_Tools\Scoop\shims\ffmpeg.exe` |
| Whisper | AI 语音转文字 | `D:\Dev_Center\04_Tools\Scoop\apps\python312\current\Scripts\whisper.exe` |

## Whisper 使用指南

[OpenAI Whisper](https://github.com/openai/whisper) 是开源的语音识别模型，支持多语言转录。

### 基本用法

```bash
# 转录音频文件（自动检测语言）
whisper audio.mp3

# 指定中文转录
whisper audio.mp3 --language Chinese

# 指定模型大小（越大越准，越慢）
whisper audio.mp3 --model medium

# 输出为纯文本
whisper audio.mp3 --output_format txt
```

### 模型选择

| 模型 | 大小 | 速度 | 精度 | 适用场景 |
|------|------|------|------|---------|
| tiny | 39M | 最快 | 一般 | 快速预览 |
| base | 74M | 快 | 较好 | 日常使用 |
| small | 244M | 中等 | 好 | 推荐平衡 |
| medium | 769M | 慢 | 很好 | 高精度需求 |
| large | 1550M | 最慢 | 最好 | 专业转录 |

### 配合 ffmpeg 处理视频

```bash
# 1. 从视频提取音频
ffmpeg -i video.mp4 -vn -acodec pcm_s16le -ar 16000 -ac 1 audio.wav

# 2. 用 whisper 转录
whisper audio.wav --language Chinese --model small

# 一行搞定（ffmpeg 管道 + whisper）
ffmpeg -i video.mp4 -vn -f wav - | whisper - --language Chinese
```

## 目录结构

```
D:\Dev_Center\04_Tools\Scoop\
├── apps/           # 已安装的应用
│   ├── git/
│   ├── nodejs/
│   ├── python/
│   ├── python312/
│   └── ffmpeg/
├── shims/          # 命令快捷方式（在 PATH 中）
├── buckets/        # 软件源
├── cache/          # 下载缓存
└── persist/        # 持久化数据
```

---

> 💡 开发环境笔记持续更新中...

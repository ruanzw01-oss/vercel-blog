---
title: 使用 FunASR 实现音频转中文文字
description: 本地部署阿里 FunASR + SenseVoice 语音识别，零成本将音频转为中文文本
---

# 使用 FunASR 实现音频转中文文字

想把播客、录音、课程音频转成文字？本文介绍如何用阿里达摩院的 FunASR 框架在本地完成语音识别，不花一分钱、不限次数、不上传数据。

## 为什么选 FunASR

市面上语音识别方案不少，先看对比：

| 方案 | 是否免费 | 是否本地 | 中文效果 | 上手难度 |
|------|---------|---------|---------|---------|
| **FunASR + SenseVoice** | 完全免费 | 本地运行 | 极佳 | 简单 |
| OpenAI Whisper | 免费（本地）/ 付费（API） | 可本地 | 一般 | 简单 |
| 百度/讯飞/腾讯云 API | 有免费额度，超出付费 | 云端 | 好 | 需注册申请 |
| Google Speech-to-Text | 付费 | 云端 | 中文一般 | 需翻墙 |

选择 FunASR 的核心理由：

- **中文识别效果最好**：SenseVoice 是阿里达摩院专门为中文优化的模型，对普通话的识别准确率极高，支持中英混合、方言
- **完全本地运行**：数据不出本机，隐私有保障
- **零成本无限制**：不需要 API Key，不限调用次数，不限音频时长
- **附加能力强**：除了转文字，还能识别语种、情绪（开心/中性/生气）、音频事件（音乐/掌声）
- **VAD 分段**：内置语音活动检测（Voice Activity Detection），自动切分长音频，无需手动分段

相比之下，Whisper 虽然也能本地运行，但中文效果明显不如 SenseVoice，尤其在专有名词和口语化表达上差距较大。

## 磁盘空间需求

首次运行需要下载模型，以下是各部分的体积：

| 组件 | 大小 | 说明 |
|------|------|------|
| SenseVoiceSmall 模型 (`model.pt`) | ~893 MB | 语音识别主模型 |
| FSMN-VAD 模型 | ~5 MB | 语音分段模型 |
| Python + 依赖包 | ~2 GB | PyTorch、FunASR 等 |
| **总计** | **~3 GB** | 首次安装的完整空间 |

> 模型下载后会缓存到本地 `~/.cache/modelscope/` 目录，后续运行不会重复下载。`model.pt` 是 PyTorch 格式的模型权重文件，893MB 对语音识别模型来说算小的了——这已经是 "Small" 版本。

## 环境准备

### 1. 安装 Python

需要 Python 3.8+，推荐 3.10 或 3.11：

```bash
python --version
```

### 2. 安装依赖

```bash
pip install funasr modelscope torch torchaudio
```

> 如果安装 PyTorch 很慢，可以用国内镜像：
> ```bash
> pip install torch torchaudio -i https://mirrors.aliyun.com/pypi/simple/
> pip install funasr modelscope -i https://mirrors.aliyun.com/pypi/simple/
> ```

## 基本用法

### 最简脚本

创建 `transcribe.py`：

```python
from funasr import AutoModel

# 加载模型（首次运行会自动下载）
model = AutoModel(
    model="iic/SenseVoiceSmall",    # 语音识别模型
    trust_remote_code=True,
    vad_model="fsmn-vad",           # 语音活动检测，自动分段
    vad_kwargs={"max_single_segment_time": 30000},  # 最大分段 30 秒
)

# 识别
audio_file = "your-audio.mp3"
res = model.generate(
    input=audio_file,
    cache={},
    language="auto",  # 自动检测语种，也可指定 "zh"
    use_itn=True,     # 逆文本正则化（数字、日期等转为书面形式）
)

# 输出结果
text = res[0]["text"]
print(text)
```

运行：

```bash
python transcribe.py
```

### 支持的音频格式

FunASR 支持常见音频格式，无需额外转换：

- MP3、WAV、FLAC、AAC、OGG、M4A
- 单声道 / 立体声均可
- 任意采样率（内部会自动重采样到 16kHz）

### 输出格式说明

识别结果会包含特殊标签：

```
<|zh|><|HAPPY|><|Speech|><|withitn|>人一辈子多少还是需要有些运气...
```

| 标签 | 含义 |
|------|------|
| `<\|zh\|>` | 识别语种：中文 |
| `<\|en\|>` | 识别语种：英文 |
| `<\|HAPPY\|>` | 情绪：开心 |
| `<\|NEUTRAL\|>` | 情绪：中性 |
| `<\|ANGRY\|>` | 情绪：生气 |
| `<\|Speech\|>` | 音频类型：语音 |
| `<\|withitn\|>` | 已做逆文本正则化 |

### 去除标签获取纯文本

如果只需要纯文本，加一行正则清洗：

```python
import re

clean_text = re.sub(r"<\|[^|]+\|>", "", text).strip()
print(clean_text)
```

## 进阶：批量处理

处理一个目录下的所有音频文件：

```python
import os
import re
from funasr import AutoModel

model = AutoModel(
    model="iic/SenseVoiceSmall",
    trust_remote_code=True,
    vad_model="fsmn-vad",
    vad_kwargs={"max_single_segment_time": 30000},
)

audio_dir = "./audios"
output_dir = "./transcripts"
os.makedirs(output_dir, exist_ok=True)

audio_exts = {".mp3", ".wav", ".flac", ".aac", ".ogg", ".m4a"}

for filename in os.listdir(audio_dir):
    ext = os.path.splitext(filename)[1].lower()
    if ext not in audio_exts:
        continue

    print(f"处理中: {filename}")
    filepath = os.path.join(audio_dir, filename)
    res = model.generate(input=filepath, cache={}, language="auto", use_itn=True)

    text = res[0]["text"]
    clean_text = re.sub(r"<\|[^|]+\|>", "", text).strip()

    out_path = os.path.join(output_dir, f"{os.path.splitext(filename)[0]}.txt")
    with open(out_path, "w", encoding="utf-8") as f:
        f.write(clean_text)

    print(f"已保存: {out_path}")
```

## 处理速度参考

在普通笔记本（CPU 推理）上的大致速度：

| 音频时长 | 处理时间 |
|---------|---------|
| 1 分钟 | ~10 秒 |
| 10 分钟 | ~2 分钟 |
| 1 小时 | ~10 分钟 |

> 如果有 NVIDIA 显卡，安装 CUDA 版 PyTorch 后会自动启用 GPU 加速，速度可提升 5-10 倍。

## 常见问题

**Q: 首次运行下载很慢怎么办？**

模型从 ModelScope（魔搭社区）下载，国内网络一般没问题。如果慢，可以设置镜像：

```bash
export MODELSCOPE_CACHE=~/.cache/modelscope
```

**Q: 内存不够怎么办？**

SenseVoiceSmall 推理时大约需要 2-3 GB 内存。如果内存紧张，确保关闭其他大型程序。

**Q: 识别结果有错别字怎么办？**

语音识别不可能 100% 准确，口语化内容、专有名词可能有误。建议识别后人工校对关键内容，或用 LLM 做后处理润色。

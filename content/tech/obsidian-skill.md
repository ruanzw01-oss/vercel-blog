---
tags:
  - claude-code
  - obsidian
  - oh-my-claudecode
created: 2026-02-09
---

# Obsidian Skill 使用指南

## 概述

Obsidian Skill 是 oh-my-claudecode 提供的一组专用技能，让 Claude Code 能够直接创建和编辑 Obsidian 的三种核心文件格式。无需手动编写复杂的 YAML 或 JSON 语法，只需用自然语言描述需求，即可生成符合 Obsidian 规范的文件。

Obsidian Skill 包含三个子技能：

| 技能名称 | 文件格式 | 用途 |
|---------|---------|------|
| `obsidian-markdown` | `.md` | 创建 Obsidian 风格的 Markdown 笔记 |
| `obsidian-bases` | `.base` | 创建数据库视图（表格、卡片、列表、地图） |
| `json-canvas` | `.canvas` | 创建可视化画布（流程图、思维导图等） |

---

## 一、obsidian-markdown — Obsidian 风格 Markdown

### 功能说明

生成包含 Obsidian 专属语法的 Markdown 文件，覆盖 Obsidian 相对于标准 Markdown 的所有扩展特性。

### 支持的语法

- **双链（Wikilinks）**：`[[笔记名]]`、`[[笔记名#标题]]`、`[[笔记名#^块ID]]`
- **嵌入（Embeds）**：`![[文件.md]]`、`![[图片.png]]`、`![[音频.mp3]]`、`![[文档.pdf#page=3]]`
- **Callouts（提示框）**：`> [!note]`、`> [!warning]`、`> [!tip]` 等，支持折叠
- **Properties（属性/前置元数据）**：YAML frontmatter，包括 tags、aliases、cssclasses 等
- **标签**：`#标签` 和嵌套标签 `#父标签/子标签`
- **数学公式**：行内 `$E=mc^2$` 和块级 `$$..$$`
- **Mermaid 图表**：流程图、时序图、甘特图等
- **脚注与注释**：`[^1]` 脚注、`%%注释%%` 隐藏注释
- **任务列表**：`- [ ]` 待办、`- [x]` 已完成

### 使用场景

- 创建带有双链和嵌入的知识笔记
- 生成带有 frontmatter 属性的模板文件
- 编写包含 Callout 提示框的教程文档

---

## 二、obsidian-bases — 数据库视图

### 功能说明

生成 `.base` 文件，这是 Obsidian Bases 功能的核心文件格式。它用 YAML 语法定义对笔记库的动态查询视图，类似于 Notion 的数据库视图。

### 核心能力

- **四种视图类型**：`table`（表格）、`cards`（卡片）、`list`（列表）、`map`（地图）
- **全局过滤器**：支持 `and` / `or` / `not` 逻辑组合，按标签、扩展名、属性等条件筛选笔记
- **公式计算**：支持算术运算、条件判断、日期计算、字符串处理等
- **分组与排序**：按属性分组，自定义排序方向
- **汇总统计**：Average、Sum、Min、Max、Median、Stddev 等
- **嵌入支持**：可在 Markdown 中通过 `![[文件.base]]` 嵌入视图

### 实际示例

你生成的 `demo.base` 文件展示了一个任务管理视图：

```yaml
filters:
  and:
    - file.hasTag("task")
    - file.ext == "md"
formulas:
  days_until_due: if(due, (date(due) - today()).days, "")
  priority_label: if(priority == 1, "High", if(priority == 2, "Medium", "Low"))
views:
  - type: table
    name: Active Tasks
    filters:
      and:
        - status != "done"
    groupBy:
      property: status
  - type: cards
    name: Task Cards
```

这个文件做了以下事情：
1. **筛选**：只显示带有 `#task` 标签的 `.md` 文件
2. **公式**：自动计算距截止日期的天数、将优先级数字转为文字标签
3. **表格视图**：按状态分组展示未完成的任务
4. **卡片视图**：以卡片形式浏览所有任务

### 使用场景

- 创建项目任务看板
- 构建读书笔记数据库
- 管理带有截止日期的待办事项
- 按标签或属性汇总统计笔记

---

## 三、json-canvas — 可视化画布

### 功能说明

生成 `.canvas` 文件，这是 Obsidian Canvas 使用的开放文件格式（JSON Canvas），用于创建无限画布上的可视化内容。

### 核心能力

- **四种节点类型**：
  - `text` — Markdown 文本内容
  - `file` — 引用库中的文件或附件
  - `link` — 外部网页链接
  - `group` — 分组容器，用于组织节点
- **连接线（Edges）**：节点之间的连线，支持标签、颜色、箭头方向
- **颜色系统**：预设色 `1-6` 或自定义 hex 颜色
- **布局控制**：通过 x/y 坐标和 width/height 精确定位

### 实际示例

你生成的 `demo.canvas` 文件展示了一个学习路径图：

```
┌─── Learning Path (分组) ──────────────────────────┐
│                                                    │
│  [Start]  ──→  [Markdown]  ──→                     │
│     │          Wikilinks,       [Master!]           │
│     │          callouts,    ──→                     │
│     └──→   [Bases]          ──→                     │
│            Filters,                                 │
│            formulas, views                          │
└────────────────────────────────────────────────────┘
```

这个画布做了以下事情：
1. 用 `group` 节点创建了 "Learning Path" 分组框
2. 用 `text` 节点创建了 4 个知识卡片
3. 用 `edges` 连线展示了从基础到精通的学习路径
4. 用颜色区分不同阶段

### 使用场景

- 绘制学习路线图
- 制作项目流程图
- 构建思维导图
- 创建知识关系图谱

---

## 如何使用

在 Claude Code 终端中，根据需求描述即可触发对应技能：

```
# 生成 Obsidian Markdown 笔记
> 帮我创建一个带有 frontmatter 和 callout 的读书笔记模板

# 生成 Base 数据库视图
> 创建一个 .base 文件，按标签筛选所有项目笔记，用表格展示

# 生成 Canvas 画布
> 画一个 Python 学习路线的 canvas 思维导图
```

Claude Code 会自动识别意图并调用对应的 Obsidian Skill 生成文件。

---

## 三个技能的关系

```
obsidian-markdown (.md)    → 笔记内容本身
obsidian-bases (.base)     → 笔记的动态查询与展示
json-canvas (.canvas)      → 笔记间关系的可视化
```

三者配合使用，覆盖了 Obsidian 中"写内容 → 查数据 → 看全局"的完整工作流。

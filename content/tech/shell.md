# Shell 重定向与管道

## 输出重定向

### 文件描述符

在 Linux/Windows 的 Shell 中，每个进程默认有三个文件描述符：

| 文件描述符 | 名称 | 说明 |
|-----------|------|------|
| `0` | stdin | 标准输入（键盘输入） |
| `1` | stdout | 标准输出（正常输出） |
| `2` | stderr | 标准错误（错误信息） |

### `2>&1` 的含义

```bash
# 将 stderr(2) 重定向到 stdout(1) 所指向的地方
command 2>&1
```

- `2>` — 重定向文件描述符 2（stderr）
- `&1` — 指向文件描述符 1（stdout）的引用
- 合起来：**把错误输出合并到标准输出**

### 常见用法

```bash
# 1. 同时捕获正常输出和错误输出
npm install 2>&1

# 2. 将所有输出写入文件
npm install > log.txt 2>&1

# 3. 丢弃所有输出（静默执行）
command > /dev/null 2>&1    # Linux/Mac
command > NUL 2>&1          # Windows

# 4. 只捕获错误信息
command 2> error.log

# 5. 分别保存正常输出和错误输出
command > output.log 2> error.log
```

### 顺序很重要

```bash
# 正确：先重定向 stdout 到文件，再把 stderr 合并过去
command > file.txt 2>&1

# 错误：2>&1 执行时 stdout 还指向终端，之后才重定向到文件
command 2>&1 > file.txt   # stderr 仍然输出到终端！
```

### 简写形式

```bash
# Bash 4+ 简写：&> 等价于 > file 2>&1
command &> file.txt

# 追加模式
command >> file.txt 2>&1
```

## 管道 `|`

```bash
# 将前一个命令的 stdout 作为后一个命令的 stdin
command1 | command2

# 示例：查看进程并过滤
ps aux | grep node

# 管道默认只传递 stdout，要同时传递 stderr：
command 2>&1 | grep "error"
```

## 实用组合

```bash
# 查找命令位置，无论成功失败都能看到结果
where python 2>&1

# 安装依赖并实时查看所有输出（包括错误）
npm install 2>&1 | tee install.log

# 检查命令是否存在（静默方式）
command -v node > /dev/null 2>&1 && echo "已安装" || echo "未安装"
```

---

> 💡 Shell 技巧笔记持续更新中...

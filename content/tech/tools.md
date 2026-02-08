# 工具效率

## Git 技巧

### 常用命令

```bash
# 交互式 rebase
git rebase -i HEAD~3

# 暂存当前修改
git stash
git stash pop

# 查看某个文件的修改历史
git log -p -- path/to/file

# 撤销上次提交（保留修改）
git reset --soft HEAD~1
```

## VS Code

### 实用快捷键

| 功能 | Windows | Mac |
|------|---------|-----|
| 命令面板 | `Ctrl+Shift+P` | `Cmd+Shift+P` |
| 快速打开文件 | `Ctrl+P` | `Cmd+P` |
| 全局搜索 | `Ctrl+Shift+F` | `Cmd+Shift+F` |
| 多光标 | `Alt+Click` | `Option+Click` |

### 推荐扩展

- **Prettier** - 代码格式化
- **ESLint** - 代码规范检查
- **GitLens** - Git 增强
- **Thunder Client** - API 测试

---

> 💡 效率工具笔记持续更新中...
